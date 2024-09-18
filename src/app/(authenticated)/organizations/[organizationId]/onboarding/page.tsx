'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Steps,
  Button,
  Card,
  Progress,
  List,
  Input,
  Form,
  Tooltip,
} from 'antd'
import {
  UserOutlined,
  BookOutlined,
  CheckCircleOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function UserOnboardingPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization, checkOrganizationRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [currentStep, setCurrentStep] = useState(0)
  const [onboardingProgress, setOnboardingProgress] = useState(0)
  const [customSteps, setCustomSteps] = useState<string[]>([])
  const [isAdmin, setIsAdmin] = useState(false)

  const {
    data: onboardingData,
    isLoading,
    refetch,
  } = Api.aiResponse.findFirst.useQuery({
    where: { userId: user?.id, query: 'onboarding_progress' },
  })

  const { mutateAsync: updateOnboarding } = Api.aiResponse.update.useMutation()
  const { mutateAsync: createOnboarding } = Api.aiResponse.create.useMutation()

  useEffect(() => {
    if (onboardingData) {
      const parsedData = JSON.parse(onboardingData.response)
      setCurrentStep(parsedData.currentStep)
      setOnboardingProgress(parsedData.progress)
      setCustomSteps(parsedData.customSteps || [])
    }
    setIsAdmin(checkOrganizationRole('admin'))
  }, [onboardingData, checkOrganizationRole])

  const defaultSteps = [
    'Welcome to the platform',
    'Set up your profile',
    'Explore key features',
    'Complete onboarding quiz',
  ]

  const steps = customSteps.length > 0 ? customSteps : defaultSteps

  const handleNext = async () => {
    const newStep = currentStep + 1
    const newProgress = Math.min(100, ((newStep + 1) / steps.length) * 100)

    const updatedData = {
      currentStep: newStep,
      progress: newProgress,
      customSteps: customSteps,
    }

    try {
      if (onboardingData) {
        await updateOnboarding({
          where: { id: onboardingData.id },
          data: { response: JSON.stringify(updatedData) },
        })
      } else {
        await createOnboarding({
          data: {
            userId: user?.id || '',
            query: 'onboarding_progress',
            response: JSON.stringify(updatedData),
          },
        })
      }
      setCurrentStep(newStep)
      setOnboardingProgress(newProgress)
      refetch()
      enqueueSnackbar('Progress saved successfully', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Failed to save progress', { variant: 'error' })
    }
  }

  const handleCustomizeSteps = async (newSteps: string[]) => {
    setCustomSteps(newSteps)
    try {
      if (onboardingData) {
        await updateOnboarding({
          where: { id: onboardingData.id },
          data: {
            response: JSON.stringify({
              ...JSON.parse(onboardingData.response),
              customSteps: newSteps,
            }),
          },
        })
      } else {
        await createOnboarding({
          data: {
            userId: user?.id || '',
            query: 'onboarding_progress',
            response: JSON.stringify({
              currentStep: 0,
              progress: 0,
              customSteps: newSteps,
            }),
          },
        })
      }
      refetch()
      enqueueSnackbar('Onboarding steps customized successfully', {
        variant: 'success',
      })
    } catch (error) {
      enqueueSnackbar('Failed to customize onboarding steps', {
        variant: 'error',
      })
    }
  }

  if (isLoading) {
    return (
      <PageLayout layout="narrow">
        <Text>Loading...</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>User Onboarding</Title>
      <Paragraph>
        <Text strong>Welcome, {user?.name || 'New User'}! </Text>
        <Text>
          We're excited to guide you through your personalized onboarding
          experience.
        </Text>
      </Paragraph>

      <Card style={{ marginTop: 20, marginBottom: 20 }}>
        <Progress percent={onboardingProgress} status="active" />
        <Steps
          current={currentStep}
          items={steps.map((step, index) => ({
            title: `Step ${index + 1}`,
            description: step,
          }))}
        />
      </Card>

      <Card
        title={
          <span>
            {steps[currentStep]}
            <Tooltip title="This step is crucial for your onboarding. Take your time to complete it thoroughly.">
              <InfoCircleOutlined style={{ marginLeft: 8 }} />
            </Tooltip>
          </span>
        }
        extra={<UserOutlined />}
      >
        <Text>Complete this step to progress in your onboarding journey.</Text>
        <br />
        <br />
        <Tooltip
          title={
            currentStep === steps.length - 1
              ? 'Congratulations on completing your onboarding!'
              : 'Move to the next step in your journey'
          }
        >
          <Button
            type="primary"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next Step'}
          </Button>
        </Tooltip>
      </Card>

      {isAdmin && (
        <Card
          title="Customize Onboarding"
          extra={<EditOutlined />}
          style={{ marginTop: 20 }}
        >
          <Form
            onFinish={values => handleCustomizeSteps(values.steps)}
            initialValues={{
              steps: customSteps.length > 0 ? customSteps : defaultSteps,
            }}
          >
            <Form.List name="steps">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              'Please input step description or delete this field.',
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="Step description"
                          style={{ width: '60%' }}
                        />
                      </Form.Item>
                      {fields.length > 1 && (
                        <Button type="link" onClick={() => remove(field.name)}>
                          Delete
                        </Button>
                      )}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Add Step
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Custom Steps
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}

      <Card
        title="Onboarding Resources"
        extra={<BookOutlined />}
        style={{ marginTop: 20 }}
      >
        <List
          itemLayout="horizontal"
          dataSource={[
            {
              title: 'User Guide',
              description: 'Comprehensive guide to using the platform',
              tooltip: 'Dive deep into all features and functionalities',
            },
            {
              title: 'Video Tutorials',
              description: 'Step-by-step video instructions',
              tooltip: 'Visual learners will love these detailed walkthroughs',
            },
            {
              title: 'FAQ',
              description: 'Frequently asked questions and answers',
              tooltip: 'Quick answers to common queries',
            },
          ]}
          renderItem={item => (
            <Tooltip title={item.tooltip}>
              <List.Item>
                <List.Item.Meta
                  avatar={<CheckCircleOutlined />}
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            </Tooltip>
          )}
        />
      </Card>
    </PageLayout>
  )
}
