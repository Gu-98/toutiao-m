<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type===3">
        <div class="cover-item" v-for="(item, index) in article.cover.images" :key="index">
          <van-image :src="item" fit="cover" class="cover-item-img" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{article.aut_name}}</span>
        <span>{{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <van-image
      :src="article.cover.images[0]"
      slot="default"
      v-if="article.cover.type===1"
      class="rigth-cover"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  mounted () {},
  created () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .rigth-cover {
    width: 232px;
    height: 146px;
    background-size: cover;
  }
  .label-info-wrap span {
    color: #b4b4b4;
    font-size: 22px;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        height: 146px;
        width: 100%;
      }
    }
  }
}
</style>
