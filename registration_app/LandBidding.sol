pragma solidity ^0.4.16;
  
contract LandBidding {
    uint[] public bidders;
    uint public maxBidder;

    function enter() public payable {
        bidders.push(msg.value);
    }

    function pickHighestBidder() public view returns (uint index){
        maxBidder = bidders[0];
        uint maxIndex = 0;
        for(uint i=1; i<bidders.length; i++){
            if(bidders[i] > maxBidder){
                maxIndex=i;
                maxBidder = bidders[i];
            }

        }
        return maxIndex;
    }
    
}
