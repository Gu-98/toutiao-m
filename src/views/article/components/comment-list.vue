<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <comment-item
      v-for="(item,index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click',$event)"
      :immediate-check="false"
    ></comment-item>
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      //自定义prop数据验证
      validator(value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, //获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      limit: 10 //获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
    }
  },
  mounted() {},
  created() {
    //当你手动初始onload的话 他不会自动开始初始的loading
    //所以我们要手动的开启初始loading
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        //1.请求获取数据
        const { data } = await getComment({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        //2.将数据追加到列表数组中
        console.log(data)
        this.list.push(...data.data.results)

        //将评论数量传给父组件
        this.$emit('total', data.data)
        //3.将loading状态关闭
        this.loading = false
        //4.判断是否还有数据
        //如果有 就更新下一页
        //如果没有 就将finished设置为结束
        if (data.data.results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.$toast('获取评论列表失败', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
