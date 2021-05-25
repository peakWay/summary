
# 一元操作符
只能操作一个值的叫一元操作符，ECMAScript中有以下三种

## 递增/递减
递增符号为++，递减符号为--，当在计算时递增/递减符号在值的前面时，会先计算后求值。当在计算时递增/递减符号在值的后面时，会先求值后计算，下面以递增为例
```javascript
// 递增符号在前
let num = 1;
let num1 = ++num + 1;
console.log(num);   //2
console.log(num1);  //3
```
```javascript
//递增符号在后
let num = 1;
let num1 = num++ + 1;
console.log(num);   //2
console.log(num1);  //2
```
## 一元加
在值前加+符号，会将类型转换成数值，等效Number()

## 一元减
在值前加-符号，先将类型转换成数值，再执行正负值操作