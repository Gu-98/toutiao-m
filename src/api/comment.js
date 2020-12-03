// 评论模块
import request from '@/utils/request'

//获取评论
export const getComment = params => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}

//对评论点赞
export const goodComment = goodId => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: goodId
    }
  })
}

//对评论取消点赞
export const deleteGoodComment = goodId => {
  return request({
    url: `/v1_0/comment/likings/${goodId}`,
    method: 'DELETE'
  })
}

// 添加评论
export const addComment = data => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
