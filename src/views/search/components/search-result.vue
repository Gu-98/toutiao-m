<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      class="search"
    >
      <van-cell v-for="(item,index) in searchResultsList" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      searchResultsList: [],
      loading: false,
      finished: false,
      page: 1, // 页码
      per_page: 20, // 每页大小
      error: false
    }
  },
  mounted () {},
  created () {},
  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        console.log(data)
        // 2.将数据添加到数组列表中
        this.searchResultsList.push(...data.data.results)
        // 3.将本次加载中的loading关闭
        this.loading = false
        // 4.判断是否还有数据
        // 如果有 则更新获取下一次数据的页码
        // 如果没有 则将加载状态finished设置为结束
        if (data.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  height: 92vh;
  overflow: auto;
}
</style>
