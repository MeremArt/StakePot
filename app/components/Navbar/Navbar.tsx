"use client";

import React from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useNetwork } from "../../wallet/WalletContextProvider";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import Image from "next/image";

const Navbar = () => {
  const { network, setNetwork } = useNetwork();

  const toggleNetwork = () => {
    setNetwork((prevNetwork) =>
      prevNetwork === WalletAdapterNetwork.Devnet
        ? WalletAdapterNetwork.Mainnet
        : WalletAdapterNetwork.Devnet
    );
  };

  return (
    <nav className="bg-custom-bg">
      <section className="flex justify-between items-center p-4">
        {/* Flex container for logo and text */}
        <div className="flex items-center gap-2">
          {/* Logo */}
          <Image
            className=""
            src="https://res.cloudinary.com/dtfvdjvyr/image/upload/v1731927333/Container_4_y3cxou.png"
            width="100"
            height="100"
            alt="logo"
          />
          {/* Text */}
          {/* <h2 className="font-bold text-white text-lg">StakePot</h2> */}
        </div>

        {/* Wallet Button */}
        <div className="flex items-center">
          <div className="border hover:border-slate-900 rounded">
            <WalletMultiButton className="!bg-[#c2c2cccb] hover:!bg-black transition-all duration-200 !rounded-lg" />
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
