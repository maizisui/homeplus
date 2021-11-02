<template>
  <div class="content-container">
    <Header2 />
    <div class="content-box">
      <div class="breadcrumb">
        <div class="nav">
          <router-link to="/">Home</router-link>  >  {{id}}-{{content.title}}
        </div>

      </div>
      <div class="content-detail clearfix">
        <div class="content-left pull-left">
          <div class="img">
            <img src="../../src/assets/images/content-pic.jpg" alt="">
          </div>
          <h1>{{content.title}}</h1>
          <div class="clearfix">
            <div class="date pull-left">{{content.createTime}}</div>
            <div class="share-box pull-right">
              <ShareNetwork network="Email" url="/content/1">
                <img src="../../src/assets/images/share-email.jpg" alt="">
              </ShareNetwork>
              <ShareNetwork network="facebook" url="/content/1">
                <img src="../../src/assets/images/share-facebook.jpg" alt="">
              </ShareNetwork>
              <ShareNetwork network="Twitter" url="/content/1">
                <img src="../../src/assets/images/share-twitter.jpg" alt="">
              </ShareNetwork>
              <ShareNetwork network="LinkedIn" url="/content/1">
                <img src="../../src/assets/images/share-linkin.jpg" alt="">
              </ShareNetwork>
            </div>
          </div>
          <div class="detail">
            <br><br> <strong>1.They have loads of expertise</strong> <br><br>

            Want to check the MLS for a 4B/2B with an EIK and a W/D? Real estate has its own language, full of acronyms and semi-arcane jargon, and your Realtor is trained to speak that language fluently.

            Plus, buying or selling a home usually requires dozens of forms, reports, disclosures, and other technical documents. Realtors have the expertise to help you prepare a killer deal—while avoiding delays or costly mistakes that can seriously mess you up.

            <br><br> <strong>2.They have loads of expertise</strong> <br><br>

            Want to check the MLS for a 4B/2B with an EIK and a W/D? Real estate has its own language, full of acronyms and semi-arcane jargon, and your Realtor is trained to speak that language fluently.

            Plus, buying or selling a home usually requires dozens of forms, reports, disclosures, and other technical documents. Realtors have the expertise to help you prepare a killer deal—while avoiding delays or costly mistakes that can seriously mess you up.

            <br><br><strong>3.They have loads of expertise</strong> <br><br>

            Want to check the MLS for a 4B/2B with an EIK and a W/D? Real estate has its own language, full of acronyms and semi-arcane jargon, and your Realtor is trained to speak that language fluently.

            Plus, buying or selling a home usually requires dozens of forms, reports, disclosures, and other technical documents. Realtors have the expertise to help you prepare a killer deal—while avoiding delays or costly mistakes that can seriously mess you up.

            <br><br><strong>4.They have loads of expertise</strong> <br><br>

            Want to check the MLS for a 4B/2B with an EIK and a W/D? Real estate has its own language, full of acronyms and semi-arcane jargon, and your Realtor is trained to speak that language fluently.

            Plus, buying or selling a home usually requires dozens of forms, reports, disclosures, and other technical documents. Realtors have the expertise to help you prepare a killer deal—while avoiding delays or costly mistakes that can seriously mess you up.
          </div>
        </div>
        <div class="content-right pull-right">
          <div class="title"><span>Other articles</span></div>
          <ul>
            <li>
              <div class="img"><img src="../../src/assets/images/content-pic.jpg" alt=""></div>
              <div class="tit"><router-link class="link" to="/content/1">HOME IMPROVEMENT IMPROVEMENT IMPROVEMENT IMPROVEMENT</router-link> </div>
              <div class="brief">5 Design Moves Christina Haack Has Ditched and What She’s Doing Instead.</div>
            </li>
            <li>
              <div class="img"><img src="../../src/assets/images/content-pic.jpg" alt=""></div>
              <div class="tit">HOME IMPROVEMENT</div>
              <div class="brief">5 Design Moves Christina Haack Has Ditched and What She’s Doing Instead.</div>
            </li>
            <li>
              <div class="img"><img src="../../src/assets/images/content-pic.jpg" alt=""></div>
              <div class="tit">HOME IMPROVEMENT</div>
              <div class="brief">5 Design Moves Christina Haack Has Ditched and What She’s Doing Instead.</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <InvestBuyTabs/>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import InvestBuyTabs from "@/components/InvestBuyTabs";
import Vue from 'vue'
import VueSocialSharing from 'vue-social-sharing'

Vue.use(VueSocialSharing);

export default  {
  name: 'Contact',
  props: [],
  components: {
    Header2,
    Footer,
    InvestBuyTabs
  },
  data() {
    return {
      isInvest: false,
      id: 0,
      content: {
        title: '6 Reasons You Should Never Buy or Sell a Home Without an Agent',
        createTime: 'Feb 4, 2016',
        detail: ''
      }
    };
  },
  methods: {

  },
  created() {
    let id = this.$route.params.id;
    this.id = id;
    axios.get(this.$backendURL + '/content?id=' + id)
        .then(res => {
          this.detail = res.data[0]
        })
        .catch(err => {
          console.log(err)
          //this.$router.push({name: 'pagenotfound'})
        });
  },
  mounted() {
    console.log(this.$route.params)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.breadcrumb {
  border-top: 2px solid #aba490;
  background: #f8f8f8;

  .nav {
    max-width: 1200px;
    padding: 15px 0;
    text-align: left;
    margin: 0 auto;
    color: #666;
  }

  @media screen and (max-width: 767px) {
    padding: 0 10px;
  }
}
.content-box {
  padding-top: 60px;
  min-height: calc(100vh - 378px);
}
.content-detail {
  max-width: 1200px;
  margin: 0 auto;
  @media screen and (max-width: 767px) {
    padding: 0 10px;
  }
}
.content-left {
  width: 68.5%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
}
.content-left img {
  max-width: 100%;
}
.content-left h1 {
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0;
  text-align: left;
}
.content-left .date {}
.content-left .share-box img{
  margin: 0 5px;
}
.content-left .detail {
  text-align: left;
  line-height: 24px;
}
.content-left .detail strong {
  font-weight: bold;
}
.content-right {
  width: 28.5%;
  @media screen and (max-width: 767px) {
    width: 100%;
  }
}

.content-right .title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  padding: 25px 0;
}
.content-right .title span:after {
  content: '';
  width: 15%;
  height: 1px;
  display: inline-block;
  border-bottom: 1px solid #999;
  margin-block: 6px;
  margin-left: 8px;
}
.content-right .title span:before {
  content: '';
  width: 15%;
  height: 1px;
  display: inline-block;
  border-bottom: 1px solid #999;
  margin-block: 6px;
  margin-right: 8px;
}
.content-right .img img{
  max-width: 100%;
  max-height: 100%;
}
.content-right .tit {
  width: 100%;
  margin: 12px 0;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
}
.content-right .brief {
  height: 48px;
  overflow: hidden;
  line-height: 24px;
  text-align: left;
  margin-bottom: 25px;
}

</style>
