
# 文件类型数据转换相关

## 目录

- 概略图
- 数据类型
  - ArrayBuffer
  - Blob
  - File
  - DataURL(base64)
  - BlobURL/ObjectUrl


## 概略图
![](https://s3.bmp.ovh/imgs/2021/09/21626a172a06e43d.jpg)

## 数据类型

### ArrayBuffer
ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。  
你不能直接操作ArrayBuffer内容，而是要通过类型数组对象(TypedArray)或DataView对象来操作。

> ### 构造函数

new ArrayBuffer(length)，该参数为ArrayBuffer的大小，单位为字节，返回指定大小(字节)的二进制数据缓冲区
```javascript
let buffer = new ArrayBuffer(8)
```

> ### (new FileReader(file)).readAsArrayBuffer()
toArrayBuffer.js
```javascript
function fileToArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onerror = function(error) {
            reject(error)
        };

        reader.onload = function() {            
            resolve(reader.result)
        };
    })
}
```
index.js
```javascript
//通过inputFiles获取File
const file = e.target.files[0];

fileToArrayBuffer（file)
  .then(res => {
     console.log(res)   //ArrayBuffer
  })
```

> ### base64ToArrayBuffer()
base64是二进制的一种编码方式，它以6比特为一单位。因此，3字节（1字节是8比特，3字节也就是24比特）的字符串/二进制文件可以转换成4个base64字符。所以当base64字符转换成Unit8Array时，需要base64字符数需要为4的倍数，若字符数不满足则用“=”字符补足。   
base64ToArrayBuffer是自定义封装的一个方法

toArrayBuffer.js
```javascript
function base64ToArrayBuffer(base64string) {
  const padding = '='.repeat((4 - base64string.length % 4) % 4);
  const base64 = (base64string + padding).replace(/\-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const uint8Array = new Uint8Array(rawData.length);

  for(let i = 0, i < rawData.length; i++) {
    uint8Array[i] = rawData.charCodeAt(i);
  }

  return uint8Array;
}
```

index.js
```javascript
const base64string = 'Cui/meaYr+S4gOauteaWh+acrA==';
const uint8Array = base64ToArrayBuffer(base64string);   //Uint8Array(19)
```

> ### Response.arrayBuffer()
Fetch API 的 Response 接口呈现了对一次请求的响应数据。也可以使用Response构造函数来创建。  
fetch(url, options)，url支持的格式有：
- http、https
- blobUrl: 比如通过window.createObjectURL()获得
- DataUrl: 比如FileReader.readAsDataURL()

Body接口用于暴露一个 ReadableStream 类型的 body 内容，Response接口也实现了Body接口，  
有以下转换方法：
- body.arrayBuffer()
- body.blob()
- body.formData()
- body.json()
- body.text()

index.js
```javascript
let url = 'xxx';
fetch(url)
   .then((res) => res.arrayBuffer())
   .then((arrayBuffer) => {
       let uint8Arr = new Uint8Array(arrayBuffer)
   });
```

> ### Blob.arrayBuffer()

```javascript
let blob  = new Blob(['文本'], {type: 'text/plain'});
blob.arrayBuffer()
  .then((data) => {
    let uint8Arr = new Uint8Array(data)
  });
```

### Blob
Blob对象表示一个不可变、原始数据的类文件对象。

> ### 构造函数
```javascript
//文本类型
new Blob(['Hello,world!'], {type: 'text/plain'});

//JSON类型
new Blob([JSON.stringify({name: 'oldman'})], {type: 'text/json'});

//HTML类型 
new Blob(['<h1>你好</h1>'], {type: 'text/html'});

```
> ### ArrayBuffer转换
```javascript
let buffer = new Uint8Array([232,191,153,230,152,175,228,184,128,230,174,181,230,150,135,230,156,172]);
new Blob([buffer]).text().then(text => {console.log(text)});    //这是一段文本
```
> ### File转换
File无直接转换成Blob的方法，但是可以通过ArrayBuffer或DataURL作中转,下面例子选用ArrayBuffer做中转，会使用上面已定义的fileToArrayBuffer方法

```javascript
//通过inputFiles获取File
const file = e.target.files[0];

fileToArrayBuffer(file)
  .then((buffer) => {
     new Blob([buffer])   //Blob
  })
```

> ### Response.blob() 
```javascript
let url = 'xxx';
fetch(url)
   .then((res) => res.blob())
   .then((blob) => {});
```

> ### CanvasElement.toBlob()













