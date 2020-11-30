<template>
  <div class="my-container">
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <!-- <van-image class="avatar" :src="userInfo.photo" round fit="cover" /> -->
          <van-image class="avatar" :src="require('@/assets/mobile.png')" round fit="cover" />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo. like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt class="mobileImg" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span class="text" slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span class="text" slot="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- /导航 -->

    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell title="退出登录" class="logout-cell" center v-if="user" @click="onlogOut" clickable />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  mounted () {},
  created () {
    // 如果用户登录了 则请求加载用户信息
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    onlogOut () {
      // 退出提示

      // 在组件中需要使用this.$dialog来调用
      this.$dialog
        .confirm({
          title: '确认退出吗？'
        })
        .then(() => {
          // 确认退出：清除登录状态（容器中的user+本地存储的token）
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        //
        this.userInfo = data.data
      } catch (error) {
        this.$toast('获取用户信息失败，请稍后重试')
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
// 在css、html中使用@必须在前面加~
.my-container {
  .header {
    height: 360px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobileImg {
        width: 135px;
        height: 135px;
      }
      .text {
        font-size: 28px;
        margin-top: 15px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 230px;
      // background-color: #fff;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
          margin-left: 23px;
        }
      }
    }
    .data-stats {
      // height: 130px;
      display: flex;
      .data-item {
        display: flex;
        flex: 1;
        height: 130px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      .toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
      }
    }
  }
  .logout-cell {
    font-size: 30px;
    text-align: center;
    height: 100px;
    color: #d86262;
    margin-top: 10px;
  }
}
</style>
