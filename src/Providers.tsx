'use client'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [isBotInitialized, setIsBotInitialized] = useState(false);

  useEffect(() => {
    const initializeBot = () => {
      if (typeof window !== 'undefined' && (window as any).botpressWebChat && !isBotInitialized) {
        (window as any).botpressWebChat.init({
          "botId": "76676afb-ba27-4537-90e9-78a9f22e7615",
          "clientId": "76676afb-ba27-4537-90e9-78a9f22e7615",
          "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
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
        setIsBotInitialized(true);
      }
    };

    // Check if scripts are already loaded (for page refreshes)
    if (localStorage.getItem('botpressScriptsLoaded') === 'true') {
      initializeBot();
    }

    // Listen for script load event
    window.addEventListener('botpressScriptsLoaded', initializeBot);

    // Cleanup
    return () => {
      window.removeEventListener('botpressScriptsLoaded', initializeBot);
    };
  }, [isBotInitialized]);

  return <>{children}</>
}