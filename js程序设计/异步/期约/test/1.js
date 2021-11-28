
/**
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

