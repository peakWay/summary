
# 模块化
随着javascript的发展，javascript的应用领域越来越广泛，项目越来越复杂，工程代码越来越庞大，代码的管理越来越广泛，模块化的呼声也越来越大。本文主要包含以下几部分内容：

- 模块化是什么
- 为什么要模块化
- 模块化的写法
- 主流模块化规范

## 模块化是什么
- 模块化是一种管理方式
- 模块化是一种生产方式
- 模块化是一个实现特定功能的程序语句的集合（函数方法和数据结构的集合）
- 模块化具有独立作用域，对外暴露特定的功能接口

## 为什么要模块化
- 项目越来越大
- 代码越来越复杂
- 代码的复用需求
- 原始javascript模块文件的问题（下节模块化的写法中会介绍）

## 模块化的写法
### 1.原始全局写法

```javascript
//name.js
function name() {
  return 'peakWay';
}

//age.js
function age() {
  return 25;
}

//introduce.js
function introduce(name, age) {
  console.log(`hello!我是${name},今年${age}`);
}
```
上面我们定义了三个文件，其中第三个文件需要依赖第一个和第二个文件。一般会这么写：

```javascript
//...

<script src="name.js"><script>
<script src="age.js"><script>
<script src="introduce"><script>
<script>
   introduce(name(), age());
</script>
```
从上面可以总结出以下几个问题

- 全局变量被污染
- 模块的引入顺序容易出错
- 模块之间的依赖关系不明显

### 2.闭包写法
可以解决部分原始全局变量被污染的问题

```javascript
var person = (function(){
    function name() {
      return 'peakWay'
    }
    function age() {
      return 25;
    }
  
    function introduce() {
      return `hello!我是${name()},今年${age()}`;
    }

    return {
        age: age(),
        introduce
    }
})()
```

### 3.放大模式
可以实现依赖，拓展，继承功能

```javascript
const groupPerson = (function(person) {
    person.ageGroup = function() {
        return person.age > 18 ? '成年人' : '未成年人'
    }

    return person;
})(person)

console.log(groupPerson.ageGroup()) //成年人
```

## 主流模块化规范
主要从背景、优缺点、使用来分析
- CommonJS
- AMD
- CMD
- ES6

### CommonJS
#### 背景
CommonJS制定者最初是想做出不依赖任何浏览器环境的模块化标准，但是忽略了浏览器无法改变的因素，如网络因素以及单线程阻塞的问题，而且浏览器也无法提供CommonJS所需要的四个变量module.exports、exports、global和require，所以现在主要用于Node.js环境中。CommonJS可以被细分CommonJS1和CommonJS2，区别在于CommonJS1只能使用exports.XX = XX导出，而CommonJS2还可以使用module.exports = XX导出。后面默认为CommonJS2

#### 优点
- CommonJs可以复用于Node.js环境，例如同构应用
- 大量Npm第三方模块都采用了该规范

#### 缺点
- 无法直接应用在浏览器，必须通过工具转换成ES5

#### 使用
- 每个文件就是一个模块，拥有独立的作用域，外部只能通过接口访问
- 可以通过exports或module.exports对模块进行导出
- 通过require进行导入
- 按顺序同步加载
- 每个模块只会在第一次加载时运行，然后会被缓存供后续使用

##### 导出
CommonJS导出的是个对象，一般使用以下方式导出,exports其实是module.exports的引用，所以更改module.export会使export失效。
```javascript
module.exports.name = function () {
  return 'peakWay'
}
```
或
```javascript
exports.name = function () {
  return 'peakWay'
}
```
##### 导入
```javascript
const myModule = require('./MyModule') //如果没有后缀，则按.js、.json和.node次序进行补齐查找
```

##### 加载
整个加载过程
- 现在缓存中查找
- 如果缓存中没有，检查是否是核心模块，是直接加载
- 如果不是核心模块，检查是否是文件模块，如果是解析出文件的绝对路径，然后加载
- 如果以上都不是，则沿当前路径向上逐级递归，直到根目录的node_modules目录

### AMD
#### 背景
AMD是为了解决浏览器端(原始全局写法)存在的一些问题：
- 大量使用script标签以及全局变量污染问题
- 需要手动控制加载顺序
- CommonJS存在的问题：每个文件就是一个模块、浏览器不易使用等

#### 优点
- 代码可运行在浏览器和Node.js环境中
- 异步加载
- 可并行加载多个依赖

#### 缺点
- Javascript环境没有原生支持AMD，需要引入AMD库（一般为RequireJS）

#### 使用
AMD规范是利用require.config()指定引用路径，用define()定义模块，用require加载

首先我们需要引入require.js和一个入口文件main.js
```javascript
<script src="script/require.js" data-main="js/main"></script>
```
引入后就会去执行main.js如果加载的模块已经在main中定义了，就能直接加载，否则就会去main同级找到与该模块同名的js文件中，如果有此文件，引入该文件中的模块。后面加载会解释

##### 定义模块
首先define的参数结构如下：
```javascript
define(id?: String, denpendencies?: String[], factory: Function | Object)
```
id为模块名，denpendencies为依赖模块列表，factory为工厂函数，它的参数是依赖的模块数组，factory返回的值即为导出的值，一般是对象
所以define有下面几种类型
- 匿名模块
  	会直接执行

  ```javascript
  define(['a'],function(){console.log('匿名模块')})
  ```
- 无依赖模块
  ```javascript
  define('b',function(){console.log('无依赖模块') return {b: 'b'}})
  ```
- 正常模块
  ```javascript
  define('c', ['a', 'b'], function(a, b){console.log('正常模块')})
  ```

##### 加载
使用require来加载，定义结构如下:
```javascript
require(denpendencies: String[],callback: Function)
```
并行加载依赖列表，等所有依赖列表中的依赖及当前依赖的依赖全部加载完毕后才执行回调函数

先来解释下为什么main.js中若未定义会去加载同级同名的js文件（未使用require.config()定义的情况下），amd加载的原理其实就是增加一行script，地址指向模块js文件，以person模块为例：

```javascript
<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="person" src="js/person.js"></script>
```
所以amd加载就是通过动态创建异步script实现的

### CMD
#### 背景
CMD与AMD类似，也是解决js模块化的问题。区别在于AMD会在第一时间加载依赖模块，而CMD会在需要的时候才加载。总结为AMD推崇依赖前置，提前执行。CMD推崇依赖就近，延迟执行。AMD一般使用require.js加载，CMD一般使用sea.js

#### 优点
- 可以依赖就近，不用提前加载依赖

#### 缺点
- AMD的问题依然存在，还是需要引入CMD库（一般为seajs）

#### 使用
CMD规范是通过seajs.config()来设置配置,使用seajs.use定义入口文件，使用define参数中的require来加载依赖模块。每个文件只能定义一个模块,当模块异步/延迟导出，并不会阻塞函数的执行。CMD只能通过exports或module.exports导出，AMD可以通过return导出。seajs加载也是通过动态创建异步script实现的

定义
```javascript
// name.js
define(function(require, exports, module) {
  var name = function () {
    return 'peakWay';
  }

  exports.name = name
})

//person.js
define(function(require, exports) {
    var name = require('./name_cmd');

    var introduce = function() {
        console.log(`hello!我是${name.name()}`);
    }

    exports.introduce = introduce
})
```

导入
```javascript
define(function(require) {
    let person = require('./person_cmd');
    person.introduce()
})
```

### ES6 module
#### 背景
ES6 module是ECMA提出的javascript模块化规范。浏览器和Node.js都宣布要支持该规范，它将逐渐取代上面的规范，成为浏览器和服务器通用的模块化解决方案。

#### 优点
- 在编译时就引入了模块代码，使得静态分析成为可能
- 一个文件可以导出单个或多个模块
- 导入的是引用

#### 缺点
- 浏览器端需要转换成ES5

#### 使用
##### 导出
ES6 module可以使用export或者export default导出，一个文件可以有多个export，但只能有一个export default。export暴露的只能是接口，接口与模块内部变量对应，不能直接输出值。
```javascript
var a = 1;
export a; //报错

export var a = 1; //正确

function fn() {};
export fn;  //报错

export fn() {}; //正确

export default fn() {}. //正确
```

##### 加载
ES6 module加载原理其实经过3个步骤：构建、实例化、赋值。
构建过程执行查找，下载，将文件转换成模块记录，里面存储依赖信息，各种属性和方法，并对模块记录进行缓存。
实例化过程会在内存中开辟一个存储空间（还未填充值），将该模块所有export和import了这个模块的变量指向这个内存，这个过程主要做了链接的功能
赋值过程就是将export导出的真实值填充之前那个内存空间，之后import链接到的值就是export导出真实的值。

从上面流程我们可以看出，import和export指向的是同一块内存，但是export可以更改内存中的值，而import只是引用，并不能更改。
```javascript
//正常加载
import { fn } from './module';

//加载整个模块，利用as命名一个变量指向整个模块内存
import * as module from './module';
```

#### 与CommonJS的区别
- CommonJS输出的是值的拷贝，而ES6 module输出的是值的引用
- CommonJS是运行时加载，ES6 module是编译时输出接口















