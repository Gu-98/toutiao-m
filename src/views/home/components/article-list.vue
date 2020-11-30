<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFrenshLoading"
      @refresh="onRefresh"
      :success-text="reFrenshSuccessText"
      :success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item v-for="(item,index) in list" :key="index" :article="item"></article-item>
        <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getActicles } from '@/api/article'
import ArticleItem from '@/components/article-item/index'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中loading状态
      finished: false, // 控制数据加载结束状态
      timestamp: null, // 请求获取并保存下一页时间戳
      error: false, // 是否加载失败
      isreFrenshLoading: false, // 控制下拉刷新加载的状态
      reFrenshSuccessText: '' // 下拉刷新成功提示文本
    }
  },
  mounted () {},
  created () {},
  methods: {
    //   初始化或滚动底部的时候会触发调用onload
    async onLoad () {
      // 异步更新数据
      try {
        //   1.请求获取数据
        const { data } = await getActicles({
          channel_id: this.channel.id, // 频道id
          // timestamp 简单理解就是请求数据的页码
          // 请求数据第一页数据：当前最新的时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: this.timestamp || Date.now(),
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // console.log(data.data)
        // 2.把请求结果数据放到list数组中
        const { results } = data.data
        // 数组的展开操作符，她会把数组元素一个一个拿出来
        this.list.push(...results)
        // 3.本次数据加载结束之后要把加载状态设置为结束
        // loading关闭之后才能触发下一次加载更多
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 如果没有数据了 把finish设置为true 之后不再触发加载更多
          this.finished = true
        }
      } catch (error) {
        // 展示错误提示信息
        this.error = true
        // 请求失败了 loading也需要关闭
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        // 请求获取数据
        const { data } = await getActicles({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), // 下拉刷新 每次请求获取最新数据 所以传递当前最新时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        const { results } = data.data
        // 将数据追加到列表的顶部
        this.list.unshift(...results)
        // 关闭下拉刷新的loading状态
        this.isreFrenshLoading = false
        // 更新下拉刷新成功提示的文本
        this.reFrenshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.reFrenshSuccessText = '刷新失败'
        this.isreFrenshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  // 滚动容器
  height: 79vh;
  overflow-y: auto;
}
</style>
