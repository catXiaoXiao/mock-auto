# mock-auto
自动化工具，练练手
### 主要功能
mock dev本地自动化

### 基础

目录结构介绍
```jsx
|-- root
    |-- .prettierignore
    |-- .prettierrc
    |-- package.json
    |-- README.md
    |-- config                 // 系统配置信息
    |   |-- dev.js
    |   |-- index.js
    |-- mock                   // mock文件夹
    |   |-- product
    |       |-- filter.js
    |-- server                 
    |   |-- api-watch.js       //api文件输入监视 => 生成对应mock文件夹js
    |   |-- load-module.js
    |   |-- mock-server.js     // 本地代理模拟数据请求
    |   |-- mockTemplate
    |       |-- template.js    // mock模板
    |-- service                // api文件
    |   |-- index.js
    |-- utils
        |-- authority.js
        |-- request.js         // fetch
