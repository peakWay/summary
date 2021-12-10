
function wait(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration)
    })
}

async function asyncAwait () {
    await wait(1000);
    console.log('执行回调');
}

asyncAwait();