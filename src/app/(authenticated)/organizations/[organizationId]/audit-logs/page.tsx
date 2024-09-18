'use client'

import { Prisma } from '@prisma/client'
import { useState, useEffect } from 'react'
import {
  Typography,
  Table,
  Input,
  DatePicker,
  Button,
  Space,
  Modal,
} from 'antd'
import { SearchOutlined, ExportOutlined, BellOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function AuditLogsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, checkOrganizationRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [searchText, setSearchText] = useState('')
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null)
  const [isExportModalVisible, setIsExportModalVisible] = useState(false)

  const {
    data: auditLogs,
    isLoading,
    refetch,
  } = Api.auditLog.findMany.useQuery({
    where: {
      userId: user?.id,
      action: { contains: searchText },
      timestamp: {
        gte: dateRange?.[0]?.toISOString(),
        lte: dateRange?.[1]?.toISOString(),
      },
    },
    include: { user: true },
    orderBy: { timestamp: 'desc' },
  })

  const isAdmin = checkOrganizationRole('admin')

  useEffect(() => {
    if (!isAdmin) {
      enqueueSnackbar('You do not have permission to view this page.', {
        variant: 'error',
      })
      router.push(`/organizations/${params.organizationId}/home`)
    }
  }, [isAdmin, router, params.organizationId])

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
      title: 'User',
      dataIndex: ['user', 'name'],
      key: 'user',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) =>
        dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss'),
    },
  ]

  const handleSearch = (value: string) => {
    setSearchText(value)
    refetch()
  }

  const handleDateRangeChange = (
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
  ) => {
    setDateRange(dates)
    refetch()
  }

  const handleExport = () => {
    setIsExportModalVisible(true)
    // Simulating export process
    setTimeout(() => {
      setIsExportModalVisible(false)
      enqueueSnackbar('Audit logs exported successfully', {
        variant: 'success',
      })
    }, 2000)
  }

  if (!isAdmin) {
    return null
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Audit Logs</Title>
      <Text>
        View and manage detailed logs of user activities within the
        organization.
      </Text>

      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', marginTop: 24 }}
      >
        <Space>
          <Input
            placeholder="Search actions"
            prefix={<SearchOutlined />}
            onChange={e => handleSearch(e.target.value)}
            style={{ width: 200 }}
          />
          <RangePicker onChange={handleDateRangeChange} />
          <Button icon={<ExportOutlined />} onClick={handleExport}>
            Export Logs
          </Button>
          <Button
            icon={<BellOutlined />}
            onClick={() =>
              enqueueSnackbar('Notifications enabled for specific actions', {
                variant: 'info',
              })
            }
          >
            Enable Notifications
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={auditLogs}
          rowKey="id"
          loading={isLoading}
          pagination={{ pageSize: 10 }}
        />
      </Space>

      <Modal
        title="Exporting Audit Logs"
        visible={isExportModalVisible}
        footer={null}
        closable={false}
      >
        <p>Exporting audit logs to external SIEM tools...</p>
      </Modal>
    </PageLayout>
  )
}
