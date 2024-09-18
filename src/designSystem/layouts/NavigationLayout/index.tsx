import { useUserContext } from '@/core/context'
import { Col, Layout, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { useDesignSystem } from '../../provider'
import { Leftbar } from './components/Leftbar'
import { Topbar } from './components/Topbar'

import { OrganizationSelect } from './components/OrganizationSelect'

interface Props {
  children: ReactNode
}

export const NavigationLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const { organization, authenticationStatus: isLoggedIn } = useUserContext()

  const { isMobile } = useDesignSystem()

  const goTo = (url: string) => {
    router.push(url)
  }

  const itemsOrganization = [
    {
      key: '/organizations/:organizationId/home',
      label: 'App Home',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/home'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/ai-chat',
      label: 'AI Chat',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/ai-chat'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/files',
      label: 'File Management',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/files'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/payments',
      label: 'Payments',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/payments'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/users',
      label: 'User Management',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/users'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/reports',
      label: 'Reports',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/reports'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/compliance',
      label: 'Compliance Center',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/compliance'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/api-docs',
      label: 'API Documentation',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/api-docs'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/system-status',
      label: 'System Status',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/system-status'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/mfa-setup',
      label: 'Multi-Factor Authentication Setup',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/mfa-setup'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/audit-logs',
      label: 'Audit Logs',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/audit-logs'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/email-templates',
      label: 'Email Templates',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/email-templates'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/performance',
      label: 'Performance Metrics',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/performance'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/onboarding',
      label: 'User Onboarding',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/onboarding'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },

    {
      key: '/organizations/:organizationId/pricing',
      label: 'Pricing',
      onClick: () =>
        goTo(
          '/organizations/:organizationId/pricing'.replace(
            ':organizationId',
            organization.id,
          ),
        ),
    },
  ].filter(_ => !!organization)

  const itemsLeftbar = []

  const itemsTopbar = [
    {
      key: '/home',
      label: 'Home',
      onClick: () => goTo('/home'),
    },

    ...itemsOrganization,
  ]

  const itemsLeftbarBottom = []

  const itemsMobile = [
    {
      key: '/profile',
      label: 'Profile',
      onClick: () => goTo('/profile'),
    },
    ...itemsTopbar,
    ...itemsLeftbar,
    ...itemsLeftbarBottom,
  ]

  const isLeftbar = itemsLeftbar.length > 0 && !isMobile

  return (
    <>
      <Layout>
        <Row
          style={{
            height: '100vh',
            width: '100vw',
          }}
        >
          {isLeftbar && (
            <Col>
              <Leftbar
                header={<OrganizationSelect />}
                items={itemsLeftbar}
                itemsBottom={itemsLeftbarBottom}
              />
            </Col>
          )}

          <Col
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Topbar
              isMobile={isMobile}
              itemsMobile={itemsMobile}
              isLoggedIn={isLoggedIn === 'authenticated'}
              items={itemsTopbar}
              header={!isLeftbar && <OrganizationSelect />}
            />

            <Col
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {children}
            </Col>
          </Col>
        </Row>
      </Layout>
    </>
  )
}
