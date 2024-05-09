import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import Web3 from 'web3';
const APP_SUPPORTED_CHAIN_IDS = [1,60,1337,15, 137]

const setupCoinbaseWallet = () => {
  const walletLink = new CoinbaseWalletSDK({
    // appName: "My App",
    // appLogoUrl: "https://example.com/logo.png",
    // darkMode: false,
    overrideIsMetaMask: false,
    overrideIsCoinbaseBrowser: true,
    overrideIsCoinbaseWallet: false
  });

  // const ethereum = walletLink.makeWeb3Provider("https://alpha-thrumming-pallet.quiknode.pro/ff978f734c7e829a1b5a009de2b8b4c98f9ff878/", 1);
  //or use below code for mainnet
  const provider = walletLink.makeWeb3Provider();
  // const qrUrl = walletLink.getQrUrl();
  // // extract qrurl such that it will fit in extension size

  const url = walletLink.getQrUrl();
  console.log("qrUrl", url);

  return provider;
}

export default setupCoinbaseWallet;