
# 变量
var可以在ECMAScript所有版本中使用，let、const只能在ES6及其之后的版本

## var
- var声明作用域是函数作用域
- var声明提升
- var可以重复声明

代码示例在var.js文件中

注：在函数中如果省略var操作符，则会创建个全局变量

## let
- let声明作用域是块作用域
- let不能重复声明
- let暂时性死区，不会声明提升
- let在全局作用域声明时，不会创建全局变量。即window.xx访问不到
- let条件声明，由于块作用域原因，不能用typeof或try/catch进行条件声明
- for循环中的let

代码示例在let.js文件中

注：for循环，var循环退出时,迭代变量保存的是导致循环退出的值，在之后的setTimeout所有的i都指向同一个变量。而let循环退出时，Javascript引擎会为每个迭代循环声明一个新的迭代变量，之后的setTimout引用的是不同的变量实例。

## const
- const声明作用域也是块作用域，行为与let基本相同
- const必须初始化值，一般是常量
- const不能修改值和引用，但可以修改对象中的属性


