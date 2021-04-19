
// define(['cmd'], function() {
//     console.log('cmd')

// })

// let person = seajs.use('./js/person_cmd');

define(function(require) {
    let person = require('./person_cmd');
    person.introduce()
})
