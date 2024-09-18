'use client'

import {
  Typography,
  Card,
  Row,
  Col,
  Statistic,
  Alert,
  Switch,
  Input,
  Button,
} from 'antd'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'
import { RagVector } from '@prisma/client'

export default function SystemStatusPage() {
  const router = useRouter()
  const params = useParams<{ organizationId: string }>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [alertThreshold, setAlertThreshold] = useState(90)

  const {
    data: systemStatus,
    isLoading,
    refetch,
  } = Api.rag.findMany.useQuery({
    where: { tags: { has: 'system_status' } },
  })

  const { mutateAsync: updateStatus } = Api.rag.update.useMutation()

  const isAdmin = user?.globalRole === 'ADMIN'

  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 60000) // Refresh every minute

    return () => clearInterval(interval)
  }, [refetch])

  const handleAlertThresholdChange = async () => {
    try {
      await updateStatus({
        where: { key: 'alert_threshold' },
        data: { tags: ['alert_threshold', alertThreshold.toString()] },
      })
      enqueueSnackbar('Alert threshold updated successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to update alert threshold', { variant: 'error' })
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircleOutlined style={{ color: 'green' }} />
      case 'degraded':
        return <WarningOutlined style={{ color: 'orange' }} />
      case 'down':
        return <CloseCircleOutlined style={{ color: 'red' }} />
      default:
        return null
    }
  }

  if (isLoading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>System Status</Title>
      <Text>
        View the current status of various system components and performance
        metrics.
      </Text>

      {isAdmin && (
        <Alert
          message="Admin Notice"
          description="As an admin, you can configure alert thresholds and receive notifications about system performance."
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Row gutter={[16, 16]}>
        {systemStatus?.map((item: RagVector) => (
          <Col xs={24} sm={12} md={8} key={item.id}>
            <Card>
              <Statistic
                title={item.key}
                value={
                  item.tags
                    .find(tag => tag.startsWith('status:'))
                    ?.split(':')[1] || 'Unknown'
                }
                prefix={getStatusIcon(
                  item.tags
                    .find(tag => tag.startsWith('status:'))
                    ?.split(':')[1] || 'Unknown',
                )}
                valueStyle={{
                  color:
                    item.tags
                      .find(tag => tag.startsWith('status:'))
                      ?.split(':')[1] === 'operational'
                      ? 'green'
                      : item.tags
                            .find(tag => tag.startsWith('status:'))
                            ?.split(':')[1] === 'degraded'
                        ? 'orange'
                        : 'red',
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={3} style={{ marginTop: 24 }}>
        Performance Metrics
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Server Uptime"
              value={
                systemStatus
                  ?.find(item => item.key === 'server_uptime')
                  ?.tags.find(tag => tag.startsWith('value:'))
                  ?.split(':')[1] || '0'
              }
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Response Time"
              value={
                systemStatus
                  ?.find(item => item.key === 'response_time')
                  ?.tags.find(tag => tag.startsWith('value:'))
                  ?.split(':')[1] || '0'
              }
              suffix="ms"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Service Availability"
              value={
                systemStatus
                  ?.find(item => item.key === 'service_availability')
                  ?.tags.find(tag => tag.startsWith('value:'))
                  ?.split(':')[1] || '0'
              }
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {isAdmin && (
        <Card title="Alert Configuration" style={{ marginTop: 24 }}>
          <Row gutter={16} align="middle">
            <Col span={12}>
              <Text>Alert Threshold:</Text>
            </Col>
            <Col span={8}>
              <Input
                type="number"
                value={alertThreshold}
                onChange={e => setAlertThreshold(Number(e.target.value))}
                suffix="%"
              />
            </Col>
            <Col span={4}>
              <Button onClick={handleAlertThresholdChange}>Update</Button>
            </Col>
          </Row>
          <Row gutter={16} align="middle" style={{ marginTop: 16 }}>
            <Col span={12}>
              <Text>Receive Notifications:</Text>
            </Col>
            <Col span={12}>
              <Switch defaultChecked />
            </Col>
          </Row>
        </Card>
      )}
    </PageLayout>
  )
}
