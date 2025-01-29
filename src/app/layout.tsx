import type { Metadata, Viewport } from "next";
import Script from "next/script";  // Add this import for Script
import { Providers } from "../Providers";  // Make sure path matches your file structure
import "./globals.css";
// import { GoogleTagManager } from '@next/third-parties/google'
// Rest of your code remains the same
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        id="gtm-head-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NW2LFB78');
          `
        }}
      />
      <Script
        id="guidelite-chatbot"
        strategy="afterInteractive"
        src="https://guidelite.ai/static/embed.fab.min.js"
        data-open-on-load="true"
        data-chatbotid="7e05cd22-8058-4899-864d-f8ac1e765708"
        data-url="https://guidelite.ai"
      />
        <Script
        id="hotjar-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:5276456,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `
        }}
      />
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-NW2LFB78"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
              ></iframe>
            `
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}