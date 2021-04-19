

// define('age', function(require, exports, module) {
//     exports.age = 25
// })

define(function(require, exports) {
    var name = require('./name_cmd');
    // var age = require('age');

    var introduce = function() {
        console.log(`hello!我是${name.name()}`);
    }

    exports.introduce = introduce
})