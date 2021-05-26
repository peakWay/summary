
(function(){
    console.log('--------yield中断执行--------')
    function* generator() {
        console.log('停止前');
        yield '第一次停止';
        console.log('继续');
        yield '第二次停止';
        return '结束返回';
    }

    let g = generator();  
    //停止前

    console.log(g.next());  //{ value: '第一次停止', done: false }  
    //继续

    console.log(g.next());  //{ value: ‘第二次停止', done: false }
    console.log(g.next());  //{ value: '结束返回', done: true }

    let g1 = generator();
    let g2 = generator();
    console.log(g1.next());  //{ value: '第一次停止', done: false }  
    console.log(g2.next());  //{ value: '第一次停止', done: false }

    console.log('*****生成器对象作为可迭代对象*****')
    function* generator1() {
        yield 'one';
        yield 'two';
        return 'three';
    }
    let g3 = generator1();
    for (let v of g3) {
        console.log(v)
    }
    //one
    //two
    console.log('*****生成器对象作为可迭代对象*****')

    console.log('*****yeild输入和输出*****')
    function* generator2(initial) {
        console.log(initial);
        console.log(yield);
        console.log(yield);
    }

    let g4 = generator2('a');
    g4.next('b');  //第一次next用于启动生成器，参数无效
    g4.next('c');
    g4.next('d');
    //a
    //c
    //d

    function* generator3() {
        let res = yield;
        yield res;
    }

    let g5 = generator3();
    console.log(g5.next('a')); //{ value: undefined, done: false }
    console.log(g5.next('b')); //{ value: 'b', done: false }

    function* generator4() {
        return yield 'a';
    }
    let g6 = generator4();
    console.log(g6.next())     //{value: 'a', done: false} 
    console.log(g6.next('b')); //{value: 'b', done: true}
    console.log('*****yeild输入和输出*****')


    console.log('*****yield产生可迭代对象*****')
    function* fn() {
        yield 'a';
        yield 'b';
    }

    function* generator5() {
        yield* [1, 2, 3];
        yield* fn();
    }

    let g7 = generator5();

    for(let v of g7) {
        console.log(v);
    }
    //1
    //2
    //3
    //a
    //b

    function* subGenerator() {
        yield 'a';
        yield 'b';
        return 'c';
    }

    class Foo {
        [Symbol.iterator]() {
            let time = 0;
            let limit = 2;
            return {
                next() {
                    if (time < limit) {
                        return { value: time++, done: false }
                    } else {
                        return { value: 'end', done: true }
                    }
                }
            }
        }
    }

    function* generator6() {
        let res = yield* subGenerator();
        let res1 = yield* new Foo();
        yield res1;
        yield res;
    }

    let g8 = generator6();

    console.log(g8.next());   //{value: 'a', done: false}
    console.log(g8.next());   //{value: 'b', done: false}
    console.log(g8.next());   //{value: '0', done: false}
    console.log(g8.next());   //{value: '1', done: false}
    console.log(g8.next());   //{value: 'end', done: false}
    console.log(g8.next());   //{value: 'c', done: false}

    console.log('*****yield产生可迭代对象*****')

    console.log('*****yield实现递归算法*****')
    function* nTimes(n) {
        if(n > 0) {
            yield* nTimes(n - 1);
            yield n -1;
        }
    }

    let n = nTimes(3);
    for(let v of n) {
        console.log(v)
    }
    //0 
    //1
    //2
    console.log('*****yield实现递归算法*****')

    console.log('--------yield中断执行--------')
})()
