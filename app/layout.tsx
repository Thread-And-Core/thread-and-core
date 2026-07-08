import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fraunces, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  weight: "300 900",
  variable: "--font-satoshi",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description =
  "Architect-led enterprise technology practice. We turn scattered processes, applications, data, and AI into one connected architecture — SAP BTP, Clean Core, integration, and full-stack delivery.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Thread & Core Systems — Enterprise Architecture for the Connected Enterprise",
    template: "%s — Thread & Core Systems",
  },
  description,
  keywords: [
    "Enterprise Architecture",
    "SAP BTP",
    "Clean Core",
    "S/4HANA",
    "SAP consulting",
    "enterprise integration",
    "AI automation",
    "Thread & Core Systems",
  ],
  openGraph: {
    title:
      "Thread & Core Systems — Enterprise Architecture for the Connected Enterprise",
    description: "Connecting Every Thread to the Core.",
    url: "/",
    siteName: "Thread & Core Systems",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thread & Core Systems",
    description: "Enterprise Architecture for the Connected Enterprise.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#org`,
      name: "Thread and Core Systems Private Limited",
      alternateName: "Thread & Core",
      url: siteUrl,
      slogan: "Connecting Every Thread to the Core.",
      email: "Prashant.Agarwal@threadandcore.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressCountry: "IN",
      },
      founder: { "@id": `${siteUrl}/#founder` },
      knowsAbout: [
        "Enterprise Architecture",
        "SAP BTP",
        "Clean Core",
        "S/4HANA",
        "Enterprise Integration",
        "AI and Automation",
      ],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: "Prashant Agarwal",
      jobTitle: "SAP-certified BTP Solution Architect",
      worksFor: { "@id": `${siteUrl}/#org` },
      sameAs: ["https://linkedin.com/in/agarawal-prashant"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body>
        <a
          href="#main-content"
          className="fixed top-2 left-2 z-[100] -translate-y-20 rounded-[2px] bg-thread-500 px-4 py-2 font-mono text-[12px] tracking-[0.1em] text-ink-950 uppercase transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        <div id="main-content">{children}</div>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
