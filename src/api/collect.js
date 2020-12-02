import request from '@/utils/request'

//添加收藏
export const addCollect = artId => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target: artId
    }
  })
}

//取消收藏
export const deleteCollect = artId => {
  return request({
    url: `/v1_0/article/collections/${artId}`,
    method: 'DELETE'
  })
}
