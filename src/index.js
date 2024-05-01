import React from 'react';
import createMetaMaskProvider from 'metamask-extension-provider';
import { getNormalizeAddress } from './utils';
import { EthereumEvents } from './utils/events';
import { Server } from './apis/api';
import storage from './utils/storage';
import setupCoinbaseWallet from './utils/bundle';
import Web3 from 'web3';


export const WalletContext = React.createContext();

const useWallet = () => React.useContext(WalletContext);

export function withWallet(Component) {
    const WalletComponent = props => (
        <WalletContext.Consumer>
            {contexts => <Component {...props} {...contexts} />}
        </WalletContext.Consumer>
    );
    return WalletComponent;
}

const WalletProvider = React.memo(({ children }) => {
    const [coinbaseChainId, setCoinbaseChainId] = React.useState(null);
    const [coinbaseProvider, setCoinbaseProvider] = React.useState(null);

    const [metamaskChainId, setMetamaskChainId] = React.useState(null);
    const [metamaskProvider, setMetamaskProvider] = React.useState(null);


    React.useEffect(() => {
        const cbProvider = setupCoinbaseWallet()
        setCoinbaseProvider(cbProvider);

        const metaProvider = getMetamaskProvider()
        setMetamaskProvider(metaProvider);

        return () => {
            // connectEagerly();
            // metamaskUnsubscribeToEvents();
            // ethereum.disconnect();
        };
    }, []);


    // COINBASE functionality
    const CoinbaseConnect = async () => {
        try {
            const accounts = await coinbaseProvider.request({ method: 'eth_requestAccounts' })
            if (!accounts || accounts.length <= 0) {
                throw new Error("wallet address not selected")
            }

            const web3 = new Web3(coinbaseProvider);
            const chainId = await web3.eth.getChainId();
            console.log("coinbase's chainId : ", chainId)

            setCoinbaseChainId(chainId)

            console.log("User's address : ", accounts)
            const account = getNormalizeAddress(accounts);
            console.log("User's address : ", account)
            storage.set('connected', { connected: true, wallet: 'coinbase' });
            return account
        } catch (e) {
            console.log("error while connect", e);
        }
    }

    const CoinbasePersonalSign = async (messageHash, checkSumAddress) => {
        try {
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

    const CoinbaseDisconnect = async () => {

    }

    const CoinbasePayment = async () => {

    }

    const CoinbaseContractCall = async () => {

    }


    // METAMASK functionality
    const MetamaskConnect = async () => {
        console.log("connectWallet runs....")
        try {
            const [accounts, chainId] = await getMetamaskAccounts(metamaskProvider);
            if (accounts && accounts.length > 0 && chainId) {
                const account = getNormalizeAddress(accounts);
                setMetamaskChainId(chainId);
                storage.set('connected', { connected: true, wallet: 'metamask' });
                // metamaskSubscribeToEvents(metamaskProvider)
                return account
            }
        } catch (e) {
            console.log("error while connect", e);
        }
    }

    const MetamaskPersonalSign = async (messageHash, checkSumAddress) => {
        try {
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


    const MetamaskDisconnect = async () => {
        try {
            console.log("disconnectWallet runs")
        } catch (e) {
            console.log(e);
        }
    }

    const MetamaskPayment = async () => {

    }


    const MetamaskContractCall = async () => {

    }

    const getMetamaskProvider = () => {
        if (window.ethereum) {
            console.log('found window.ethereum>>');
            return window.ethereum;
        } else {
            const provider = createMetaMaskProvider();
            return provider;
        }
    }

    const getMetamaskAccounts = async () => {
        if (metamaskProvider) {
            const [accounts, chainId] = await Promise.all([
                metamaskProvider.request({
                    method: 'eth_requestAccounts',
                }),
                metamaskProvider.request({ method: 'eth_chainId' }),
            ]);
            return [accounts, chainId];
        }
        return false;
    }

    const metamaskSubscribeToEvents = () => {
        if (metamaskProvider) {
            // metamaskProvider.on(EthereumEvents.CHAIN_CHANGED, handleChainChanged);
            // metamaskProvider.on(EthereumEvents.ACCOUNTS_CHANGED, handleAccountsChanged);
            // metamaskProvider.on(EthereumEvents.CONNECT, handleConnect);
            // metamaskProvider.on(EthereumEvents.DISCONNECT, handleDisconnect);
        }
    }

    const metamaskUnsubscribeToEvents = () => {
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
            await MetamaskConnect();
        }
    }

    const metamaskHandleChainChanged = (chainId) => {
        setMetamaskChainId(chainId);
    }

    const metamaskHandleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
            console.log("[account changes]: ", getNormalizeAddress(accounts))
        } 
    }

    return (
        <WalletContext.Provider
            value={{
                // coinbase 
                coinbaseChainId,
                coinbaseProvider,
                CoinbaseConnect,
                CoinbasePersonalSign,
                CoinbaseDisconnect,
                CoinbasePayment,
                CoinbaseContractCall,
                // metamask 
                metamaskChainId,
                metamaskProvider,
                MetamaskConnect,
                MetamaskPersonalSign,
                MetamaskDisconnect,
                MetamaskPayment,
                MetamaskContractCall
            }}
        >
            {children}
        </WalletContext.Provider>
    )
});

module.exports = {
    useWallet,
    WalletProvider,
    Server,
    storage
};
