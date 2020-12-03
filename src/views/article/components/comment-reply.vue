<template>
  <div class="comment-reply">
    <van-nav-bar :title="comment.reply_count>0?`${comment.reply_count}条回复`:'暂无回复'">
      <van-icon name="cross" slot="left" @click="$emit('close')" />
    </van-nav-bar>

    <div class="scroll-wrap">
      <comment-item :comment="comment"></comment-item>
      <van-cell title="所有回复" />
      <!-- 评论的回复列表 -->
      <comment-list :source="comment.com_id" type="c" :list="commentList"></comment-list>
      <!-- /评论的回复列表 -->
    </div>

    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button size="small" round class="writeReplyBtn" @click="isShow=true">写评论</van-button>
    </div>
    <!-- /发布评论 -->

    <van-popup v-model="isShow" position="bottom">
      <comment-post :target="comment.com_id" @onPost-success="onSuccess" />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item.vue'
import CommentList from './comment-list'
import CommentPost from './comment-post'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isShow: false,
      commentList: []
    }
  },
  mounted() {},
  created() {},
  methods: {
    onSuccess(data) {
      //更新回复的数量
      this.comment.reply_count++
      //关闭弹出层
      this.isShow = false
      //将最新回复的内容展示到列表顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  z-index: unset;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .writeReplyBtn {
    width: 60%;
  }
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow: auto;
}
</style>
