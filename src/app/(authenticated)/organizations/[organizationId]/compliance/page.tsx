'use client'

import {
  Typography,
  Button,
  Space,
  Card,
  Form,
  Input,
  Select,
  Table,
  Modal,
} from 'antd'
import {
  ExclamationCircleOutlined,
  LockOutlined,
  FileSearchOutlined,
  AuditOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function ComplianceCenterPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, checkOrganizationRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false)
  const [isAdminModalVisible, setIsAdminModalVisible] = useState(false)

  const {
    data: auditLogs,
    isLoading: isLoadingAuditLogs,
    refetch: refetchAuditLogs,
  } = Api.auditLog.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { timestamp: 'desc' },
    take: 5,
  })

  const { mutateAsync: createAuditLog } = Api.auditLog.create.useMutation()

  const handleDataRequest = async (values: any) => {
    try {
      await createAuditLog({
        data: {
          action: 'Data Subject Request',
          details: JSON.stringify(values),
          timestamp: new Date().toISOString(),
          userId: user?.id as string,
        },
      })
      enqueueSnackbar('Your request has been submitted successfully.', {
        variant: 'success',
      })
      setIsRequestModalVisible(false)
      refetchAuditLogs()
    } catch (error) {
      enqueueSnackbar('Failed to submit request. Please try again.', {
        variant: 'error',
      })
    }
  }

  const handleAdminAction = async (values: any) => {
    try {
      await createAuditLog({
        data: {
          action: 'Admin Compliance Action',
          details: JSON.stringify(values),
          timestamp: new Date().toISOString(),
          userId: user?.id as string,
        },
      })
      enqueueSnackbar('Compliance action has been recorded.', {
        variant: 'success',
      })
      setIsAdminModalVisible(false)
      refetchAuditLogs()
    } catch (error) {
      enqueueSnackbar('Failed to record compliance action. Please try again.', {
        variant: 'error',
      })
    }
  }

  const columns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text: string) => new Date(text).toLocaleString(),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Compliance Center</Title>
        <Paragraph>
          Manage your GDPR/CCPA compliance, data subject requests, and privacy
          settings here.
        </Paragraph>

        <Card
          title="Data Subject Requests"
          extra={
            <Button
              onClick={() => setIsRequestModalVisible(true)}
              icon={<FileSearchOutlined />}
            >
              New Request
            </Button>
          }
        >
          <Paragraph>
            Initiate data subject access requests or deletion requests here. You
            can also request anonymization or pseudonymization of your personal
            data.
          </Paragraph>
        </Card>

        {checkOrganizationRole('admin') && (
          <Card
            title="Admin Compliance Tools"
            extra={
              <Button
                onClick={() => setIsAdminModalVisible(true)}
                icon={<AuditOutlined />}
              >
                Compliance Action
              </Button>
            }
          >
            <Paragraph>
              Set automated GDPR/CCPA compliance checks and generate audit
              reports on user data management.
            </Paragraph>
          </Card>
        )}

        <Card title="Recent Compliance Activities">
          <Table
            columns={columns}
            dataSource={auditLogs}
            rowKey="id"
            loading={isLoadingAuditLogs}
          />
        </Card>

        <Modal
          title="Submit Data Subject Request"
          visible={isRequestModalVisible}
          onCancel={() => setIsRequestModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleDataRequest} layout="vertical">
            <Form.Item
              name="requestType"
              label="Request Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="access">Access Request</Select.Option>
                <Select.Option value="deletion">Deletion Request</Select.Option>
                <Select.Option value="anonymization">
                  Anonymization Request
                </Select.Option>
                <Select.Option value="pseudonymization">
                  Pseudonymization Request
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="details" label="Additional Details">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Request
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Admin Compliance Action"
          visible={isAdminModalVisible}
          onCancel={() => setIsAdminModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleAdminAction} layout="vertical">
            <Form.Item
              name="actionType"
              label="Action Type"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option value="complianceCheck">
                  Run Compliance Check
                </Select.Option>
                <Select.Option value="generateReport">
                  Generate Audit Report
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="details" label="Action Details">
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Perform Action
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </PageLayout>
  )
}
