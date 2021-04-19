
//注：如果不使用config制定模块路径，那引用某个模块就需要在该文件同级定义个和模块同名的js文件

// 首先用config()指定各模块路径和引用名
// require.config({
//     baseUrl: "js",
//     paths: {
//       "amd": "amd",  //实际路径为js/amd.js
//     }
// });

define('amd', {amd: 'd'})

require(['amd'], function(amd) {
    console.log(amd)
})

require(['person'], function (person) {
    console.log(person, 'person');
    person.introduce();
});