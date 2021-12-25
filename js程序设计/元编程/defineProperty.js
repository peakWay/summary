
/**
 * 对象的属性有两种：数据属性与访问器属性
 * 数据属性的4个特性是value、writable、enumerable和configurable
 * 访问器属性的4个特性是get、set、enumerable和configurable
 */

let o = {};

//创建属性，如果某个特性没设置，默认为false或者undefined
Object.defineProperty(o, 'x', {
    value: 1,
    writable: true,
    // enumerable: false,  //不设置默认为false
    configurable: true
})

console.log(o.x)    //1
//可枚举自有属性数组
console.log(Object.keys(o))   //[]

//更改属性特性，只改设置的特性，其他特性保留
Object.defineProperty(o, 'x', {
    writable: false
})


o.x = 2;  //静默失败，严格模式报错
console.log(o.x); //1

Object.defineProperty(o, 'x', {
    value: 2
})
console.log(o.x); //2

//设置为不可配置
Object.defineProperty(o, 'x', {
    configurable: false
})

//不可配置之后不能再将writable改成true
// Object.defineProperty(o, 'x', {
//     writable: true  //Error
// })

//不可配置之后不能将数据属性转换成访问器属性
// Object.defineProperty(o, 'x', { get: function() { return 3 } });  //Error

Object.defineProperties(o, {
    y: {
        value: 4,
        writable: false,
        enumerable: true
    },
    z: {
        get: function() {
            return this.y;
        },
        enumerable: true,
    },
    h: {
        value: 5
    }
})

console.log(Object.keys(o))
o.y = 6
console.log(o.y)
delete o.h   //h不可配置所以不能删除
console.log(o)