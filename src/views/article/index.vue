<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条" @click-left="$router.back()"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="acticle.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{acticle.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="acticle.aut_photo" />
          <div slot="title" class="user-name">{{acticle.aut_name}}</div>
          <div slot="label" class="publish-date">{{acticle.pubdate | relativeTime}}</div>
          <!-- <van-button
            v-if="acticle.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            :loading="FollowLoading"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow"
            :loading="FollowLoading"
          >关注</van-button>-->
          <!-- 模板中的$event是事件参数
          当传递给子组件的数据既要使用还要修改
           传递：props
            :is_followed="acticle.is_followed"
           修改：自定义事件
            @update-status="acticle.is_followed=$event"
            简写方式：在组件上使用v-model
            value="acticle.is_followed"
            @input="acticle.is_followed=$event"
            如果想要修改v-model的规则名称 可以通过子组件的model属性来配置修改

            一个组件上只能使用一次v-model

            如果有多个数据需要使用类似于v-model的效果？
            可以使用属性的.sync修饰符
          -->
          <follow-user :user_id="acticle.aut_id" class="follow-btn" v-model="acticle.is_followed"></follow-user>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="markdown-body article-content" v-html="acticle.content" ref="articleContentRef"></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small">写评论</van-button>
          <van-icon name="comment-o" info="123" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <collect-article v-model="acticle.is_collected" :artId="acticle.art_id"></collect-article>
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <good-article v-model="acticle.attitude" :articleId="acticle.art_id"></good-article>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus===404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getActiclesById } from '@/api/article'
import { ImagePreview } from 'vant'
import '@/utils/dayjs'
import FollowUser from '@/components/follow-user/index'
import CollectArticle from '@/components/collect-article/index'
import GoodArticle from '@/components/good-article/index'
export default {
  name: 'ArticleDetail',
  components: {
    FollowUser,
    CollectArticle,
    GoodArticle
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      acticle: {}, //文章详情
      loading: true, //加载状态
      errStatus: 0 //失败的状态码
    }
  },
  mounted() {},
  created() {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      this.loading = true
      try {
        const { data } = await getActiclesById(this.articleId)
        console.log(data)
        this.acticle = data.data
        // this.loading = false
        setTimeout(() => {
          this.previewImg()
        }, 0)
      } catch (error) {
        // this.loading = false
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
        this.$toast('获取新闻详情失败', error)
      }
      //无论成功还是失败 都需要关闭loading
      this.loading = false
    },
    previewImg() {
      //得到所有的img节点
      const content = this.$refs.articleContentRef
      //   console.log(content)
      const images = content.querySelectorAll('img')

      console.log(images)
      const imgurl = []
      images.forEach((img, index) => {
        console.log(img.src)

        imgurl.push(img.src)
        img.onclick = () => {
          ImagePreview({
            //预览的图片地址数组
            images: imgurl,
            //起始位置
            startPosition: index
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/.van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
