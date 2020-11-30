<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-all-search-history')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon name="delete" @click="isDeleteShow=true" v-else />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistory"
      :key="index"
      @click="delSearchItem(item,index)"
    >
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  // prop数据
  // prop是受父组件数据影响的
  // 如果是普通数据（数字、字符串、布尔值）绝对不能修改
  // 即便改了也不会传到父组件

  // 如果是引用型数据（数组、对象）
  // 可以修改
  // 不能重新赋值
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 控制删除状态
    }
  },
  mounted () {},
  created () {},
  methods: {
    delSearchItem (item, index) {
      if (this.isDeleteShow) {
        // 执行删除操作
        this.searchHistory.splice(index, 1)
      } else {
        // 执行搜索操作
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
