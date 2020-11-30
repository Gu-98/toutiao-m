import Vue from 'vue'
import dayjs from 'dayjs'
// dayjs默认是英文 我们设置为中文
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 参数一：过滤器名称
// 参数二：过滤器函数
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
