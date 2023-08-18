# music-chapter
网易云音乐项目实战  
基于vue2
## 技术架构
- vue2
- vant，轻量化移动端vue组件库【注意：官方提供的vue2对应版本是[v2](https://vant-contrib.gitee.io/vant/v2/)】
- postcss，`npm install postcss postcss-pxtorem@5.1.1 -D`
- vue-router,`npm i vue-router@3.5.2`,由于vue2不能使用vue-router4的版本，所以在安装时需要指定版本3
- vuex@3,`npm install vuex@3 --save`,由于vue2不能使用vuex4的版本，所以在安装时需要指定版本3
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 加入了git commit规范
[github](https://github.com/ITxiaohao/conventional-changelog-custom-config)

### 如何使用它
生成 CHANGELOG 之前得先 commit，记得在 master 主分支上发布版本，再生成 CHANGELOG，流程如下：
```
git add .

npm run commit

npm run release

npm run changelog
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
