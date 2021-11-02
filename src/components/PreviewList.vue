<template>
<div class="test">
    <span>Showing {{property_listings.length}} Homes</span>
    <div>
    <b-list-group>
        <b-list-group-item  v-for="(listing) in pageOfItems" :key="listing._id" :active="isListingChosen(listing)" >
            <preview :property_listing="listing" />
        </b-list-group-item>
    </b-list-group>
    </div>
    <preview-pagination :items="property_listings" @changePage="onChangePage" :pageSize=pageSize :chosenItemIndex="clicked_listing_index"/>
</div>
</template>


<script>
import PreviewPagination from './PreviewPagination.vue';
import Preview from './Preview.vue'

export default {
  name: 'PreviewList',
  components: {
    PreviewPagination,
    Preview
  },
  props: ['property_listings', 'clicked_listing_index'],
  data() {
      return {
          pageOfItems: [],
          pageSize: 20
      };
  },
  methods: {
      onChangePage(pageOfItems) {
          // update page of items
          this.pageOfItems = pageOfItems;
      },
      isListingChosen(listing) {
          if (this.clicked_listing_index == -1) {
              return false;
          }
          let chosen_listing = this.property_listings[this.clicked_listing_index]
          return chosen_listing._id === listing._id;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .test {
        overflow: auto;
    }
</style>
