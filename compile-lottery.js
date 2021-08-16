const path = require('path');
const fs = require('fs');
const solc = require('solc');
 
const contractPath = path.resolve(__dirname, 'contracts','Lottery.sol');

const source = fs.readFileSync(contractPath, 'utf8');
const input = {
   language: 'Solidity',
   sources: {
      'Lottery.sol': {
         content: source,
      },
   },
   settings: {
      outputSelection: {
         '*': {
            '*': ['*'],
         },
      },
   },
};
const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(tempFile);
const contractFile = tempFile.contracts['Lottery.sol']['Lottery'];
console.log(contractFile);
module.exports = contractFile;
// console.log(solc.compile(source,1));