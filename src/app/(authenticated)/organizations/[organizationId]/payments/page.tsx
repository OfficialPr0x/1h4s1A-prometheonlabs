'use client'

import {
  Typography,
  Table,
  Button,
  DatePicker,
  Space,
  Modal,
  Form,
  Input,
  Select,
} from 'antd'
import {
  CreditCardOutlined,
  DollarOutlined,
  HistoryOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function PaymentsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user, organization, checkOrganizationRole } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null,
  )
  const [serviceFilter, setServiceFilter] = useState<string | null>(null)
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false)
  const [isSubscriptionModalVisible, setIsSubscriptionModalVisible] =
    useState(false)

  const {
    data: payments,
    isLoading: paymentsLoading,
    refetch: refetchPayments,
  } = Api.payment.findMany.useQuery({
    where: {
      userId: user?.id,
      paymentDate: dateRange
        ? {
            gte: dateRange[0].toISOString(),
            lte: dateRange[1].toISOString(),
          }
        : undefined,
    },
    orderBy: { paymentDate: 'desc' },
  })

  const {
    data: subscriptions,
    isLoading: subscriptionsLoading,
    refetch: refetchSubscriptions,
  } = Api.subscription.findMany.useQuery({
    where: { userId: user?.id },
  })

  const { mutateAsync: createPayment } = Api.payment.create.useMutation()
  const { mutateAsync: createSubscription } =
    Api.subscription.create.useMutation()

  const handlePayment = async (values: any) => {
    try {
      await createPayment({
        data: {
          amount: parseFloat(values.amount),
          currency: values.currency,
          status: 'completed',
          paymentDate: new Date().toISOString(),
          userId: user?.id as string,
        },
      })
      enqueueSnackbar('Payment initiated successfully', { variant: 'success' })
      refetchPayments()
      setIsPaymentModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to initiate payment', { variant: 'error' })
    }
  }

  const handleSubscription = async (values: any) => {
    try {
      await createSubscription({
        data: {
          planName: values.planName,
          startDate: new Date().toISOString(),
          endDate: dayjs().add(1, 'year').toISOString(),
          status: 'active',
          userId: user?.id as string,
        },
      })
      enqueueSnackbar('Subscription set up successfully', {
        variant: 'success',
      })
      refetchSubscriptions()
      setIsSubscriptionModalVisible(false)
    } catch (error) {
      enqueueSnackbar('Failed to set up subscription', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number, record: any) =>
        `${amount.toFixed(2)} ${record.currency}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ]

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Payments and Subscriptions</Title>
      <Text>
        Manage your organization's payment methods, view payment history, and
        set up subscriptions.
      </Text>

      <Space
        direction="vertical"
        size="large"
        style={{ width: '100%', marginTop: 24 }}
      >
        <Space>
          <Button
            icon={<CreditCardOutlined />}
            onClick={() => setIsPaymentModalVisible(true)}
          >
            Initiate Payment
          </Button>
          {checkOrganizationRole('admin') && (
            <Button
              icon={<SettingOutlined />}
              onClick={() => setIsSubscriptionModalVisible(true)}
            >
              Manage Subscriptions
            </Button>
          )}
        </Space>

        <Title level={4}>
          <HistoryOutlined /> Payment History
        </Title>
        <Space>
          <RangePicker
            onChange={dates =>
              setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
            }
          />
          <Select
            style={{ width: 200 }}
            placeholder="Filter by service"
            allowClear
            onChange={value => setServiceFilter(value)}
          >
            <Select.Option value="subscription">Subscription</Select.Option>
            <Select.Option value="oneTime">One-time Payment</Select.Option>
          </Select>
        </Space>

        <Table
          columns={columns}
          dataSource={payments}
          loading={paymentsLoading}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Space>

      <Modal
        title="Initiate Payment"
        visible={isPaymentModalVisible}
        onCancel={() => setIsPaymentModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handlePayment} layout="vertical">
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <Input prefix={<DollarOutlined />} type="number" step="0.01" />
          </Form.Item>
          <Form.Item
            name="currency"
            label="Currency"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="USD">USD</Select.Option>
              <Select.Option value="EUR">EUR</Select.Option>
              <Select.Option value="GBP">GBP</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Pay Now
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Manage Subscriptions"
        visible={isSubscriptionModalVisible}
        onCancel={() => setIsSubscriptionModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleSubscription} layout="vertical">
          <Form.Item
            name="planName"
            label="Subscription Plan"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="basic">Basic Plan</Select.Option>
              <Select.Option value="premium">Premium Plan</Select.Option>
              <Select.Option value="enterprise">Enterprise Plan</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Set Up Subscription
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PageLayout>
  )
}
