
(function() {
    console.log('--------终止迭代器--------')
    class Foo {
        constructor(limit) {
            this.limit = limit
        }
    
        [Symbol.iterator]() {
            let time = 0;
            //闭包变量赋值
            let limit = this.limit;
            return {
                next() {
                    if (time < limit) {
                        return { done: false, value: time++ }
                    } else {
                        return { done: true }
                    }
                },
    
                return() {
                    console.log('提前结束')
                    return {done: true}
                }
            }
        }
    }
    
    let f = new Foo(3);
        
    for (let v of f) {
        console.log(v) 
    }
    //0
    //1
    //2
    
    for (let v of f) {
        console.log(v)
        if (v > 0) {
            break;
        }
    }
    //0
    //1
    //提前结束

    let f1 = new Foo(3);
    let [a, b] = f1;  //提前结束
    
    //该自定义的迭代器是个对象，无法使用内置信息对该迭代器执行迭代
    // for (let v of iter)   //Error
    
    let arr = [0, 1, 2];
    
    let iter1 = arr[Symbol.iterator]()
    
    //内置迭代对象的迭代器返回是其自身
    console.log(iter1 === iter1[Symbol.iterator]())  //true
    
    iter1.return = function () {
        console.log('增加return方法并不能让不能关闭的迭代器关闭')
        return {done: true}
    }
    
    for (let v of iter1) {
        console.log(v)
        if (v > 0) {
            break;
        }
    }
    //0
    //1
    
    //虽然中止了，但是迭代器未关闭，仍然存在
    for (let v of iter1) {
        console.log(v, '继续')
    }
    //2
    console.log('--------终止迭代器--------')
})()