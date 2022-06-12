//Lower bound, inclusive
    //initPoint inclusive
//Upper bound, exclusive
    //endPonit exclusive


var lowerBound = [];
var upperBound = [];

module.exports = {
  
	initialize: function(n, initPoint, endPoint){ //n: worker count, where n= 0,1,2...
		var leftPointRange=endPoint-initPoint;
		var workerPointRange=leftPointRange/n;
		for (var i=0; i<n; i++){
      var lowerBoundNum=initPoint+workerPointRange*i;
      var upperBoundNum=lowerBoundNum+workerPointRange;
			lowerBound.push(lowerBoundNum);
			upperBound.push(upperBoundNum);
		}
    },
    
    getUpperBound: function(workerNo) {
      return upperBound[workerNo];
    },
    
    getLowerBound: function(workerNo){
        return lowerBound[workerNo];
    },
}

    function encodeIntToPromoCode(intToEncode) { //we have 62 chars. Total mapping should cover 0 to (62^6)-1
      var codedNum=[];
      for (var i=0 ; i<6; i++){
        codedNum[i]=intToEncode%62;
        intToEncode=(intToEncode-codedNum[i])/62;
        if(i !== 5){
          codedNum[i+1]=intToEncode;
        }
      }
      return codedNum;
    }

    function decodePromoCodeToInt(promoCodeToInt) {
      var decodedNum=promoCodeToInt[0];
      for (var i=1 ; i<6 ;i++){
        decodedNum+=promoCodeToInt[i]*Math.pow(62,i);
      }
      return decodedNum;
    }