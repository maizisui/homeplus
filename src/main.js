import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
/*import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'*/
import { BListGroup, BListGroupItem } from 'bootstrap-vue'
import firebase from 'firebase'
import axios from "axios";
import VueAwesomeSwiper from "vue-awesome-swiper";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/global.css";
import "swiper/swiper.min.css";
import locale from 'element-ui/lib/locale/lang/en'
import * as echarts from 'echarts'

Vue.use(require('vue-chartist'))


Vue.filter('toThousandFilter', function (num) {
  return (+num || 0).toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
})

Vue.use(VueAwesomeSwiper /* { default options with global component } */); /**/
Vue.use(ElementUI, { locale })
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$bus = new Vue()
// Vue.prototype.$backendURL = "https://homeplusplus-dev-308606.wl.r.appspot.com";

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDoxsSmWyUVis93o-c_imXao7bS0K6QZWQ',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
  // installComponents: true
})

Vue.component('b-list-group', BListGroup)
Vue.component('b-list-group-item', BListGroupItem)


const firebaseConfig = {
  apiKey: "AIzaSyDoxsSmWyUVis93o-c_imXao7bS0K6QZWQ",
  authDomain: "my-project-1572329384826.firebaseapp.com",
  projectId: "my-project-1572329384826",
  storageBucket: "my-project-1572329384826.appspot.com",
  messagingSenderId: "628865380221",
  appId: "1:628865380221:web:9f8047418c119c6992e614",
  measurementId: "G-KK31YR5W63"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.prototype.$backendURL = 'https://homeplusplus-dev-308606.wl.r.appspot.com'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')






