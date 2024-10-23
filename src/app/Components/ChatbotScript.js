'use client'

import { useEffect } from 'react'

const ChatbotScript = () => {
  useEffect(() => {
    // Load Botpress webchat script
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v2.1/inject.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      // Load and initialize Botpress config
      const configScript = document.createElement('script')
      configScript.src = 'https://mediafiles.botpress.cloud/5c0e4815-efd1-45d6-bca1-471ce059559e/webchat/v2.1/config.js'
      configScript.async = true
      document.body.appendChild(configScript)
    }

    return () => {
      // Clean up scripts when component unmounts
      document.body.removeChild(script)
      const configScript = document.querySelector('script[src="https://mediafiles.botpress.cloud/5c0e4815-efd1-45d6-bca1-471ce059559e/webchat/v2.1/config.js"]')
      if (configScript) {
        document.body.removeChild(configScript)
      }
    }
  }, [])

  return null
}

export default ChatbotScript
