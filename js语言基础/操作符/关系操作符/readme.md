
# 关系操作符
判断两个值之间的关系，返回值为true或者false。有以下>, <, >=, <=这四种

- 如果有任一值为数值，则非数值类型按Number转换规则进行转换再比较

- 如果两个值都是字符串时，则按字符顺序比较字符编码的大小
```javascript
//大写B的编码为66，小写的a编码为97
console.log('B' > 'a');   //false 

//当两个字符都是字符串时，先取第一位比较大小，'2'的编码是50，'3'的编码为51
console.log('23' > '3');   //false
```
- 如果一个值为对象，另一个值为字符串时，则对象会调用toString再比较字符编码大小
```javascript
let obj = {a: 1}
//obj.toString()得到的结果为'[object Object]'

//第一个字符为[，编码为91, X编码为90
console.log(obj > 'Z') //true
```
- 如果两个值都是对象，两个对象都会先调用valueOf，若转换数值为NaN，则调用toString
```javascript
let obj = {a: 1}
let obj2 = {b: 2}
console.log(obj > obj2)  //这个时候都是NaN值的比较，必为false

obj.toString = function() {
    return 'a';
}
obj2.toString = function() {
    return 'b';
}
console.log(obj < obj2)   //valueOf的值为NaN，即调用toString,这种情况即为'a'与'b'两字符串的比较，结果为true 

obj.valueOf = function() {
    return 2;
}

obj2.valueOf = function() {
    return 1;
}
console.log(obj > obj2) //调用valueOf，这种情况即为2和1两数值比较，结果为true
```
