
define('name', function () {
    var name = function () {
        return 'peakWay'
    }

    return {name};
})

define('age', {age: 25})

define('person', ['name', 'age'], function(name, {age}) {
    let introduce = function() {
        console.log(`hello!我是${name.name()},今年${age}`);}

    return {
        introduce
    }
})