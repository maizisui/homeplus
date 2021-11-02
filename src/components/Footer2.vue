<template>
  <div class="footer-container">
    <div class="footer">
      <div class="follows">
        <div class="grid-content">
          <router-link to="/"><img src="../../src/assets/images/img_facebook.jpg" width="40px" alt=""/></router-link> &nbsp; &nbsp; &nbsp;
          <router-link to="/"><img src="../../src/assets/images/img_twitter.jpg" width="40px" alt=""/></router-link> &nbsp; &nbsp; &nbsp;
          <router-link to="/"><img src="../../src/assets/images/img_linkin.jpg" width="40px" alt=""/></router-link> &nbsp; &nbsp; &nbsp;
          <router-link to="/"><img src="../../src/assets/images/img_youtube.jpg" width="40px" alt=""/></router-link> &nbsp; &nbsp; &nbsp;
        </div>
      </div>
      <div class="contacts">
        <ul class="clearfix">
          <li>
            <div class="grid-content">
              <img src="../assets/images/img_address.jpg" alt="location"> 60 Cuttermill Rd, #405
              Great Neck, NY 1121
            </div>
          </li>
          <li>
            <div class="grid-content">
              <img src="../assets/images/img_tel.jpg" alt="location"> (516)829-0700
              +8618121471840
            </div>
          </li>
          <li>
            <div class="grid-content">
              <img src="../assets/images/img_email.jpg" alt="location"> info@crowdfunz.com
              www.crowdfunz.com
            </div>
          </li>
        </ul>
      </div>
      <div class="copyrights">
        &copy; 1995-2021 National Association of REALTORS and Move,Inc. All
      </div>
    </div>
  </div>
</template>

<script>
export default  {
  name: 'Footer2',
  props: [],
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.footer-container {
  background: #444;
}
.follows {
  padding-top: 15px;
  text-align: center;
  @media screen and (max-width: 767px) {
    padding-top: 35px;
  }
}
.footer {
  max-width: 1200px;
  margin: 0 auto;
  font-size: 12px;
}
.copyrights {
  padding: 10px 0;
  text-align: center;
  color: #8d8d8d;
  @media screen and (max-width: 767px) {
    padding: 10px 0;
  }
}
.contacts {
  padding-top: 10px;
  padding-bottom: 2px;
  line-height: 25px;
  color: #ffffff;
  ul {
    width: 90%;
    margin: 0 auto;
    li {
      float: left;
      width: 100%;
    }
  }
  img {
    vertical-align: -3px;
  }
  @media screen and (max-width: 767px) {
    padding-top: 25px;
    padding-bottom: 20px;
    ul {
      width: 100%;
      margin: 0 auto;
      li {
        float: left;
        width: 100%;
        margin-bottom: 10px;
      }
    }
  }
}


</style>
