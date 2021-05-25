
# 相等操作符
主要有两种判断相等/不相等，全等/不全等，对应的符号为==/!=，===/!==
相等与全等的主要区别在于相等会进行类型转换后再对比，全等不会转换类型直接对比，

注：
- null与undefined相等
- 值为对象的变量相等需要指向同一个对象
- NaN不等于NaN

例子
```javascript
console.log(23 == '23') //true
console.log(23 === '23')  //false

let obj = {a: 1};
let obj1 = {a: 1};
console.log(obj == obj1)  //false;

let obj3 = obj2 = {a: 1};
console.log(obj3 == obj2);  //true
```
