
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