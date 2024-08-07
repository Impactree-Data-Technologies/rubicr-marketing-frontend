'use client'
import { useEffect, useState } from 'react'
import Script from 'next/script'

export function BotpressChat() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  useEffect(() => {
    if (isScriptLoaded && typeof window !== 'undefined' && (window as any).botpressWebChat) {
      (window as any).botpressWebChat.init({
        "botId": "76676afb-ba27-4537-90e9-78a9f22e7615",
        "clientId": "76676afb-ba27-4537-90e9-78a9f22e7615",
        "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
        "extrStylesheet" : "/globals.css",
        "messagingUrl": "https://messaging.botpress.cloud",
        "composerPlaceholder": "Chat with bot",
        "botConversationDescription": "This chatbot is here to help",
        "showPoweredBy": true,
        "theme": "prism",
        "themeColor": "#2563eb",
        "useSessionStorage": true,
        "enableConversationDeletion": true,
        "showConversationsButton": true,
        "enableTranscriptDownload": false,
        "className": "webchatIframe",
        "containerWidth": "400px",
        "layoutWidth": "400px",
        "hideWidget": false,
        "disableAnimations": false,
        "closeOnEscape": false,
        "stylesheet": 'https://webchat-styler-css.botpress.app/prod/code/3deea02e-6255-4386-9042-7c68fba5e537/v3/styled-webchat.css'
      });
    }
  }, [isScriptLoaded])

  return (
    <>
      <Script
        src="https://cdn.botpress.cloud/webchat/v1/inject.js"
        onLoad={() => setIsScriptLoaded(true)}
      />
      <Script
        src="https://mediafiles.botpress.cloud/76676afb-ba27-4537-90e9-78a9f22e7615/webchat/config.js"
        onLoad={() => setIsScriptLoaded(true)}
      />
    </>
  )
}