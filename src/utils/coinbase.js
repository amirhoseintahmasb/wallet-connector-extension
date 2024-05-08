import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3 from 'web3';
const APP_SUPPORTED_CHAIN_IDS = [1,60,1337,15, 137]

const setupCoinbaseWallet = () => {
  const walletLink = new CoinbaseWalletSDK({
    appName: "My App",
    appLogoUrl: "https://example.com/logo.png",
    darkMode: false,
  });

  // const ethereum = walletLink.makeWeb3Provider("https://alpha-thrumming-pallet.quiknode.pro/ff978f734c7e829a1b5a009de2b8b4c98f9ff878/", 1);
  //or use below code for mainnet
  const coinbaseWalletExtension = walletLink.makeWeb3Provider("https://mainnet.infura.io/v3/a7369cfe951548d7a4fe0938ff4f24a9");
  // const qrUrl = walletLink.getQrUrl();
  // // extract qrurl such that it will fit in extension size
  // console.log("qrUrl", qrUrl);
  return coinbaseWalletExtension;
}

export default setupCoinbaseWallet;