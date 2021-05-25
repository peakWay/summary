
/**
 * 全局变量
 * 全局变量中因为作用域的原因，在setName1函数的作用域中找不到obj1的变量，则向下查找，当在全局变量中找到时，更改全局变量中保存的引用值的动态属性，所以结果更改了全局变量
 */
var obj1 = new Object();
obj1.name = 'oldman';

function setName1() {
    obj1.name = 'peakWay';
}
setName1();
console.log(obj1.name); //peakWay

/**
 * 传递参数(1)
 * 传递参数将全局变量中保存的引用值传入，函数内部会复制到名叫obj的命名参数上，即arguments的一个槽位上，也指向了全局作用域中的内存对象。通过复制后的引用值更改了全局作用域内存中的动态属性，全局变量中的obj2也指向该对象内存，所以结果会变化
 */
var obj2 = new Object();
obj2.name = 'oldman';

function setName2(obj) {
    obj.name = 'peakWay';
}
setName2(obj2);
console.log(obj2.name);  //peakWay

/**
 * 传递参数(2)
 * 虽然传递的值与传递参数(1)中相同，但是obj变量重新赋值了局部作用域中内存对象的引用，所做的更改动态属性操作的是指向的是局部作用域中内存对象，所以全局变量中obj3指向的对象无更改
 */
var obj3 = new Object();
obj3.name = 'oldman';

function setName3(obj) {
    obj = new Object();
    obj.name = 'peakWay';
}
setName3(obj3);
console.log(obj3.name);  //oldman

