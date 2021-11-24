/**
 * Range对象表示一个数值范围{x: from <= x <= to}
 * Range定义了has方法用于测试给定数值是不是该范围成员
 * Range是可迭代的，迭代其范围内的所有整数
 */
class Range {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    has(x) { return typeof x ==='number' && x >= this.from && x <= this.to }

    toString() { return `{ x | ${this.from} ≤ x ≤ ${this.to} }` }

    //迭代器方法
    [Symbol.iterator]() {
        let next = Math.ceil(this.from);
        let to = this.to;

        //返回迭代器对象
        return {
            next() {
                //返回迭代器结果对象
                if (next <= to) {
                    return {
                        value: next++,
                        done: false
                    }
                } else {
                    return {
                        value: next,
                        done: true
                    }
                }
            },

            [Symbol.iterator]() { return this }
        }
    }
}

let range = new Range(1, 10);
let iter = range[Symbol.iterator]();
console.log(iter.next());
console.log([...iter]);
for (let x of range) console.log(x);
console.log([...new Range(-2, 2)]);


/**
 * 实现迭代器的map、filter方法
 */
function map(iterator, f) {
    let i = 0;
    let iter = iterator[Symbol.iterator]();
    return {
        [Symbol.iterator]() {return this},
        next() {
            let next = iter.next();
            if (next.done) {
                return {
                    value: undefined,
                    done: true
                }
            } else {
                return {
                    value: f(next.value, i++),
                    done: next.done
                };
            }
        }
    }
}
console.log([...map(new Range(1, 4), (x, i) => x*i)]);

function filter(iterator, f) {
    let i = 0;
    let iter = iterator[Symbol.iterator]();
    return {
        [Symbol.iterator]() {return this},
        next() {
            //无限循环等于while(true)
            for(;;) {
                let next = iter.next();
                if (next.done || f(next.value, i)) {
                    return next
                }
            }
            
        }
    }
}

console.log([...filter(new Range(1, 4), (x, i) => x % 2 === 0)]);