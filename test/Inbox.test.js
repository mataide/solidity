const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const contractFile = require('../compile-inbox');
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;
 
let accounts;
let inbox;
 
beforeEach(async ()=>{
    // get a list o all accounts
    accounts = await web3.eth.getAccounts();
    //Use one of them accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: ['Hi here!']})
    .send({from: accounts[0], gas: '1000000'});
});
 
describe('Inbox', ()=>{
    it('deploys a contract',()=>{
        //console.log(inbox);
        assert.ok(inbox.options.address);
    });

    it('has a message',async ()=>{
      //console.log(inbox);
      const message = await inbox.methods.message().call();
      assert.equal(message, 'Hi here!');
    });

    it('can change the message',async ()=>{
      //console.log(inbox);
      await inbox.methods.setMessage('Bye World').send({ from: accounts[0]});
      const message = await inbox.methods.message().call();
      assert.equal(message, 'Bye World');
    });
});