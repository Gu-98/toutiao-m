<template>
  <van-icon
    :color="is_collected?'#FFDC00':''"
    :name="is_collected?'star':'star-o'"
    @click="onCollect"
    :loading="loading"
  />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/collect'
export default {
  name: 'CollectArticle',
  components: {},
  model: {
    prop: 'is_collected',
    event: 'update-collect'
  },
  props: {
    is_collected: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  mounted() {},
  created() {},
  methods: {
    async onCollect() {
      console.log('11')

      this.loading = true
      try {
        if (this.is_collected) {
          //收藏 执行取消收藏
          await deleteCollect(this.artId)
        } else {
          //未收藏 执行收藏
          await addCollect(this.artId)
        }
        // this.is_collected = !this.is_collected
        this.$emit('update-collect', !this.is_collected)
        this.$toast.success(this.is_collected ? '取消收藏' : '收藏成功')
      } catch (error) {
        this.$toast('操作失败，请重试', error)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
