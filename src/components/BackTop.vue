<template>
  <div class="backTop" v-show="toTopShow" @click="handleToTop"
       :style="{right: right + 'px', bottom: bottom +'px',}">
    <img src="../assets/images/Backtop.png">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data() {
    return {
      toTopShow: false,
      scrollTop: 0
    }
  },
  props: {
    // 开始出现的高度
    topHeight: {
      type: Number,
      default: 200
    },
    // 开始速度
    speed: {
      type: Number,
      default: 10
    },
    // 叠加速度
    setSpeed: {
      type: Number,
      default: 20
    },
    right: {
      type: Number,
      default: 60
    },
    bottom: {
      type: Number,
      default: 80
    }
  },
  mounted () {
    const self = this
    window.addEventListener('scroll', this.debounce(function () {
      self.handleScrolls()
    }, 300))
  },
  methods: {
    // 监控防抖
    debounce(fn, wait) {
      let timer = null
      return function () {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(fn, wait)
      }
    },
    // 处理滚动条的监控
    handleScrolls() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      this.toTopShow = scrollTop > this.topHeight;
    },
    // 处理回到开始位置
    handleToTop() {
      let speed = this.speed
      const setSpeed = this.setSpeed
      const self = this
      const timer = setInterval(function() {
        self.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        if (self.scrollTop > 0) {
          self.scrollTop = (self.scrollTop - speed > 0) ? (self.scrollTop - speed) : 0
          speed += setSpeed
          window.scrollTo(0, self.scrollTop)
        } else {
          clearInterval(timer)
        }
      }, 60)
    }
  }
}
</script>

<style scoped lang="less">
.backTop {
  width: 48px;
  height: 48px;
  position: fixed;
  text-align: center;
  padding-top: 2px;
  cursor: pointer;
  /* 动画 */
  transition: 0.6s;
  img {
    text-align: center;
  }
}
.backTop:hover {
  filter: opacity(0.8);;
}
</style>

