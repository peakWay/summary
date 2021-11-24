
// 生成器例子
function* generator() {
    yield 4;
    yield 6;
    yield 7;
    yield 2;
}

/* 斐波那契数列 */
function* fibonacciFn() {
    let x = 0, y = 1;
    while(true) {
        yield y;
        [x, y] = [y, x+y];
    }
}

function getFibonacciValue(n) {
    for(let v of fibonacciFn()) {
        if(n-- < 1) return v
    }
}

console.log(getFibonacciValue(20), '生成器-斐波那契数列');

//不通过生成器实现
function getFibonacciValueNoIterator(n) {
    let x = 0, y = 1;
    while(n-- > 0) {
        [x, y] = [y, x+y];
    }
    return y;
}

console.log(getFibonacciValueNoIterator(20), '非生成器-斐波那契数列');
/* 斐波那契数列 */

/* take迭代对象 */
//生成器方式实现
function* take(n, iterator) {
    let iter = iterator[Symbol.iterator]();

    while(n-- > 0) {
        let next = iter.next();

        if (!next.done) {
            yield next.value;
        }
    }
}

console.log([...take(5, fibonacciFn())], '生成器-take迭代对象-无限循环');
console.log([...take(6, generator())], '生成器-take迭代对象-获取数超出有限循环')

//数组方式实现（失败）
//当n的长度超过了迭代对象的长度，这个就会造成满足不了返回条件，无返回
//如果将返回移到for/of外，那无限循环的生成器会造成崩溃
function takeByArray(n, iterator) {
    let arr = [];
    for(let v of iterator) {
        arr.push(v);
        if (n-- < 1) return arr;
    }
}
console.log(takeByArray(5, fibonacciFn()), '数组-take迭代对象-无限循环');
console.log(takeByArray(6, generator()), '数组-take迭代对象-获取数超出有限循环');   //报错
/* take迭代对象 */

/* zip迭代对象(多迭代之间的元素整合) */
function* zip(...iterator) {
    let iters = iterator.map(item => item[Symbol.iterator]());
    let index = 0;

    while(iters.length > 0) {
        if (index >= iters.length) {
            index = 0;
        }

        let next = iters[index].next();
        if (next.done) {
            iters.splice(index, 1);
        } else {
            yield next.value;
            index++;
        }
    }
}

//数组方式由于获取元素依赖牵引不好实现
function zipByArray(...iterator) {
    let arr = []
    // iterator.forEach()
}

console.log([...zip(generator(), 'ab')], '生成器-zip迭代对象')
/* zip迭代对象(多迭代之间的元素整合) */


