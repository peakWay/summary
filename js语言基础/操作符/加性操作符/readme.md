
# 加性操作符
加性操作符有两种：加法操作符、减法操作符

## 加法操作符
值之间的用+表示，加法是一种比较特殊的操作符，它并不会将所有值都转换数值型，它主要有两种转换方向，数值与字符串，其中字符串的级别更高。

- 当两个值都为数值/null/undefined/布尔值中的类型时，会将值转换成数值进行加法运算
    ```javascript
    let a = null;
    let b = 3;
    let c = true;

    console.log(a + b); //3
    console.log(b + c); //4
    ```
- 当值为对象时，会先调用valueOf方法获取数值，当返回值为NaN时，再调用toString方法获取值
    ```javascript
    //当valueOf返回等于NaN的情况
    let obj = { a: 1 };
    let num = 2;
    let str = 'str';

    console.log(obj + num); //"[object Object]2"
    console.log(obj + str); //"[object Object]str"

    //设置对象的toString方法
    obj.toString = function() {
        return 'obj'
    }

    console.log(obj + num); //"obj2"
    console.log(obj + str); //"objstr"

    //设置对象的valueOf方法
    obj.valueOf = function() {
        return 1
    }

    console.log(obj + num); //3
    console.log(obj + str); //"1str"
    ```
- 当任一值为字符串时，另一个非对象的值都会转换成字符串，然后返回字符串拼接后的值
    ```javascript
    let u;
    let n = null;
    let num = 1;
    let b = true;
    let s = 'str';

    console.log(s + u);  //"strundefined"
    console.log(s + n);  //"strnull"
    console.log(s + num); //"str1"
    console.log(s + b);  //"strtrue"
    ```

## 减法运算符
值之间用-表示，所有值都会执行对应转换，等效于Number()转换

