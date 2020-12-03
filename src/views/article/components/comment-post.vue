<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      const inputmsg = this.message.trim()
      if (!inputmsg.length) {

      } else {
        this.$toast.loading({
          message: '发布中...',
          forbidClick: true,
          duration: 0 // 持续展示 toast
        })
        try {
          const { data } = await addComment({
            target: this.target,
            content: this.message,
            art_id: this.articleId ? this.articleId : null
          })
          console.log(data)
          this.$emit('onPost-success', data.data)
          this.message = ''
          this.$toast.success('发布成功')
        } catch (error) {
          this.$toast.fail('发布失败')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
