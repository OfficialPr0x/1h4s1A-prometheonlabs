'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Typography,
  Input,
  Button,
  List,
  Card,
  Space,
  Spin,
  Upload,
} from 'antd'
import {
  SendOutlined,
  SaveOutlined,
  UploadOutlined,
  RobotOutlined,
  UserOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function AIChatPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    data: aiResponses,
    isLoading: isLoadingResponses,
    refetch,
  } = Api.aiResponse.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { dateCreated: 'desc' },
  })

  const { mutateAsync: generateText } = Api.ai.generateText.useMutation()
  const { mutateAsync: createAiResponse } = Api.aiResponse.create.useMutation()
  const { mutateAsync: uploadFile } = Api.rag.loadFile.useMutation()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessages = [...messages, { role: 'user', content: inputMessage }]
    setMessages(newMessages)
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await generateText({ prompt: inputMessage })
      const aiMessage = { role: 'assistant', content: response.answer }
      setMessages([...newMessages, aiMessage])

      await createAiResponse({
        data: {
          query: inputMessage,
          response: response.answer,
          userId: user?.id || '',
        },
      })

      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to generate response', { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveConversation = async () => {
    try {
      const conversation = messages
        .map(m => `${m.role}: ${m.content}`)
        .join('\n')
      await createAiResponse({
        data: {
          query: 'Saved Conversation',
          response: conversation,
          userId: user?.id || '',
        },
      })
      enqueueSnackbar('Conversation saved successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to save conversation', { variant: 'error' })
    }
  }

  const handleFileUpload = async (info: any) => {
    if (info.file.status === 'done') {
      try {
        const { key } = await uploadFile({ url: info.file.response.url })
        enqueueSnackbar('File uploaded and integrated successfully', {
          variant: 'success',
        })
        setMessages([
          ...messages,
          { role: 'system', content: `File integrated with key: ${key}` },
        ])
      } catch (error) {
        enqueueSnackbar('Failed to integrate file', { variant: 'error' })
      }
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>AI Chatbot</Title>
      <Paragraph>
        Interact with our intelligent AI chatbot to get real-time responses to
        your queries.
      </Paragraph>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <List
            dataSource={messages}
            renderItem={item => (
              <List.Item>
                <Space>
                  {item.role === 'user' ? <UserOutlined /> : <RobotOutlined />}
                  <Text strong>{item.role === 'user' ? 'You' : 'AI'}:</Text>
                  <Text>{item.content}</Text>
                </Space>
              </List.Item>
            )}
          />
          <div ref={messagesEndRef} />
          {isLoading && <Spin />}
        </Card>

        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onPressEnter={handleSendMessage}
            placeholder="Type your message here..."
          />
          <Button
            type="primary"
            onClick={handleSendMessage}
            icon={<SendOutlined />}
          >
            Send
          </Button>
        </Space.Compact>

        <Space>
          <Button onClick={handleSaveConversation} icon={<SaveOutlined />}>
            Save Conversation
          </Button>
          <Upload
            action="/api/upload"
            onChange={handleFileUpload}
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Upload Knowledge Base</Button>
          </Upload>
        </Space>

        <Card title="Chat History">
          <List
            dataSource={aiResponses}
            renderItem={item => (
              <List.Item>
                <Space direction="vertical">
                  <Text strong>{item.query}</Text>
                  <Text>{item.response}</Text>
                  <Text type="secondary">
                    {dayjs(item.dateCreated).format('YYYY-MM-DD HH:mm:ss')}
                  </Text>
                </Space>
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </PageLayout>
  )
}
