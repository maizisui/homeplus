<template>
<div>
    <p><router-link :to="{ name: 'property', params: {'id':property_listing._id}}">{{property_listing.addr.full}} -- {{property_listing._id}}</router-link></p>
</div>
</template>


<script>
export default {
  name: 'Preview',
  props: ['property_listing'],
  data() {
      return {
           "property_page_url": this.$backendURL + "/property/" + this.property_listing._id
      };
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    a {
        color: black;
    }
</style>
