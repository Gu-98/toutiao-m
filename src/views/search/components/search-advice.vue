<template>
  <div class="search-advice">
    <van-cell
      icon="search"
      v-for="(item, index) in advices"
      :key="index"
      @click="$emit('search',item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchAdvice } from '@/api/search'
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from 'lodash'
export default {
  name: 'SearchAdvice',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      advices: [] // 联想建议数据列表
    }
  },
  mounted () {},
  created () {},
  methods: {
    async loadSearchAdvice (q) {
      try {
        const { data } = await getSearchAdvice(q)
        console.log(data)
        this.advices = data.data.options
      } catch (error) {
        this.$toast('数据获取失败', error)
      }
    },
    highlight (text) {
      // const highlightStr = `<span class="active">${this.searchText}</span>`
      // 正则表达式 // 中间的内容都会当做匹配字符来使用 而不是数据变量
      // 如果需要根据变量动态的创建正则表达式 手动new RegExp
      // RegExp 正则表达式构造函数
      // 参数1：匹配模式字符串 它会根据这个字符串创建正则对象
      // 参数2：匹配模式 要写到字符串中
      // const reg = new RegExp(this.searchText, 'gi')
      // return text.replace(reg, highlightStr)
      const arr = text.split(this.searchText)
      const highlightStr = `<span class="active">${this.searchText}</span>`
      return arr.join(highlightStr)
    }
  },
  watch: {
    searchText: {
      // 当searchText发生改变的时候就会调用handler函数
      // 注意：handler函数名称是固定的
      /* handler(value) {
        this.loadSearchAdvice(value)
      }, */
      // debounce函数
      // 参数1：一个函数
      // 参数2：延迟时间 停下来超过这个时间 单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (value) {
        this.loadSearchAdvice(value)
      }, 200),
      // 该回调将会在侦听开始之后被立即调用
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.search-advice {
  /deep/span.active {
    color: #3296fa;
  }
}
</style>
