// deploy code will go here
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const contractFile = require('./compile-inbox');
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

const provider = new HDWalletProvider(
    'denial burger rain private jealous excess panther include either cancel blade adjust',
    'https://rinkeby.infura.io/v3/804a4b60b242436f977cacd58ceca531'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    let result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: ['Hi here!']})
    .send({from: accounts[0], gas: '1000000'});

    console.log('Contract deployed to', result.options.address);
}

deploy();