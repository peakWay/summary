
/**
 * Promise原理实现
 * 步骤4：then注册回调（核心方法）
 * 1. 所有实例对象都有then方法，所以then是Promise的原型方法,接收两个参数兑现回调、拒绝回调
 * 2. Promise/A+标准规定then方法返回一个新的对象，实现期约链必定要返回一个新的期约对象
 * 3. then需要判断当前期约状态，如果状态已落定（兑现或拒绝）那么将当前期约值直接传给回调执行并使promise2落定，如果状态还在等待中，则向该期约注册当前回调，等该期约落定后开始执行回调
 * 5. promise可能不会传参数，所以需要定义默认的兑现回调和拒绝回调
 * 6. 在执行promise的回调时，可能会报错，需要捕获错误交给新期约拒绝回调处理
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

    onResolved = typeof onResolved === 'function' ? onResolved : function(value) {};
    onRejected = typeof onRejected === 'function' ? onRejected : function(reason) {};

    
    if (self.status === 'resolved') {
        return promise2 = new Promise(function(resolve, reject) {
            try {
                var x = onResolved(self.data);
                resolve(x);
            } catch (e) {
                reject(e);
            }
        })
    }

    if (self.status === 'rejected') {
        return promise2 = new Promise(function(resolve, reject) {
            try {
                var x = onResolved(self.data);
                resolve(x);
            } catch (e) {
                reject(e);
            }
        })
    }

    if (self.status === 'pending') {
        //注册的回调并不是只将onResolved或onRejected添加到onResolvedCallback或onRejectedCallback
        //如果这样promise2就不可能落定了，就无法执行promise2注册的回调函数了,期约链就无法连接
        return promise2 = new Promise(function(resolve, reject) {
            self.onResolvedCallback.push(function() {
                try {
                    var x = onResolved(self.data);
                    resolve(x);
                } catch (e) {
                    reject(e);
                }
            });
            self.onResolvedCallback.push(function() {
                try {
                    var x = onResolved(self.data);
                    resolve(x);
                } catch (e) {
                    reject(e);
                }
            });
        })
    }
}