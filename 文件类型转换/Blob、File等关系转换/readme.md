
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
![](https://s3.bmp.ovh/imgs/2021/09/cb88b7ff997b7640.jpg)

## 数据类型

### ArrayBuffer
ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。  
你不能直接操作ArrayBuffer内容，而是要通过类型数组对象(TypedArray)或DataView对象来操作。

#### 创建  

> ### 构造函数

new ArrayBuffer(length)，该参数为ArrayBuffer的大小，单位为字节，返回指定大小(字节)的二进制数据缓冲区
```javascript
let buffer = new ArrayBuffer(8)
```

> ### (new FileReader(file)).readAsArrayBuffer
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

> ### base64ToUnit8Array
base64是二进制的一种编码方式，它以6比特为一单位。因此，3字节（1字节是8比特，3字节也就是24比特）的字符串/二进制文件可以转换成4个base64字符。所以当base64字符转换成Unit8Array时，需要base64字符数需要为4的倍数，若字符数不满足则用“=”字符补足







