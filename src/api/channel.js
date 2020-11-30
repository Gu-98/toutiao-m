// 频道请求模块
import request from '@/utils/request'

// 获取所有频道列表
export const getALLChannels = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}

// 添加用户频道
export const addUsersChannels = channel => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}

// 删除用户频道
export const delUsersChannels = channelId => {
  return request({
    url: `/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}
