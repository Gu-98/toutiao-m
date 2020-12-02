import request from '@/utils/request'

//点赞文章
export const goodArticle = artId => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target: artId
    }
  })
}

//取消文章点赞
export const notGoodArticle = artId => {
  return request({
    url: `/v1_0/article/likings/${artId}`,
    method: 'DELETE'
  })
}
