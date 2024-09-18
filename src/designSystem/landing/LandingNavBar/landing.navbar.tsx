'use client'

import { useDesignSystem } from '@/designSystem/provider'
import { LandingDesktopNavbar } from './landing.desktop.navbar'
import { LandingMobileNavbar } from './landing.mobile.navbar'
import { useState, useEffect } from 'react'

interface Props {
  navItems: {
    link: string
    title: string
    target?: '_blank'
  }[]
}

export const LandingNavBar: React.FC<Props> = ({ navItems }) => {
  const { isMobile } = useDesignSystem()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={`max-w-7xl fixed top-0 left-0 right-0 mx-auto z-50 w-[95%] lg:w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
    >
      <div className="hidden lg:block w-full">
        {!isMobile && (
          <LandingDesktopNavbar navItems={navItems} isScrolled={isScrolled} />
        )}
      </div>
      <div className="flex h-full w-full items-center">
        {isMobile && (
          <LandingMobileNavbar navItems={navItems} isScrolled={isScrolled} />
        )}
      </div>
    </div>
  )
}
