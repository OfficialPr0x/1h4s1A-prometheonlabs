'use client'

import { Typography, Row, Col, Card, Statistic, List, Spin } from 'antd'
import {
  DashboardOutlined,
  UserOutlined,
  FileOutlined,
  DollarOutlined,
  BarChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function AppHomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, checkOrganizationRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const { data: organizationData, isLoading: orgLoading } =
    Api.organization.findUnique.useQuery({
      where: { id: params.organizationId },
      include: { organizationRoles: true },
    })

  const { data: recentActivities, isLoading: activitiesLoading } =
    Api.auditLog.findMany.useQuery({
      where: { userId: user?.id },
      orderBy: { timestamp: 'desc' },
      take: 5,
    })

  const isAdmin = checkOrganizationRole('admin')

  const quickLinks = [
    {
      title: 'AI Chat',
      url: `/organizations/${params.organizationId}/ai-chat`,
      icon: <DashboardOutlined />,
    },
    {
      title: 'File Management',
      url: `/organizations/${params.organizationId}/files`,
      icon: <FileOutlined />,
    },
    {
      title: 'User Management',
      url: `/organizations/${params.organizationId}/users`,
      icon: <UserOutlined />,
    },
    {
      title: 'Payments',
      url: `/organizations/${params.organizationId}/payments`,
      icon: <DollarOutlined />,
    },
  ]

  if (orgLoading || activitiesLoading) {
    return <Spin size="large" />
  }

  return (
    <PageLayout layout="narrow">
      <div className="p-4 md:p-6 lg:p-8">
        <Title level={2} className="mb-4">
          Organization Dashboard
        </Title>
        <Text className="mb-6 block">
          Welcome to your organization's dashboard. Here you can view key
          metrics and recent activities.
        </Text>

        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={12} md={6}>
            <Card className="h-full">
              <Statistic
                title="Total Users"
                value={organizationData?.organizationRoles?.length || 0}
                prefix={<UserOutlined className="text-blue-500" />}
                className="text-center"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="h-full">
              <Statistic
                title="Recent Activities"
                value={recentActivities?.length || 0}
                prefix={<DashboardOutlined className="text-green-500" />}
                className="text-center"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="h-full">
              <Statistic
                title="Files Uploaded"
                value={123}
                prefix={<FileOutlined className="text-yellow-500" />}
                className="text-center"
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="h-full">
              <Statistic
                title="Total Revenue"
                value={9876}
                prefix={<DollarOutlined className="text-red-500" />}
                className="text-center"
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="Quick Links" className="h-full">
              <List
                dataSource={quickLinks}
                renderItem={item => (
                  <List.Item>
                    <a
                      onClick={() => router.push(item.url)}
                      className="flex items-center"
                    >
                      {item.icon} <span className="ml-2">{item.title}</span>
                    </a>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Recent Activities" className="h-full">
              <List
                dataSource={recentActivities}
                renderItem={activity => (
                  <List.Item>
                    <Text>
                      {activity.action} - {activity.details}
                    </Text>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {isAdmin && (
          <Card title="Admin Controls" className="mt-8">
            <Text>
              As an admin, you have access to additional controls and can assign
              different dashboard layouts to users based on their roles.
            </Text>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
