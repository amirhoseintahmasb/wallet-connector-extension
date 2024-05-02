declare module 'wallet-connector-extention' {
    // Specify the types of the exports here. For example:
    export function createWalletManager(): WalletManager;

    interface WalletManager {
        coinbaseConnect(): Promise<{ account: string; chainId: number }>;
        // Define other methods and properties as needed
    }
}
