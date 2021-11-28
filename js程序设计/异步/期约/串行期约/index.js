
/**
 * 串行期约
 * 定义：指按顺序运行任意数量的期约
 * 实现方式：
 * 1.构建一个线性的长期约链（多米诺骨牌）
 * 2.构建一系列相互嵌套的期约（俄罗斯套娃）
 */

/**
 * 长期约链实现URL数组
 * 错误的处理传播给调用者
 */
function fetchSequentially(urls) {
    //用来存储每个URL返回的响应体
    let bodies = [];

    //获取某个URL响应体的期约
    function fetchUrl(url) {
        return fetch(url)
            .then((response) => response.text())
            .then((body) => {
                //将响应体保存到bodies中
                //并将期约允现
                bodies.push(body)
            });
    }

    //创建期约链起点
    let p = Promise.resolve(undefined)

    //循环URL数组，构建任意长度的期约链
    //每个环节都会拿取一个URL的响应体
    for (let url of urls) {
        p.then(() => fetchUrl(url));
    }

    //将响应体数组通过期约返回
    return p.then(() => bodies);
}

/**
 * 相互嵌套
 * 根据随意的input值长度用相同的请求函数获取最终响应体数组
 * promiseMarker需要返回值的期约
 */

function promiseSequence(inputs, promiseMarker) {
    //创建数组副本
    inputs = [...inputs];

    //获取嵌套期约回调的函数
    //它的伪递归是核心逻辑
    function handleNextInput(outputs) {
        if(inputs.lengths === 0) {
            //如果没有输入值了，则返回输出值的数组
            //该值是非期约值，将以它兑现
            return outputs;
        } else {
            //抽取当前副本第一个输入值
            let nextInput = inputs.shift();
            //递归执行每层期约
            promiseMarker(nextInput)
                .then((output) => outputs.concat(output))
                .then(handleNextInput)
        }
    }

    //返回构建的嵌套期约
    return Promise.resolve([]).then(handleNextInput);
}


function fetchBody(url) { fetch(url).then((response) => response.text()) }

promiseSequence(urls, fetchBody)
    .then(bodies => { /* 处理字符串数组 */ })
    .catch((err) => { /* 处理错误 */ })