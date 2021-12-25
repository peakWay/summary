

/* Object.assign()只能可枚举属性和属性值，但不复制属性的特性*/
let o = {}
Object.defineProperties(o, {
    year: {
        get: function() {
            return this._year;
        },
        enumerable: true
    }
})
console.log(o.year);  //undefinded
let oc = Object.assign({_year: 2018}, o);
console.log(oc.year);  //undefinded  //由于Object不复制特性，复制到目标对象的访问器属性year是获取对象的返回值，而不是获取函数方法所以得到的是undefinded


/**
 * 定义一个新的Object.assignDescriptors()函数
 * 这个函数与Object.assign类似，只不过会从源对象向目标对象复制属性描述符，不仅仅复制属性的值
 * 需要处理可枚举的和不可枚举所有自有属性和符号
 */

Object.defineProperty(Object, 'assignDescriptors', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function(target, ...sources) {
        for(let source of sources) {
            //处理可枚举的和不可枚举所有自有属性
            for(let name of Object.getOwnPropertyNames(source)) {
                Object.defineProperty(target, name, Object.getOwnPropertyDescriptor(source, name));
            }

            for(let symbol of Object.getOwnPropertySymbols(source)) {
                Object.defineProperty(target, symbol, Object.getOwnPropertyDescriptor(source, symbol));
            }
        }
        return target;
    }
})

let od = Object.assignDescriptors({_year: 2018}, o);
console.log(od.year);  //2018
