'use strict'

function generateEvenNumbers(max) {
    return ['do it', 'do it', 'do it'];
};

function premiersNumbers(max) {
    var premiers=[];
    for(var i = 2; i <= max; i++) {
      var j = 1;
      var racine = Math.floor(Math.sqrt(i));
      do{
          j++;
        }while(j <= racine && i%j != 0);
        if(j > racine) {
          premiers.push(i);
        }
    };
    
    return premiers;
};

module.exports = {
    generateEvenNumbers,
    premiersNumbers
}
