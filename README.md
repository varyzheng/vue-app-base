# vue-app-base

1. 首先安装`webpack`和`webpack-cli`，这是使用`webpack`构建的基础。`yarn add -D webpack webpack-cli`

2. 编写`webpack.common.js`文件，这个文件是构建的配置基础，要配置打包的入口和输出目录，以及各种格式的文件相对应的`loader`，以及处理`html`和`vue`所需要的插件。

    * 2-1 处理`css`和`less`样式文件，先安装依赖：`yarn add -D less less-loader css-loader style-loader`。新增匹配`.less`和`.css`的`loader`，按顺序使用`less-loader`(仅`.less`代码), `css-loader`, `style-loader`
    * 2-2 处理`js`文件，先安装依赖：`yarn add -D babel @babel/core @babel/preset-env babel-loader @vue/cli-plugin-babel vue-template-compiler`。
    新增匹配`.js`文件，并使用`babel-loader`，配置`babel.config.js`的`presets`。
    * 2-3 处理`vue`文件，先安装依赖：`yarn add -D vue-loader`。
    在配置文件中导入`const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack5');`，并在插件中初始化一个`VueLoaderPlugin`，这个插件是`vue-loader`处理`vue`文件的基础。
    新增匹配`.vue`文件，并使用`vue-loader`
    * 2-4 处理图片文件，先安装依赖：`yarn add -D url-loader`。
    新增匹配图片文件，使用`url-loader`，并配置大小限制为10KB，这样10KB以内的文件会被转为base64后直接输出到代码中。如超过文件限制，可配合使用`file-loader`。
    * 2-5 处理`html`文件，先安装依赖：`yarn add -D html-webpack-plugin`。
    在`plugins`中引入此插件
    ```js
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      title: 'Webpack 打包测试',
      chunks: true,
    }),
    ```
3. 处理完各文件格式后，可以编写开发环境的配置，安装依赖`webpack-merge`，用于合并配置：`yarn add -D webpack-merge`。
在`devServer`属性上配置一个`webpack-dev-server`，并指定`mode`为`development`。然后更改`package.json`中的`serve`脚本，添加`--config`参数指向此配置文件

4. 编写`build`的配置，指定`mode`为`production`，并启用`minimize`，同时修改`package.json`的`build`脚本

5. 配置`eslint`，先安装`eslint`依赖：`yarn add -D eslint eslint-loader`。然后运行`yarn eslint --init`来初始化一个标准`eslint`的配置，根据项目信息进行合适的选择。初始化完毕并安装相应依赖后，即可在`.js`的`loader`和`.vue`的`loader`最下方添加一个`eslint-loader`，这样会在`loader`编译源码之前进行语法校验。

6. 修改`package.json`中的`lint`脚本，增加手动运行`lint`功能，最终`scripts`脚本如下
```json
"scripts": {
  "serve": "webpack serve --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js",
  "lint": "eslint . --ext .vue --ext .js"
},
```

## 遗留问题：虽然已启动webpack-dev-server的HMR, 但实际应用中未生效，不知道是不是webpack版本和webpack-dev-server的版本兼容问题

