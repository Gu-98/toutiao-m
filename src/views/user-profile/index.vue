<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" left-arrow class="page-nav-bar" @click-left="$router.back()" />
    <!-- /导航栏 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息  -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image fit="cover" :src="user.photo" round class="avatar" />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isNameShow=true" />
    <van-cell title="性别" is-link :value="user.gender===0?'男':'女'" @click="isGenderShow=true" />
    <van-cell title="生日" is-link :value="user.birthday" @click="isBirthdayShow=true" />
    <!-- /个人信息  -->

    <!-- 昵称弹出层 -->
    <van-popup v-model="isNameShow" position="bottom" style="height:100%">
      <update-name @close="isNameShow=false" v-model="user.name" v-if="isNameShow" />
    </van-popup>
    <!-- /昵称弹出层 -->

    <!-- 性别弹出层 -->
    <van-popup v-model="isGenderShow" position="bottom">
      <update-gender @close="isGenderShow=false" v-model="user.gender" v-if="isGenderShow" />
    </van-popup>
    <!-- /性别弹出层 -->

    <!-- 生日弹出层 -->
    <van-popup v-model="isBirthdayShow" position="bottom">
      <update-birthday v-model="user.birthday" @close="isBirthdayShow=false" v-if="isBirthdayShow" />
    </van-popup>
    <!-- /生日弹出层 -->

    <!-- 头像弹出层 -->
    <van-popup v-model="isAvatarShow" position="bottom" style="height:100%">
      <update-avatar
        :img="img"
        @close="isAvatarShow=false"
        v-if="isAvatarShow"
        @update-avatar="user.photo=$event"
      />
    </van-popup>
    <!-- /头像弹出层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/user-name'
import UpdateGender from './components/user-gender'
import UpdateBirthday from './components/user-birthday'
import UpdateAvatar from './components/user-avatar'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateAvatar
  },
  data() {
    return {
      user: {},
      isNameShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      isAvatarShow: false,
      img: null // 预览的图片
    }
  },
  mounted() {},
  created() {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (error) {
        this.$toast('获取失败', error)
      }
    },
    onFileChange() {
      //获取文件对象
      const file = this.$refs.file.files[0]
      //基于文章对象获取blob数据
      const imgURL = window.URL.createObjectURL(file)
      console.log(imgURL)
      this.img = imgURL
      //展示预览图片弹出层
      this.isAvatarShow = true
      //file-input 如果选择了同一文件 不会触发change事件
      //解决办法就是 每次使用完毕 把value值清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
