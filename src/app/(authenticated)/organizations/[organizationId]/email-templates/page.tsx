'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tabs,
  Row,
  Col,
  Card,
} from 'antd'
import {
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ExperimentOutlined,
  HistoryOutlined,
  DragOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { RouterInputs, RouterOutputs } from '@/core/trpc/internal/trpc.client'

import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function EmailTemplatesPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, checkOrganizationRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [previewContent, setPreviewContent] = useState('')
  const [activeTab, setActiveTab] = useState('1')
  const [templateElements, setTemplateElements] = useState([])
  const {
    data: emailTemplates,
    isLoading,
    refetch,
  } = Api.emailTemplate.findMany.useQuery({
    where: { organizationId: params.organizationId },
  })

  const createTemplateMutation = Api.emailTemplate.create.useMutation()
  const updateTemplateMutation = Api.emailTemplate.update.useMutation()
  const deleteTemplateMutation = Api.emailTemplate.delete.useMutation()
  const isAdmin = checkOrganizationRole('admin')

  const handleCreateOrUpdate = async (
    values:
      | RouterInputs['emailTemplate']['create']['data']
      | RouterInputs['emailTemplate']['update']['data'],
  ) => {
    try {
      if (editingTemplate) {
        const result = await updateTemplateMutation.mutateAsync({
          where: { id: editingTemplate.id },
          data: values,
        })
        if (result.data) {
          // Handle the updated data if needed
        }

        enqueueSnackbar('Email template updated successfully', {
          variant: 'success',
        })
      } else {
        const result = await createTemplateMutation.mutateAsync({
          data: {
            ...values,
            organizationId: params.organizationId,
          } as RouterInputs['emailTemplate']['create']['data'],
        })
        if (result.data) {
          // Handle the created data if needed
        }

        enqueueSnackbar('Email template created successfully', {
          variant: 'success',
        })
      }
      setIsModalVisible(false)
      refetch()
    } catch (error) {
      enqueueSnackbar('Error saving email template', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTemplateMutation.mutateAsync({ where: { id } })
      // No need to access .data as it's not returned

      enqueueSnackbar('Email template deleted successfully', {
        variant: 'success',
      })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error deleting email template', { variant: 'error' })
    }
  }

  const handlePreview = (content: string) => {
    setPreviewContent(content)
    setActiveTab('2')
  }

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: any) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handlePreview(record.content)}
          >
            Preview
          </Button>

          {isAdmin && (
            <>
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setEditingTemplate(record)
                  setIsModalVisible(true)
                }}
              >
                Edit
              </Button>
              <Button
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDelete(record.id)}
              >
                Delete
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>
        <MailOutlined /> Email Templates Management
      </Title>
      <Text>
        Create, manage, and test email templates for automated communications.
      </Text>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="Templates" key="1">
          {isAdmin && (
            <Button
              type="primary"
              icon={<MailOutlined />}
              onClick={() => {
                setEditingTemplate(null)
                setIsModalVisible(true)
              }}
              style={{ marginBottom: 16 }}
            >
              Create New Template
            </Button>
          )}

          <Table
            columns={columns}
            dataSource={emailTemplates}
            loading={isLoading}
            rowKey="id"
          />

          <Modal
            title={
              editingTemplate ? 'Edit Email Template' : 'Create Email Template'
            }
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            width={800}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form
                  initialValues={editingTemplate}
                  onFinish={handleCreateOrUpdate}
                  layout="vertical"
                >
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="subject"
                    label="Subject"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="content"
                    label="Content"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea rows={6} />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      {editingTemplate ? 'Update' : 'Create'}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Title level={4}>Template Elements</Title>
                <div>
                  {templateElements.map((element, index) => (
                    <Card key={element.id} style={{ marginBottom: 8 }}>
                      <Text>{element.type}</Text>
                    </Card>
                  ))}
                </div>
              </Col>
            </Row>
          </Modal>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Preview" key="2">
          <div dangerouslySetInnerHTML={{ __html: previewContent }} />
        </Tabs.TabPane>
      </Tabs>
    </PageLayout>
  )
}
