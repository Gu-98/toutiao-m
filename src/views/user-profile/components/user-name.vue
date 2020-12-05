<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="设置昵称"
      left-text="返回"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onName"
    />
    <!-- /导航栏 -->

    <!-- 输入框 -->
    <van-field
      v-model="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="8"
      placeholder="请输入昵称"
      show-word-limit
      class="inputName"
    />
    <!-- /输入框 -->
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  components: {},
  model: {
    prop: 'name',
    event: 'updateName'
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.name
    }
  },
  mounted() {},
  created() {},
  methods: {
    async onName() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.localName.trim() === '') {
          return this.$toast('请输入昵称')
        }
        await editUserProfile({
          name: this.localName
        })
        //更新视图
        this.$emit('updateName', this.localName)
        //关闭弹出层
        this.$emit('close')
        //提示成功
        this.$toast.success('更新昵称成功')
      } catch (error) {
        console.log(error)
        this.$toast('修改失败', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-name {
  .inputName {
    padding-top: 20px;
    margin-top: 20px;
  }
}
</style>
