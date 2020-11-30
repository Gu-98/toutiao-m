<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon name="cross" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginFormRef">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- time倒计时时间 -->
          <van-count-down
            :time="1000*60"
            format="ss s"
            v-if="isCountDownShow"
            @finish="isCountDownShow=false"
          />
          <van-button
            size="small"
            type="default"
            round
            class="send-sms-btn"
            @click="onSendSms"
            native-type="button"
            v-else
          >获取验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>
<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  components: {},
  data () {
    return {
      user: {
        mobile: '15982871878',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      //   是否展示倒计时
      isCountDownShow: false
    }
  },
  mounted () {},
  created () {},
  methods: {
    async onSubmit () {
      //   1.获取表单数据
      const user = this.user
      //   2.表单验证

      // loading 转圈圈提示
      //   在组件中可以直接通过 this.$toast 调用
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })
      //   3.提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 登录成功 跳转回原来的页面
        // back方式不严谨
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) { return this.$toast.fail('手机号或验证码错误') }
        this.$toast.fail('登录失败，请稍后重试', err)
      }
      //   4.根据请求响应结果处理后续操作
    },
    async onSendSms () {
      console.log('onSendSms')
      // 1.校验手机号
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        //   发送失败 关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) { return this.$toast('请勿频繁发送,稍后重试') }
        this.$toast('发送失败,请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 36px;
  }
  .send-sms-btn {
    background-color: #ededed;
    width: 162px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
