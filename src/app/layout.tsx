import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UglyBoxer - Find the Ugliest Underwear!",
  description: "Vote on the ugliest, funniest underwear. Compare prices from Amazon, Otto, Zalando and more. TikTok-style voting!",
  keywords: ["ugly underwear", "funny boxers", "underwear comparison", "pizza boxers", "meme underwear"],
  openGraph: {
    title: "UglyBoxer - Find the Ugliest Underwear!",
    description: "Vote on the ugliest underwear and find the best prices!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
