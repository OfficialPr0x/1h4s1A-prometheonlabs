'use client'

import { useState, useCallback } from 'react'
import { Typography, Card, Space, Button, Input, message } from 'antd'
import { PlusOutlined, CodeOutlined } from '@ant-design/icons'
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

const { Title, Text } = Typography

interface Widget {
  id: string
  type: string
  content: string
}

export default function PlaygroundPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [widgets, setWidgets] = useState<Widget[]>([])
  const [newWidgetType, setNewWidgetType] = useState('')

  const { mutateAsync: generateText } = Api.ai.generateText.useMutation()

  const addWidget = useCallback(() => {
    if (!newWidgetType) {
      message.error('Please enter a widget type')
      return
    }
    const newWidget: Widget = {
      id: Date.now().toString(),
      type: newWidgetType,
      content: `New ${newWidgetType} Widget`,
    }
    setWidgets(prevWidgets => [...prevWidgets, newWidget])
    setNewWidgetType('')
  }, [newWidgetType])

  const updateWidgetContent = useCallback((id: string, content: string) => {
    setWidgets(prevWidgets =>
      prevWidgets.map(widget =>
        widget.id === id ? { ...widget, content } : widget,
      ),
    )
  }, [])

  const generateWidgetContent = useCallback(
    async (id: string) => {
      const widget = widgets.find(w => w.id === id)
      if (!widget) return

      try {
        const response = await generateText({
          prompt: `Generate content for a ${widget.type} widget`,
        })
        updateWidgetContent(id, response.answer)
        enqueueSnackbar('Widget content generated successfully', {
          variant: 'success',
        })
      } catch (error) {
        enqueueSnackbar('Failed to generate widget content', {
          variant: 'error',
        })
      }
    },
    [widgets, generateText, updateWidgetContent, enqueueSnackbar],
  )

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Project Canvas Editor</Title>
        <Text>
          Create and manipulate widgets and plugins for your project canvas.
        </Text>

        <Card title="Add New Widget">
          <Space>
            <Input
              placeholder="Enter widget type"
              value={newWidgetType}
              onChange={e => setNewWidgetType(e.target.value)}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={addWidget}>
              Add Widget
            </Button>
          </Space>
        </Card>

        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {widgets.map(widget => (
            <Card key={widget.id} title={`${widget.type} Widget`}>
              <Input.TextArea
                value={widget.content}
                onChange={e => updateWidgetContent(widget.id, e.target.value)}
                rows={4}
              />
              <Button
                icon={<CodeOutlined />}
                onClick={() => generateWidgetContent(widget.id)}
                style={{ marginTop: '8px' }}
              >
                Generate Content
              </Button>
            </Card>
          ))}
        </Space>
      </Space>
    </PageLayout>
  )
}
