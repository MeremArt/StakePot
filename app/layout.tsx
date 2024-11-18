import type { Metadata } from "next";
import { Inter } from "next/font/google";
import WalletContextProvider from "./wallet/WalletContextProvider";
import "./globals.css";
import AppWalletProvider from "./wallet/WalletContextProvider";
import Head from "next/head";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
const inter = Inter({ subsets: ["latin"] });
import Navbar from "./components/Navbar/Navbar";
export const metadata: Metadata = {
  title: "StakePot",
  description: "Where Your Bonds Fill the Pot!",
  openGraph: {
    images: [
      {
        url: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1731924190/stakepot_gqiddq.png",
        width: 1200,
        height: 630,
        alt: "StakePot Logo",
      },
    ],
  },
  twitter: {
    title: "Stakepot",
    description: "Where Your Bonds Fill the Pot!",
    images: [
      {
        url: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1731924190/stakepot_gqiddq.png",
        alt: "StakePot Logo",
      },
    ],
    creator: "@stakepot___",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* <title>{metadata.title}</title> */}
        {/* <meta name="description" content={metadata.description} /> */}
        <script src="https://terminal.jup.ag/main-v2.js" data-preload></script>
      </Head>
      <body className={inter.className}>
        {" "}
        <AppWalletProvider>
          <Navbar />
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}
