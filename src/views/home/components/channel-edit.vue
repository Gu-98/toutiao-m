<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        @click="isEdit=!isEdit"
      >{{isEdit?"完成":"编辑"}}</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(item,index) in myChannels"
        :key="index"
        class="grid-item"
        @click="onMyChannelClick(item,index)"
      >
        <!-- v-bind:class语法
        一个对象：对象中的key表示要作用的css类名
        对象中的value要计算出布尔值 true则作用该类名 false不作用该类名-->
        <span slot="text" class="text" :class="{active:index===active}">{{item.name}}</span>
        <van-icon slot="icon" name="clear" v-show="isEdit&&!fixChannels.includes(item.id)"></van-icon>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="(item,index) in recommendChannels"
        :key="index"
        class="grid-item"
        icon="plus"
        @click="onAddChannels(item)"
      >
        <span slot="text" class="text">{{item.name}}</span>
      </van-grid-item>
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import {
  getALLChannels,
  addUsersChannels,
  delUsersChannels
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示与隐藏
      fixChannels: [0] // 固定频道 不允许删除
    }
  },
  mounted () {},
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getALLChannels()
        console.log(data)
        this.allChannels = data.data.channels
        console.log(this.allChannels)
      } catch (error) {
        this.$toast('获取数据失败', error)
      }
    },
    async onAddChannels (channel) {
      this.myChannels.push(channel)
      // 数据持久化处理
      try {
        if (this.user) {
          // 已登录 把数据请求接口放到线上
          const { data } = await addUsersChannels({
            id: channel.id, // 频道id
            seq: this.myChannels.length // 序号
          })
          console.log(data)
        } else {
          // 未登录 把数据存储到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        this.$toast('添加用户频道失败', error)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 1.如果是固定频道 则不删除
        if (this.fixChannels.includes(channel.id)) {
          return
        }
        // 2.编辑状态 执行删除操作
        // 参数1：要删除的元素的开始索引 （包括）
        // 参数2：删除的个数 如果不指定 则从参数1开始一直删除到最后
        if (index < this.active) {
          // 3.让激活频道的索引减1
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        // 4.处理持久化
        this.deleteChannel(channel.id)
      } else {
        // 非编辑状态 执行切换状态
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (channelId) {
      try {
        if (this.user) {
          // 已登录 请求删除接口
          await delUsersChannels(channelId)
        } else {
          // 未登录 将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        this.$toast('删除用户频道失败', error)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    // 计算属性会监测内部数据的变化
    // 如果依赖的数据发生变化 则计算属性会重新调用
    /* recommendChannels() {
      const reChannels = []
      this.allChannels.forEach(channel => {
        //find 遍历数组 找到满足条件的元素项
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        //如果我的频道中不包括该频道项 则推荐到推荐频道
        if (!ret) {
          reChannels.push(channel)
        }
      })
      //把计算结果返回
      return reChannels
    } */
    recommendChannels () {
      // 数组的filter方法：遍历数组，把符合条件的元素存储到新数组并返回
      // 数组的find方法：遍历数组，把符合条件的第一个元素返回
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(mychannel => {
          return mychannel.id === channel.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: #3296fa;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
  /deep/.my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
}
</style>
