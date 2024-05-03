import React, { Component } from "react";
import getWeb3, { getGanacheWeb3, Web3 } from "./utils/getWeb3.js";
import Header from "./components/Header/index.js";
import Register from "./components/Pages/CreateGreenNFT/Register.js";
import Audit from "./components/Pages/CreateGreenNFT/Audit.js";
import Claim from "./components/Pages/CreateGreenNFT/Claim.js";
import MyGreenNFTs from "./components/Pages/MyGreenNFTs/index.js";
import GreenNFTMarketplace from "./components/Pages/GreenNFTMarketplace/index.js";
import Home from "./components/Pages/ConnectMetamask/connectMetamask.js";
import ipfs from "./components/ipfs/ipfs.js";

// import { Loader, Button, Card, Input, Heading, Table, Form, Flex, Box, Image } from 'rimble-ui';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { solidityLoaderOptions } from "./config/webpack.js";

import styles from "./App.module.scss";
//import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      /////// Default state
      storageValue: 0,
      web3: null,
      accounts: null,
      route: window.location.pathname.replace("/", ""),
    };
  }

  ////////////////////////////////////
  ///// Ganache
  ////////////////////////////////////
  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  };

  componentDidMount = async () => {
    const hotLoaderDisabled = solidityLoaderOptions.disabled;

    try {
      /// [Todo]:
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  renderLoader() {
    return (
      <div className={styles.loader}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
        <Typography variant="h5" gutterBottom>
          {" "}
          Loading Web3, accounts, and contract...
        </Typography>
        <Typography variant="body1">Unlock your metamask</Typography>
      </div>
    );
  }

  renderDeployCheck() {
    return (
      <div className={styles.setup}>
        <Paper className={styles.notice} elevation={3}>
          <Typography variant="body1">
            Your <b>contracts are not deployed</b> in this network. Two
            potential reasons: <br />
            Maybe you are in the wrong network? Point Metamask to localhost.
            <br />
            You contract is not deployed. Follow the instructions below.
          </Typography>
        </Paper>
      </div>
    );
  }

  renderHome() {
    return (
      <div className={styles.wrapper}>
      <Home/>
      </div>
    )
  }


  renderRegister() {
    return (
      <div className={styles.wrapper}>
        <Register />
      </div>
    );
  }

  renderClaim() {
    return (
      <div className={styles.wrapper}>
        <Claim />
      </div>
    );
  }

  renderAudit() {
    return (
      <div className={styles.wrapper}>
        <Audit />
      </div>
    );
  }

  renderMyGreenNFTs() {
    return (
      <div className={styles.wrapper}>
        <MyGreenNFTs />
      </div>
    );
  }

  renderGreenNFTMarketplace() {
    return (
      <div className={styles.wrapper}>
        <GreenNFTMarketplace />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.App}>
        <Header />
        {this.state.web3 ? (
          // Render loader or deploy check if web3 not ready
          this.state.web3 ? (
            this.renderDeployCheck()
          ) : (
            this.renderLoader()
          )
        ) : (
          // Main content rendering using conditional logic
          <Grid container>
            {" "}
            {/* Main Grid for app content */}
            <Grid item xs={12}>
              {this.state.route === "" && this.renderHome()}
              {this.state.route === "register" && this.renderRegister()}
              {this.state.route === "claim" && this.renderClaim()}
              {this.state.route === "audit" && this.renderAudit()}
              {this.state.route === "my-green-nfts" && this.renderMyGreenNFTs()}
              {this.state.route === "green-nft-marketplace" && this.renderGreenNFTMarketplace()}
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default App;


