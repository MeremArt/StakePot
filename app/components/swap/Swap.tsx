import styles from "./swap.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  VersionedTransaction,
  TransactionInstruction,
  AddressLookupTableAccount,
  TransactionMessage,
  Connection,
} from "@solana/web3.js";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PythConnection,
  getPythProgramKeyForCluster,
} from "@pythnetwork/client";
import { useConnection, useNetwork } from "../../wallet/WalletContextProvider";

interface Asset {
  name: string;
  mint: string;
  decimals: number;
}

const predefinedAssets: Asset[] = [
  { name: "EUROB", mint: "", decimals: 9 },
  { name: "CETES", mint: "", decimals: 6 },
  { name: "USTRY", mint: "", decimals: 6 },
  { name: "GILTS", mint: "", decimals: 6 },
];

const Assets: Asset[] = [{ name: "SNGN", mint: "", decimals: 9 }];

const Swap: React.FC = () => {
  const wallet = useWallet();
  const [payAmount, setPayAmount] = useState<string>(""); // User input for payment
  const [toAmount, setToAmount] = useState<number>(0); // Calculated receive amount
  const [selectedPayAsset, setSelectedPayAsset] = useState(predefinedAssets[0]); // Asset user is paying with
  const [selectedReceiveAsset, setSelectedReceiveAsset] = useState(
    predefinedAssets[1]
  ); // Asset user is receiving
  const [loading, setLoading] = useState(false);

  // Handle pay asset change
  const handlePayAssetChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const asset = predefinedAssets.find((a) => a.name === event.target.value);
    setSelectedPayAsset(asset || predefinedAssets[0]);
  };

  // Handle receive asset change
  const handleReceiveAssetChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const asset = predefinedAssets.find((a) => a.name === event.target.value);
    setSelectedReceiveAsset(asset || predefinedAssets[1]);
  };

  // Handle user input for pay amount
  const handlePayAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPayAmount(value);
    if (!isNaN(Number(value)) && Number(value) > 0) {
      // Mock calculation: Example using a 1:1 ratio for simplicity
      const calculatedAmount =
        (Number(value) * 10 ** selectedPayAsset.decimals) /
        10 ** selectedReceiveAsset.decimals;
      setToAmount(calculatedAmount);
    } else {
      setToAmount(0);
    }
  };

  // Handle mint button click
  const handleMint = async () => {
    if (!wallet.connected) {
      toast.error("Please connect your wallet first!");
      return;
    }

    if (!payAmount || Number(payAmount) <= 0) {
      toast.error("Enter a valid amount to pay!");
      return;
    }

    setLoading(true);
    try {
      // Mock transaction logic
      toast.success(
        `Minting ${toAmount.toFixed(2)} ${selectedReceiveAsset.name}`
      );
      // Add Solana transaction logic here
    } catch (error) {
      console.error("Mint error:", error);
      toast.error("Minting failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.innerContainer}>
        <div className="flex flex-col gap-1">
          {" "}
          <h2 className={styles.mint}>MINT STABLE </h2>{" "}
          <p className={styles.stable}>Mint your favourite stable coin</p>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.labels}>You're paying:</div>

            <input
              type="text"
              value={payAmount}
              onChange={handlePayAmountChange}
              className={styles.inputField}
              placeholder="Enter amount"
            />
            <select
              id="pay-asset-select"
              value={selectedPayAsset.name}
              className={styles.selectField}
            >
              {predefinedAssets.map((asset) => (
                <option key={asset.name} value={asset.name}>
                  {asset.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.labels}>To receive:</div>
            <input
              type="number"
              value={toAmount}
              className={styles.inputField}
              readOnly
            />
            <select
              id="receive-asset-select"
              value={selectedReceiveAsset.name}
              onChange={handleReceiveAssetChange}
              className={styles.selectField}
            >
              {" "}
              {Assets.map((asset) => (
                <option key={asset.name} value={asset.name}>
                  {asset.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleMint}
            className={styles.button}
            disabled={!wallet.connected || loading}
          >
            {loading
              ? "Loading..."
              : !wallet.connected
              ? "Connect Wallet"
              : "Mint"}
          </button>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Swap;
