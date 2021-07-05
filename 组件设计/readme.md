
# 组件设计与分离
**目录**

- 组件设计
  - 基本原则
  - 分类
     - 容器组件container与展示组件presentation（智能组件smart与木偶组件dumb）
     - 有状态与无状态组件
     - 纯组件与非纯组件
  - 逻辑分离
     - 特征
     - 封装方式
     - 与组件的区别
     - 封装时机
     - 示例
  - 具现
- 公司项目组件的问题、建议
  - 目录结构
  - 非ts组件无类型检查
  - 逻辑未分离
  - 未具现
  - 基本不用无状态组件、纯组件
- 怎么看待第三方ui库(ant-mobile)
- 增效
  - 用户片段
- 总结

## 组件设计
在项目过程中经常遇见这些问题，页面组件行数太多，导入文件难找，抽出的部分工具函数、逻辑随意放置，一些公用逻辑改动风险大，耦合度高，代码可复用性弱等。这些问题基本上是因为没有一个好的组件设计与分离习惯。这次主要是通过React来理解，之后提到组件设计与分离思想vue也是可以应用的，只是实现方式有区别。

### 基本原则
单一职责原则。这个原则本身是基于面向对象编程提出的，意思是一个类只负责一件事情。无论什么编程规范框架，只要是模块化的规范设计的都适用于这一原则。在React中的组件就是模块。

单一职责要求将组件控制在一个“合适”的粒度，一般不赞同将粒度越小越好，原因是当粒度太小，组件过于离散会导致项目难以管理维护。

在社区上认为一个好的组件需要具备高内聚、低耦合的特征。高内聚，一个组件是一个自包含的独立个体，包含逻辑/样式/结构，具有专一性。低耦合，组件相互组合才能实现应用，那就有了关联，低耦合要求这种关联性最小。但并不是所有组件都需要具备这种特征，比如当在考虑状态state控制、容器组件与展示组件的拆分等因素时。这种适合包含容器组件与展示组件的功能组件，例如列表组件，其子项作为展示组件分开，加载、刷新等逻辑作为容器组件，其充当了包含逻辑/样式的容器，所有适合高内聚，低耦合的特征，但是其包含的展示组件、容器组件并不具备这个特征，这个示例和容器组件、展示组件之后会讲到。

在单一职责的基础下，在项目中，我认为只要代码有重复或者模块边界有重合，无论是视图还是逻辑，都应该进行组件设计与逻辑分离设计。

### 分类

#### 容器组件container与展示组件presentation（智能组件smart与木偶组件dumb）
容器组件和展示组件分离是React开发非常重要的思想。它的好处主要体现在可复用性和可维护性。简单点意思就是逻辑与视图分离，当ui样式在完全几乎一样时，当组件逻辑与视图有关联时，这个ui样式就无法复用，只能复制，这种写法就造成了代码重复。如果之后有需求更改这类样式，就需要改多处，容易出错，漏改的情况，这就造成了维护性差。

展示组件即UI组件，只关注展示，与业务无关。这里面的界限可能比较模糊。我认为的UI组件与业务没有任何关系(**个人认为**)。我举两个比较模糊的例子,如下：

1. 当样式与状态相关

常见不正确写法：这种写法的展示组件还是与业务耦合了
```javascript
// index.js
import Button from 'button.js'
// ...
   state = { status: 1 }
   
   render() {
      return <Button status={ status }></Button>
   }
// ...


// button.js
const Btn = ({status}) => {
    return (
       <div style={{ color: status == 1 ? 'red' : 'yellow' }}>
           提交
       </div>
    )
};

export default;
```

正确写法: 传入style或者在定义特定class

(1) 传入style
```javascript
import Button from 'button.js'
// ...
   state = { status: 1 }
   
   render() {
      const { status } = this.state; 
      const btnStyle = status == 1 ? { color: 'red' } : { color: 'yellow' }
      return <Button styles={ btnStyle }></Button>
   }
// ...


// button.js
const Button = ({styles}) => {
    return (
       <div style={ styles }>
           提交
       </div>
    )
};

export default Button;

```

(2) 定义特定class
```javascript
import Button from 'button.js'
// ...
   state = { status: 1 }
   
   render() {
      const { status } = this.state; 
      const btnColor = status == 1 ? 'red' : 'yellow';
      return <Button className={ btnColor }></Button>
   }
// ...


// button.js
const Button = ({className}) => {
    return (
       <div className={ className }>
           提交
       </div>
    )
};

export default Button;

// button.scss
.red {
  color: red;
}

.yellow {
  color: yellow;
}

```
2. 事件

常用不正确写法：直接在展示组件绑定事件
```javascript
// button.js
const Button = () => (
    <div onClick={() =>{ location.href = '' }}>提交</div>
)
```

正确写法：将事件传入
```javascript
import Button from 'button.js'
// ...
   toPath = () => {
      location.href = ``
   }
   
   render() {
      return <Button onClick={ this.toPath }></Button>
   }
// ...

// button.js
const Button = ({onClick}) => {
    return (
       <div onClick={ onClick }>
           提交
       </div>
    )
};

export default Button;
```

容器组件即逻辑组件，关注业务、功能。如果没有用redux这类的状态管理器，一般在容器组件内管理。容器组件比较好理解，但问题是容易把所有逻辑都写在一个容器组件中，未考虑逻辑分离情况，后面将会详细讲。


#### 有状态组件与无状态组件
无状态组件内部不存储状态，完全由外部props映射。这类组件以函数组件形式存在，天然就是纯组件。展示组件的标准都应该为无状态组件

#### 纯组件和非纯组件
纯组件的“纯”是来源于函数编程。有三个特征：1.给定相同的输入，总是得到相同的输出。2.过程中没有副作用。3.没有额外的状态依赖。对应在React中，纯函数一般指的是props没有变化，组件的输出就不会变动。

在React纯组件的实现其实是在shouldCompomentUpdate生命周期时进行浅比较，如果数据变更，则返回true后会调用重新渲染

随着我们对组件进行更细粒度的控制，让它们的职责更单一，所依赖的状态越少。这带来的好处就是可复用性、可测试性和可预测性。

在React中纯组件很大的优点是对性能优化有重要作用，它可以避免输入未变化的组件重新渲染。**（看代码示例）**

所以组件树越大，性能优化收益就越高。

### 逻辑分离
这个是我比较想重点说的，也是我发现项目中运用最少的。逻辑平时考虑的比较多的是单独功能逻辑与工具函数的封装，例如声音、视频等功能模块进行封装提供特定接口进行操作。但是与视图状态关联的公共逻辑很少有进行封装的，比如异步请求状态变更、 列表加载功能（不是列表组件，因为列表组件经常依托了默认的视图），visible显隐状态控制等逻辑

声音、视频等类似独立功能模块基本上可以通过类、闭包的形式进行封装，这个就不详细介绍了。

#### 与视图状态关联的公用逻辑封装
1. 特征
这些逻辑的特征是拥有相同的状态和状态修改方法即actions，比如异步请求基本拥有的状态：isFetching, data, isError,状态修改方法有请求中，请求成功，请求失败;列表加载功能基本拥有的状态：isLoading、noMore、list、page、limit，状态修改行为有获取列表数据，获取更多；visible显隐状态控制拥有的状态：visible，状态修改方法有显示，隐藏；这些状态方法基本上都是由一个或多个action组成的逻辑，也能与redux类似的状态管理器相结合。

2. 封装方式
- 高阶组件
- hook中的自定义hook

自定义hook天然具有将逻辑分离的优势，这个暂不细说。众所周知，一个高阶组件只是一个包装了另外一个 React 组件的 React组件。高阶组件具备四大功能:(1)更改props。它能增加，修改，删除传入的props，给包装组件最终它需要的props;(2)通过 refs 获取组件实例(3)抽象state(4)元素组合。我们最常用的高阶组件--redux的connect，它本质上也是运用高阶组件中更改props的功能将store中的dispatch、state属性传给了其包装组件。在项目中，我经常看到路径参数传递很多层的情况，这个不仅让我们需要多些几遍相同的props属性传递，还造成冗余的props层问题和我之前提到的无关联组件的重新渲染问题（props更新，我只需要最小单一职责组件更改重新渲染就好了，但是由于props多层传递，所有层都会造成重新渲染），在react-router中有一个高阶组件--withRouter可以解决这个问题。

常见问题如下：**看代码**（mix）

withRouter作用是将一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中.

**看代码** (mix)

3. 与组件的区别

公用逻辑封装与组件封装的区别主要有：
1.公用逻辑封装与视图层无关联，可以根据状态随时替换；而组件封装一般具有默认组件视图，样式不易更改
2.公用逻辑封装可以适应多种类型场景，组件封装一般只适应一种场景。比如visible显隐逻辑，它可以作用于弹窗显隐，主体内容显隐，页面初始化成功前后显隐等等。而弹窗会做作为一个组件，其内容的显隐只是组件中的部分逻辑
3.公用逻辑封装可以将多个逻辑组合包裹到一个视图中，而组件只能做到组件组合，逻辑不能作用同一视图
4.公用逻辑也可以是作为组件的组成部分。比如visible显隐逻辑可以是会话弹窗组件、底部sheet组件的公共逻辑

4. 封装时机（什么时候进行公共逻辑封装）

首先要具备其拥有相同的状态和状态修改方法的特征；再者根据经验来判断它是否可能会应用在其他类型场景；再者它拥有视图的多样性。

5. 一个完整列表请求封装示例

**看代码** (crm健康档案页)

List, ListItem都是无状态组件，逻辑只存在列表高阶组件和首页组件中


### 具现
在组件树的构成中，我们常常会遇到下面这几种父子组件相互关联的情况：
- 父组件与子组件依赖共同状态
- 父组件更新状态，需要子组件同步
- 子组件操作需要触发父组件的变化

比如我们很常见的：tabs与tab， Form与input, list与list.Item.当我们遇到这类问题时，我们首先想到的方式一般都是在父组件内部渲染子组件或使用renderProps的方式将子组件传入，然后在父组件内处理状态，绑定事件。

index.js
```javascript
import List from './list.js'
import ListItem from './item.js'

//...
render() {
   return (
      <List renderItem={ ListItem }></List>
   )
}
//...
```

list.js
```javascript
//...

state = {
   list: [1, 2]
}

render() {
  const ListItem = this.props.renderItem;
  return (
     <div className="list">
        list.map(item => {
            <ListItem data={ item } />
        }) 
     </div>
  )

//...
```
这样实现没有问题，但是我们一般看组件树的时候都会在index.js中看，我们无法一眼看出整体结构，需要进入点进list知道在内部遍历渲染了，整体不够直观。像添加事件等公共逻辑应该放在index.js中。这样设计我们不得不多传一层事件props。继续看之前的逻辑分离的示例，将子组件在首页遍历渲染，并清晰知道传入了哪些状态，这就是具现的一种体现。

我们经常用到的第三方组件库(ant-mobile)里面基本上都具有具现的特征。

## 公司项目组件的问题、建议
公司项目目录是以模块化为核心划分，组件分布如下

```text
node_modules/
  @yt/                  //公司内部必备组件，包括ui组件，业务组件，工具组件
component               //公用组件，多个模块存在使用，但有些和@yt大同小异
modules                 //模块文件
  user                  //某单独(用户)模块
    components          //该模块组件，里面基本上是容器和展示组件混合的组件
    pages               
      index             //某页面
        index.js        
        index.scss
        model.js        //dva状态管理
    router.js           //当前模块下路由
    
```



















