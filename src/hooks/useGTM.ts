// hooks/useGTM.ts
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useGTM = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'pageview',
        page: pathname,
      })
    }
  }, [pathname, searchParams])
}