'use client'

import { ConfigProvider } from 'antd'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import { MrbHtml, MrbMain } from './core'
import { Snackbar } from './providers/snackbar'
import './style/main.scss'
import { Theme } from './theme/theme'

export type DesignSystemContext = {
  isMobile: boolean
  isKeyboardUser: boolean
}

const DesignSystemContext = createContext<DesignSystemContext>({
  isMobile: false,
  isKeyboardUser: false,
})

export const useDesignSystem = (): DesignSystemContext => {
  return useContext(DesignSystemContext)
}

const ProviderGeneral = ({ children }) => {
  const [isMobile, setMobile] = useState(false)
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)

  const isWindow = typeof window !== 'undefined'

  const defaultTheme = {
    token: {
      colorPrimary: '#0056b3',
      colorTextBase: '#333333',
    },
  }

  const theme = Theme
    ? {
        ...Theme,
        token: {
          ...(Theme.token || {}),
          colorPrimary: '#0056b3', // Adjusted for better contrast
          colorTextBase: '#333333', // Darker text for better readability
        },
      }
    : defaultTheme

  useEffect(() => {
    if (!isWindow) {
      return
    }

    setMobile(window.innerWidth < 992)

    const handleResize = () => {
      setMobile(window.innerWidth < 992)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setIsKeyboardUser(true)
      }
    }

    const handleMouseDown = () => {
      setIsKeyboardUser(false)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)

    return () => {
      if (!isWindow) {
        return
      }

      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  return (
    <ConfigProvider theme={theme}>
      <DesignSystemContext.Provider value={{ isMobile, isKeyboardUser }}>
        {children}
      </DesignSystemContext.Provider>
    </ConfigProvider>
  )
}

// Error boundary component
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const errorHandler = error => {
      console.error('DesignSystemProvider error:', error)
      setHasError(true)
    }

    window.addEventListener('error', errorHandler)
    return () => window.removeEventListener('error', errorHandler)
  }, [])

  if (hasError) {
    return <div>Something went wrong. Please try refreshing the page.</div>
  }

  return children
}

type Props = {
  children: ReactNode
}

export const DesignSystemProvider: React.FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ProviderGeneral>
        <MrbHtml>
          <MrbMain>
            <Snackbar.Provider>{children}</Snackbar.Provider>
          </MrbMain>
        </MrbHtml>
      </ProviderGeneral>
    </ErrorBoundary>
  )
}
