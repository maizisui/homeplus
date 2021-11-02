<template>
<div>
  <div class="search-input">
    <el-select
        v-model="value"
        filterable
        remote
        reserve-keyword
        placeholder="Search by address, city, sate or zipcode"
        :remote-method="remoteMethod"
        :loading="loading">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </div>
  <span class="search-btn" @click="search()">
        <img src="../../src/assets/images/search-btn.png" alt="搜索">
      </span>
</div>
</template>


<script>


export default {
  name: 'Search',
  props: [],
  data() {
    return {
      options: [],
      value: '',
      list: [],
      loading: false,
    }
  },
  methods: {
    remoteMethod(query) {
      console.log(query);
      this.loading = true;
      this.$axios.get(this.$backendURL +  '/api/search/address_autocomplete/' + query)
          .then( (response) => {
            response.data.predictions.forEach(ele=>{
              ele['value'] = ele['mainText'] + ', ' + ele['secondaryText'];
              ele['label'] = ele['mainText'] + ', ' + ele['secondaryText']
            })
            this.options = response.data.predictions;
            this.loading = false;
            console.log(this.options);
          })
          .catch( (error) => {
            console.log(error);
          });
    },

    search() {
      console.log(this.value, this.list);
      sessionStorage.setItem('searchKeyWord', this.value)
      let placeId = ''
      this.options.forEach(ele=>{
        if (ele.value === this.value) {
          placeId = ele.placeId
        }
      });
      console.log(placeId)
      this.$axios.get(this.$backendURL + '/api/search/address_search?place_id=' + placeId)
          .then(res => {
            console.log(res)
            if (res.data.status === "FOUND_PROPERTY") {
              this.$router.push({ path: `/property/${res.data.result._id}` })
            } else if (res.data.status === "FOUND_LOCATION") {
              console.log(location.href)
              if (location.href.indexOf('/browse?') >= 0) {
                this.$bus.$emit('change',{data: res.data.result})
              }
              this.$router.push({ path: '/browse', query: { query: res.data.result }})
              sessionStorage.setItem('browseParam', res.data.result)
            }
          })
          .catch(err => console.log(err));
    }
  },
  mounted() {
    console.log(sessionStorage.getItem('searchKeyWord'))
    console.log(location.hash)
    if (location.href.indexOf('browse') >= 0 || location.href.indexOf('property') >= 0) {
      this.value = sessionStorage.getItem('searchKeyWord')
    }

  }
}
</script>

<style scoped lang="less">
.search-input {
  float: left;
  width: 480px;
  .el-select {
    width: 100%;
  }
}
.search-btn {
  float: left;
  width: 90px;
  height: 40px;
  background: #d9aa29;
  line-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -5px;
  position: relative;
  z-index: 2;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  img {
    width: 26px;
    height: 26px;
  }
}
@media screen and (max-width: 767px) {
  .search-input {
    float: left;
    width: 80%;
  }
  .search-btn {
    width: 20%;
  }

  /deep/ .el-input--suffix .el-input__inner {
    padding-right: 10px !important;
  }

}
@media screen and (max-width: 767px) {
  /deep/ .search-input .el-input__inner {
    font-size: 12px !important;
  }
}
</style>
