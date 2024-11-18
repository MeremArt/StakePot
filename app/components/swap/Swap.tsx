import styles from "./swap.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Asset {
  name: string;
  mint: string;
  decimals: number;
  logo: string;
  description: string;
  price: number;
}

const predefinedAssets: Asset[] = [
  {
    name: "EUROB",
    mint: "",
    decimals: 9,
    logo: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1731924190/stakepot_gqiddq.png",
    description: "A stablecoin backed by the Euro.",
    price: 1.12,
  },
  {
    name: "CETES",
    mint: "",
    decimals: 6,
    logo: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1731924190/stakepot_gqiddq.png",
    description: "Tokenized Mexican government bonds.",
    price: 1.05,
  },
  {
    name: "USTRY",
    mint: "",
    decimals: 6,
    logo: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1731924190/stakepot_gqiddq.png",
    description: "Stablecoin pegged to the TRY currency.",
    price: 0.045,
  },
  {
    name: "GILTS",
    mint: "",
    decimals: 6,
    logo: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1731924190/stakepot_gqiddq.png",
    description: "UK government bond token.",
    price: 1.15,
  },
];

const receiveAssets: Asset[] = [
  {
    name: "SNGN",
    mint: "",
    decimals: 6,
    logo: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1731924190/stakepot_gqiddq.png",
    description: "NGN token.",
    price: 1.15,
  },
];

interface CustomSelectProps {
  options: Asset[];
  value: Asset;
  onChange: (asset: Asset) => void;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.selectContainer}>
      <div className={styles.customSelect}>
        <div
          className={styles.selectTrigger}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.selectedOption}>
            <img
              src={value.logo}
              alt={value.name}
              className={styles.assetLogo}
            />
            <div className={styles.assetDetails}>
              <span className={styles.assetName}>{value.name}</span>
              <span className={styles.assetDescription}>
                {value.description}
              </span>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className={styles.optionsList}>
            {options.map((asset) => (
              <div
                key={asset.name}
                className={`${styles.option} ${
                  asset.name === value.name ? styles.selected : ""
                }`}
                onClick={() => {
                  onChange(asset);
                  setIsOpen(false);
                }}
              >
                <img
                  src={asset.logo}
                  alt={asset.name}
                  className={styles.assetLogo}
                />
                <div className={styles.assetDetails}>
                  <span className={styles.assetName}>{asset.name}</span>
                  <span className={styles.assetDescription}>
                    {asset.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Swap: React.FC = () => {
  const wallet = useWallet();
  const [payAmount, setPayAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<number>(0);
  const [selectedPayAsset, setSelectedPayAsset] = useState<Asset>(
    predefinedAssets[0]
  );
  const [selectedReceiveAsset, setSelectedReceiveAsset] = useState<Asset>(
    receiveAssets[0]
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handlePayAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPayAmount(value);

    const numValue = Number(value);
    if (!isNaN(numValue) && numValue > 0) {
      const calculatedAmount =
        (numValue * selectedPayAsset.price) / selectedReceiveAsset.price;
      setToAmount(calculatedAmount);
    } else {
      setToAmount(0);
    }
  };

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
          <h2 className={styles.mint}>MINT STABLE</h2>
          <p className={styles.stable}>Mint your favourite stable coin</p>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.labels}>You're paying:</div>
            <div className={styles.inputFieldWrapper}>
              <input
                type="text"
                value={payAmount}
                onChange={handlePayAmountChange}
                className={styles.inputField}
                placeholder="Enter amount"
              />
              <span className={styles.usdPrice}>
                ${(Number(payAmount) * selectedPayAsset.price || 0).toFixed(2)}{" "}
                USD
              </span>
            </div>
            <CustomSelect
              options={predefinedAssets}
              value={selectedPayAsset}
              onChange={(asset: Asset) => {
                setSelectedPayAsset(asset);
                if (payAmount) {
                  const calculatedAmount =
                    (Number(payAmount) * asset.price) /
                    selectedReceiveAsset.price;
                  setToAmount(calculatedAmount);
                }
              }}
              className={styles.selectField}
            />

            <div className={styles.inputContainer}>
              <div className={styles.labels}>To receive:</div>
              <div className={styles.inputFieldWrapper}>
                <input
                  type="number"
                  value={toAmount}
                  className={styles.inputField}
                  readOnly
                />
              </div>
              <CustomSelect
                options={receiveAssets}
                value={selectedReceiveAsset}
                onChange={(asset: Asset) => {
                  setSelectedReceiveAsset(asset);
                  if (payAmount) {
                    const calculatedAmount =
                      (Number(payAmount) * selectedPayAsset.price) /
                      asset.price;
                    setToAmount(calculatedAmount);
                  }
                }}
                className={styles.selectField}
              />
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
    </div>
  );
};

export default Swap;
