<template>
  <div class="update-birthday">
    <!-- currentDate双向绑定了日期选择器
      设置日期选择器的默认值
    同步日期选择器选择的日期-->
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  components: {},
  model: {
    prop: ['birthday'],
    event: ['updateBirthday']
  },
  props: {
    birthday: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.birthday)
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
          birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
        })
        //更新视图
        this.$emit(
          'updateBirthday',
          dayjs(this.currentDate).format('YYYY-MM-DD')
        )
        //关闭弹出层
        this.$emit('close')
        //提示成功
        this.$toast.success('更新生日成功')
      } catch (error) {
        console.log(error)
        this.$toast('修改失败', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
