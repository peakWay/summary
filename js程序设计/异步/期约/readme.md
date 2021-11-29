
## 期约


正常期约链写法
```javascript
fetch('./text.txt')
    .then((response) => response.text())        //response返回是HTTP的表头相关信息,response.text是返回内容相应体的期约
    .then((text) => { console.log(text) })      
```
分解式期约写法
```javascript
let callback1 = function(response) {
    let promise3 = response.text();
    return promise3;
}
let callback2 = function(text) {
    console.log(text)
}
let promise1 = fetch('./text.txt').then(callback1);
let promise2 = promise1.then(callback2)
```
之前不理解为什么如果promise1期约回调函数中返回期约对象，promise2期约会等待返回的promise3期约对象允现后再执行下一个promise2的注册回调函数callback2。
通过Promise原理实现
```javascript
MyPromise.propotype.then = function(onResolved, onRejected) {
    var self = this;
    ...
        var promise2 = new Promise(function (resolve, reject) {
            try {
                let x = onResolved(self.data);

                //下面这段逻辑并没有完全满足Promise/A+标准
                if (x instanceof Promise) {
                    x.then(resolve);
                } else {
                    resolve(x);
                }
            } catch(err) {
                reject(err);
            }
        })
    ...
}
```
从上面代码中可以看出promise2的兑现方法变成了promise3的回调，也就是把控制权交给了promise3的兑现，相当于promise2的回调callback2变成了promise3的回调方法。若一直嵌套返回期约，promise2的回调最终成为最后一个期约的回调，直到最终返回非期约，promise2的回调就会在最后一个期约兑现后执行。