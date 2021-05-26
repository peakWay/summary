
# 迭代器
迭代器学习主要有以下几个方面:
- 背景与概念
- 迭代协议
- 迭代器协议
- 自定义迭代器
- 终止

## 背景与概念
在ECMAScript最初的版本，只能通过var arr = [1, 2], for(var i=0;i< 10;i++){ console.log(arr[i]) }这种迭代方式，这种迭代方式有几个缺点，一是数据结构比较固定，二是获取值需要通过索引的方式。后面ES5中Array.prototype.forEach解决了这需要依赖索引的这个问题，但是仍然不够好，还是有些问题，比如如何终止迭代。所以ES6引入了迭代器。
任何实现Iterable接口的数据结构都可以被实现了Iterator接口的结构消费。迭代器是个按需创建的一次性对象。每个迭代器都关联着一个可迭代对象。迭代器会提供关联的可迭代对象的接口Api，迭代器不会去了解可迭代对象的数据结构，只关心能否返回连续的值。

## 迭代协议
任何实现Iterable接口（可迭代协议）的数据结构都应该有两个特征：拥有自我识别能力和实现Iterator接口。这也以为着可迭代对象必须内部定义[Symbol.iterator]构造工厂函数。下面我们通过内置可迭代对象分析组成：
```javascript
//可迭代对象(实现了Iterable接口)
let arr = [1, 2, 3]   

//迭代器构造函数
let iterFunc = arr[Symbol.iterator]

//迭代器(实现了Iterator接口)
let iter = arr[Symbol.iterator]()

//迭代器api
let iterApi = iter.next

//迭代结果
let iterResult = iter.next()
```
内置可迭代对象有：
- 字符串
- 数组
- arguments参数
- Node节点

可迭代对象拥有以下内置信息特性:
- for-of
- 数组解构
- 扩展运算符
- Array.from
- 创建集合
- 创建映射
- Promise.all()
- Promise.race()

```javascript
let arr = [1, 2, 3]

//for-of
for (let v of arr) {
    console.log(v)
}
// 1
// 2
// 3

//数组解构
let [a, b] = arr
console.log(a, b) //1, 2

//扩展运算符
let arr1 = [...arr]
console.log(arr1) //[1, 2, 3]

//Array.from
let arr2 = Array.from(arr)

//集合
let map = new Map([arr.map(x => [x, x])])
console.log(map)  //[[1, 1], [2, 2], [3, 3]]

//映射
let set = new Set(arr)
console.log(set) //{1, 2, 3}
```

## 迭代器协议
迭代器是个实现Iterator接口（迭代器协议）的对象。它定义了一个序列，并在终止的时候可能返回一个返回值。迭代器是通过next()方法进行迭代，每次迭代会返回一个IteratorResult对象。该对象有两个属性，一个是done，如果迭代到序列中的最后一个，则为true，否则为false。另一个是value，即序列中的next值。当迭代到序列最后一个再调用next()方法，返回值仍为最后一个序列值
```javascript
let arr = [1, 2, 3];
let iter = arr[Symbol.iterator]();

console.log(iter.next());  //{ value: 1, done: false }
console.log(iter.next());  //{ value: 2, done: false }
console.log(iter.next());  //{ value: 3, done: false }
console.log(iter.next());  //{ value: undefined, done: true }
console.log(iter.next());  //{ value: undefined, done: true }
```

## 自定义迭代器
需要实现Iterator接口，并提供next方法获取每次迭代的IteratorResult对象
```javascript
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

let iter1 = f[Symbol.iterator]()
//无序列
for(let v  of iter1) {
    console.log(v, '无序列')
}
```
用上面这种方式每个实例只能迭代一次循环，可以通过闭包的方式解决这个问题
```javascript
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
```
## 提前终止
迭代器可选提供的return()方法用于指定在迭代器提前关闭前执行的逻辑。执行迭代的结构如果想让迭代提前关闭的可能的情况有：
- for-of循环中可以通过break、continue、return或throw提前退出
- 解构操作并未消费所有值
```javascript
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
```
并非所有的迭代器都是可以关闭的，也不能通过增加return()方法来关闭，但return()还会在终止时调用。
```javascript
let arr = [0, 1, 2];
    
let iter1 = arr[Symbol.iterator]()
    
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
```


