import React from 'react';
import { useWallet, Server, storage } from 'wallet-connector-extention';
import Web3 from 'web3';
import './App.css';

function App() {
  const {
    coinbaseChainId,
    coinbaseProvider,
    CoinbaseConnect,
    CoinbasePersonalSign,
    CoinbaseDisconnect,
    metamaskChainId,
    metamaskProvider,
    MetamaskConnect,
    MetamaskPersonalSign,
    MetamaskDisconnect } = useWallet();

  return (
    <div className="App">
      <header className="App-header">
        <h3>Nft Prize Locker</h3>
        <div className="App">

          {/* coinbase wallet*/}
          <button onClick={async () => {
            CoinbaseConnect().then((account) => {
              console.log("User's address : ", account)
              const checkSumAddress = Web3.utils.toChecksumAddress(account)
              Server.connectWallet({ address: checkSumAddress }).then((connectResponse) => {
                console.log('Connect Response:', connectResponse);
                storage.set(account, connectResponse['access_token'])
                Server.connectWalletAndGetMessage(connectResponse['access_token']).then((messageResponse) => {
                  console.log('Message Response:', messageResponse);
                  const messageHash = Web3.utils.utf8ToHex(messageResponse['Message'])
                  CoinbasePersonalSign(messageHash, checkSumAddress).then((signature) => {
                    console.log('Signature:', signature);
                    Server.confirmWalletConnection(signature, connectResponse['access_token']).then((confirmResponse) => {
                      console.log('Confirm Response:', confirmResponse);
                      storage.set(account, confirmResponse['access_token'])
                    })

                  })
                })
              })
            })

          }}>Connect Coinbase Wallet</button>


          {/* metamask */}
          <button onClick={async () => {
            MetamaskConnect().then((account) => {
              console.log("User's address : ", account)
              const checkSumAddress = Web3.utils.toChecksumAddress(account)
              Server.connectWallet({ address: checkSumAddress }).then((connectResponse) => {
                console.log('Connect Response:', connectResponse);
                storage.set(account, connectResponse['access_token'])
                Server.connectWalletAndGetMessage(connectResponse['access_token']).then((messageResponse) => {
                  console.log('Message Response:', messageResponse);
                  const messageHash = Web3.utils.utf8ToHex(messageResponse['Message'])
                  MetamaskPersonalSign(messageHash, checkSumAddress).then((signature) => {
                    console.log('Signature:', signature);
                    Server.confirmWalletConnection(signature, connectResponse['access_token']).then((confirmResponse) => {
                      console.log('Confirm Response:', confirmResponse);
                      storage.set(account, confirmResponse['access_token'])
                    })
                  })
                })
              })

            })
          }} id="wallet-connect">Connect MetaMask Wallet</button>

        </div>

      </header>
      <div className="App-body">
        <button>Mint</button>
        <button>Sponsor</button>
        <button>Acquire</button>
        <button>Claim</button>
        <button>Set Transferable Status</button>
        <button>Manage</button>
      </div>
    </div>
  );
}

export default App;

// check how to extract coinbase QR code 
// implement it as a SDK that when user initiate it only one wallet will be choosed
// implement a right init function for SDK 

// store access token and create a function to get that using sdk call
// implement a example with UI in example directory
// create a package and put it on npm registery

// change project name in package.json file