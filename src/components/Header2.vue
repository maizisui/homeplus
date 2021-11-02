<template>
  <div class="header-container">
    <div class="header-mobile-nav" :class="{ active: showMobile }">
      <div class="close-menu" @click="closeHeaderMobile()">
        <i class="el-icon-close"></i>
      </div>
      <ul class="nav">
        <li><router-link class="link" to="/">Home</router-link></li>
        <li><router-link class="link" to="/browse?query=%7B%22mapBounds%22%3A%7B%22westLng%22%3A-98.80585087614779,%22eastLng%22%3A-98.63633955165457,%22northLat%22%3A29.7387200000981,%22southLat%22%3A29.68486762017953,%22zoom%22%3A13%7D%7D">Invest</router-link></li>
        <li><router-link class="link" to="/browse?query=%7B%22mapBounds%22%3A%7B%22westLng%22%3A-98.80585087614779,%22eastLng%22%3A-98.63633955165457,%22northLat%22%3A29.7387200000981,%22southLat%22%3A29.68486762017953,%22zoom%22%3A13%7D%7D">Buy</router-link></li>
        <li><router-link class="link" to="/content/4">Contact</router-link></li>
      </ul>
      <div class="login-box">
        <Login1 />
      </div>
    </div>
    <div class="off-canvas-overlay"></div>
    <div class="header header2 clearfix">
      <div class="logo pull-left">
        <router-link to="/"><img src="../../src/assets/images/logo.png" alt="" width="auto" height="36px"/></router-link>
      </div>
      <div class="search-box pull-left">
        <Search />
      </div>
      <div class="header-right pull-right">
        <ul class="nav pull-left">
          <li><router-link class="link" to="/home">Home</router-link></li>
          <li><router-link class="link" to="/browse?query=%7B%22mapBounds%22%3A%7B%22westLng%22%3A-98.80585087614779,%22eastLng%22%3A-98.63633955165457,%22northLat%22%3A29.7387200000981,%22southLat%22%3A29.68486762017953,%22zoom%22%3A13%7D%7D">Invest</router-link></li>
          <li><router-link class="link" to="/browse?query=%7B%22mapBounds%22%3A%7B%22westLng%22%3A-98.80585087614779,%22eastLng%22%3A-98.63633955165457,%22northLat%22%3A29.7387200000981,%22southLat%22%3A29.68486762017953,%22zoom%22%3A13%7D%7D">Buy</router-link></li>
          <li><router-link class="link" to="/content/4">Contact</router-link></li>
        </ul>
        <div class="login-box pull-right">
          <Login1 />
        </div>
      </div>
    </div>
    <div class="header-mobile clearfix">
      <div class="logo pull-left">
        <router-link to="/"><img src="../../src/assets/images/logo.png" alt="" width="120px"/></router-link>
      </div>
      <div class="switch-btn pull-right" @click="showMobileHeader()">
        <i class="el-icon-s-unfold" v-if="!showMobile"></i>
        <i class="el-icon-s-fold" v-if="showMobile"></i>
      </div>
    </div>

  </div>
</template>

<script>

import Search from "@/components/Search";
import Login1 from "@/components/Login1";

export default  {
  name: 'Header2',
  components: {
    Search,
    Login1
  },
  props: [],
  data() {
    return {
      keywords: '',
      showMobile: false,
    };
  },
  methods: {
    showMobileHeader() {
      this.showMobile = !this.showMobile;
    },
    closeHeaderMobile() {
      this.showMobile = false;
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">


.header-mobile-nav {
  width: 300px;
  background: #fff;
  position: fixed;
  height: 100%;
  z-index: 99999;
  top: 0;
  left: -100%;
  transition: .3s;
  .close-menu i {
    position: absolute;
    right: 20px;
    color: #d9aa29;
    top: 10px;
    font-size: 24px;
  }
  &.active {
    left: 0;
  }
  .nav {
    margin-top: 40px;
    padding: 0 20px;
    li {
      display: block;
      padding: 15px 0;
      font-size: 18px;
      border-bottom: 1px solid #ebebeb;
      a {
        color: #d9aa29;
        text-decoration: none;
      }
    }
  }
}

.header2 /deep/ .login .btn {
  margin: 0 8px;
  color: #8d8d8d;
}

.header-container {
  position: fixed;
  width: 100%;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #eee;
  .header {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 0;
    ul.nav {
      margin-top: 8px;
      li {
        float: left;
        padding: 0 20px;
        .link {
          display: inline-block;
          padding-bottom: 10px;
          color: #333;
          text-decoration: none;
          font-size: 16px;
          &:hover {
            color: #d9aa29;
            border-bottom: 2px solid #d9aa29;
          }
          &.router-link-active {
            color: #d9aa29;
            border-bottom: 2px solid #d9aa29;
          }
        }
      }

    }
  }
  .header-mobile {
    display: none;
  }
  @media screen and (max-width: 767px) {
    .header {
      display: none;
    }
    .header-mobile {
      display: block;
      padding: 5px 10px;
      .switch-btn {
        cursor: pointer;
        i {
          font-size: 40px;
          color: #d9aa29;
        }
      }
    }
  }
}

.header2 .search-box {
  overflow: hidden;
  display: flex;
  margin-top: 4px;
  margin-left: 30px;
  justify-content: center;
  /deep/ .search-input {
    float: left;
    width: 320px !important;
    .el-input__inner {
      height: 32px;
    }
  }
  /deep/ .search-btn {
    float: left;
    width: 60px;
    height: 32px;
    background: #d9aa29;
    line-height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: -5px;
    position: relative;
    z-index: 2;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    img {
      width: 22px;
      height: 22px;
    }
  }
  @media screen and (max-width: 767px) {
    margin-top: 65px;
    .search-input {
      float: left;
      width: 80%;
    }
    .search-btn {
      width: 20%;
    }
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

</style>
