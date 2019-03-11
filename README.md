#mock-auto

### 主要功能
mock dev本地自动化

### 基础

0. 目录结构介绍
	```
 '|-- root',
  '    |-- .prettierignore',
  '    |-- .prettierrc',
  '    |-- package.json',
  '    |-- README.md',
  '    |-- config',
  '    |   |-- dev.js',
  '    |   |-- index.js', 
  '    |-- mock',
  '    |   |-- product',
  '    |       |-- filter.js',
  '    |-- server',
  '    |   |-- api-watch.js', //api文件输入监视 => 生成对应mock文件夹js
  '    |   |-- load-module.js',
  '    |   |-- mock-server.js', // 本地代理模拟数据请求
  '    |   |-- mockTemplate',
  '    |       |-- template.js', // mock模板
  '    |-- service',
  '    |   |-- index.js', // api文件
  '    |-- utils',
  '        |-- authority.js', // 
  '        |-- request.js', // 数据请求
  '' 