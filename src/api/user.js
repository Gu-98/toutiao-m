import request from '@/utils/request'
// import store from '@/store/index'
export const login = data => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // 发送请求头数据
    /* headers: {
            // 注意：该接口需要授权才能访问
            //       token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
            Authorization: `Bearer ${store.state.user.token}`
        } */
  })
}
// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 关注用户
export const addUsers = userId => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消用户
export const deleteUsers = userId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}
