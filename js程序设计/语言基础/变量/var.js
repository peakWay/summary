
/**
 * 1.var声明作用域
 * 2.var声明提升
 * 3.重复声明
 * 重点: 在函数内定义变量时省略var操作符，则创建个全局变量
 */


/* var 声明作用域 */
//var声明的范围是函数作用域

// function foo1() {
//     var msg1 = '1'
// };
// foo1();
// console.log(msg1); //报错

function foo2() {
    msg2 = '2'
};
foo2();
console.log(msg2);

var msg3 = '3';
function foo3() {
    var msg3 = '3i';
    console.log(msg3);
}
foo3();
console.log(msg3);

var msg4 = '4';
function foo4() {
    msg4 = '4i';
    console.log(msg4);
}
foo4();
console.log(msg4);

var msg5 = '5'

if (true) {
    var msg5 = '5i'
}
console.log(msg5)
/* var 声明作用域 */

/* var声明提升 */
console.log(age1);
var age1 = 18;
console.log(age1);

function foo5() {
    console.log(age2);
    var age2 = 25;
    console.log(age2);
}
foo5();
// console.log(age2); //报错
/* var声明提升 */

/* 可以重复声明 */
var name = 'oldman';
var name = 'pead_way';
console.log(name);
/* 可以重复声明 */