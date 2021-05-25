
# 生成器
生成器是ES6新增的一种灵活的结构，拥有让函数块内暂停和恢复代码执行的能力。

## 生成器基础
生成器的形式是一个函数，函数前面增加一个星号(*)表示它是一个生成器，只要可以定义函数的地方，就能定义生成器.星号在function关键字与函数名之间的空格对生成器的定义无影响。

调用生成器函数会产生一个生成器对象。生成器对象一开始处于暂停状态，它类似迭代器，生成器对象实现了Interator接口，所以具有next()方法，调用该方法可以开始或恢复执行
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

