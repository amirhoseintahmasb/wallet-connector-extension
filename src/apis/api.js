const SERVER_URL = 'http://localhost:3000';

export const Server = {
    connectWallet: async (data) => {
        const apiUrl = `${SERVER_URL}/wallet/connect`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error:', error);
        }
    },
    connectWalletAndGetMessage: async (token) => {
        const apiUrl = `${SERVER_URL}/wallet/connect/message`;
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    },
    confirmWalletConnection: async (signature, token) => {
        const apiUrl = `${SERVER_URL}/wallet/connect/confirmation`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ signature }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error:', error);
        }
    }
};


// export const server = function(server_url) {
    
//     connectWallet = async (data) => {
//         const apiUrl = `${server_url}/wallet/connect`;
//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const result = await response.json();
//             return result;
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     connectWalletAndGetMessage = async (token) => {
//         const apiUrl = `${server_url}/wallet/connect/message`;
//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
    
//             const result = await response.json();
//             return result;
//         } catch (error) {
//             console.error('Error:', error);
//             return null;
//         }
//     }

//     confirmWalletConnection = async (signature, token) => {
//         const apiUrl = `${server_url}/wallet/connect/confirmation`;
//         try {
//             const response = await fetch(apiUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify({ signature }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const result = await response.json();
//             return result;
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     return {
//         confirmWalletConnection,
//         connectWalletAndGetMessage,
//         connectWallet
//     }
// }


// export default setupCoinbaseWallet;