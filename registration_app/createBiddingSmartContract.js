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
    	web3.eth.defaultAccount = accounts[2];
	
	//Compile the smart contract and create bytecode and ABI
    	var input = fs.readFileSync('LandBidding.sol');
	var output = solc.compile(input.toString(), 1);
	var bytecode = output.contracts[':LandBidding'].bytecode;
	var data = '0x'+bytecode;
	var abi = JSON.parse(output.contracts[':LandBidding'].interface);
	
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
			var value = [75, 87, 72];
			await newContractInstance.methods.enter().send({
      			from: accounts[2],
			value: value[0]
    	 		});

			await newContractInstance.methods.enter().send({
      			from: accounts[1],
			value: value[1]
    			});
    
		        await newContractInstance.methods.enter().send({
      			from: accounts[4],
			value: value[2]
    			});
    			
			var highestBidder = await newContractInstance.methods.pickHighestBidder().call({
      			from: accounts[2]
    			});
		
			console.log('The property bids(in lakhs) are:');
			console.log('Bidder 1: '+ value[0] + '\n'); 	
			console.log('Bidder 2: '+ value[1] + '\n');
			console.log('Bidder 3: '+ value[2] + '\n');
			console.log('The Highest Bidder is: Bidder Number at index '+ highestBidder);
		}
		test();
	});

}

asynclogMetaData();

