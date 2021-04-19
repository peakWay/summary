
/**
 * 曾经无模块化的写法
 * 问题：
 * 1.全局变量污染
 * 2.模块的引入顺序容易出错
 * 3.模块之间的引用关系不明显
 */
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

//闭包
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
  

console.log(person.introduce())

//放大模式
//优势: 可以实现依赖，拓展，继承功能
const groupPerson = (function(person) {
    person.ageGroup = function() {
        return person.age > 18 ? '成年人' : '未成年人'
    }

    return person;
})(person)

console.log(groupPerson.ageGroup())