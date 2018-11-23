(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict'

var my_shared_code_headless = require('./my_shared_code_headless')

function writeContent() {
    console.log('TODO: Replace this by actual code')
    console.log('Write the 20 first even numbers,')
    console.log('one per second')
    var numbers = my_shared_code_headless.generateEvenNumbers(20)
}

module.exports = {
    writeContent
}

},{"./my_shared_code_headless":1}],3:[function(require,module,exports){
'use strict'

var my_shared_code_ui = require('../../my_shared_code_ui')
var body_elem = document.getElementsByTagName('body')[0]

my_shared_code_ui.writeContent(body_elem)

},{"../../my_shared_code_ui":2}]},{},[3]);
