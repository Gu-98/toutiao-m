<template>
  <van-button
    v-if="is_followed"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="FollowLoading"
  >已关注</van-button>
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="FollowLoading"
  >关注</van-button>
</template>

<script>
import { addUsers, deleteUsers } from '@/api/user'
export default {
  name: 'FollowUser',
  components: {},
  model: {
    prop: 'is_followed',
    event: 'update-status'
  },
  props: {
    is_followed: {
      type: Boolean,
      required: true
    },
    user_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      FollowLoading: false
    }
  },
  mounted() {},
  created() {},
  methods: {
    //用户关注与取消操作
    async onFollow() {
      this.FollowLoading = true
      try {
        if (this.is_followed) {
          //已关注 取消关注
          await deleteUsers(this.user_id)
          //   this.is_followed = false
        } else {
          //未关注 添加关注
          await addUsers(this.user_id)
          //   this.is_followed = true
        }
        // this.is_followed = !this.is_followed
        this.$emit('update-status', !this.is_followed)
      } catch (error) {
        let msg = '操作失败，请重试'
        if (error.response && error.response.status === 400) {
          msg = '你不能关注自己'
        }
        this.$toast(msg)
      }
      this.FollowLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
