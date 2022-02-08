
/**
 * 该例子主要是模拟yield各种值的情况得到的返回
 * 是用来研究为什么react-saga里面的call(函数)怎么拿到的result值
 * 如果yield的是promise并调用，那么next()得到的值即为promise，并且promise会在调用时执行但无注册回调。即拿不到解决或者拒绝值。
 */

(function() {
    function delay(duration, throwError = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                !throwError ? resolve('success') : reject('error')
            }, duration)
        })
    }
    
    function noReturnFunc() {
        console.log('---这是无返回函数---')
    }
    
    function normalReturnFunc() {
        console.log('---正常返回函数---');
        return 1;
    }
    
    function promiseResolveReturnFunc() {
        console.log('---期约返回解决---');
        return delay(10000)
    }
    
    function promiseRejectReturnFunc() {
        console.log('---期约返回拒绝---');
        return delay(10000, true)
    }
    
    function* generator() {
        let res1 = yield noReturnFunc();
        console.log(res1);
        let res2 = yield normalReturnFunc();
        console.log(res2);
        let res3 = yield promiseResolveReturnFunc;
        console.log(res3);
        let res4 = yield promiseRejectReturnFunc;
        console.log(res4);
        return 'finished';
    }

    let iter = generator();
    console.log([...iter]);
    let iter1 = generator();
    let res1 = iter1.next();
    let res2 = iter1.next(res1);
    let res3 = iter1.next(res2);
    let res4 = iter1.next(res3);
    let res5 = iter1.next(res4);
    let res6 = iter1.next(res5);
    let res7 = iter1.next(res6);
})()