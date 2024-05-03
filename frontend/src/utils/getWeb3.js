import Web3 from "web3";
require('dotenv').config();
// const INFURA_API_KEY = process.env.INFURA_API_KEY;

const FALLBACK_WEB3_PROVIDER = process.env.PROVIDER_URL; // Default to Ganche

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      // Modern dapp browsers with MetaMask or similar
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.request({ method: "eth_requestAccounts" });
          resolve(web3);  // Accounts now exposed
        } catch (error) {
          reject('Failed to access account: ' + error.message);
        }
      }
      // Legacy dapp browsers, e.g., older MetaMask versions
      else if (window.web3) {
        console.log("Injected web3 detected.");
        resolve(new Web3(window.web3.currentProvider));
      }
      // Fallback to Ganache local development blockchain or Infura if specified in the .env
      else {
        console.log("No web3 instance injected, using Local/Infura fallback.");
        const provider = new Web3.providers.HttpProvider(FALLBACK_WEB3_PROVIDER);
        resolve(new Web3(provider));
      }
    });
  });

const getGanacheWeb3 = () => {
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd) {
    console.log("Production mode: No Ganache connection.");
    return null;  // Disable Ganache in production
  }
  const localProvider = process.env.PROVIDER_URL;  // Use local Ganache
  console.log("Connecting to Ganache...");
  return new Web3(new Web3.providers.HttpProvider(localProvider));
}

export { getWeb3, getGanacheWeb3, Web3 };
