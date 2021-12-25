
# Dom
我将会从一下几个方面总结下Dom
- 常用Dom节点类型
  - Node类型
  - Document类型
  - Element类型
  - Text类型
- 操作Dom方式
  - 操作元素
  - 操作文本
  - 操作属性
  - 操作样式
  - 操作脚本
- 常用，好用的属性方法
  - scrollIntoView()
  - 元素尺寸
- 遍历
  - nodeIterator
  - treewalker
  

## 常用Dom节点类型
任何HTML或XML文档都可以使用Dom表示为一个由节点构成的层级结构

### Node类型
所有节点类型都继承Node类型，节点类型由定义在Node类型上的数值常量表示，其值对应nodeType属性值。每个Node对象都拥有nodeName和nodeValue属性。

#### 节点关系
- 父子关系  
firstChild：第一个子节点；  
lastChild：最后一个节点；  
parentChild：父节点；  
childNodes：所有子节点;(NodeList实例，只读)
- 兄弟关系  
previousSibling: 上一个节点；  
nextSibling：下一个节点；  
(注：首节点的上一个节点与末节点的下一个节点都是null)

### Document类型
文档对象document是HTMLDocument实例，特征如下：  
nodeType值为9;  
nodeName值为"#document";  
nodeValue值为null;
parentNode值为null;

#### 1.文档子节点
Document节点的子节点可以是DocumentType、Element、Comment等，但也提供了几个访问子节点的快捷方式。  
- documentElement属性，它始终指向HTML页面中的<html>元素（DOM0中定义）
- body属性，它指向<body>元素（DOM0中定义）
- head属性，它指向<head>元素（HTML5中定义）

#### 2.文档信息
常用属性有title属性（可读写）、URL（只读）、domain（可读写，但有几个限制）

#### 3.定位元素
操作Dom中详说

#### 4.特殊集合
- document.anchors获取文档中所有<a>元素
- document.images获取文档中所有<img>元素
- document.forms获取文档中所有表单
- document.anchors获取文档中所有带href属性的<a>元素

#### 5.文档写入
写入传入的参数都是字符串，要注意写入script与匹配外部的script元素，要转义
document.write()写入；  
document.writeln()写入文档最后加个换行；  
document.open()打开网页输出流；  
document.close()关闭网页输出流;

### Element类型
Element类型都是HTMLElement类或其子类的实例，具有以下特征：  
nodeType值为1；  
nodeName值为元素标签名；  
nodeValue值为null;  
parentNode值为Document或者Element对象；

#### 取得属性、设置属性、创建元素、attributes属性
操作Dom中详说

### Text类型
Text类型包含纯文本或HTML字符，具有以下特征：  
nodeType值为3；  
nodeName值为"#text"；  
nodeValue值为节点中的文本;  
parentNode值为Element对象；

#### 创建文本、添加文本、规范文本、拆分文本
操作Dom中详说

### Attr类型
Attr类型指存在于元素attributes属性中的节点，具有以下特征：  
nodeType值为2；  
nodeName值为属性名；  
nodeValue值为属性值;  
parentNode值为null；

## 操作DOM的方式
主要从查(获取、判断关系)、增、删、改(替换、移动)、创建方面
### 元素
方法前加docuemnt说明只是文档的方法，普通元素并没有
### 1. 获取元素
> 指定元素
#### 1. document.getElementById()  
在DOM0中定义，参数为元素Id值，返回页面中元素Id为该Id的第一个元素
#### 2. getElementByTagName()  
在DOM0中定义，参数为元素标签名，返回该标签元素组成的HTMLCollection对象，HTMLCollection与NodeList类似，也可以通过中括号和item()取得特定元素
#### 3. document.getElementByName()
在DOM0中定义，参数为字符串，返回给定name属性的所有元素，也是HTMLCollection对象
#### 4. querySelector()
在SelectorsAPI中定义，根据css选择符匹配元素，返回匹配的第一个后台元素
#### 5. querySelectorAll()
在SelectorsAPI中定义，根据css选择符匹配元素，返回匹配元素组成的NodeList静态实例，注意，不是“实时”查询
#### 6. getElementsByClassName()
在HTML5中定义，根据类名匹配元素，返回匹配元素组成的NodeList，限制：IE9以下版本支持

> 子元素与父元素

需要通过判断节点类型：
#### 1. childNode属性  
在DOM0中定义，获取元素的子节点（任何类型）组成的NodeList
#### 2. firstChild属性
在DOM0中定义，获取元素的第一个子节点（任何类型）
#### 3. lastChild属性
在DOM0中定义，获取元素的最后一个子节点（任何类型）
#### 4. parentNode属性
在DOM0中定义，获取节点的父节点

直接获取元素
#### 1. children属性
专有拓展中定义，获取元素子节点组成的HTMLCollection对象
#### 2. firstElementChild属性
在ElementTraversal API中定义，获取第一个子元素
#### 3. lastElementChild属性
在ElementTraversal API中定义，获取最后一个子元素

### 2. 添加元素
添加元素只能基于父节点操作，都在Dom0中定义
#### 1. appendChild()
在当前元素的最后一个子节点后面增加一个节点（任何类型）；如果添加的节点是当前文档中存在的节点，相当于移动节点
#### 2. insertBefore()
这个方法接收两个参数：要插入的节点和参照节点。调用后插入的节点会成为参照节点的上一个节点
#### 3. 一次性加入多个元素
如果用上面两种方式增加元素，每次只能增加一个元素，对于ul添加项这种，每次增加都要重新渲染。可以采用文档片段DocuemntFragment的方式增加
```javascript
let fragment = document.createDocumentFragment();
let ul = document.getElementById('myList');

for(let i=0; i < 3; ++i) {
   let li = document.getElementById('li');
   li.apendChild(document.createTextNode('Item ${i + 1}'));
   fragment.appendChild(li);
}

ur.appendChild(fragment);
```

### 3. 删除元素
#### 1. removeChild()
父节点删除子节点，返回当前删除的节点

### 4. 更改元素
#### 1. replaceChild()
这个方法接收两个参数： 要插入的节点和要替换的节点。要替换的节点会被返回并从文档中完全移除，插入的节点取而代之

### 5. 元素之间的关系
#### 1. contains()  
在专有拓展中定义，该方法判断一个元素是不是另一个元素的后代，限制：IE9以下不支持
#### 2. compareDocumentPosition()  
该方法确定两个节点之间的关系，返回关系的位掩码。限制：IE9以下不支持。说明如下：
- 0x1(不在文档中)
- 0x2(在参考节点之前)
- 0x4(在参考节点之后)
- 0x8(是参考节点的祖先)
- 0x10(是参考节点的后台)   
 
如果节点存在表中的多种关系，则返回值为掩码之和。比如后代元素等于20（0x14, 其中0x4表示“随后”，加上0x10“被包含”）。!!(result && 0x10)等效于contains()
      
#### 3. nextSibling属性     
在DOM0中定义，获取下一个子节点
#### 4. prevSibling属性  
在DOM0中定义，获取上一个子节点

### 6. 创建元素
#### 1. document.createElement()
在DOM0中定义，该方法传入一个标签名参数，返回一个不在文档中的新元素。

#### 2. cloneNode()
在DOM0中定义，该方法接收一个布尔值参数，表示是否深复制，若为true复制目标节点及其所有后代节点。false则只复制空目标节点。

### 文本
### 1.获取文本
> 文本内容

文本一般都被元素包含，可以通过文本节点和文本text的方式获取
#### 1. 文本节点的nodeValue值
在DOM0中定义
#### 2. textContent属性
在DOM0中定义
#### 3. substringData(offset, count)
提取从位置offset到offset+count的文本
#### 4. innerText属性
HTML5中定义，应为获取文本内容首选
> 文本节点

通过node的操作方式获取，比如firstChild, prevSibling, nextSibling, lastChild, childNodes等。  
一定要注意空格和换行都会在文本节点中

### 2.增加文本
增加文本是指针对文本节点增加文本text
#### 1. 通过节点的方式增加：appendChild()
这种方式在DOM增加了文本节点，但是在渲染上是连在一起的
#### 2. appendData(text)
在节点末尾添加文本text，不增加节点
#### 3. insertData(offset, text)
在位置offset插入text;

### 3.删除文本
删除文本也是指删除文本text
#### 1. deleteData(offset, count)
在位置offset删除count个字符

### 4. 更改文本
#### 1. replaceData(offset, count, text)
用text替换在位置offst的count个字符
#### 2. textContent属性
可读写
#### 3. innerText属性 
HTML5定义，会移除元素之前所有的后代节点，也会编码HTML语法符，应为设置文本内容首选

### 5.创建文本节点
#### 1. document.createTextNode()

### 5.分离文本
#### 1. splitText(offset)
将文本节点从位置offset拆分成两个文本节点，拆分后原来的文本节点包含开头到偏移位置前的文本，新文本节点包含剩下的文本

### 属性
每个元素都有零个或多个属性，通常用于为元素或其内容附加更多信息。

### 1. 获取属性
属性一般分为HTMLElement类型上定义的属性和自定义属性，获取自定义属性只能通过getAttribute()获取HTMLElement属性能通过两种方式获取。
> 通过Dom对象属性获取
一般直接使用.属性的方式，有几种特殊的属性：
- class对应的属性字段为className
- style返回的是CSSStyleDeclaration对象
- 使用html绑定的事件处理程序（例：onclick）获取的是函数方法
- HTML5中classNames属性可以获取DOMTokenList实例

> getAttribute()
返回的都是字符串，几种特殊的属性:
- class对应的字端为class
- style返回的是css字符串
- 使用html绑定的事件处理程序返回的是源代码字符串

> 获取元素的所有属性: attributes属性
返回一个由属性节点组成的NamedNodeMap实例，类似NodeList，很少用，一般用来遍历,对应的查、改、删方法有 
- getNamedItem(name)
- setNamedItem(node)
- item(pos)
- removeNamedItem(name)

### 2.设置属性
> 通过Dom对象属性
.属性的方式，对应几种特殊属性的设置：
- class对应的属性字段仍为className
- style的值为css字符串
- onclick的值为方法
- 设置的自定义属性无法通过getAttribute()获取

> setAttribute()
- class对应的属性字端为class
- style的值为css字符串
- onclick的值为源代码字符串，代码可以直接访问event和this参数

### 3.删除属性
> 通过Dom对应属性  

设置值为null或空字符串即删除

> removeAttribute()

设置值为空字符串

### 操作样式
HTML中的样式有3种定义方式：外部样式表（通过\<link\>元素）、内部样式表（通过\<style\>元素）、和元素特定样式

### 1. 操作样式表
> 动态加载
#### 1. 外部样式
```javascript
function loadOuterStyleSheet() {
  let link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'styles.css';
  document.head.appendChild(link);
}
```

#### 2. 内部样式
```javascript
function loadInnerStyleSheet() {
  let style = document.createElement('style');
  style.type = 'text/css';
  let css = 'body {background: yellow}';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}
```
以上代码除IE以外都能运行，IE不允许访问\<style\>子节点，在运行时会抛出错误，解决方案是访问元素的styleSheet属性，这个属性又有一个cssText属性，然后给这个属性赋值，最终兼容浏览器方法为：
```javascript
function loadInnerStyleSheet() {
  let style = document.createElement('style');
  style.type = 'text/css';
  let css = 'body {background: yellow}';
  try {
    style.appendChild(document.createTextNode(css))
  } catch(ex) {
    style.stylesheet.cssText = css;
  }
  docuemnt.head.appendChild(style);
}
```
> CSSStyleSheet

CSSStyleSheet代表CSS样式表。包括使用\<link\>和\<style\>元素定义的样式表。注：这两个元素本身是HTMLLinkElement和HTMLStyleElement。CSSStyleSheet实例只是一个只读对象（除了disabled属性）

#### 1. 获取样式表
- document.styleSheets
表示文档中可用的样式表集合，使用中括号或item()获取某个位置的样式表
- sheet属性
\<link\>和\<style\>都可以通过sheet获取到

#### 2. css规则
一般操作css规则是通过style属性来设置的，也可以通过insertRule、deleteRule通过规则索引来操作，但不建议 

### 2. 元素样式
任何支持style属性的HTML元素都会有一个对应的style属性。这个属性是CSSStyleDeclaration类型的实例。其中包含通过HTMLstyle属性为元素设置的所有样式信息，但不包括通过层叠机制和内部、外部样式中继承的样式。css属性名使用连字符表示法，在JS中这些属性都必须转换成驼峰大小写形式。（float例外，它对应cssFloat）

#### 1. DOM样式属性和方法
DOM2Style中定义
- ##### style属性  
  单个属性获取和设置
- ##### length属性
  元素的css属性数量
- ##### cssText属性
  全部属性的css字符串代码
- ##### getPropertyPriority(propertyName)
  css属性使用了!important就返回“important”，否则空字符串
- ##### item(index) 
  返回索引为index的css属性名
- ##### getPropertyValue(propertyName)
  获取propertyName属性值
- ##### setProperty(propertyName, value, priority)
  设置propertyName属性值
- ##### removeProperty(propertyName)
  删除propertyName属性值

#### 2. 计算样式
因为style对象中不包含其他样式层叠即成的样式信息，DOM2Style在docuemnt.defaultView上增加了getComputedStyle()方法 ，该方法接收两个参数：要取得计算样式的元素和伪元素字符串（如“:after”）
```javascript
let computedStyle = document.defaultView.getComputedStyle('mydiv', null)
```

### 操作脚本
\<script>元素用于向网页插入JS代码。动态添加脚本的方式有两种：引入外部文件和直接插入源代码
#### 1. 外部脚本文件
```javascript
function loadOuterScript(url) {
  let script = document.createElement('script');
  script.src = url;
  // 还可以添加script其他属性
  document.body.appendChild(script);
}
```

#### 2. 内部样式
```javascript
function loadInnerScript() {
  let script = document.createElement('script');
  let code = 'console.log(12)';
  script.appendChild(document.createTextNode(code));
  document.body.appendChild(script);
}
```
以上代码除Safari3以外都能运行，该环境不允许访问\<script\>子节点，在运行时会抛出错误，解决方案是访问元素的text属性，然后给这个属性赋值，最终兼容浏览器方法为：
```javascript
function loadInnerScript() {
  let script = document.createElement('script');
  let code = 'console.log(12)';
  try {
    script.appendChild(document.createTextNode(code))
  } catch(ex) {
    script.text = code;
  }
  docuemnt.body.appendChild(script);
}
```
#### 注：通过innerHTML属性创建的\<script>元素永远不会执行

## 常用，好用的属性方法
### scrollIntoView
可以滚动浏览器窗口或容器元素以便元素进入视口，一般可以初始化滚动位置


