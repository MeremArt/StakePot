"use client";
import Image from "next/image";
import Swap from "./components/swap/Swap";
import Navbar from "./components/Navbar/Navbar";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl, Connection } from "@solana/web3.js";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

export default function Home() {
  return (
    <main>
      <Swap />
    </main>
  );
}
