<template>
<gmap-map
    ref="mapRef"
    id="map"
    :center="init_map_center"
    :zoom="7"
    :options = "gestureHandling"
    style="width: 100%; height: 100%;"
    @idle="map_bounds_changed"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in property_markers"
      :position="m.position"
      :clickable="true"
      @click="property_clicked(m.id)"
    ></gmap-marker>
  </gmap-map>
</template>


<script>
import {gmapApi} from 'vue2-google-maps'
import {MarkerClusterer, KmeansAlgorithm, DefaultRenderer} from "@googlemaps/markerclusterer";

export default {
  name: 'MapBrowse',
  data() {
    return {
      gestureHandling: {
        gestureHandling: 'greedy'
      }
    }
  },
  props: ['property_markers', 'init_map_center'],
  computed: {
    google: gmapApi
  },
  created() {
    console.log(this.property_markers)
  },
  methods: {
    defineMarkerCluster(map) {
      let locations = [];
      this.property_markers.forEach(ele => {
        locations.push(ele.position)
      });
      const markers = locations.map((location) => {
        return new this.google.maps.Marker({
          position: location,
        });
      });
      const superClusterAlgorithm = new KmeansAlgorithm({numberOfClusters: 2})
      const defaultRender = new DefaultRenderer()
      const markerCluster = new MarkerClusterer({map, markers, superClusterAlgorithm, defaultRender});
      console.log(markerCluster)
    },
    map_bounds_changed() {
      console.log(gmapApi);
      console.log(this.google);
      console.log(new this.google.maps.Marker({
        icon:  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
      }));
      this.$refs.mapRef.$mapPromise.then((map) => {
        const north_lat = map.getBounds().getNorthEast().lat();
        const east_lng = map.getBounds().getNorthEast().lng();
        const south_lat = map.getBounds().getSouthWest().lat();
        const west_lng = map.getBounds().getSouthWest().lng();
        const zoom = map.getZoom();
        let map_bounds = {"mapBounds":{"westLng":west_lng,"eastLng":east_lng,"northLat":north_lat,"southLat":south_lat, "zoom": zoom}};
        // Send up to parent


        this.defineMarkerCluster(map)
        /*markerCluster.setCalculator(function (markers, numStyles) {
          let index = 0;
          let dv = markers.length;
          while (dv !== 0) {
            dv = parseInt(dv / 10, 10);
            index++;
          }

          index = Math.min(index, numStyles);
          return {
            text: "", // set to empty string
            index: index
          };
        })*/
        this.$emit('map_bounds_changed', map_bounds);
      })
    },
    property_clicked(id) {
      this.$emit('property_clicked', id);
    }
  },
  mounted () {
    this.$refs.mapRef.$mapPromise.then((map) => {
      // Only show the map if query exists in the route.
      if (typeof this.$route.query.query !== 'undefined' && this.$route.query.query !== null) {
        const query = JSON.parse(this.$route.query.query)
        const mapBounds = query.mapBounds
        const latLngBoundsLiteral = { south: mapBounds.southLat, west: mapBounds.westLng, north: mapBounds.northLat, east: mapBounds.eastLng}
        map.panToBounds(latLngBoundsLiteral)
        console.log(this.property_markers)
        this.defineMarkerCluster(map)
        /*markerCluster.setCalculator(function (markers, numStyles) {
          let index = 0;
          let dv = markers.length;
          while (dv !== 0) {
            dv = parseInt(dv / 10, 10);
            index++;
          }

          index = Math.min(index, numStyles);
          return {
            text: "", // set to empty string
            index: index
          };
        })*/
        map.setZoom(mapBounds.zoom);
      } else {
        // Otherwise, do something.
      }
    })
  },

  watch: {
    property_markers(newVal, oldVal) {
      console.log(newVal, oldVal)
      this.property_markers = newVal
      this.$refs.mapRef.$mapPromise.then((map) => {
        // Only show the map if query exists in the route.
        if (typeof this.$route.query.query !== 'undefined' && this.$route.query.query !== null) {
          this.defineMarkerCluster(map)
          /*markerCluster.setCalculator(function (markers, numStyles) {
            let index = 0;
            let dv = markers.length;
            while (dv !== 0) {
              dv = parseInt(dv / 10, 10);
              index++;
            }

            index = Math.min(index, numStyles);
            return {
              text: "", // set to empty string
              index: index
            };
          })*/
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
