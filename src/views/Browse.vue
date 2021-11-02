<template>
  <div>
    <Header2 />
    <div class="list-container clearfix">
      <div class="list-left pull-left">
        <div class="map">
          <map-browse
              v-bind:init_map_center="init_map_center"
              v-bind:property_markers="property_markers"
              v-on:map_bounds_changed="updateMapQuery"
              v-on:property_clicked="showListing"/>
        </div>
      </div>
      <div class="list-right pull-right">
        <div class="filter-box clearfix">
          <div class="label pull-left">Price</div>
          <div class="select-box pull-left">
            <el-select size="small" v-model="minPriceValue" placeholder="No min">
              <el-option v-for="item in priceList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="label pull-left">to</div>
          <div class="select-box pull-left">
            <el-select size="small" v-model="maxPriceValue" placeholder="No max">
              <el-option v-for="item in priceList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="pull-right more" @click="showMore()">
            <span class="more-tit1">More Filters</span>
            <span class="more-tit2">More</span>
            <i class="el-icon-arrow-down" v-if="!showMoreFilter"></i>
            <i class="el-icon-arrow-up" v-if="showMoreFilter"></i>
          </div>
        </div>
        <div class="more-filter" v-if="showMoreFilter">
          <div class="more-property clearfix">
            <div class="beds pull-left">
              <div class="tit"><strong>Beds</strong></div>
              <div class="select clearfix">
                <div class="select-box pull-left">
                  <el-select class="pull-left" size="small" v-model="minBedValue" placeholder="No min">
                    <el-option v-for="item in bedsList" :key="item" :value="item"></el-option>
                  </el-select>
                </div>
                <span class="pull-left ">to</span>
                <div class="select-box pull-left">
                  <el-select class="pull-left" size="small" v-model="maxBedValue" placeholder="No max">
                    <el-option v-for="item in bedsList" :key="item" :value="item"></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="baths pull-left">
              <div class="tit"><strong>Baths</strong></div>
              <div class="numbers clearfix">
                <el-input-number class="pull-left" size="small" v-model="num" :min="1" :max="10" label="min"></el-input-number>
              </div>
            </div>
            <div class="other pull-left">
              <div class="tit"><strong>Property Type</strong></div>
              <div class="select">
                <el-select class="pull-left" size="small" v-model="value" placeholder="Other Types">
                  <el-option v-for="item in priceList" :key="item" :value="item"></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="status-box">
            <h2>Listing Status</h2>
            <div class="status">
              <span class="label">For Sale</span>
              <el-switch
                  v-model="statusValue"
                  active-color="#d9aa29"
                  inactive-color="#999">
              </el-switch>
            </div>
          </div>
          <div class="status-list clearfix">
            <div class="status-left pull-left">
              <div class="tit">Status</div>
              <div class="select clearfix">
                <el-select class="pull-left" size="small" v-model="value" placeholder="min">
                  <el-option v-for="item in priceList" :key="item" :value="item"></el-option>
                </el-select>
              </div>
              <div class="checkbox-list">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox style="display:block;padding:5px; text-align: left;" label="Open Houses"></el-checkbox>
                  <el-checkbox style="display:block;padding:5px; text-align: left;" label="Self Tour Only"></el-checkbox>
                  <el-checkbox style="display:block;padding:5px; text-align: left;" label="3D WalkThrough & Video Tour"></el-checkbox>
                  <el-checkbox style="display:block;padding:5px; text-align: left;" label="Excludes Shorts sales"></el-checkbox>
                  <el-checkbox style="display:block;padding:5px; text-align: left;" label="Redfin "></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="status-right pull-left">
              <div class="tit">Time on reducing</div>
              <div class="select clearfix">
                <el-select class="pull-left" size="small" v-model="value" placeholder="min">
                  <el-option v-for="item in priceList" :key="item" :value="item"></el-option>
                </el-select>
              </div>
              <div class="checkbox-list">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox style="display:block;text-align: left;padding: 5px;" label="Price Reduced"></el-checkbox>
                  <el-checkbox style="display:block;text-align: left;padding: 5px;" label="Fixer-upppers only"></el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div class="show-more pull-left">
              <span>Show Mores</span> <i class="el-icon-arrow-down"></i>
            </div>
          </div>
          <div class="sold-status">
            <span class="label">Sold</span>
            <el-switch
                v-model="value"
                active-color="#d9aa29"
                inactive-color="#999">
            </el-switch>
          </div>
          <div class="more-footer clearfix">
            <div class="pull-left reset">Reset</div>
            <div class="pull-right">
              <span class="btn">Apply Filters</span>
            </div>
            <div class="pull-right total">29 Homes</div>
          </div>
        </div>
        <div class="house-list" v-loading="loading">
          <ul class="tab-content clearfix">
            <li v-for="item in houseList" v-bind:key="item._id">
              <el-card :body-style="{ padding: '0px' }">
                <router-link v-bind:to=" '/property/' + item._id" class="img-box">
                  <div class="category" style="position:absolute;left: 0;top: 0"></div>
                  <img :src="item.src" class="image" alt="" />
                </router-link>
                <div class="info" style="padding: 14px;">
                  <div class="price-box clearfix">
                    <div class="price pull-left">
                      <router-link v-bind:to=" '/property/' + item._id">
                        ${{ item.mlsListing.listPrice | toThousandFilter}}
                      </router-link>
                    </div>
                    <div class="like pull-right">
                      <img v-if="item['like']" src="../assets/images/img_like.jpg" alt="img_like"/>
                      <img v-if="!item['like']" src="../assets/images/img_unlike.jpg" alt="img_unlike"/>
                    </div>
                  </div>
                  <div class="title ellipsis" :title="item.address.unparsed + ', ' + item.address.streetName + ', ' + item.address.county">
                    <router-link v-bind:to=" '/property/' + item._id">
                      {{ item.address.unparsed }}, {{ item.address.streetName }}, {{ item.address.county }}
                    </router-link>
                  </div>
                  <div class="specs">
                    <span><strong>{{ item.mlsListing.beds }}</strong> bed</span>
                    <span><strong>{{ item.mlsListing.bathsF }}</strong> bath</span>
                    <span><strong>{{ item.mlsListing.bldgSqft }}</strong> sqft</span>
                  </div>
                </div>
              </el-card>
            </li>
          </ul>
          <div v-if="!houseList.length" style="margin: 50px 0;">
            <div style="margin: 20px 0;"><img src="../assets/images/nodata.png" alt=""></div>
            There is no data, please try again!
          </div>
          <el-pagination v-if="houseList.length"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              background
              layout="total, prev, pager, next"
              :total="total">
          </el-pagination>
<!--          <preview-list v-bind:property_listings="property_listings" v-bind:clicked_listing_index="clicked_listing_index" />-->
        </div>
        <Footer2 />
      </div>
    </div>
  </div>
</template>


<script>
import MapBrowse from '../components/MapBrowse.vue'
// import PreviewList from '../components/PreviewList.vue'
import axios from 'axios';
import Header2 from "@/components/Header2";
import Footer2 from "@/components/Footer2";


export default {
  name: 'Browse',
  components: {
    MapBrowse,
    // PreviewList,
    Header2,
    Footer2
  },
  props: {
  },
  data() {
    return {
      loading: false,
      init_map_center: { lat: 37.41, lng: -122.0 },
      property_markers: [],
      property_listings: [],
      clicked_listing_index: -1,
      map_query: {},
      form_query: {},
      keywords: "",
      priceList: [
        {value:"50000", label: "$50k"},
        {value:"75000", label: "$75k"},
        {value:"100000", label: "$100k"},
        {value:"125000", label: "$125k"},
        {value:"150000", label: "$150k"},
        {value:"175000", label: "$175k"},
        {value:"200000", label: "$200k"},
        {value:"225000", label: "$225k"},
        {value:"250000", label: "$250k"},
        {value:"275000", label: "$275k"},
        {value:"300000", label: "$300k"},
        {value:"325000", label: "$325k"},
        {value:"350000", label: "$350k"},
        {value:"375000", label: "$375k"},
        {value:"400000", label: "$400k"},
        {value:"425000", label: "$425k"},
        {value:"450000", label: "$450k"},
        {value:"475000", label: "$475k"},
        {value:"500000", label: "$500k"},
        {value:"550000", label: "$550k"},
        {value:"600000", label: "$600k"},
        {value:"650000", label: "$650k"},
        {value:"700000", label: "$700k"},
        {value:"750000", label: "$750k"},
        {value:"800000", label: "$800k"},
        {value:"850000", label: "$850k"},
        {value:"900000", label: "$900k"},
        {value:"950000", label: "$950k"},
        {value:"1000000", label: "$1M"},
        {value:"1250000", label: "$1.25M"},
        {value:"1500000", label: "$1.5M"},
        {value:"1750000", label: "$1.75M"},
        {value:"2000000", label: "$2M"},
        {value:"2250000", label: "$2.25M"},
        {value:"2500000", label: "$2.5M"},
        {value:"2750000", label: "$2.75M"},
        {value:"3000000", label: "$3M"},
        {value:"3250000", label: "$3.25M"},
        {value:"3500000", label: "$3.5M"},
        {value:"3750000", label: "$3.75M"},
        {value:"4000000", label: "$4M"},
        {value:"4250000", label: "$4.25M"},
        {value:"4500000", label: "$4.5M"},
        {value:"4750000", label: "$4.75M"},
        {value:"5000000", label: "$5M"},
        {value:"6000000", label: "$6M"},
        {value:"7000000", label: "$7M"},
        {value:"8000000", label: "$8M"},
        {value:"9000000", label: "$9M"},
        {value:"10000000", label: "$10M"}
      ],
      minPriceValue: '',
      maxPriceValue: '',
      bedsList: ['studio', 1, 2, 3, 4, 5, 6, 7, 8],
      minBedValue: '',
      maxBedValue: '',
      showMobile: false,
      statusValue: true,
      showMoreFilter: false,
      num: 1,

      checkList: [],
      houseList: [],
      currentPage: 1,
      pageSize: 4,
      total: 0,
    }
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`current page: ${val}`);
      this.houseList = JSON.parse(JSON.stringify(this.property_listings.slice((val-1)*this.pageSize, this.pageSize*val)))
    },
    showMobileHeader() {
      this.showMobile = !this.showMobile
    },
    showMore() {
      this.showMoreFilter = !this.showMoreFilter
    },
    closeHeaderMobile() {
      this.showMobile = false
    },
    updateMapQuery(query) {
      this.map_query = query
    },
    updateFormQuery(query) {
      this.form_query = query
    },
    getListing(query) {
      this.loading = true
      if (this.$route.query.query !== query) {
        this.$router.push({ path: 'browse', query: { query: query }})
      }
      axios.get(this.$backendURL + '/browse?query='+query)
      .then(res => {
          this.property_listings = res.data;
          this.total = this.property_listings.length;
          this.property_markers = [];
          this.id_to_property_listing_map = {};
          let query = query ? JSON.parse(decodeURIComponent(query)) : '';
          let zoom = query ? query.mapBounds.zoom : 0;
          res.data.forEach(property_listing => {
            let lat = property_listing['geometry']['coordinates'][1]
            let lng = property_listing['geometry']['coordinates'][0]
            let property_marker = { id: property_listing['_id'], position: { lat: lat, lng: lng}, price: property_listing.mlsListing.listPrice }
            if (zoom <= 30) {
              property_marker['src'] = require("../assets/images/icon_logo.png");
            } else {
              property_marker['src'] = ''
            }
            this.property_markers.push(property_marker)
          });
          this.property_listings.forEach((ele)=>{
            let mediaURLs = ele.mlsListing.MediaURLs;
            let src = ''
            for (let i = 0, len = mediaURLs.length; i < len; i++) {
              if (mediaURLs[i].category === 'Thumbnail') {
                src = mediaURLs[i].url;
                break
              }
            }
            ele['src'] = src;
            ele['like'] = Math.random() > 0.5
          });
          this.houseList = JSON.parse(JSON.stringify(this.property_listings.slice(0, this.pageSize)))
          this.loading = false
        })
      .catch(err => console.log(err));
    },
    showListing(id) {
       for (let i = 0; i < this.property_listings.length; i++) {
         if (this.property_listings[i]['_id'] === id) {
           this.clicked_listing_index = i
           return
         }
       }
       console.log("Didn't find clicked listing in the list.")
    }
  },
  watch: {
      map_query () {
        const query = Object.assign({}, this.map_query, this.form_query);
        this.getListing(JSON.stringify(query))
      },
      form_query() {
        const query = Object.assign({}, this.map_query, this.form_query);
        this.getListing(JSON.stringify(query))
      }
  },
  mounted() {
    this.$bus.$on('change', res=>{
      let query = JSON.parse(res.data);
      this.getListing(JSON.stringify(query));
      this.showMoreFilter = false
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped>
 .browse-wrapper {
    display: grid;
    grid-template-columns: 50% 50%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    height: 95vh;
  }

  .col-one {
    height: 100%;
  }

  .col-two {
    height: 100%;
    overflow: scroll;
  }
</style>-->
<style scoped lang="less">
.list-container {
  padding-top: 60px;
}
.list-left {
  width: 65%;
  position: fixed;
  .map {
    width: 100%;
    height: calc(100vh - 60px);
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    .map {
      width: 100%;
      height: 450px;
    }
  }
}
.list-right {
  position: relative;
  width: 35%;
  @media screen and (max-width: 767px) {
    width: 100%;
    height: auto;
    overflow: auto;
    margin-top: 3px;
    img {
      max-width: 100%;
      height: auto;
    }
  }
}
.filter-box {
  padding: 10px;
  color: #999;
  background: #fff;
  position: fixed;
  top: 58px;
  width: 34%;
  z-index: 6;
  border-bottom: 1px solid #eee;
  .label {
    margin-top: 8px;
  }
  .select-box {
    width: 108px;
    padding: 0 10px;
  }
  .more {
    margin-top: 8px;
    cursor: pointer;
    color: #145f76;
    .more-tit2 {
      display: none;
    }
    & > span {
      display: inline-block;
      padding-right: 5px;
    }
    &:hover {
      color: #188aad;
    }
  }
  @media screen and (max-width: 767px) {
    .select-box {
      width: 95px;
      padding: 0 10px;
    }
    .more {
      .more-tit1 {
        display: none;
      }
      .more-tit2 {
        display: inline-block;
      }
    }
  }
}
.more-filter {
  position: absolute;
  background: #fff;
  z-index: 2;
  top: 50px;
  width: 100%;
  border-top: 1px solid #eee;
}
.more-property {
  padding: 10px;
  .beds,
  .baths,
  .other {
    width: 50%;
    float: left;
    padding-bottom: 25px;
  }
  .baths {
    width: 45%;
    padding-left: 5%;
  }
  .tit {
    padding: 10px;
    text-align: left;
  }
  .select > span {
    color: #999;
    padding: 8px 10px;
  }
  .select-box {
    width: 100px;
  }
  @media screen and (max-width: 767px) {
    .beds {
      width: 60%;
    }
    .baths {
      width: 38%;
      padding-left: 2%;
    }
    .select-box {
      width: 85px;
    }
  }
}
.status-box {
  padding: 10px;
  margin-top: 15px;
  text-align: left;
  h2 {
    padding-bottom: 10px;
    font-weight: bold;
    font-size: 24px;
  }
  .label {
    display: inline-block;
    padding-right: 10px;
    color: #999;
  }
}
.status-list {
  background: #f7f7f7;
  padding: 15px 10px;
  border-top: 1px solid #ddd;
  .status-left,
  .status-right {
    width: 50%;
  }
  .tit {
    text-align: left;
    padding: 10px 0;
  }
  .show-more {
    width: 100%;
    text-align: left;
    margin-top: 15px;
    padding: 15px 0;
    border-top: 1px solid #ddd;
    color: #3492af;
  }
  @media screen and (max-width: 767px) {
    .select {
      width: 80%;
    }
  }
}
.sold-status {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  & > span {
    display: inline-block;
    padding-right: 10px;
  }
}
.more-footer {
  padding: 10px;
  .reset {
    margin-top: 5px;
    color: #999999;
  }
  .total {
    margin-top: 5px;
  }
  .btn {
    display: inline-block;
    margin: 0 15px;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    color: #fff;
    background: #d9aa29;
  }
}
.house-list {
  padding: 10px;
  min-height: calc(100vh - 254px);
  margin-top: 53px;
}
ul.tab-content {
  li {
    position: relative;
    float: left;
    padding: 0;
    width: 49%;
    margin-right: 2%;
    margin-bottom: 2%;
    box-sizing: border-box;
    background: #fff;
    border-radius: 6px;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
  @media screen and (max-width: 767px) {
    li {
      width: 100%;
      margin-right: 0;
      margin-bottom: 2%;
    }
  }
  .category {
    display: inline-block;
    width: 48px;
    height: 48px;
    background: url("../assets/images/hot.png") no-repeat;
  }
}
.img-box {
  display: flex;
  height: 150px;
  padding: 5px;
  align-items: center;
  justify-content: center;
  .image {
    max-width: 100%;
    max-height: 100%;
  }
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


</style>
