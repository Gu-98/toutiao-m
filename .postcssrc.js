module.exports = {
  // 配置要使用的PostCss插件
  plugins: {
    // 配置要使用的autoprefixer插件
    // 作用：生成浏览器css样式规则前缀
    // vuecli内部已经配置了autoprefixer插件
    // 所以又配置了一次，所以产生冲突
    autoprefixer: {
      // 配置要兼容到的环境信息
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8']
    },
    // 配置使用postcss-pxtorem插件
    'postcss-pxtorem': {
      // 根元素的值 lib-flexable 的 REM 适配方案每份十分之一 则应该设置为你的设计稿的十分之一
      // 这里我们的设计稿是750px
      // 如果是 Vant 的样式，就把 rootValue 设置为 37.5 来转换
      // 如果是我们的样式，就按照 75 的 rootValue 来转换
      // rootValue两种类型：固定的数值或者函数 动态处理
      // postcss-pxtorem处理每个css文件的时候 都会来调用这个函数 它会把被处理的css文件相关的信息通过参数传递给该函数
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的css属性
      // *表示所有
      propList: ['*'],
      //排除不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
