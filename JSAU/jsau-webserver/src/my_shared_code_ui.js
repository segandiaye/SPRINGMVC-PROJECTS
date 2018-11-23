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
