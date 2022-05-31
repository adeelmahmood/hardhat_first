require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();
require('hardhat-gas-reporter');
require('solidity-coverage');

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const ROPSTEN_URL = process.env.ROPSTEN_URL || "https://eth-ropsten";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHER_SCAN_KEY = process.env.ETHER_SCAN_KEY || "key";
const COINMARKETCAP_KEY = process.env.COINMARKETCAP_KEY || "key";

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: ROPSTEN_URL,
      accounts: [PRIVATE_KEY],
      chainId: 3
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337
    }
  },
  etherscan: {
    apiKey: ETHER_SCAN_KEY
  },
  gasReporter: {
    enabled: false,
    outputFile: 'gas-report.txt',
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKETCAP_KEY
  }
};
