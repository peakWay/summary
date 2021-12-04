
/**
 * Promise原理实现
 * 步骤5：then还存在的问题解决及catch方法
 * 1. 未考虑回调中返回期约值的情况，会导致promise2期约并未兑现（虽已解决）回调直接开始执行。所以我们需要对回调返回的值x进行判断，并将promise1的落定控制权交给回调返回的期约值promiseN。若一直嵌套返回期约，promise2的回调最终成为最后一个期约的回调，直到最终返回非期约，promise2的回调就会在最后一个期约兑现后执行
 * 2. 当期约promise1已落定时再注册回调时，会直接返回promise2，promise2的执行器会同步执行，这样会导致promise2后面同步代码会在执行器后执行，这样就导致了promise2失去了异步性，所以当promise1已落定注册的回调需要用setTimeout来实现异步。而等待中(pending)的回调只是将回调添加到回调列表中，等待promise1落定本身就是异步的，所以不需要
 * 3. catch就是then方法第一个参数为空，第二个参数为方法的简写，为了之后的方便，增加catch方法.
 * 4. 值的穿透，比较常见例子：Promise.resolve(1).then().then((value) => {})我们认为这里的value应该为1，但以之前的写法因为中间的then回调为空默认返回undefinded，所以value值为undefinded。还有错误的情况，new Promise((resolve) => { throw Error('error'); }).then(() => {}).catch((err) => {})一般把catch放到期约链的最后，能捕获到在链上任意位置抛出的第一个错误。
 */


 function MyPromise(executor) {
    var self = this;
    self.status = 'pending';    //期约状态
    self.data = null;           //兑现值
    self.onResolvedCallback = [];       //注册的兑现回调数组
    self.onRejectedCallback = [];       //注册的拒绝回调数组

    function resolve(value) {
        if (value instanceof Promise) { //无论状态是否落定都会落定期约值
            return value.then(resolve, reject);
        }

        if (self.status === 'pending') {
            setTimeout(function() {
                self.status = 'resolved';
                self.data = value;
                for (var i=0; i < onResolvedCallback.length; i++) {
                    onResolvedCallback[i](value);
                }
            }, 0)
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            setTimeout(function() {
                self.status = 'rejected';
                self.data = reason;
                for (var i=0; i < onRejectedCallback.length; i++) {
                    onRejectedCallback[i](value);
                }
            }, 0);
        }
    }

    try { //考虑到执行executor的过程中有可能出错
        executor(resolve, reject);
    } catch(e) {
        reject(e);
    }
} 

MyPromise.prototype.then = function (onResolved, onRejected) {
    var self = this;  //在新期约对象执行器中要获取当前期约值，所以使用self变量
    var promise2;

    onResolved = typeof onResolved === 'function' ? onResolved : function(value) { /* 实现值的穿透 */ return value };
    onRejected = typeof onRejected === 'function' ? onRejected : function(reason) { /* 实现错误的穿透 */ throw reason };

    
    if (self.status === 'resolved') {
        return promise2 = new Promise(function(resolve, reject) {
            setTimeout(() => {
                try {
                    var x = onResolved(self.data);
                    if (x instanceof Promise) {
                        x.then(resolve, reject);
                    } else {
                        resolve(x);
                    }
                } catch (e) {
                    reject(e);
                }
            }, 0)
        })
    }

    //与resolved状态类似，但执行的onRejected
    if (self.status === 'rejected') {
        return promise2 = new Promise(function(resolve, reject) {
            setTimeout(() => {
                try {
                    var x = onRejected(self.data);
                    if (x instanceof Promise) {
                        x.then(resolve, reject);
                    } else {
                        resolve(x);
                    }
                } catch (e) {
                    reject(e);
                }
            }, 0)
        })
    }

    if (self.status === 'pending') {
        //注册的回调并不是只将onResolved或onRejected添加到onResolvedCallback或onRejectedCallback
        //如果这样promise2就不可能落定了，就无法执行promise2注册的回调函数了,期约链就无法连接
        return promise2 = new Promise(function(resolve, reject) {
            self.onResolvedCallback.push(function(value) {
                try {
                    var x = onResolved(self.data);
                    if (x instanceof Promise) {
                        x.then(resolve, reject);
                    } else {
                        resolve(x);
                    }
                } catch (e) {
                    reject(e);
                }
            });
            self.onResolvedCallback.push(function() {
                try {
                    var x = onRejected(self.data);
                    if (x instanceof Promise) {
                        x.then(resolve, reject);
                    } else {
                        resolve(x);
                    }
                } catch (e) {
                    reject(e);
                }
            });
        })
    }
}

Promise.prototype.catch = function(onRejected) {
    return this.then(null, onRejected);
}