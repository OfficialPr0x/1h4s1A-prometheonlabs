'use client'

import {
  Typography,
  Tabs,
  Card,
  Table,
  Form,
  Input,
  Button,
  InputNumber,
  Switch,
} from 'antd'
import {
  BookOutlined,
  LineChartOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function APIDocumentationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, checkOrganizationRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [activeTab, setActiveTab] = useState('1')

  // Placeholder for API statistics
  const apiStats = [
    { endpoint: '/api/users', totalRequests: 1000, avgResponseTime: 50 },
    { endpoint: '/api/products', totalRequests: 800, avgResponseTime: 60 },
    { endpoint: '/api/orders', totalRequests: 500, avgResponseTime: 70 },
  ]
  // Placeholder for API limits update
  const updateApiLimits = async (data: any) => {
    console.log('API limits update:', data)
    return Promise.resolve()
  }

  const isAdmin = checkOrganizationRole('admin')

  const handleTestEndpoint = async (endpoint: string) => {
    try {
      // This is a mock implementation. In a real scenario, you'd call the actual API endpoint.
      await new Promise(resolve => setTimeout(resolve, 1000))
      enqueueSnackbar(`Successfully tested endpoint: ${endpoint}`, {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar(`Error testing endpoint: ${endpoint}`, {
        variant: 'error',
      })
    }
  }

  const handleUpdateLimits = async (values: any) => {
    try {
      // Placeholder: log the values instead of updating
      console.log('Updating API limits:', values)
      enqueueSnackbar('API limits update simulated successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to simulate API limits update', {
        variant: 'error',
      })
    }
  }

  const endpointColumns = [
    { title: 'Endpoint', dataIndex: 'endpoint', key: 'endpoint' },
    { title: 'Method', dataIndex: 'method', key: 'method' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button onClick={() => handleTestEndpoint(record.endpoint)}>
          Test
        </Button>
      ),
    },
  ]

  const endpointData = [
    {
      key: '1',
      endpoint: '/api/users',
      method: 'GET',
      description: 'Get all users',
    },
    {
      key: '2',
      endpoint: '/api/users/:id',
      method: 'GET',
      description: 'Get user by ID',
    },
    {
      key: '3',
      endpoint: '/api/users',
      method: 'POST',
      description: 'Create a new user',
    },
    // Add more endpoints as needed
  ]

  const statsColumns = [
    { title: 'Endpoint', dataIndex: 'endpoint', key: 'endpoint' },
    {
      title: 'Total Requests',
      dataIndex: 'totalRequests',
      key: 'totalRequests',
    },
    {
      title: 'Avg Response Time (ms)',
      dataIndex: 'avgResponseTime',
      key: 'avgResponseTime',
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>API Documentation</Title>
      <Text>
        Explore and test our API endpoints, view usage statistics, and manage
        API limits.
      </Text>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{ marginTop: 24 }}
      >
        <Tabs.TabPane
          tab={
            <span>
              <BookOutlined />
              Documentation
            </span>
          }
          key="1"
        >
          <Card>
            <Title level={4}>API Endpoints</Title>
            <Table columns={endpointColumns} dataSource={endpointData} />
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane
          tab={
            <span>
              <LineChartOutlined />
              Usage Statistics
            </span>
          }
          key="2"
        >
          <Card>
            <Title level={4}>API Usage Statistics</Title>
            <Table columns={statsColumns} dataSource={apiStats} />
          </Card>
        </Tabs.TabPane>

        {isAdmin && (
          <Tabs.TabPane
            tab={
              <span>
                <SettingOutlined />
                API Settings
              </span>
            }
            key="3"
          >
            <Card>
              <Title level={4}>API Usage Quotas and Rate Limits</Title>
              <Form onFinish={handleUpdateLimits} layout="vertical">
                <Form.Item name="dailyQuota" label="Daily Request Quota">
                  <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                  name="rateLimit"
                  label="Rate Limit (requests per minute)"
                >
                  <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                  name="enableThrottling"
                  valuePropName="checked"
                  label="Enable Throttling"
                >
                  <Switch />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Update Limits
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Tabs.TabPane>
        )}
      </Tabs>
    </PageLayout>
  )
}
