import createMetaMaskProvider from 'metamask-extension-provider';
import { getNormalizeAddress } from './utils';
import storage from './utils/storage';
import setupCoinbaseWallet from './utils/coinbase';
import Web3 from 'web3';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

if (typeof process === 'undefined') {
    const process = require('process');
    window.process = process;
}

class WalletManager {
    coinbaseProvider;
    metamaskProvider;
    coinbaseChainId;
    metamaskChainId;
    CoinbaseConnect;
    getMetamaskProvider

    constructor() {
        this.coinbaseProvider = null;
        this.metamaskProvider = null;
        this.coinbaseChainId = null;
        this.metamaskChainId = null;

        const cbProvider = setupCoinbaseWallet()
        this.coinbaseProvider = cbProvider
        const metaProvider = this.getMetamaskProvider()
        this.metamaskProvider = metaProvider


        // COINBASE functionality
        this.CoinbaseConnect = async () => {
            try {
                const accounts = await coinbaseProvider.request({ method: 'eth_requestAccounts' })
                if (!accounts || accounts.length <= 0) {
                    throw new Error("wallet address not selected")
                }

                const web3 = new Web3(coinbaseProvider);
                const chainId = await web3.eth.getChainId();
                console.log("coinbase's chainId : ", chainId)

                this.coinbaseChainId = chainId

                console.log("User's address : ", accounts)
                const account = getNormalizeAddress(accounts);
                console.log("User's address : ", account)
                storage.set('connected', { connected: true, wallet: 'coinbase' });
                return account
            } catch (e) {
                console.log("error while connect", e);
            }
        }

        this.getMetamaskProvider = async () => {
            if (window.ethereum) {
                console.log('found window.ethereum>>');
                return window.ethereum;
            } else {
                const provider = createMetaMaskProvider();
                return provider;
            }
        }
    }

    // async init() {
    //     this.coinbaseProvider = await setupCoinbaseWallet();
    //     this.metamaskProvider = await this.getMetamaskProvider();
    // }


    // async CoinbasePersonalSign(messageHash, checkSumAddress) {
    //     try {
    //         const signature = await coinbaseProvider.request({
    //             method: 'personal_sign',
    //             params: [messageHash, checkSumAddress]
    //         })
    //         console.log('Signature:', signature);
    //         return signature
    //     } catch (error) {
    //         console.log("error while connect", error);
    //     }
    // }

    // async CoinbaseDisconnect() {

    // }

    // async CoinbasePayment() {

    // }

    // async CoinbaseContractCall() {

    // }


    // // METAMASK functionality
    // async MetamaskConnect() {
    //     console.log("connectWallet runs....")
    //     try {
    //         const [accounts, chainId] = await this.getMetamaskAccounts(metamaskProvider);
    //         if (accounts && accounts.length > 0 && chainId) {
    //             const account = getNormalizeAddress(accounts);
    //             this.metamaskChainId = chainId;
    //             storage.set('connected', { connected: true, wallet: 'metamask' });
    //             // metamaskSubscribeToEvents(metamaskProvider)
    //             return account
    //         }
    //     } catch (e) {
    //         console.log("error while connect", e);
    //     }
    // }

    // async MetamaskPersonalSign(messageHash, checkSumAddress) {
    //     try {
    //         const signature = await metamaskProvider.request({
    //             method: 'personal_sign',
    //             params: [messageHash, checkSumAddress]
    //         });
    //         console.log(`Signature: ${signature}`);
    //         return signature;
    //     } catch (error) {
    //         console.error("Failed to sign message with MetaMask:", error);
    //         throw error;
    //     }
    // };


    // async MetamaskDisconnect() {
    //     try {
    //         console.log("disconnectWallet runs")
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // async MetamaskPayment() {

    // }


    // async MetamaskContractCall() {

    // }


    // async getMetamaskAccounts() {
    //     if (metamaskProvider) {
    //         const [accounts, chainId] = await Promise.all([
    //             metamaskProvider.request({
    //                 method: 'eth_requestAccounts',
    //             }),
    //             metamaskProvider.request({ method: 'eth_chainId' }),
    //         ]);
    //         return [accounts, chainId];
    //     }
    //     return false;
    // }

    // async metamaskSubscribeToEvents() {
    //     if (metamaskProvider) {
    //         // metamaskProvider.on(EthereumEvents.CHAIN_CHANGED, handleChainChanged);
    //         // metamaskProvider.on(EthereumEvents.ACCOUNTS_CHANGED, handleAccountsChanged);
    //         // metamaskProvider.on(EthereumEvents.CONNECT, handleConnect);
    //         // metamaskProvider.on(EthereumEvents.DISCONNECT, handleDisconnect);
    //     }
    // }

    // async metamaskUnsubscribeToEvents() {
    //     if (metamaskProvider) {
    //         // metamaskProvider.removeListener(EthereumEvents.CHAIN_CHANGED, handleChainChanged);
    //         // metamaskProvider.removeListener(EthereumEvents.ACCOUNTS_CHANGED, handleAccountsChanged);
    //         // metamaskProvider.removeListener(EthereumEvents.CONNECT, handleConnect);
    //         // metamaskProvider.removeListener(EthereumEvents.DISCONNECT, handleDisconnect);
    //     }
    // }

    // async connectEagerly() {
    //     const metamask = await storage.get('connected');
    //     if (metamask?.connected) {
    //         await this.MetamaskConnect();
    //     }
    // }

    // async metamaskHandleChainChanged(chainId) {
    //     this.metamaskChainId = chainId;
    // }

    // async metamaskHandleAccountsChanged(accounts) {
    //     if (accounts.length > 0) {
    //         console.log("[account changes]: ", getNormalizeAddress(accounts))
    //     }
    // }

}

export function createWalletManager() {
    return new WalletManager();
}