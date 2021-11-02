<template>
  <div class="house-list-container">
    <div class="house-list clearfix">
      <ul class="tab-nav clearfix">
        <li
            @click="handleClick('invest')"
            v-bind:class="{ active: isInvest }"
        >
          Invest
        </li>
        <li @click="handleClick('buy')" v-bind:class="{ active: isBuy }">
          Buy
        </li>
      </ul>
      <div v-if="isBuy">
        <ul class="tab-content clearfix">
          <li v-for="item in houseList" v-bind:key="item.id">
            <el-card :body-style="{ padding: '0px' }">
              <router-link :to="item.link">
                <img :src="item.src" class="image" alt=""/>
              </router-link>
              <div class="info" style="padding: 14px;">
                <div class="price-box clearfix">
                  <div class="price pull-left">${{ item.price }}</div>
                  <div class="like pull-right">
                    <img
                        v-if="item.like"
                        src="../assets/images/img_like.jpg"
                        alt="img_like"
                    />
                    <img
                        v-if="!item.like"
                        src="../assets/images/img_unlike.jpg"
                        alt="img_unlike"
                    />
                  </div>
                </div>
                <div class="title ellipsis">
                  <router-link :to="item.link">
                    {{ item.name }}
                  </router-link>
                </div>
                <div class="specs">
                    <span
                    ><strong>{{ item.bed }}</strong> bed</span
                    >
                  <span
                  ><strong>{{ item.bath }}</strong> bath
                    </span>
                  <span
                  ><strong>{{ item.sqft }}</strong> sqft
                    </span>
                </div>
              </div>
            </el-card>
          </li>
        </ul>
        <div class="swiper-box">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="item in houseList" v-bind:key="item.id">
              <li>
                <el-card :body-style="{ padding: '0px' }">
                  <router-link :to="item.link">
                    <img :src="item.src" class="image" alt=""/>
                  </router-link>
                  <div class="info" style="padding: 14px;">
                    <div class="price-box clearfix">
                      <div class="price pull-left">${{ item.price | toThousandFilter }}</div>
                      <div class="like pull-right">
                        <img
                            v-if="item.like"
                            src="../assets/images/img_like.jpg"
                            alt="img_like"
                        />
                        <img
                            v-if="!item.like"
                            src="../assets/images/img_unlike.jpg"
                            alt="img_unlike"
                        />
                      </div>
                    </div>
                    <div class="title ellipsis">
                      <router-link :to="item.link">
                        {{ item.name }}
                      </router-link>
                    </div>
                    <div class="specs">
                        <span
                        ><strong>{{ item.bed }}</strong> bed</span
                        >
                      <span
                      ><strong>{{ item.bath }}</strong> bath
                        </span>
                      <span
                      ><strong>{{ item.sqft }}</strong> sqft
                        </span>
                    </div>
                  </div>
                </el-card>
              </li>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div v-if="isInvest">
        <ul class="tab-content clearfix">
          <li v-for="item in houseList" v-bind:key="item.id">
            <el-card :body-style="{ padding: '0px' }">
              <router-link :to="item.link">
                <img :src="item.src" class="image" alt=""/>
              </router-link>
              <div class="info" style="padding: 14px;">
                <div class="price-box clearfix">
                  <div class="price pull-left">${{ item.price | toThousandFilter }}</div>
                  <div class="like pull-right">
                    <img
                        v-if="item.like"
                        src="../assets/images/img_like.jpg"
                        alt="img_like"
                    />
                    <img
                        v-if="!item.like"
                        src="../assets/images/img_unlike.jpg"
                        alt="img_unlike"
                    />
                  </div>
                </div>
                <div class="title ellipsis">
                  <router-link :to="item.link">
                    {{ item.name }}
                  </router-link>
                </div>
                <div class="specs">
                    <span
                    ><strong>{{ item.bed }}</strong> bed</span
                    >
                  <span
                  ><strong>{{ item.bath }}</strong> bath
                    </span>
                  <span
                  ><strong>{{ item.sqft }}</strong> sqft
                    </span>
                </div>
              </div>
            </el-card>
          </li>
        </ul>
        <div class="swiper-box">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="item in houseList" v-bind:key="item.id">
              <li>
                <el-card :body-style="{ padding: '0px' }">
                  <router-link :to="item.link">
                    <img :src="item.src" class="image" alt=""/>
                  </router-link>
                  <div class="info" style="padding: 14px;">
                    <div class="price-box clearfix">
                      <div class="price pull-left">${{ item.price }}</div>
                      <div class="like pull-right">
                        <img
                            v-if="item.like"
                            src="../assets/images/img_like.jpg"
                            alt="img_like"
                        />
                        <img
                            v-if="!item.like"
                            src="../assets/images/img_unlike.jpg"
                            alt="img_unlike"
                        />
                      </div>
                    </div>
                    <div class="title ellipsis">
                      <router-link :to="item.link">
                        {{ item.name }}
                      </router-link>
                    </div>
                    <div class="specs">
                        <span
                        ><strong>{{ item.bed }}</strong> bed</span
                        >
                      <span
                      ><strong>{{ item.bath }}</strong> bath
                        </span>
                      <span
                      ><strong>{{ item.sqft }}</strong> sqft
                        </span>
                    </div>
                  </div>
                </el-card>
              </li>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default  {
  name: 'InvestBuyTabs',
  props: [],
  data() {
    return {
      isInvest: true,
      isBuy: false,
      houseList: [
        {
          id: 1,
          name: "Burning Rock St, San Antonio, TX 7824...",
          price: "98,900",
          beds: 3,
          baths: 2,
          sqft: "1,477",
          like: 1,
          src: require("../assets/images/img_house_1.jpg"),
          link: "/detail"
        },
        {
          id: 2,
          name: "Burning Rock St, San Antonio, TX 7824...",
          price: "98,900",
          beds: 3,
          baths: 2,
          sqft: "1,477",
          like: 0,
          src: require("../assets/images/img_house_2.jpg"),
          link: "/detail"
        },
        {
          id: 3,
          name: "Burning Rock St, San Antonio, TX 7824...",
          price: "98,900",
          beds: 3,
          baths: 2,
          sqft: "1,477",
          like: 1,
          src: require("../assets/images/img_house_3.jpg"),
          link: "/detail"
        },
        {
          id: 4,
          name: "Burning Rock St, San Antonio, TX 7824...",
          price: "98,900",
          beds: 3,
          baths: 2,
          sqft: "1,477",
          like: 0,
          src: require("../assets/images/img_house_4.jpg"),
          link: "/detail"
        }
      ],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
        // Some Swiper option/callback...
      },
    };
  },
  methods: {
    handleClick(activeName) {
      if (activeName === "invest") {
        this.isBuy = false
        this.isInvest = true
      }
      if (activeName === "buy") {
        this.isBuy = true
        this.isInvest = false
      }
    },
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.house-list-container {
  margin-top: 60px;
  padding-bottom: 50px;
  background: #f8f8f8;
}
.house-list {
  max-width: 1200px;
  margin: 0 auto;
}
.house-list {
  padding: 20px 0;
  ul.tab-nav {
    padding-bottom: 20px;
    li {
      float: left;
      padding: 8px 22px;
      font-size: 16px;
      color: #333;
      cursor: pointer;
      &.active {
        border-bottom: 2px solid #d9aa29;
        color: #d9aa29;
      }
    }
  }
  ul.tab-content {
    li {
      float: left;
      padding: 0;
      width: 23.5%;
      margin-right: 2%;
      box-sizing: border-box;
      background: #fff;
      border-radius: 6px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .swiper-box {
    display: none;
  }
  .price {
    font-size: 26px;
    font-weight: bold;
  }
  .title {
    padding: 10px 0;
    font-size: 14px;
    text-align: left;
  }
  .specs {
    text-align: left;
    font-size: 12px;
    strong {
      font-weight: bold;
    }
    span {
      display: inline-block;
      padding-right: 10px;
    }
  }
  .btn {
    display: inline-block;
    border: 1px solid #464646;
    width: 210px;
    height: 34px;
    line-height: 34px;
    margin-top: 50px;
    margin-bottom: 25px;
    border-radius: 5px;
    color: #585858;
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    ul.tab-content {
      display: none;
      li {
        width: 100%;
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
    .swiper-box {
      display: block;
    }
    .price {
      font-size: 16px;
    }
  }
}

</style>
