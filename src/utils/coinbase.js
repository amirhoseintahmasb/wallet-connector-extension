import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

const setupCoinbaseWallet = () => {
  const walletLink = new CoinbaseWalletSDK({
    appName: "My App",
    appLogoUrl: "https://example.com/logo.png",
    darkMode: false,
    // overrideIsCoinbaseBrowser: true 
  });

  const ethereum = walletLink.makeWeb3Provider("https://alpha-thrumming-pallet.quiknode.pro/ff978f734c7e829a1b5a009de2b8b4c98f9ff878/", 1);
  //or use below code for mainnet
  // const ethereum = walletLink.makeWeb3Provider("https://mainnet.infura.io/v3/a7369cfe951548d7a4fe0938ff4f24a9", 1);


  return ethereum;
}

export default setupCoinbaseWallet;