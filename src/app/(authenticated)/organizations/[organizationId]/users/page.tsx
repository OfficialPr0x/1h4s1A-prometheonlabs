'use client'

import { Prisma } from '@prisma/client'
import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Card,
  Row,
  Col,
  Checkbox,
  Tooltip,
} from 'antd'
import {
  UserOutlined,
  LockOutlined,
  HistoryOutlined,
  SearchOutlined,
  FilterOutlined,
} from '@ant-design/icons'
import { useState, useEffect, ReactNode } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function UserManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, checkOrganizationRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Prisma.UserGetPayload<{
    include: { organizationRoles: true; auditLogs: true }
  }> | null>(null)
  const [form] = Form.useForm()
  const [searchText, setSearchText] = useState('')
  const [filterRole, setFilterRole] = useState<string | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const {
    data: users,
    isLoading,
    refetch,
  } = Api.user.findMany.useQuery({
    where: {
      organizationRoles: { some: { organizationId: params.organizationId } },
      OR: [
        { name: { contains: searchText, mode: 'insensitive' } },
        { email: { contains: searchText, mode: 'insensitive' } },
      ],
      ...(filterRole && { organizationRoles: { some: { name: filterRole } } }),
    },
    include: { organizationRoles: true, auditLogs: true },
  })

  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: bulkUpdateUsers } = Api.user.bulkUpdate.useMutation()

  const isAdmin = checkOrganizationRole('admin')

  useEffect(() => {
    refetch()
  }, [searchText, filterRole])

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateUser({
        where: { id: userId },
        data: {
          organizationRoles: {
            updateMany: {
              where: { organizationId: params.organizationId },
              data: { name: newRole },
            },
          },
        },
      })
      enqueueSnackbar('User role updated successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to update user role', { variant: 'error' })
    }
  }

  const showUserDetails = (
    user: Prisma.UserGetPayload<{
      include: { organizationRoles: true; auditLogs: true }
    }>,
  ) => {
    setSelectedUser(user)
    setIsModalVisible(true)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      await updateUser({
        where: { id: selectedUser!.id },
        data: values,
      })
      enqueueSnackbar('User details updated successfully', {
        variant: 'success',
      })
      setIsModalVisible(false)
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to update user details', { variant: 'error' })
    }
  }

  const handleBulkAction = async (action: string) => {
    try {
      await bulkUpdateUsers({
        userIds: selectedUsers,
        action,
        organizationId: params.organizationId,
      })
      enqueueSnackbar(`Bulk action "${action}" completed successfully`, {
        variant: 'success',
      })
      setSelectedUsers([])
      refetch()
    } catch (error) {
      enqueueSnackbar(`Failed to perform bulk action "${action}"`, {
        variant: 'error',
      })
    }
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'organizationRoles',
      key: 'role',
      render: (roles: any[]) => {
        const role = roles.find(r => r.organizationId === params.organizationId)
        return isAdmin ? (
          <Select
            defaultValue={role?.name}
            onChange={value => handleRoleChange(role.userId, value)}
            style={{ width: 120 }}
          >
            <Select.Option value="admin">Admin</Select.Option>
            <Select.Option value="member">Member</Select.Option>
          </Select>
        ) : (
          role?.name
        )
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (
        text: string,
        record: Prisma.UserGetPayload<{
          include: { organizationRoles: true; auditLogs: true }
        }>,
      ) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              icon={<UserOutlined />}
              onClick={() => showUserDetails(record)}
            />
          </Tooltip>
          {isAdmin && (
            <Tooltip title="Manage Permissions">
              <Button
                icon={<LockOutlined />}
                onClick={() =>
                  router.push(
                    `/organizations/${params.organizationId}/users/${record.id}/permissions`,
                  )
                }
              />
            </Tooltip>
          )}
          <Tooltip title="View Activity">
            <Button
              icon={<HistoryOutlined />}
              onClick={() =>
                router.push(
                  `/organizations/${params.organizationId}/users/${record.id}/activity`,
                )
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col span={12}>
            <Title level={2}>User Management</Title>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Space>
              <Input
                placeholder="Search users"
                prefix={<SearchOutlined />}
                onChange={e => setSearchText(e.target.value)}
              />
              <Select
                placeholder="Filter by role"
                style={{ width: 150 }}
                allowClear
                onChange={value => setFilterRole(value)}
              >
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="member">Member</Select.Option>
              </Select>
            </Space>
          </Col>
        </Row>

        <Table
          rowSelection={{
            type: 'checkbox',
            onChange: selectedRowKeys =>
              setSelectedUsers(selectedRowKeys as string[]),
          }}
          dataSource={users}
          columns={columns}
          loading={isLoading}
          rowKey="id"
          style={{ marginTop: 20 }}
        />

        {selectedUsers.length > 0 && (
          <Card style={{ marginTop: 16 }}>
            <Space>
              <Text strong>{'Bulk Actions:'}</Text>

              <Button onClick={() => handleBulkAction('activate')}>
                Activate
              </Button>
              <Button onClick={() => handleBulkAction('deactivate')}>
                Deactivate
              </Button>
              <Button onClick={() => handleBulkAction('delete')}>Delete</Button>
            </Space>
          </Card>
        )}
      </Card>

      <Modal
        title="User Details"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        {selectedUser && (
          <Form form={form} initialValues={selectedUser} layout="vertical">
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Select>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            </Form.Item>
            <Title level={4}>Recent Activity</Title>
            {selectedUser.auditLogs?.slice(0, 5).map(log => (
              <Text key={log.id}>
                {dayjs(log.timestamp).format('YYYY-MM-DD HH:mm')} - {log.action}
              </Text>
            ))}
          </Form>
        )}
      </Modal>
    </PageLayout>
  )
}
