pragma solidity ^0.4.16;
  
contract AttorneyBidding {
    uint[] public bidders;
    uint public minBidder;

    function enter() public payable {
        bidders.push(msg.value);
    }

    function pickLowestBidder() public view returns (uint index){
        minBidder = bidders[0];
        uint minIndex = 0;
        for(uint i=1; i<bidders.length; i++){
            if(bidders[i] < minBidder){
                minIndex=i;
                minBidder = bidders[i];
            }

        }
        return minIndex;
    }
    
}
