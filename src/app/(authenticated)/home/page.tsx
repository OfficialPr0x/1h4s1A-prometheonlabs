'use client'

import { Typography, Card, Row, Col, Space, Button } from 'antd'
import { UserOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'

import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: announcements, isLoading: isLoadingAnnouncements } =
    Api.announcement.findMany.useQuery({
      where: { organizationId: params.organizationId },
      orderBy: { dateCreated: 'desc' },
      take: 3,
    })

  const { data: organization } = Api.organization.findUnique.useQuery({
    where: { id: params.organizationId },
    include: { organizationRoles: true },
  })

  const isAdmin =
    organization?.organizationRoles?.some(
      role => role.name === 'admin' && role.userId === user.id,
    ) ?? false

  const handlePersonalize = () => {
    router.push(`/organizations/${params.organizationId}/onboarding`)
  }

  const handleConfigureAnnouncements = () => {
    router.push(`/organizations/${params.organizationId}/announcements`)
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Welcome to Our Application</Title>
        <Paragraph>
          This application helps you manage your organization efficiently.
          Here's how it works:
        </Paragraph>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card title="User Management" extra={<UserOutlined />}>
              <Text>
                Manage users, roles, and permissions within your organization.
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="File Management" extra={<SettingOutlined />}>
              <Text>
                Upload, organize, and share files securely within your team.
              </Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="AI Chat" extra={<BellOutlined />}>
              <Text>
                Get instant answers and assistance using our AI-powered chat.
              </Text>
            </Card>
          </Col>
        </Row>

        <Button onClick={handlePersonalize} type="primary">
          Personalize Your Experience
        </Button>

        {isAdmin && (
          <Button onClick={handleConfigureAnnouncements} type="default">
            Configure Announcements
          </Button>
        )}

        {announcements && announcements.length > 0 && (
          <Card title="Important Announcements">
            {announcements.map(announcement => (
              <Paragraph key={announcement.id}>
                {announcement.content}
              </Paragraph>
            ))}
          </Card>
        )}
      </Space>
    </PageLayout>
  )
}
