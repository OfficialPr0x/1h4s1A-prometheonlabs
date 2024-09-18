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
  Upload,
  Space,
} from 'antd'
import {
  UploadOutlined,
  FolderOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function FileManagementPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, checkOrganizationRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [files, setFiles] = useState<any[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const { mutateAsync: upload } = useUploadPublic()

  const {
    data: filesData,
    isLoading,
    refetch,
  } = Api.file.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { uploadDate: 'desc' },
  })

  const { mutateAsync: createFile } = Api.file.create.useMutation()
  const { mutateAsync: updateFile } = Api.file.update.useMutation()
  const { mutateAsync: deleteFile } = Api.file.delete.useMutation()

  useEffect(() => {
    if (filesData) {
      setFiles(filesData)
    }
  }, [filesData])

  const handleUpload = async (options: any) => {
    const { file } = options
    try {
      const result = await upload({ file })
      form.setFieldsValue({
        fileUrl: result.url,
        fileSize: file.size,
        fileType: file.type,
      })
    } catch (error) {
      enqueueSnackbar('File upload failed', { variant: 'error' })
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      if (selectedFile) {
        await updateFile({
          where: { id: selectedFile.id },
          data: { ...values, uploadDate: new Date().toISOString() },
        })
        enqueueSnackbar('File updated successfully', { variant: 'success' })
      } else {
        await createFile({
          data: {
            ...values,
            userId: user?.id,
            uploadDate: new Date().toISOString(),
          },
        })
        enqueueSnackbar('File created successfully', { variant: 'success' })
      }
      setIsModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      enqueueSnackbar('Error saving file', { variant: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteFile({ where: { id } })
      enqueueSnackbar('File deleted successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Error deleting file', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'File Name',
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: 'File Type',
      dataIndex: 'fileType',
      key: 'fileType',
    },
    {
      title: 'File Size',
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (size: number) => `${(size / 1024 / 1024).toFixed(2)} MB`,
    },
    {
      title: 'Upload Date',
      dataIndex: 'uploadDate',
      key: 'uploadDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setSelectedFile(record)
              form.setFieldsValue(record)
              setIsModalVisible(true)
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>File Management</Title>
      <Text>
        Upload, view, and manage your files securely stored in AWS S3.
      </Text>

      <Button
        type="primary"
        icon={<UploadOutlined />}
        onClick={() => {
          setSelectedFile(null)
          form.resetFields()
          setIsModalVisible(true)
        }}
        style={{ marginTop: 16, marginBottom: 16 }}
      >
        Upload New File
      </Button>

      <Table
        dataSource={files}
        columns={columns}
        rowKey="id"
        loading={isLoading}
      />

      <Modal
        title={selectedFile ? 'Edit File' : 'Upload New File'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="fileName"
            label="File Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="fileUrl" label="File" rules={[{ required: true }]}>
            <Upload customRequest={handleUpload} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="fileSize" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="fileType" hidden>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {selectedFile ? 'Update' : 'Upload'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
