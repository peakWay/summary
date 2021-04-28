
/**
 * 1.let声明的范围是块作用域
 * 2.let不能重复声明
 * 3.let不会声明提升,暂时性死区
 * 4.全局声明
 * 5.条件声明
 * 6.for循环中的let声明
 */


/* let声明的范围是块作用域 */

function foo1() {
    if (true) {
        var msg1 = '1';
        console.log(msg1);
    }
    console.log(msg1);
};
foo1();

// function foo2() {
//     if (true) {
//         let msg2 = '2';
//         console.log(msg2);
//     }
//     console.log(msg2); //ReferenceError
// };
// foo2();

/* let声明的范围是块作用域 */


/* let不能重复声明 */

// let name = 'oldman';
// let name = 'peak_way'; //SyntaxError

/* let不能重复声明 */


/* 暂时性死区 */

// console.log(age1); //ReferenceError
// let age1 = 18;
// console.log(age1);

/* 暂时性死区 */


/* 全局声明 */

var home1 = '湖南';
console.log(window.home1); //湖南

let home2 = '湖南';
console.log(window.home2); //undefined

/* 全局声明 */


/* 条件声明 */
//因为let的作用域是块，所以不可能检查前面是否已经使用了let，typeof或者try/catch都不行

if (typeof address == 'undefined') {
    let address;
}

address = '杭州';   //这个赋值等同于全局赋值
console.log(address);
/* 条件声明 */

/* for循环中的let应用 */
//在推出for循环时，var迭代变量保存的是导致循环推出的值，而let Javascript引擎会在后台为每个迭代循环声明一个新的迭代变量，每个setTimeout引用的是不同的变量实例
for(var i=0; i < 5; i++) {
    console.log(i);  //0,1,2,3,4
}

for(var i=0; i < 5; i++) {
    setTimeout(() => console.log(i), 0); //5,5,5,5,5
}
console.log(i);

// for(var i=0; i< 5; i++) {
//     console.log('a')
//     setTimeout(() => console.log('b'), 0);
// }
// console.log('c')

for(let i=0; i < 5; i++) {
    setTimeout(() => console.log(i), 0)
}
console.log(i)
/* for循环中的let应用 */