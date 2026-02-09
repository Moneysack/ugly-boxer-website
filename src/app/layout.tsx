import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://uglyboxer.com'),
  title: {
    default: "UglyBoxer - Find the Ugliest Underwear!",
    template: "%s | UglyBoxer",
  },
  description: "Vote on the ugliest, funniest underwear. Compare prices from Amazon. TikTok-style voting for the worst boxers! | Hässliche Unterwäsche finden und voten!",
  keywords: [
    "ugly underwear", "funny boxers", "underwear comparison", "pizza boxers", "meme underwear",
    "hässliche Unterwäsche", "lustige Boxershorts", "Unterwäsche vergleichen", "Geschenk Männer lustig",
    "ugly boxer shorts", "funny underwear gift",
  ],
  openGraph: {
    title: "UglyBoxer - Find the Ugliest Underwear!",
    description: "Vote on the ugliest underwear and find the best prices!",
    type: "website",
    locale: "de_DE",
    siteName: "UglyBoxer",
    url: "https://uglyboxer.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "UglyBoxer - Find the Ugliest Underwear!",
    description: "Vote on the ugliest underwear and find the best prices!",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "UglyBoxer",
              url: "https://uglyboxer.com",
              description: "Vote on the ugliest underwear and find the best prices!",
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
