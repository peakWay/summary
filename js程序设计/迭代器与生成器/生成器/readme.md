
# 生成器
生成器是ES6新增的一种灵活的结构，拥有让函数块内暂停和恢复代码执行的能力。
主要通过下面几方面来学习：
- 生成器基础
- yield中断执行
- 生成器作为默认迭代器
- 提前终止生成器

## 生成器基础
生成器的形式是一个函数，函数前面增加一个星号(*)表示它是一个生成器，只要可以定义函数的地方，就能定义生成器.星号在function关键字与函数名之间的空格对生成器的定义无影响。

调用生成器函数会产生一个生成器对象。生成器对象一开始处于暂停状态，它类似迭代器，生成器对象实现了Iterator接口，所以具有next()方法，调用该方法可以开始或恢复执行
```javascript
function* generator() {}

let g = generator();

console.log(g); //generator {<suspended>}
console.log(g.next()) //{value: undefined, done: true}
```
value是生成器函数的返回值，默认值是undefined
```javascript
function* generator1() {
    return 'oldman'
}

let g1 = generator1();
console.log(g1.next().value) // oldman
```

生成器对象也是个可迭代对象，实现了iterable接口，且默认的迭代器是自引用的
```javascript
function* generator() {}
let g = generator();

let iter = g[Symbol.iterator]();  
console.log(iter); //generator1 {<closed>}
console.log(iter === iter[Symbol.iterator]())  //true
```

## yield中断执行
yield关键字可以让生成器停止和开始执行，这是生成器最有用的地方。生成器函数在遇到yield会正常执行。遇到yield后，执行会停止，函数作用的状态会被保留。之后只能通过调用生成器对象的next()方法恢复执行，生成器类似迭代器，它是以yelid的值作为每次迭代value的值。当函数return或者执行到最后一条语句时，生成器迭代就会结束，如果是以return结束，最后IteratorResult对象中的value就为return返回值，否则为undefined
```javascript
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
```
生成器函数内部的执行流程会对每个生成器对象区分作用域，即调用相同生成器函数生成的生成器对象是独立的。
```javascript
function* generator() {
    yield '第一次停止';
    yield '第二次停止';
    return '结束返回';
}

let g1 = generator();
let g2 = generator();
console.log(g1.next());  //{ value: '第一次停止', done: false }  
console.log(g2.next());  //{ value: '第一次停止', done: false }
```
通过yield中断执行有以下几种特点：
- 生成器对象作为可迭代对象
- 使用yield实现输入和输出
- yield*产生可迭代对象
- 使用yield*实现递归算法

### 生成器对象作为可迭代对象
因为生成器对象实现了Iterable接口，所以可以被迭代器消费
```javascript
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
```

### 使用yield实现输入和输出
yield可以作为函数的中间参数，通过next()方法的第一个参数传入，但是第一次next()的参数是无效的，因为第一次是用来启动生成器的，传入的参数可以在之后的代码中使用.
```javascript
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
```
yield也能通过return输出
```javascript
function* generator4() {
    return yield 'a';
}
let g6 = generator4();
console.log(g6.next())     //{value: 'a', done: false} 
console.log(g6.next('b')); //{value: 'b', done: true}
```

### yield*产生可迭代对象
yield后面加星号(*)可以产生可迭代对象,它本质就是将关联迭代器序列化迭代出每一个值
```javascript
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
```
yield*得到的值为关联迭代器的返回done: true时的value值，并且可以将其返回值作用于之后的逻辑中
```javascript
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
```

### 使用yield*实现递归算法
yield*最有用的功能应该就是实现递归算法了
```javascript
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
```

## 生成器作为默认迭代器
因为生成器实现了Iterator接口，而且生成器函数和默认迭代器被调用后都产生迭代器，所以生成器很适合做默认迭代器
```javascript
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
```

## 提前终止生成器
与迭代器类型相比，生成器对象不仅提供return()方法，还提供throw()方法这两个方法都能提前终止生成器
生成器return()方法会立即终止生成器，而迭代器调用return()不一定会终止，比如数组
```javascript
function* generator() {
    for(let x of [1, 2, 3]) {
        yield x;
    }
}

let g = generator();

console.log(g.next())    //{value: 1, done: false}
console.log(g.return(4)) //{value: 4, done: true} 
console.log(g.next())    //{value: undefined, done: true}
```
生成器throw方法如果在迭代内部捕获了，就只会跳过一个值，并不会终止生成器
```javascript
let g1 = generator();
console.log(g1) //generator{<suspended>}
try {
    g1.throw('err');
} catch(e) {
    console.log(e);  //err
}

console.log(g1) //generator{<closed>}

function* generator2() {
    for(let x of [1, 2, 3]) {
        try {
            yield x
        } catch(err) {
            console.log(err)
        }
    }
}

let g2 = generator2();
console.log(g2.next())        //{value:1, done: false}
g2.throw('err')
console.log(g2.next())
```





