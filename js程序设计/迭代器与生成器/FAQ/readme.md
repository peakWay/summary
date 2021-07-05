
# FAQ

### 生成器在哪些情况下可以拿到之前的yield返回的值
- 生成器对象通过next()方法输入yield值
    ```javascript
    function* fn() {
        let a = yield {a: 1};
        let b = yield {b: 2};

        console.log(a);
        console.log(b);
    }

    let g = fn();
    //启动生成器
    let v1 = g.next();  
    //给变量a赋值{a: 1}
    let v2 = g.next(v1.value);  
    //给变量b赋值{b: 2}
    let v3 = g.next(v2.value);  
    ```
- 通过yield* 获取迭代器的返回值
    ```javascript
    function* getA() {
        return {a: 1};
    }

    function* getB() {
        return {b: 2};
    }

    function* generator() {
        let a = yield* getA();
        let b = yield* getB();

        console.log(a);
        console.log(b);
    }

    let g = generator();
    g.next();
    g.next();
    ```

- 生成器如何实现异步执行流
    ```javascript
    function delay(duration) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, duration)
        })
    }

    function* generator() {
        yield delay(2000);
        console.log('继续执行')
    }

    let g = generator();

    let v1 = g.next().value;
    v1.then(() => {
        g.next();
    })
    ```

    ```javascript
    function randomPromise(i) {
        const time = parseInt(Math.random() * 1000)

        return new Promise((resolve) => {
            console.log(time, i)
            setTimeout(() => {
                resolve(i);
            }, 1000)
        })
    }

    async function* generate() {
        let i = 0;
        while(i < 5) {
            yield randomPromise(i);
            i++;
        }
    }

    let iter = generate();

    (async function() {
        for await(let k of iter) {
            console.log(k);
            if (k > 2) {
                break;
            }
        }
    })()
    ```