
(function() {
    console.log('--------自定义迭代器--------')

    class Foo {
        constructor(limit) {
            this.time = 0
            this.limit = limit;
        }

        next() {
            if (this.time < this.limit) {
                return { value: this.time++ , done: false }
            } else {
                return { done: true }
            }
        }
        
        [Symbol.iterator]() {
            return this
        }
    }

    let f = new Foo(3);
    let iter = f[Symbol.iterator]()

    console.log(iter.next())  // { value: 1, done: false }
    console.log(iter.next())  // { value: 2, done: false }
    console.log(iter.next())  // { value: 3, done: false }
    console.log(iter.next())  // { done: true }

    //无序列
    for(let v  of f) {
        console.log(v, '无序列')
    }

    /* 闭包的方式 */
    class CFoo {
        constructor(limit) {
            this.limit = limit
            console.log(this.limit)
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
                }
            }
        }
    }

    let cf = new CFoo(3);
    let iter2 = cf[Symbol.iterator]();
    console.log(iter2.next())  //{done: false, value: 0}
    console.log(iter2.next())  //{done: false, value: 0}
    console.log(iter2.next())  //{done: false, value: 0}
    console.log(iter2.next())  //{done: true}
    
    for (let v of cf) {
        console.log(v) 
    }
    //0
    //1
    //2
    
    for (let v of cf) {
        console.log(v)
    }
    //0
    //1
    //2
    
    console.log('--------自定义迭代器--------')
})()