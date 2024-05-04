import React, { Component } from "react";
// import { getWeb3 } from "../../../utils/getWeb3"; // Ensure getWeb3 is properly set up
import Button from "@mui/material/Button";
import styles from "../../../App.module.scss";

export default class Home extends Component {
  state = {
    web3: null,
    accounts: null,
    hasMetaMask: false,
    errorMessage: "", // State to store error messages
  };

  componentDidMount() {
    this.detectMetaMask();

    if (window.ethereum) {
      // Account change listener
      window.ethereum.on("accountsChanged", this.handleAccountsChanged);
    }
  }

  componentWillUnmount() {
    if (window.ethereum) {
      window.ethereum.removeListener(
        "accountsChanged",
        this.handleAccountsChanged
      );
    }
  }

  detectMetaMask = () => {
    if (typeof window.ethereum !== "undefined") {
      this.setState({ hasMetaMask: true });
    } else {
      this.setState({
        hasMetaMask: false,
        errorMessage: "MetaMask is not installed.",
      });
    }
  };

  handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
      this.setState({ accounts: null, selectedAccount: null, errorMessage: 'No accounts found. Please connect to MetaMask.' }); // Clear selectedAccount
    } else {
      this.setState({ accounts, selectedAccount: accounts[0], errorMessage: '' }); 
    }
  }

  connect = async () => {
    if (this.state.hasMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        this.handleAccountsChanged(accounts);
      } catch (err) {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          this.setState({
            errorMessage: "Connection to MetaMask was refused by the user.",
          });
          console.log("Please connect to MetaMask.");
        } else {
          this.setState({ errorMessage: `An error occurred: ${err.message}` });
          console.error(err);
        }
      }
    } else {
      this.setState({ errorMessage: "MetaMask is not installed!" });
      alert("MetaMask is not installed!");
    }
  };

  render() {
    const { hasMetaMask, errorMessage, selectedAccount } = this.state;
    return (
      <div className={styles.left}>
        { selectedAccount && <p>Connected Account: {selectedAccount}</p> }  
        <Button
          variant="contained"
          fullWidth
          type="submit"
          style={{ margin: "50px", backgroundColor: "black" }}
          onClick={this.connect}
          disabled={!hasMetaMask}
        >
          {selectedAccount ? 'Change Account' : 'Connect to Metamask'} 
        </Button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    );
  }
}
