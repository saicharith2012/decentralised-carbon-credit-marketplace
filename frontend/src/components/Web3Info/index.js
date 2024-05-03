import React, { Component } from "react";
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';  
import Grid from '@mui/material/Grid'; 
import createBlockie from 'ethereum-blockies-base64';
import styles from './Web3Info.module.scss';  // Assuming your stylesheet

export default class Web3Info extends Component {

  renderNetworkName(networkId) {
    switch (networkId) {
      case 3:
        return 'Ropsten';
      case 4:
        return 'Rinkeby';
      case 1:
        return 'Main';
      case 42:
        return 'Kovan';
      default:
        return 'Private';
    }
  }

  render()  {
    const { networkId, accounts, balance, isMetaMask } = this.props;
    return (
      <Grid container spacing={2} className={styles.web3}> 
        <Grid item xs={12}>
           <Typography variant="h5" gutterBottom>Your Web3 Info</Typography> 
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">Network:</Typography>
        </Grid>
        <Grid item xs={6}>
           <Typography variant="body1">
                {networkId} - {this.renderNetworkName(networkId)}
           </Typography>
        </Grid>
        <Grid item xs={6}>
           <Typography variant="subtitle1">Your address:</Typography>
        </Grid>
        <Grid item xs={6}>
           <Grid container alignItems="center"> 
               <Grid item>
                   <Typography variant="body1">{accounts[0]}</Typography>
               </Grid>
               <Grid item>
                   <Avatar sx={{ width: 24, height: 24, ml: 1 }}> 
                     <img src={createBlockie(accounts[0])} alt="Address Blockie" />
                   </Avatar>
               </Grid>
           </Grid>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">Your ETH balance:</Typography>
        </Grid>
        <Grid item xs={6}>
           <Typography variant="body1">{balance}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">Using Metamask:</Typography>
        </Grid>
        <Grid item xs={6}>
           <Typography variant="body1">{isMetaMask ? 'YES' : 'NO'}</Typography>
        </Grid>
      </Grid>
    );
  }
}
