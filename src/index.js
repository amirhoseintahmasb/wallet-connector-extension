import { createMetaMaskProvider } from './utils/metamask';
import { getNormalizeAddress } from './utils';
import storage from './utils/storage';
import setupCoinbaseWallet from './utils/coinbase';
import Web3 from 'web3';
import { Buffer } from 'buffer';
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

window.Buffer = Buffer;

if (typeof process === 'undefined') {
    const process = require('process');
    window.process = process;
}
export const createWalletManager = () => {


    const getMetamaskProvider = async () => {
        if (window.ethereum) {
            console.log('found window.ethereum>>');
            return window.ethereum;
        } else {
            console.log("not found window.ethereum>>")
            const provider = createMetaMaskProvider();
            return provider;
        }
    }

    const connectToCoinBase = async () => {
        try {
        const { ethereum } = window
        if (ethereum) {
            const web3js = new Web3(ethereum)
            await ethereum.enable
            const accounts = await web3js.eth.getAccounts();
            return accounts[0]
        }else {
            console.log('Wallet is not installed!');
        }
        } catch (err) {
        console.log('Failed connecting to wallet: ', err)
        }
    }
    const coinbasePersonalSign = async (message, account) => {
        try {
            const checkSumAddress = Web3.utils.toChecksumAddress(account)
            const messageHash = Web3.utils.utf8ToHex(message)

            const signature = await coinbaseProvider.request({
                method: 'personal_sign',
                params: [messageHash, checkSumAddress]
            })
            console.log('Signature:', signature);
            return signature
        } catch (error) {
            console.log("error while connect", error);
        }
    }

    const coinbaseDisconnect = async () => {
        try {
            await coinbaseProvider.disconnect();
            console.log("Disconnected from Coinbase Wallet.");
            storage.set('connected', { connected: false, wallet: null });
        } catch (error) {
            console.error("Error disconnecting Coinbase Wallet:", error);
            throw error;
        }
    };

    const coinbasePayment = async (amount, receiver) => {
        const web3 = new Web3(coinbaseProvider);
        try {
            const transaction = await web3.eth.sendTransaction({
                from: storage.get('connected').wallet,
                to: receiver,
                value: web3.utils.toWei(amount, 'ether'),
                gasLimit: '0x5028',
                maxPriorityFeePerGas: '0x3b9aca00',
                maxFeePerGas: '0x2540be400',
            });
            console.log("Transaction successful:", transaction);
            return transaction;
        } catch (error) {
            console.error("Payment error:", error);
            throw error;
        }
    };
    //      try {
    //         const hash = await coinbaseProvider.request({
    //             method: 'eth_sendTransaction',
    //             params: [
    //                 {
    //                     from,
    //                     to, 
    //                     value,
    //                     gasLimit: '0x5028',
    //                     maxPriorityFeePerGas: '0x3b9aca00',
    //                     maxFeePerGas: '0x2540be400',
    //                 }
    //             ]
    //         })
    //         console.log('Hash:', hash);
    //         return signature
    //     } catch (error) {
    //         console.log("error while connect", error);
    //     }

    // }

    const coinbaseContractCall = async (contractAddress, abi, method, params) => {
        const web3 = new Web3(coinbaseProvider);
        const contract = new web3.eth.Contract(abi, contractAddress);
        try {
            const data = await contract.methods[method](...params).call();
            console.log("Contract call successful:", data);
            return data;
        } catch (error) {
            console.error("Contract call error:", error);
            throw error;
        }
    };

    const metamaskConnect = async () => {
        const metamaskProvider = await getMetamaskProvider();
        console.log("connectWallet runs....")
        try {
            const [accounts, chainId] = await getMetamaskAccounts(metamaskProvider);
            if (accounts && accounts.length > 0 && chainId) {
                const account = getNormalizeAddress(accounts);
                storage.set('connected', { connected: true, wallet: 'metamask' });
                // metamaskSubscribeToEvents(metamaskProvider)
                return { account, chainId }
            }
        } catch (e) {
            console.log("error while connect", e);
        }
    }

    const metamaskPersonalSign = async (message, account) => {
        const metamaskProvider = await getMetamaskProvider();
        try {
            const checkSumAddress = Web3.utils.toChecksumAddress(account)
            const messageHash = Web3.utils.utf8ToHex(message)

            const signature = await metamaskProvider.request({
                method: 'personal_sign',
                params: [messageHash, checkSumAddress]
            });
            console.log(`Signature: ${signature}`);
            return signature;
        } catch (error) {
            console.error("Failed to sign message with MetaMask:", error);
            throw error;
        }
    };

    const metamaskDisconnect = async () => {
        try {
            const metamaskProvider = await getMetamaskProvider();
            await metamaskProvider.disconnect();
            console.log("Disconnected from MetaMask.");
            storage.set('connected', { connected: false, wallet: null });
        } catch (e) {
            console.error("Error disconnecting MetaMask:", e);
            throw e;
        }
    };
    const metamaskPayment = async (amount, receiver) => {
        const metamaskProvider = await getMetamaskProvider();
        try {
            const hash = await metamaskProvider.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from,
                        to, 
                        value,
                        gasLimit: '0x5028',
                        maxPriorityFeePerGas: '0x3b9aca00',
                        maxFeePerGas: '0x2540be400',
                    }
                ]
            })
            console.log('Hash:', hash);
            return signature
            } catch (error) {
                console.log("error while connect", error);
            }
    };

    const metamaskContractCall = async (contractAddress, abi, method, params) => {
        const metamaskProvider = await getMetamaskProvider();
        const web3 = new Web3(metamaskProvider);
        const contract = new web3.eth.Contract(abi, contractAddress);
        try {
            const data = await contract.methods[method](...params).call();
            console.log("Contract call successful:", data);
            return data;
        } catch (error) {
            console.error("Contract call error:", error);
            throw error;
        }
    };

    const getMetamaskAccounts = async () => {
        const metamaskProvider = await getMetamaskProvider();
        console.log("metamask provider =====> ", metamaskProvider)
        if (metamaskProvider) {
            const [accounts, chainId] = await Promise.all([
                metamaskProvider.request({
                    method: 'eth_requestAccounts',
                }),
                metamaskProvider.request({ method: 'eth_chainId' }),
            ]);
            return [accounts, chainId];
        }
    }

    const metamaskSubscribeToEvents = async () => {
        const metamaskProvider = await getMetamaskProvider();
        if (metamaskProvider) {
            // metamaskProvider.on(EthereumEvents.CHAIN_CHANGED, handleChainChanged);
            // metamaskProvider.on(EthereumEvents.ACCOUNTS_CHANGED, handleAccountsChanged);
            // metamaskProvider.on(EthereumEvents.CONNECT, handleConnect);
            // metamaskProvider.on(EthereumEvents.DISCONNECT, handleDisconnect);
        }
    }

    const metamaskUnsubscribeToEvents = async () => {
        const metamaskProvider = await getMetamaskProvider();
        if (metamaskProvider) {
            // metamaskProvider.removeListener(EthereumEvents.CHAIN_CHANGED, handleChainChanged);
            // metamaskProvider.removeListener(EthereumEvents.ACCOUNTS_CHANGED, handleAccountsChanged);
            // metamaskProvider.removeListener(EthereumEvents.CONNECT, handleConnect);
            // metamaskProvider.removeListener(EthereumEvents.DISCONNECT, handleDisconnect);
        }
    }

    const connectEagerly = async () => {
        const metamask = await storage.get('connected');
        if (metamask?.connected) {
            await this.MetamaskConnect();
        }
    }

    const metamaskHandleChainChanged = (chainId) => {
        metamaskChainId = chainId;
    }

    const metamaskHandleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
            console.log("[account changes]: ", getNormalizeAddress(accounts))
        }
    }

    return { 
        connectToCoinBase, 
        getMetamaskProvider, 
        coinbasePersonalSign, 
        metamaskConnect, 
        metamaskPersonalSign, 
        metamaskContractCall, 
        metamaskPayment, 
        metamaskDisconnect, 
        coinbaseContractCall, 
        coinbasePayment, 
        coinbaseDisconnect
     };
};
