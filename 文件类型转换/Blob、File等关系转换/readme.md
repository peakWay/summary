
# 文件类型数据转换相关

## 目录

- 概略图
- 数据类型
  - ArrayBuffer
  - Blob
  - File
  - DataURL(base64)
  - base64
  - ObjectUrl/BlobURL


## 概略图
![](https://s3.bmp.ovh/imgs/2021/09/631265100724fd7c.jpg)

## 数据类型

### ArrayBuffer
ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。  
你不能直接操作ArrayBuffer内容，而是要通过类型数组对象(TypedArray)或DataView对象来操作。

> ### 构造函数

new ArrayBuffer(length)，该参数为ArrayBuffer的大小，单位为字节，返回指定大小(字节)的二进制数据缓冲区
```javascript
let buffer = new ArrayBuffer(8)
```

> ### File转换
通过(new FileReader(file)).readAsArrayBuffer()方式

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
```html
<input type="file" onchange="chooseFileToArrayBuffer(event)" />

<script>
   function chooseFileToArrayBuffer(e) {
      const file = e.target.files[0];

      fileToArrayBuffer（file)
        .then(res => {
           console.log(res)   //ArrayBuffer
        })
   }
</script>
```


> ### base64转换
base64是二进制的一种编码方式，它以6比特为一单位。因此，3字节（1字节是8比特，3字节也就是24比特）的字符串/二进制文件可以转换成4个base64字符。所以当base64字符转换成Unit8Array时，需要base64字符数需要为4的倍数，若字符数不满足则用“=”字符补足。   
base64ToArrayBuffer是自定义封装的一个方法

toArrayBuffer.js
```javascript
function base64ToArrayBuffer(base64string) {
  const padding = '='.repeat((4 - base64string.length % 4) % 4);
  const rawData = atob(base64);
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

> ### Fetch解析
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

Fetch解析成ArrayBuffer通过Response.arrayBuffer()方式

index.js
```javascript
let url = 'xxx';
fetch(url)
   .then((res) => res.arrayBuffer())
   .then((arrayBuffer) => {
       let uint8Arr = new Uint8Array(arrayBuffer)
   });
```

> ### Blob转换

通过blob.arrayBuffer()方式

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
File无法直接转换成Blob的方法，但是可以通过ArrayBuffer或DataURL作中转,下面例子选用ArrayBuffer做中转，会使用上面已定义的fileToArrayBuffer方法

```html
<input type="file" onchange="chooseFileToArrayBuffer(event)" />

<script>
   function chooseFileToArrayBuffer(e) {
      const file = e.target.files[0];

      fileToArrayBuffer(file)
        .then((buffer) => {
           new Blob([buffer])   //Blob
        })
   }
</script>
```

> ### Fetch解析

fetch解析成Blob通过Response.blob()方式 
```javascript
let url = 'xxx';
fetch(url)
   .then((res) => res.blob())
   .then((blob) => {});
```

> ### CanvasElement转换
通过CanvasElement.toBlob()

### File
File对象表示文件，是特殊类型的 Blob，继承于Blob，且可以用在任意的Blob类型的 context 中

> ### InputElement.Files
```html
<input type="file" onchange="chooseFile(event)" />
<script>
   function chooseFile(e) {
      const files = e.target.files;
   }
</script>
```

> ### DragEvent.dataTransfer.files
```html
<div id="dragarea" ondragover="event.preventDefault()" ondrop="handleDrag(event)">
   拖入到这
</div>

<script>
function handleDrag(e) {
   e.preventDefault()
   const files = e.dataTransfer.files
}
<script>
```

> ### Blob转换
使用new File进行转换
```javascript
const blob = new Blob(['Hello, world!'], {type: 'text/plain'});
const file = new File([blob], 'text.txt', {type: 'text/plain'});
```

> ### DataURL转换
DataURL无法直接转换成File，但是可以通过DataURL(base64) -> base64 -> ArrayBuffer -> File实现

```javascript
function dataURLToFile(dataUrl, filename) {
  let arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Unit8Array(n);

  while(n--) {
     u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type: mime});
}
```

> ### CanvasElement转换 
使用CanvasElement.mozGetAsFile()，只有火狐浏览器支持

### DataURL(base64)
DataURL，协议的URL,可以存储一些小型数据   
格式：data:[\<mediatype\>][;base64],\<data\>

> ### File转换
通过(new FileReader(File)).readAsDataURL

toDataURL.js
```javascript
function fileToDataURL(file) {
    return new Promise((resolve, reject) => {
        const read = new FileReader();
        read.readAsDataURL(file);

        read.onerror = (err) => {
            reject(err);
        }

        read.onload = () => {
            resolve(read.result)
        }
    })
}
```

index.js
```javascript
//通过inputFiles获取File
const file = e.target.files[0];

fileToDataURL(file)
  .then(res => {
    console.log(res)
  })
```

> ### Blob转换
通过File转换中的fileToDataURL方法

index.js 
```javascript
const blob =  new Blob(['Hello, world!'], {type: 'text/plain'});
  fileToDataURL(blob)
    .then(res => {
       console.log(res)  //data:text/plain;base64,SGVsbG8sIHdvcmxkIQ==
   })
```

> ### CanvasElement
通过CanvasElement.toDataURL()

### Base64
Base64 是一组相似的二进制到文本（binary-to-text）的编码规则，使得二进制数据在解释成 radix-64 的表现形式后能够用 ASCII 字符串的格式表示出来
在Javascript中，有两个函数被分别用来处理解码和编码base64字符串
- atob()
- btoa()  
   
atob()能够解码通过base64编码的字符串数据。相反的，btoa()能够将二进制“字符串”编码成base64字符串（中文不是二进制字符串）

> 字符串编码
```javascript
const str = 'hello, world!';
btoa(str);   //aGVsbG8sIHdvcmxkIQ==
```

> ArrayBuffer转换

toBase64.js
```javascript
function arrayBufferToBase64(buffer) {
  let bstr = '', u8arr = new Uint8Array(buffer);
  
  for(let i=0; i < buffer.length; i++) {
    bstr += String.fromChatCode(u8arr[i]);
  } 

  return btoa(bstr);
}
```

index.js
```javascript
let buffer = new Uint8Array([232,191,153,230,152,175,228,184,128,230,174,181,230,150,135,230,156,172]);
arrayBufferToBase64(buffer)  //6L+Z5piv5LiA5q615paH5pys
```

> DataURL转换

toBase64.js
```javascript
function dataurlToBase64(dataurl) {
  return dataurl.split(',')[1];
}
```
index.js
```javascript
let dataurl = 'data:text/plain;base64,SGVsbG8sIHdvcmxkIQ==';
dataURLToBase64(dataurl). //SGVsbG8sIHdvcmxkIQ==
```

### ObjectURL/BlobURL
ObjectURL也叫BlobURL,它可以让只支持 URL 协议的Api（如：\<a\> \<link\> \<img\> \<script\>） 访问 File 或 Blob 对象。  
通过window.URL（webkit引擎对应的状态是window.webkitURL）的createObjectURL接口创建，参数可以为File或Blob对象

toObjectURL.js
```javascript
function fileToObjectURL(file) {
  const URL = window.URL || window.webkitURL;
  return URL.createObjectURL(file);
}
```

index.js
```html
<input type="file" onchange="chooseFile(event)" />
<script>
   function chooseFile(e) {
      const files = e.target.files;
      fileToObjectURL(files[0]);
   }
</script>
```
使用createObjectURL接口后需要注意，当使用完后，需要解除blob与BlobObject的映射关系，有助于浏览器回收，解除接口是removeObjectURL(ObjectURL)















