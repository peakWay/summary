
/**
 * 案例一
 * 当resolve一个Promise，then注册的回调不会执行
 */

function wait(duration) {
    return new Promise((resolve, reject) => {
        console.log(`等待${duration}毫秒中`);
        setTimeout(resolve, duration)
    })
}

//这种情况下直接进入回调
// Promise.resolve(() => wait(2000)).then(() => {console.log('进入回调')})

new Promise((resolve, reject) => {
    console.log('初始期约');
    resolve(wait(2000))
}).then(() => {console.log('进入回调')})

/**
 * 案例二
 * 给Promise注册多个回调
 * 在不同状态时注册，如果已落定会在之前pending状态下注册的所有回调执行后执行
 */

let p = wait(0);
p.then(() => {
    console.log('第一个回调执行');
    console.log(p);
    p.then(() => {
        console.log('状态落定后再添加')
    })
    console.log('执行位置')
})

console.log(p)
p.then(() => {
    console.log('第二个回调执行');
})

/**
 * 案例三
 * 当执行器存在多个resolve，不管resolve里面是不是期约值，都会以第一个resolve为兑现值
 */
new Promise((resolve, reject) => {
    console.log('当执行器存在多个resolve开始');

    // resolve(1)
    resolve(new Promise((resolve) => {
        setTimeout(() => {
            resolve(3)
        }, 2000)
    }))
    // wait(1000).then(() => resolve(3))
    resolve(2)
}).then(data => {
    console.log('多个resolve期约值', data)
})

/**
 * 案例四
 * 验证如果在promise已落定的情况下再resolve个期约值会不会再解开当前期约值
 */
let p1 = new Promise((resolve, reject) => {
    resolve(wait(500))
})

p1.then(() => {
    p1.then(() => wait(1000));
})