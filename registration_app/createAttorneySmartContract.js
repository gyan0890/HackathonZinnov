const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const assert = require('assert')

// Connect to local Ethereum node
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
console.log("web 3 version " + web3.version);

async function asynclogMetaData(){
    	//Getting all the accounts created by testrpc
	var accounts = await web3.eth.getAccounts();

	//Setting default account to an account number
    	web3.eth.defaultAccount = accounts[8];
	
	//Compile the smart contract and create bytecode and ABI
    	var input = fs.readFileSync('AttorneyBidding.sol');
	var output = solc.compile(input.toString(), 1);
	var bytecode = output.contracts[':AttorneyBidding'].bytecode;
	var data = '0x'+bytecode;
	var abi = JSON.parse(output.contracts[':AttorneyBidding'].interface);
	
	//Creation of a new contract
 	var contract =  new web3.eth.Contract(abi,null, {
    		from: web3.eth.defaultAccount
    	});

	//Deploy the contract and test it 
	contract.deploy({
		data: data
	}).send({
    		from: web3.eth.defaultAccount,
    		gas: 3000000,
    		gasPrice: '30000000000000'
	}).then(function(newContractInstance){
		console.log("Contract New Address"+newContractInstance.options.address) // instance with the new contract address
 		
		//Test the smart contract which picks the highest bidder
		async function test(){
			
			await newContractInstance.methods.enter().send({
      			from: accounts[8],
			value: 25
    	 		});

		        await newContractInstance.methods.enter().send({
      			from: accounts[9],
			value: 28
    			});
    			
			var LowestBidder = await newContractInstance.methods.pickLowestBidder().call({
      			from: accounts[8]
    			});
			
			console.log('Attorney bids are:'+'\n');
			console.log('Attorney 1: 25'+'\n');
			console.log('Attorney 2: 28' + '\n');
			console.log('Lowest Bidder is at index '+LowestBidder);
		}
		test();
	});

}

asynclogMetaData();

