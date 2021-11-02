<template>
  <div class="main-container">
    <div class="brief-container">
      <div class="brief">
        <h1>What is 42Home?</h1>
        <ul class="clearfix">
          <li>
            <div class="brief-box">
              <div class="img1"></div>
              <div class="title">Advanced Real Estate Investment tool</div>
              <div class="info">
                Home++ provides comprehensive date analysis capability in real
                estate investment to help you make the right decision.
              </div>
              <div class="more"><span class="btn"><router-link to="/content/1">See More</router-link></span></div>
            </div>
          </li>
          <li>
            <div class="brief-box active">
              <div class="img2"></div>
              <div class="title">Invest in real eastate like trading stock</div>
              <div class="info">
                Based on your financial situation, you cherry-pick propertise
                you like and decide how many shares to subscribe to. Sell shares
                through multipeways.
              </div>
              <div class="more"><span class="btn"><router-link to="/content/2">See More</router-link></span></div>
            </div>
          </li>
          <li>
            <div class="brief-box active">
              <div class="img3"></div>
              <div class="title">Professtional Management of Properties</div>
              <div class="info">
                Home++’s trusted partners will manage properties, and the
                holding company distributes the rental and debt income to
                investors every month.
              </div>
              <div class="more"><span class="btn">See More</span></div>
            </div>
          </li>
        </ul>
        <div class="swiper-box">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide>
              <li>
                <div class="brief-box">
                  <div class="img1"></div>
                  <div class="title">Advanced Real Estate Investment tool</div>
                  <div class="info">
                    Home++ provides comprehensive date analysis capability in
                    real estate investment to help you make the decision.
                  </div>
                  <div class="more"><span class="btn"><router-link to="/content/3">See More</router-link></span></div>
                </div>
              </li>
            </swiper-slide>
            <swiper-slide>
              <li>
                <div class="brief-box active">
                  <div class="img2"></div>
                  <div class="title">
                    Invest in real eastate like trading stock
                  </div>
                  <div class="info">
                    Based on your financial situation, you cherry-pick
                    propertise you like and decide how many shares to subscribe
                    to. Sell shares through multipeways.
                  </div>
                  <div class="more"><span class="btn">See More</span></div>
                </div>
              </li>
            </swiper-slide>
            <swiper-slide>
              <li>
                <div class="brief-box active">
                  <div class="img3"></div>
                  <div class="title">
                    Professtional Management of Properties
                  </div>
                  <div class="info">
                    Home++’s trusted partners will manage properties, and the
                    holding company distributes the rental and debt income to
                    investors every month.
                  </div>
                  <div class="more"><span class="btn">See More</span></div>
                </div>
              </li>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <div class="house-list-container">
      <div class="house-list">
        <h2>Existing Properties</h2>
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
                  <img :src="item.src" class="image" alt="" />
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
                      <img :src="item.src" class="image" alt="" />
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
        <div v-if="isInvest">
          <ul class="tab-content clearfix">
            <li v-for="item in houseList" v-bind:key="item.id">
              <el-card :body-style="{ padding: '0px' }">
                <router-link :to="item.link">
                  <img :src="item.src" class="image" alt="" />
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
                      <img :src="item.src" class="image" alt="" />
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
        <router-link to="/browse?query=%7B%22mapBounds%22%3A%7B%22westLng%22%3A-98.80585087614779,%22eastLng%22%3A-98.63633955165457,%22northLat%22%3A29.7387200000981,%22southLat%22%3A29.68486762017953,%22zoom%22%3A13%7D%7D">
          <span class="btn">More>></span>
        </router-link>
      </div>
    </div>
    <div class="news-container">
      <div class="news">
        <ul class="news-list clearfix">
          <li>
            <div class="">
              <img src="../assets/images/img_news1.jpg" alt="img_news1" />
            </div>
          </li>
          <li>
            <div class="grid-content">
              <h3>Explore New Opportunities</h3>
              <div class="sub-tit">
                Use our geospatial data analysis tool to explore potential
                investment properties.
              </div>
              <span class="btn"><router-link to="/content/1">View All</router-link></span>
            </div>
          </li>
          <li class="show-in-pc">
            <div class="grid-content">
              <h3>Explore New Opportunities</h3>
              <div class="sub-tit">
                <ul>
                  <li>Own shares in properties like stock</li>
                  <li>Fixed return rate</li>
                  <li>And More ...</li>
                </ul>
              </div>
              <span class="btn"><router-link to="/content/2">View All</router-link></span>
            </div>
          </li>
          <li class="show-in-pc">
            <div class="">
              <img src="../assets/images/img_news2.jpg" alt="img_news1" />
            </div>
          </li>
          <li class="show-in-mobile">
            <div class="">
              <img src="../assets/images/img_news2.jpg" alt="img_news1" />
            </div>
          </li>
          <li class="show-in-mobile">
            <div class="grid-content">
              <h3>Explore New Opportunities</h3>
              <div class="sub-tit">
                <ul>
                  <li>Own shares in properties like stock</li>
                  <li>Fixed return rate</li>
                  <li>And More ...</li>
                </ul>
              </div>
              <span class="btn"><router-link to="/content/3">View All</router-link></span>
            </div>
          </li>

          <li>
            <div class="">
              <img src="../assets/images/img_news3.jpg" alt="img_news1" />
            </div>
          </li>
          <li>
            <div class="grid-content">
              <h3>Turn a Profit</h3>
              <div class="sub-tit">
                Get returns depending on the investment type transparently
              </div>
              <span class="btn"><router-link to="/content/4">View All</router-link></span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default  {
  name: 'Main',
  props: [],
  data() {
    return {
      isInvest: false,
      isBuy: true,
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
          link: "/property/5febb92036d680242795e6b1"
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
          link: "/property/5febb92036d680242795e6b1"
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
          link: "/property/5febb92036d680242795e6b1"
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
          link: "/property/5febb92036d680242795e6b1"
        }
      ],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
        // Some Swiper option/callback...
      }
    };
  },
  methods: {
    handleClick(activeName) {
      if (activeName === "invest") {
        this.isBuy = false;
        this.isInvest = true;
      }
      if (activeName === "buy") {
        this.isBuy = true;
        this.isInvest = false;
      }
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.brief,
.house-list,
.news {
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    padding: 0 10px;
  }
}
.brief-container {
  padding-bottom: 60px;
  @media screen and (max-width: 767px) {
    padding: 10px 10px 30px 10px;
  }
}
.brief {
  h1 {
    padding: 50px 0;
    font-size: 50px;
    font-weight: bold;
  }
  .swiper-box {
    display: none;
  }
  @media screen and (max-width: 767px) {
    h1 {
      padding: 20px 0;
      font-size: 24px;
    }
    & > ul {
      display: none;
    }
    .swiper-box {
      display: block;
    }
  }
}
.brief li {
  float: left;
  padding: 20px;
  border: 1px solid #dbdbdb;
  box-shadow: 0 0 10px #dbdbdb;
  width: 32%;
  margin-right: 2%;
  box-sizing: border-box;
  background: #fff;
  border-radius: 6px;
  &:last-child {
    margin-right: 0;
  }

  .img1 {
    display: block;
    width: 131px;
    height: 131px;
    margin: 0 auto;
    background: url("../assets/images/img_brief1.png") no-repeat;
    background-size: cover;
  }
  .img2 {
    display: block;
    width: 131px;
    height: 131px;
    margin: 0 auto;
    background: url("../assets/images/img_brief2.png") no-repeat;
    background-size: cover;
  }
  .img3 {
    display: block;
    width: 131px;
    height: 131px;
    margin: 0 auto;
    background: url("../assets/images/img_brief3.png") no-repeat;
    background-size: cover;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    padding: 20px 0;
  }
  .info {
    line-height: 24px;
    font-size: 14px;
    color: #666;
    text-align: left;
  }
  .more {
    padding: 20px 0;
  }
  .btn {
    display: inline-block;
    border: 1px solid #464646;
    padding: 8px 30px;
    border-radius: 5px;
    color: #585858;
    cursor: pointer;
  }
  &:hover {
    background: #d9aa29;
    color: #fff;
    .info {
      color: #fff;
    }
    .btn {
      background: #fff;
      border-color: #fff;
      color: #d9aa29;
    }
    .img1 {
      background: url("../assets/images/img_brief1_hover.png") no-repeat;
      background-size: cover;
    }
    .img2 {
      background: url("../assets/images/img_brief2_hover.png") no-repeat;
      background-size: cover;
    }
    .img3 {
      background: url("../assets/images/img_brief3_hover.png") no-repeat;
      background-size: cover;
    }
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
    .img1,
    .img2,
    .img3 {
      width: 100px;
      height: 100px;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
      padding: 12px 0;
    }
    .more {
      padding: 12px 0;
    }
  }
}

.brief-container,
.news-container {
  background: #f7f7f7;
}
.house-list-container {
  padding: 50px;
  @media screen and (max-width: 767px) {
    padding: 25px 0;
  }
}
.house-list {
  position: relative;
  h2 {
    position: absolute;
    font-size: 34px;
    font-weight: bold;
  }
  ul.tab-nav {
    padding-bottom: 20px;
    margin-bottom: 60px;
    border-bottom: 6px solid #d9aa29;
    li {
      position: relative;
      float: right;
      width: 180px;
      height: 45px;
      line-height: 45px;
      font-size: 24px;
      background: #e6e6e6;
      color: #8d8d8d;
      cursor: pointer;
      &.active {
        background: #d9aa29;
        color: #fff;
        &:before {
          content: "";
          position: absolute;
          top: 55px;
          left: 80px;
          border-bottom: 10px solid #d9aa29;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
        }
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
    &:hover {
      border-color: #d9aa29 !important;
      color: #d9aa29 !important;
    }
  }

  @media screen and (max-width: 767px) {
    h2 {
      position: relative;
      font-size: 24px;
      padding-bottom: 20px;
      text-align: center;
    }
    ul.tab-nav {
      padding-bottom: 10px;
      margin-bottom: 30px;
      border-bottom: 3px solid #d9aa29;
      li {
        width: 100px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        &.active {
          &:before {
            content: "";
            position: absolute;
            top: 32px;
            left: 45px;
          }
        }
      }
    }
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
.news {
  padding: 50px 0;
  ul.news-list {
    & > li {
      float: left;
      width: 50%;
      &.show-in-pc {
        display: block;
      }
      &.show-in-mobile {
        display: none;
      }
      & > div {
        height: 360px;
        img {
          width: auto;
          height: 100%;
        }
      }

      ul > li {
        list-style: disc;
        float: none;
      }
    }
  }
  .row-bg {
    padding: 15px 0;
  }

  .grid-content {
    text-align: left;
    padding-left: 80px;
  }
  h3 {
    display: inline-block;
    padding-top: 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid #ddd;
    font-size: 28px;
  }
  .sub-tit {
    padding-top: 30px;
    padding-bottom: 40px;
    line-height: 28px;
  }

  .btn {
    display: inline-block;
    border: 1px solid #464646;
    width: 130px;
    height: 34px;
    line-height: 34px;
    margin-top: 50px;
    margin-bottom: 25px;
    border-radius: 5px;
    text-align: center;
    color: #585858;
    cursor: pointer;
    &:hover {
      border-color: #d9aa29 !important;
      color: #d9aa29 !important;
    }
  }
  @media screen and (max-width: 767px) {
    padding: 20px 10px;
    ul.news-list {
      & > li {
        float: left;
        width: 100%;
        margin-bottom: 10px;
        &.show-in-pc {
          display: none;
        }
        &.show-in-mobile {
          display: block;
        }
        & > div {
          height: auto;
          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
    .grid-content {
      padding-left: 20px;
    }
    h3 {
      padding-top: 20px;
      padding-bottom: 15px;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
    }
    .sub-tit {
      padding-top: 15px;
      padding-bottom: 20px;
    }
    .btn {
      width: 120px;
      height: 30px;
      line-height: 30px;
      margin-top: 20px;
      margin-bottom: 15px;
    }
  }
}
</style>
