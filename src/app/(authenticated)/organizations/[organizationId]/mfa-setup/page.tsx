'use client'

import { useState, useEffect } from 'react'
import {
  Typography,
  Card,
  Button,
  Radio,
  Space,
  Spin,
  Modal,
  Input,
} from 'antd'
import {
  SecurityScanOutlined,
  MobileOutlined,
  KeyOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem/layouts/Page.layout'

export default function MultiFactorAuthenticationSetupPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [mfaType, setMfaType] = useState<string>('sms')
  const [mfaEnabled, setMfaEnabled] = useState<boolean>(false)
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [showBackupCodes, setShowBackupCodes] = useState<boolean>(false)

  const {
    data: mfaConfig,
    isLoading: isMfaLoading,
    refetch: refetchMfa,
  } = Api.mfaConfig.findFirst.useQuery({
    where: { userId: user?.id },
  })

  const { mutateAsync: createMfa } = Api.mfaConfig.create.useMutation()
  const { mutateAsync: updateMfa } = Api.mfaConfig.update.useMutation()

  useEffect(() => {
    if (mfaConfig) {
      setMfaEnabled(mfaConfig.isEnabled)
      setMfaType(mfaConfig.type)
    }
  }, [mfaConfig])

  const handleMfaToggle = async () => {
    try {
      if (mfaConfig) {
        await updateMfa({
          where: { id: mfaConfig.id },
          data: { isEnabled: !mfaEnabled },
        })
      } else {
        await createMfa({
          data: {
            isEnabled: true,
            type: mfaType,
            secret: generateSecret(),
            userId: user?.id || '',
          },
        })
      }
      await refetchMfa()
      enqueueSnackbar(
        `MFA ${mfaEnabled ? 'disabled' : 'enabled'} successfully`,
        { variant: 'success' },
      )
    } catch (error) {
      enqueueSnackbar('Failed to update MFA settings', { variant: 'error' })
    }
  }

  const handleMfaTypeChange = async (e: any) => {
    const newType = e.target.value
    setMfaType(newType)
    if (mfaConfig) {
      try {
        await updateMfa({
          where: { id: mfaConfig.id },
          data: { type: newType },
        })
        await refetchMfa()
        enqueueSnackbar('MFA type updated successfully', { variant: 'success' })
      } catch (error) {
        enqueueSnackbar('Failed to update MFA type', { variant: 'error' })
      }
    }
  }

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 10 }, () =>
      Math.random().toString(36).substr(2, 8),
    )
    setBackupCodes(codes)
    setShowBackupCodes(true)
  }

  const generateSecret = () => {
    return Math.random().toString(36).substr(2, 16)
  }

  if (isMfaLoading) {
    return (
      <PageLayout layout="narrow">
        <Spin size="large" />
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="narrow">
      <Card>
        <Title level={2}>
          <SecurityScanOutlined /> Multi-Factor Authentication Setup
        </Title>
        <Paragraph>
          Enhance the security of your account by setting up multi-factor
          authentication (MFA).
        </Paragraph>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text strong>Enable MFA:</Text>
            <Button
              type={mfaEnabled ? 'primary' : 'default'}
              onClick={handleMfaToggle}
              style={{ marginLeft: 16 }}
            >
              {mfaEnabled ? 'Disable MFA' : 'Enable MFA'}
            </Button>
          </div>

          {mfaEnabled && (
            <>
              <div>
                <Text strong>Choose MFA Method:</Text>
                <Radio.Group
                  onChange={handleMfaTypeChange}
                  value={mfaType}
                  style={{ marginLeft: 16 }}
                >
                  <Radio value="sms">
                    <MobileOutlined /> SMS
                  </Radio>
                  <Radio value="authenticator">
                    <KeyOutlined /> Authenticator App
                  </Radio>
                </Radio.Group>
              </div>

              <div>
                <Text strong>Generate Backup Codes:</Text>
                <Button
                  onClick={generateBackupCodes}
                  style={{ marginLeft: 16 }}
                >
                  Generate Codes
                </Button>
              </div>
            </>
          )}
        </Space>
      </Card>

      <Modal
        title="Backup Codes"
        visible={showBackupCodes}
        onOk={() => setShowBackupCodes(false)}
        onCancel={() => setShowBackupCodes(false)}
      >
        <Paragraph>
          Please store these backup codes in a safe place. You can use them to
          access your account if you lose access to your primary MFA method.
        </Paragraph>
        {backupCodes.map((code, index) => (
          <Input
            key={index}
            value={code}
            readOnly
            style={{ marginBottom: 8 }}
          />
        ))}
      </Modal>
    </PageLayout>
  )
}
