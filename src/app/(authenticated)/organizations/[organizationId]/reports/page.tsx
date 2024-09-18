'use client'

import {
  Typography,
  Button,
  Table,
  Space,
  Select,
  DatePicker,
  Modal,
  Form,
  Input,
} from 'antd'
import {
  DownloadOutlined,
  ScheduleOutlined,
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
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

export default function ReportsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, checkOrganizationRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false)

  const {
    data: reports,
    isLoading,
    refetch,
  } = Api.auditLog.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { timestamp: 'desc' },
  })

  const { mutateAsync: createReport } = Api.auditLog.create.useMutation()

  const isAdmin = checkOrganizationRole('admin')

  const columns = [
    {
      title: 'Report Type',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Date Generated',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) =>
        dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            icon={<DownloadOutlined />}
            onClick={() => handleExport(record)}
          >
            Export
          </Button>
        </Space>
      ),
    },
  ]

  const handleGenerateReport = async (reportType: string) => {
    try {
      await createReport({
        data: {
          action: reportType,
          details: `Generated ${reportType} report`,
          timestamp: new Date().toISOString(),
          userId: user?.id || '',
        },
      })
      enqueueSnackbar(`${reportType} report generated successfully`, {
        variant: 'success',
      })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to generate report', { variant: 'error' })
    }
  }

  const handleExport = (record: any) => {
    // Implement export functionality here
    enqueueSnackbar(`Exporting ${record.action} report`, { variant: 'info' })
  }

  const handleScheduleReport = (values: any) => {
    // Implement schedule report functionality here
    console.log('Scheduling report:', values)
    enqueueSnackbar('Report scheduled successfully', { variant: 'success' })
    setIsScheduleModalVisible(false)
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Reports</Title>
      <Text>
        Generate, view, and export various reports related to your
        organization's activities.
      </Text>

      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', marginTop: '2rem' }}
      >
        <Space wrap>
          <Button
            icon={<PieChartOutlined />}
            onClick={() => handleGenerateReport('User Activity')}
          >
            User Activity
          </Button>
          <Button
            icon={<BarChartOutlined />}
            onClick={() => handleGenerateReport('File Usage')}
          >
            File Usage
          </Button>
          <Button
            icon={<LineChartOutlined />}
            onClick={() => handleGenerateReport('Payment History')}
          >
            Payment History
          </Button>
          {isAdmin && (
            <>
              <Button
                icon={<PieChartOutlined />}
                onClick={() => handleGenerateReport('System Usage')}
              >
                System Usage
              </Button>
              <Button
                icon={<BarChartOutlined />}
                onClick={() => handleGenerateReport('Compliance Report')}
              >
                Compliance Report
              </Button>
              <Button
                icon={<LineChartOutlined />}
                onClick={() => handleGenerateReport('Performance Metrics')}
              >
                Performance Metrics
              </Button>
            </>
          )}
        </Space>

        <Button
          icon={<ScheduleOutlined />}
          onClick={() => setIsScheduleModalVisible(true)}
        >
          Schedule Report
        </Button>

        <Table
          columns={columns}
          dataSource={reports}
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Space>

      <Modal
        title="Schedule Report"
        visible={isScheduleModalVisible}
        onCancel={() => setIsScheduleModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleScheduleReport} layout="vertical">
          <Form.Item
            name="reportType"
            label="Report Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="User Activity">User Activity</Select.Option>
              <Select.Option value="File Usage">File Usage</Select.Option>
              <Select.Option value="Payment History">
                Payment History
              </Select.Option>
              {isAdmin && (
                <>
                  <Select.Option value="System Usage">
                    System Usage
                  </Select.Option>
                  <Select.Option value="Compliance Report">
                    Compliance Report
                  </Select.Option>
                  <Select.Option value="Performance Metrics">
                    Performance Metrics
                  </Select.Option>
                </>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            name="frequency"
            label="Frequency"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="daily">Daily</Select.Option>
              <Select.Option value="weekly">Weekly</Select.Option>
              <Select.Option value="monthly">Monthly</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="recipients"
            label="Recipients"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter email addresses separated by commas" />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Schedule Report
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
