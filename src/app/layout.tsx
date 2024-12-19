import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "../Providers"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rubicr",
  description: "Empowering sustainable business solutions through advanced tracking and reporting technologies",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Rubicr",
    description: "Empowering sustainable business solutions through advanced tracking and reporting technologies",
    type: "website",
    url: "https://rubicr.ai/",
    images: [
      {
        url: "/Logo.svg",
        width: 1200,
        height: 630,
        alt: "Rubicr"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubicr",
    description: "Empowering sustainable business solutions through advanced tracking and reporting technologies"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Google Tag Manager Head Script */}
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
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
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