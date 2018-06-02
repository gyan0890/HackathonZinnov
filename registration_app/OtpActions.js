module.exports = {
validateAadhar: function(aadharnumber){
     return true;
},

createOTP: function(){
    var random = require('random-number');
     var options = {
  min:  10000000,
 max:  99999999,
integer: true
}
return random(options);
}

};
