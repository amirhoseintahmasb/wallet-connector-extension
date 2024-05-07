# Wallet Connector Extension

Wallet Connector Extension is a JavaScript library designed to facilitate connections between web applications and cryptocurrency wallets, specifically MetaMask and Coinbase Wallet. This library enables easy integration with these wallets, allowing users to perform various blockchain-related operations directly from their browsers.

## Features

- Connect to MetaMask directly using the browser's Ethereum provider.
- Connect to Coinbase Wallet either via direct connection (where possible) or through a QR code for mobile connections.
- Perform wallet operations such as transactions, signing messages, and interacting with smart contracts.

## Installation

To use this library in your project, run:

```bash
npm install wallet-connector-extension
```

## Usage

### Setup

First, import the library in your JavaScript file:

```javascript
import { createWalletManager } from 'wallet-connector-extension';
```

Then, initialize the wallet manager:

```javascript
const walletManager = createWalletManager();
```

### Connecting to Wallets

To connect to MetaMask:

```javascript
const metamaskConnection = await walletManager.metamaskConnect();
```

To connect to Coinbase Wallet:

```javascript
const coinbaseConnection = await walletManager.coinbaseConnect();
```

## What's New in 0.1.30

This version is an update from the previous `wallet-connector-extention` package. Key updates include:

- Enhanced Coinbase Wallet integration to attempt direct connections when possible.
- Improved QR code display and handling for better usability in browser extensions.
- General bug fixes and stability improvements.

## Updating

To get the latest version of Wallet Connector Extension, you can update the package using npm:

```bash
npm update wallet-connector-extension
```

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
```

### Notes on Versioning in the README
- **Changelog**: The "What's New" section effectively acts as a changelog, providing users and developers with a clear understanding of the changes and new features introduced in version 0.1.30.
- **Clear Version Reference**: Explicitly referencing the new version number helps users ensure they are using or updating to the correct version.

This structure will keep your project documentation clear and helpful to both existing users and new adopters.