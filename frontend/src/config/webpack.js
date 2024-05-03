const solidityLoaderOptions = {
    network: 'development',
    disabled: false,
}


module.exports = {
  solidityLoader : {
    test: /\.sol$/,
    use: [
      {loader: 'json-loader'},
      {
        loader: '@openzeppelin/solidity-loader',
        options: solidityLoaderOptions
      }
    ]
  },
  solidityLoaderOptions
}