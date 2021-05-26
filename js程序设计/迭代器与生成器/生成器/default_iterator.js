

(function() {

    console.log('--------生成器作为默认迭代器--------')
    class Foo {
        constructor(arr) {
            this.arr = arr;
        }

        *[Symbol.iterator]() {
            yield* this.arr;
        }
    }

    let f = new Foo([1,2,3])
    for(let v of f) {
        console.log(v)
    }
    //1 
    //2
    //3
    console.log('--------生成器作为默认迭代器--------')

})()