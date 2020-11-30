<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        to="/search"
      >搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab :title="item.name" v-for="item in userChannelsList" :key="item.id">
        <!-- 文章列表 -->
        <article-list :channel="item"></article-list>
        <!-- /文章列表 -->
      </van-tab>
      <!-- 占位充当内容区域 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- /频道列表 -->

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :my-channels="userChannelsList"
        :active="active"
        @update-active="onUpdateActive"
      ></channel-edit>
    </van-popup>
    <!-- /频道编辑弹出层 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/home/components/article-list'
import ChannelEdit from '@/views/home/components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      userChannelsList: [],
      isChannelEditShow: false // 控制编辑频道弹出层的显示与隐藏
    }
  },
  mounted () {},
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        let channels = []
        if (this.user) {
          // 已登录 请求获取用户频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录 判断是否有本地的频道列表数据
          const localChannel = getItem('TOUTIAO_CHANNELS')
          if (localChannel) {
            // 如果有 就使用
            channels = localChannel
          }
          // 如果没有 请求获取默认频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
        this.userChannelsList = channels
      } catch (error) {
        this.$toast('获取频道列表数据失败')
      }
    },
    onUpdateActive (index, isChannelEditShow = true) {
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 558px;
    height: 67px;
    background-color: #5babfb;
    font-size: 28px;
    border: none;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      left: 0;
      right: 0;
      top: 92px;
      z-index: 1;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 34px !important;
      height: 9px;
      background-color: #3296fa;
      bottom: 8px;
      border-radius: 3px;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .placeholder {
      width: 66px;
      height: 82px;
      flex-shrink: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      opacity: 0.902;
      .toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
  }
}
</style>
