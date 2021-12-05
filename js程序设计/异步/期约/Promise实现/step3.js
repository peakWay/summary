


/**
 * Promise原理实现
 * 步骤3：resolve和reject函数还存在的问题解决
 * 1.我们都知道promise是为了实现异步，那么以当前的代码逻辑，在执行器逻辑中，若在调用resolve方法后仍然还有同步语句，那么同步语句就会在回调执行完后再执行，这肯定不行的，所以我们需要使用setTimeout将解决、兑现放到任务队列中
 * 2.还有一个问题，若resolve的值是个期约，那么回调会在解决的时候就触发，但在Promise/A+标准中规定回调必须要期约落定（兑现/拒绝）后才能开始，以期约值解决并未落定，所以需要等待期约值解决直至返回非期约值才能执行回调
 * 3.有个注意的点，等待执行器返回期约落定的逻辑在当前promise已落定的情况下,TODO:验证下test中1.js案例三和promise对比当前实现是否正确
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
                for (var i=0; i < self.onResolvedCallback.length; i++) {
                    self.onResolvedCallback[i](value);
                }
            }
        }, 0)
    }

    function reject(reason) {
        setTimeout(function() {
            if (self.status === 'pending') {
                self.status = 'rejected';
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
