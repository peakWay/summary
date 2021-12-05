

/**
 * Promise原理实现
 * 步骤2：完成resolve和reject函数的编写
 * 1.首先这两个方法会被执行器函数内部调用，期约解决方式是resolve(value)，这里的resolve方法就是promise定义的resolve函数，这时的this指向的window时，我需要将this指向promise对象，有两种方式，一种使用变量作用域，将this赋值个另一个变量self，第二种就是传给执行器的参数使用bind方法把作用域指向promise，这里我选择第一种
 * 2.在这里有个容易漏的点，在执行器里面可能会调用多次resolve或者reject函数，在promise中状态status是唯一的，解决或者拒绝后就不能再改变了，所以在resolve和reject方法中必须判断状态是在pending才改变promise状态status
 */


 function Promise(executor) {
    var self = this;
    self.status = 'pending';    //期约状态
    self.data = null;           //兑现值
    self.onResolvedCallback = [];       //注册的兑现回调数组
    self.onRejectedCallback = [];       //注册的拒绝回调数组

    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.data = value;
            for (var i=0; i < self.onResolvedCallback.length; i++) {
                self.onResolvedCallback[i](value);
            }
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.data = reason;
            for (var i=0; i < self.onRejectedCallback.length; i++) {
                self.onRejectedCallback[i](value);
            }
        }
    }

    try { //考虑到执行executor的过程中有可能出错
        executor(resolve, reject);
    } catch(e) {
        reject(e);
    }
} 
