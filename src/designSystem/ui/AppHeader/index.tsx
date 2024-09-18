import { Logo } from '@/designSystem/layouts/NavigationLayout/components/Logo'
import { Flex, Typography, Avatar, Badge, Dropdown, Spin } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import dayjs from 'dayjs'

const { Text, Title } = Typography

type Props = {
  title?: string
  description?: string
}

export const AppHeader: React.FC<Props> = ({
  title = 'Prometheon Labs',
  description,
}) => {
  const { user, organization } = useUserContext()
  const [greeting, setGreeting] = useState('')

  const {
    data: notifications,
    isLoading,
    error,
  } = Api.notifications.findMany.useQuery(
    { where: { userId: user?.id, read: false }, take: 5 },
    { enabled: !!user },
  )

  useEffect(() => {
    const hour = dayjs().hour()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  const notificationItems =
    notifications?.map((notification, index) => ({
      key: index,
      label: <span>{notification.message}</span>,
    })) || []

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{ padding: '16px', backgroundColor: '#f0f2f5' }}
    >
      <Flex align="center" gap={16}>
        <Logo height="50" />
        <Title level={4} style={{ margin: 0 }}>
          {title}
        </Title>
      </Flex>

      <Flex align="center" gap={16}>
        {user && <Text>{`${greeting}, ${user.name}`}</Text>}
        {isLoading ? (
          <Spin size="small" />
        ) : error ? (
          <Text type="danger">Error loading notifications</Text>
        ) : (
          <Dropdown menu={{ items: notificationItems }} placement="bottomRight">
            <Badge count={notifications?.length || 0}>
              <Avatar icon={<BellOutlined />} />
            </Badge>
          </Dropdown>
        )}
        <Avatar src={organization?.pictureUrl} alt={organization?.name}>
          {organization?.name?.[0]}
        </Avatar>
      </Flex>
    </Flex>
  )
}
