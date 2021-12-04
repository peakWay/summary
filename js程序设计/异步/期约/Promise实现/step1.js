
/**
 * Promise原理实现
 * 步骤1：初始化
 * 1.需要个执行器，执行器来控制什么时候解决或拒绝
 * 2.这里我首先用this来定义属性，resolve里面有需要
 * 注：使用ES5来编写
 */


function MyPromise(executor) {
    this.status = 'pending';    //期约状态
    this.data = null;           //兑现值
    this.onResolvedCallback = [];       //注册的兑现回调数组
    this.onRejectedCallback = [];       //注册的拒绝回调数组

    function resolve(value) {
        //TODO:
    }

    function reject(reason) {
        //TODO:
    }

    try { //考虑到执行executor的过程中有可能出错
        executor(resolve, reject);
    } catch(e) {
        reject(e);
    }
} 
