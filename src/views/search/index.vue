<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/" class="searchForm">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296FA"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow=false"
      />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText"></search-result>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-advice v-else-if="searchText" :search-text="searchText" @search="onSearch"></search-advice>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history
      v-else
      :search-history="searchHistory"
      @clear-all-search-history="searchHistory=[]"
      @search="onSearch"
    ></search-history>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchAdvice from './components/search-advice'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchAdvice,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果的展示
      searchHistory: getItem('TOUTIAO_SEARCH_HISTORY') || [] // 存储历史记录
    }
  },
  mounted () {},
  created () {},
  methods: {
    onSearch (val) {
      // 更新文本框文本内容
      this.searchText = val
      // 存储历史记录
      // 要求不要有重复历史记录
      // 最新排在最前面
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)
      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  watch: {
    searchHistory (value) {
      setItem('TOUTIAO_SEARCH_HISTORY', value)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
    font-size: 28px;
  }
  .searchForm {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
