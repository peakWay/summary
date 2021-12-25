
/**
 * 内置对象经常会重写Object.prototype中的toString()
 * 比如[1,2].toString()会是'1,2'，(function a(){}).toString()会是'function a(){}'
 * 而Object.prototype.toString()会得到'[object Object]'，后面这个Object指构造函数名，比如数组就是'[object Array]'、函数就是'[object Function]'，自定义对象可以通过Symbol.toStringTag设置
 */

function classof (o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}

console.log(classof([]))           //Array
console.log(classof(() => {}))     //Function

class Range {
    get [Symbol.toStringTag]() {return 'Range'}
}

console.log(classof(new Range()))