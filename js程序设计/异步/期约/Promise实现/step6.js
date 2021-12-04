
/**
 * Promise原理实现
 * 步骤6：Promise/A+标准问题解决,用来满足不同Promise的交互
 * 1.解决的值不能为该promise对象，否则会死循环
 * 2.promise回调返回的期约对象需要判断是否已落定，若未落定将兑现控制交给下一层期约，“递归”至非期约值，否则直接返回落定期约的值
 * 3.x返回不一定是Promise，但可能实现了then属性但不遵守Promise标准的对象，then属性是可能是方法，可能是普通对象，也可能是基础类型。如果是方法则获取将其值进行下一次验证，其他情况直接x兑现
 */


 function Promise(executor) {
    var self = this;
    self.status = 'pending';    //期约状态
    self.data = null;           //兑现值
    self.onResolvedCallback = [];       //注册的兑现回调数组
    self.onRejectedCallback = [];       //注册的拒绝回调数组

    function resolve(value) {
        if (value instanceof Promise) { //无论状态是否落定都会落定期约值
            return value.then(resolve, reject);
        }

        setTimeout(function() {
            if (self.status === 'pending') {
                self.status = 'resolved';
                self.data = value;
                for (var i=0; i < onResolvedCallback.length; i++) {
                    onResolvedCallback[i](value);
                }
            }
        }, 0)
    }

    function reject(reason) {
        setTimeout(function() {
            if (self.status === 'pending') {
                self.status = 'rejected';
                self.data = reason;
                for (var i=0; i < onRejectedCallback.length; i++) {
                    onRejectedCallback[i](value);
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

    
    if (self.status === 'resolved') {
        return promise2 = new Promise(function(resolve, reject) {
            setTimeout(() => {
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
            setTimeout(() => {
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
                    var x = onResolved(self.data);
                    resolvePromise(promise2, x, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
            self.onResolvedCallback.push(function() {
                try {
                    var x = onRejected(self.data);
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
            })
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