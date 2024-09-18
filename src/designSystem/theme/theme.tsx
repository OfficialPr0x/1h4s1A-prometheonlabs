import { theme } from 'antd'
import { Inter, Roboto } from 'next/font/google'

const interFont = Inter({
  subsets: ['latin'],
})

const robotoFont = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // Modern Vibrant Colors
    colorPrimary: '#3366ff',
    colorError: '#ff4d4f',
    colorInfo: '#1677ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorTextBase: '#2c3e50',
    colorLink: '#3366ff',
    colorBgBase: '#ffffff',
    colorBgContainer: '#f8f9fa',
    colorBorder: '#e0e0e0',
    colorBorderSecondary: '#f0f0f0',
    colorSplit: 'rgba(0, 0, 0, 0.06)',

    // Minimalistic Typography
    fontFamily: `${interFont.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: 16,
    fontSizeHeading1: 36,
    fontSizeHeading2: 28,
    fontSizeHeading3: 22,
    linkDecoration: 'none',

    // Intuitive Form
    controlItemBgActive: '#e8f0fe',
    controlOutline: 'rgba(51, 102, 255, 0.2)',
    controlHeight: 40,
    controlHeightSM: 32,

    // Consistent Spacing
    padding: 20,
    marginXS: 8,
    marginSM: 12,
    margin: 16,
    marginMD: 20,
    marginLG: 24,
    marginXL: 32,

    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    borderRadius: 6,
    lineType: 'solid',
    lineWidth: 1,
    motion: true,
  },
  components: {
    Form: {
      itemMarginBottom: '20px',
    },
    Layout: {
      headerBg: '#ffffff',
      footerBg: '#f8f9fa',
      bodyBg: '#ffffff',
      siderBg: '#ffffff',
    },
    Menu: {
      activeBarBorderWidth: 2,
      itemHeight: 40,
      horizontalItemSelectedColor: '#3366ff',
      horizontalItemSelectedBg: '#e8f0fe',
      itemSelectedColor: '#3366ff',
      itemSelectedBg: '#e8f0fe',
      itemActiveBg: '#e8f0fe',
      itemHoverColor: '#3366ff',
      itemHoverBg: '#f5f7fa',
      itemColor: '#2c3e50',
      itemBg: 'transparent',
      iconMarginInlineEnd: 12,
      iconSize: 18,
    },
    Button: {
      paddingInlineSM: 16,
      colorTextLightSolid: '#ffffff',
      primaryColor: '#3366ff',
      fontWeight: 500,
    },
  },
}


export const ThemeSwitcher = {
  switchTheme: (isDark: boolean) => {
    return isDark ? darkTheme : lightTheme
  },
}

export const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // Modern Vibrant Colors for Dark Mode
    colorPrimary: '#4d7fff',
    colorError: '#ff7875',
    colorInfo: '#69c0ff',
    colorSuccess: '#95de64',
    colorWarning: '#ffc53d',
    colorTextBase: '#f0f0f0',
    colorLink: '#4d7fff',
    colorBgBase: '#121212',
    colorBgContainer: '#1e1e1e',
    colorBorder: '#333333',
    colorBorderSecondary: '#2a2a2a',
    colorSplit: 'rgba(255, 255, 255, 0.12)',

    // Minimalistic Typography
    fontFamily: `${interFont.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial`,
    fontSize: 16,
    fontSizeHeading1: 36,
    fontSizeHeading2: 28,
    fontSizeHeading3: 22,
    linkDecoration: 'none',

    // Intuitive Form
    controlItemBgActive: '#1c3a6e',
    controlOutline: 'rgba(77, 127, 255, 0.2)',
    controlHeight: 40,
    controlHeightSM: 32,

    // Consistent Spacing
    padding: 20,
    marginXS: 8,
    marginSM: 12,
    margin: 16,
    marginMD: 20,
    marginLG: 24,
    marginXL: 32,

    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: 6,
    lineType: 'solid',
    lineWidth: 1,
    motion: true,
  },
  components: {
    Form: {
      itemMarginBottom: '20px',
    },
    Layout: {
      headerBg: '#1e1e1e',
      footerBg: '#121212',
      bodyBg: '#121212',
      siderBg: '#1e1e1e',
    },
    Menu: {
      activeBarBorderWidth: 2,
      itemHeight: 40,
      horizontalItemSelectedColor: '#4d7fff',
      horizontalItemSelectedBg: '#1c3a6e',
      itemSelectedColor: '#4d7fff',
      itemSelectedBg: '#1c3a6e',
      itemActiveBg: '#1c3a6e',
      itemHoverColor: '#4d7fff',
      itemHoverBg: '#2a2a2a',
      itemColor: '#f0f0f0',
      itemBg: 'transparent',
      iconMarginInlineEnd: 12,
      iconSize: 18,
    },
    Button: {
      paddingInlineSM: 16,
      colorTextLightSolid: '#121212',
      primaryColor: '#4d7fff',
      fontWeight: 500,
    },
  },
}


export type Theme = typeof lightTheme

