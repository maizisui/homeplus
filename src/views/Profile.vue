<template>
  <div>
    {{userInfo}}
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Profile',
  components: {

  },
  data() {
      return {
           "userInfo": {}
      };
  },
  mounted() {
    axios.get(this.$backendURL + '/profile', {withCredentials: true})
    .then(res => {
        this.userInfo = res.data
      })
    .catch(err => console.log(err));
  }
}
</script>

<style>
</style>