"use client"
import { useEffect, useState } from 'react';
import Script from 'next/script';

export default function DynamicScripts() {
  const [scriptSrcs, setScriptSrcs] = useState<string[]>([]);

  useEffect(() => {
    async function fetchScripts() {
      try {
        const response = await fetch('http://localhost:1337/api/home?populate=Bot_Press');
        const data = await response.json();
        const srcs = data.data.attributes.Bot_Press.map((item: any) => {
          const scriptTag = item.children[0].text;
          const srcMatch = scriptTag.match(/src="([^"]+)"/);
          return srcMatch ? srcMatch[1] : null;
        }).filter(Boolean) as string[];
        setScriptSrcs(srcs);
      } catch (error) {
        console.error('Error fetching scripts:', error);
      }
    }
    fetchScripts();
  }, []);

  const handleScriptLoad = () => {
    if (scriptSrcs.every(src => {
      const scriptName = src.split('/').pop()?.split('.')[0];
      return scriptName && (window as any)[scriptName];
    })) {
      localStorage.setItem('botpressScriptsLoaded', 'true');
      window.dispatchEvent(new Event('botpressScriptsLoaded'));
    }
  };

  return (
    <>
      {scriptSrcs.map((src, index) => (
        <Script
          key={index}
          id={`dynamic-script-${index}`}
          src={src}
          strategy="afterInteractive"
          onLoad={handleScriptLoad}
        />
      ))}
    </>
  );
}
