const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    "profit hero endless tumble woman stadium rabbit legal energy else base fiber",
    "https://rinkeby.infura.io/v3/101fff01bf45414fa55795ffe6fafcf3"
);
 
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

const result = await new web3.eth.Contract(compiledFactory.abi)
   .deploy({data:'0x'+ compiledFactory.evm.bytecode.object})
   .send({from:accounts[0]});

  //  console.log(abi);
   console.log(JSON.stringify(compiledFactory.abi));
  // console.log(JSON.parse(abi));
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};

deploy();
