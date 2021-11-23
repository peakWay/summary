
## 分块打包

### 单页面
以默认webpack.config.js文件作为配置文件

### 测试步骤
#### 1. mode设置为'development'
如果不设置mode为development，index入口文件引入的react和react-dom由于没有使用，将不会被打包

#### 2. 设置optimization依赖包配置
其中test值说明将node_module中的引入的依赖包打包成一个chunk，chunks值有三种，initial、async、all，initial该chunk会在执行前就初始化加载，async用于按需加载，all以上两种情况都可以

##### webpack.config.js
```javascript
splitChunks: {
  cacheGroups: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,         //[\\/]兼容window和linux路径
      name: 'vendor',
      chunks: 'initial'  
    }      
  }
}
```

##### index.js
```javascript
import React from 'react';
import ReactDom from 'react-dom';

import dayjs from 'dayjs';

console.log(dayjs().format('YYYY-MM-DD'));

console.log('初始化首页');
```
index编译后结果是react、react-dom、dayjs三个依赖都打包在vendor.js文件中，但由于dayjs并不需要初始化加载，且react、react-dom都是框架模块，所以应该将这两块单独打包

#### 3. 更改test值
由于框架模块不会变，可以进行缓存，初始时只打包框架模块，dayjs模块暂不处理  
注：cnpm下载的react、react-dom是软链，真实文件名是_react，npm下载的是正常的
```javascript
splitChunks: {
  cacheGroups: {
    vendor: {
      test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,       
      name: 'vendor',
      chunks: 'all'     
    }   
  }
}
```

#### 4. 处理共享模块
这里的共享模块包括help.js(大于30kb，来自脚本文件)dayjs(小于30kb，来自node_modules依赖包)
##### webpack.config.js
```javascript
splitChunks: {
  cacheGroups: {
    vendor: {
      test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,       
      name: 'vendor',
      chunks: 'all' 
    },
    commons: {
      name: 'commons',
      chunks: 'async',    //按需加载
      minChunks: 2        //最小并发请求
    }
  }
}
```

##### index.js
```javascript
import React from 'react';
import ReactDom from 'react-dom';


import('../src/a');      //按需加载
import('../src/b');      //按需加载，并发2

// import dayjs from 'dayjs';      //如果在主包中直接引入dayjs，那它就不会被分到commons块中
```

##### src/a.js
```javascript
import React from "react";
import dayjs from "dayjs";   
import { help } from './help';
```

##### src/b.js
```javascript
import React from "react";  
import dayjs from "dayjs";   
import { help } from './help';
```





