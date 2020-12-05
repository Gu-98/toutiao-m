<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="gender"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  components: {},
  model: {
    prop: ['gender'],
    event: ['updateGender']
  },
  props: {
    gender: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: 0
    }
  },
  mounted() {},
  created() {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await editUserProfile({
          gender: this.localGender
        })
        //更新视图
        this.$emit('updateGender', this.localGender)
        //关闭弹出层
        this.$emit('close')
        //提示成功
        this.$toast.success('更新性别成功')
      } catch (error) {
        console.log(error)
        this.$toast('修改失败', error)
      }
    },
    onChange(picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style lang="less" scoped>
</style>
