<template>
  <van-icon
    :class="attitude===1?'active':''"
    :name="attitude===1?'good-job':'good-job-o'"
    @click="onGood"
  ></van-icon>
</template>

<script>
import { goodArticle, notGoodArticle } from '@/api/good'
export default {
  name: 'GoodArticle',
  components: {},
  model: {
    prop: 'attitude',
    event: 'updatelike'
  },
  props: {
    attitude: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {}
  },
  mounted() {},
  created() {},
  methods: {
    async onGood() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '操作中...'
      })
      try {
        if (this.attitude === 1) {
          //已点赞 执行取消点赞
          await notGoodArticle(this.articleId)
          this.attitude === 0
          this.$toast.success('取消点赞')
        } else {
          //未点赞 执行点赞
          await goodArticle(this.articleId)
          this.attitude === 1
          this.$toast.success('点赞成功')
        }
        this.$emit('updatelike', this.attitude === 1 ? 0 : 1)
      } catch (error) {
        this.$toast('操作失败，请稍后重试', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  color: red;
}
</style>
