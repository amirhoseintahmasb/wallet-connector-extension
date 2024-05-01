import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const setupCoinbaseWallet = () => {
  const walletLink = new CoinbaseWalletSDK({
    appName: "My App",
    appLogoUrl: "https://example.com/logo.png",
    darkMode: false
  });

  const ethereum = walletLink.makeWeb3Provider("https://mainnet.infura.io/v3/a7369cfe951548d7a4fe0938ff4f24a9", 1);

  return ethereum;
}

export default setupCoinbaseWallet;