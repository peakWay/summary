

/**
 * Promise原理实现
 * 步骤6：案例三失败问题
 * 验证下test中1.js案例三和promise对比当前实现是否正确：结果不正确。因为resolve一个期约时，状态还在等待状态，这里遇到第一个resolve就解决，不管解决值是不是期约，若是期约，回调需要等期约落定才能开始
 * 这个问题主要原因就是没分清楚resolve解决状态和fulfilled兑现状态，期约执行完后不管返回什么状态都会变成解决，但是只有落定（兑现/拒绝）状态才会去开始执行回调
 */

  
 function Promise(executor) {
    var self = this;
    self.status = 'pending';    //期约状态 pending等待、resolve解决、fulfilled兑现、rejected拒绝
    self.data = null;           //兑现值
    self.onResolvedCallback = [];       //注册的兑现回调数组
    self.onRejectedCallback = [];       //注册的拒绝回调数组

    function fulfill(value) {
        self.status = 'fulfilled';
        setTimeout(() => {
            self.data = value;
            for (var i=0; i < self.onResolvedCallback.length; i++) {
                self.onResolvedCallback[i](value);
            }
        }, 0);
    }

    function resolve(value) {
        setTimeout(function() {
            if (self.status === 'pending') {
                //解决状态
                self.status = 'resolved';

                if (value instanceof Promise) { 
                    return value.then(fulfill, reject);
                } else {
                    fulfill(value)
                }
            }
        }, 0)
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
        }

        setTimeout(function() {
            if (self.status === 'rejected') {
                self.data = reason;
                for (var i=0; i < self.onRejectedCallback.length; i++) {
                    self.onRejectedCallback[i](value);
                }
            }
        }, 0);
    }

    try { //考虑到执行executor的过程中有可能出错
        executor(resolve, reject);
    } catch(e) {
        reject(e);
    }
} 

Promise.prototype.then = function (onResolved, onRejected) {
    var self = this;  //在新期约对象执行器中要获取当前期约值，所以使用self变量
    var promise2;

    onResolved = typeof onResolved === 'function' ? onResolved : function(value) { /* 实现值的穿透 */ return value };
    onRejected = typeof onRejected === 'function' ? onRejected : function(reason) { /* 实现错误的穿透 */ throw reason };

    
    if (self.status === 'fulfilled') {
        return promise2 = new Promise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    var x = onResolved(self.data);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            }, 0)
        })
    }

    //与resolved状态类似，但执行的onRejected
    if (self.status === 'rejected') {
        return promise2 = new Promise(function(resolve, reject) {
            setTimeout(function() {
                try {
                    var x = onRejected(self.data);
                    resolvePromise(promise2, x, resolve, reject);
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
                    var x = onResolved(value);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            self.onRejectedCallback.push(function(reason) {
                try {
                    var x = onRejected(reason);
                    resolvePromise(promise2, x, resolve, reject);
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

/*resolvePromise函数即为根据x的值来决定promise2的状态的函数*/
function resolvePromise(promise2, x, resolve, reject) {
    var then;
    var thenCalledOrThrow = false;

    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise!'))
    }

    if (x instanceof Promise) {
        if (x.status === 'pending'){
            x.then(function(value) {
                //将控制逻辑判断交给下一个期约
                resolvePromise(promise2, value, resolve, reject);
            }, reject)
        } else {
            x.then(resolve, reject)
        }
        return;
    }

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            then = x.then;

            //判断then的类型
            if (typeof then === 'function') {
                then.call(x, function(y) {
                    if(thenCalledOrThrow) return;
                    thenCalledOrThrow = true;
                    return resolvePromise(promise2, y, resolve, reject);
                }, function(e) {
                    if(thenCalledOrThrow) return;
                    thenCalledOrThrow = true;
                    return reject(e);
                })
            } else {
                resolve(x);
            }
            
        } catch(e) {
            if(thenCalledOrThrow) return;
            thenCalledOrThrow = true;
            return reject(e)
        }
    } else {
        resolve(x);
    }
}

