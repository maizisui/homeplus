<template>
<div>
    <h1>Search Homes Here</h1>
    <div class="search">
      <form @submit="handleFormSubmit">
        <autocomplete
          ref="autocomplete"
          :search="search"
          :get-result-value="getResultValue"
          placeholder="Search for a country"
          aria-label="Search for a country"
          auto-select
          @update="handleUpdate"
          @submit="handleAutocompleteSubmit"
        ></autocomplete>
      </form>
      <button v-on:click="submit">Search</button>
    </div>
        <pre>
input: {{ input }},
submitted: {{ submitted }},
selectedIndex: {{ selectedIndex }},
results: {{ resultsFormatted }}
  </pre>
</div>
</template>


<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
// import axios from 'axios';

export default {
  name: 'Search',
  components: {
    Autocomplete
  },
  props: [],
  data() {
    return {
      input: '',
      results: [],
      selectedIndex: -1,
      submitted: false,
    }
  },
  computed: {
    resultsFormatted() {     
      return JSON.stringify(
        this.results, null, 2
      )
    }
  },
  methods: {
    showBrowse() {
    },
    placeChanged(place) {
      console.log(place)
    },
    search(input) {
      const url = this.$backendURL + '/api/search/address_autocomplete/' + input
      return new Promise((resolve) => {
        if (input.length < 2) {
          return resolve([
            {
              "placeId": "ChIJk8EIXIG3j4ARwL_Ao3ykdeQ",
              "description": "Santa Clara, CA, USA",
              "mainText": "Santa Clara",
              "secondaryText": "CA, USA",
              "addressType": "ADDRESS"
            },
            {
              "placeId": "ChIJaemWifFDyoAR5BMGLRE2DfQ",
              "description": "Santa Clara, UT, USA",
              "mainText": "Santa Clara",
              "secondaryText": "UT, USA",
              "addressType": "ADDRESS"
            },
            {
              "placeId": "ChIJwz4wNq_Lj4ARR-PU9hShHFY",
              "description": "Santa Clara University, El Camino Real, Santa Clara, CA, USA",
              "mainText": "Santa Clara University",
              "secondaryText": "El Camino Real, Santa Clara, CA, USA",
              "addressType": "PLACE"
            },
            {
              "placeId": "ChIJd_Y0eVIvkIARuQyDN0F1LBA",
              "description": "Santa Clara County, CA, USA",
              "mainText": "Santa Clara County",
              "secondaryText": "CA, USA",
              "addressType": "ADDRESS"
            },
            {
              "placeId": "ChIJ1S45YvwyjoARV406NohMnyE",
              "description": "Santa Clara County Fairgrounds, Tully Road, San Jose, CA, USA",
              "mainText": "Santa Clara County Fairgrounds",
              "secondaryText": "Tully Road, San Jose, CA, USA",
              "addressType": "PLACE"
            }
          ])
        }

        fetch(url)
          .then((response) => response.json())
          .then(() => {
            resolve([
              {
                "placeId": "ChIJk8EIXIG3j4ARwL_Ao3ykdeQ",
                "description": "Santa Clara, CA, USA",
                "mainText": "Santa Clara",
                "secondaryText": "CA, USA",
                "addressType": "ADDRESS"
              },
              {
                "placeId": "ChIJaemWifFDyoAR5BMGLRE2DfQ",
                "description": "Santa Clara, UT, USA",
                "mainText": "Santa Clara",
                "secondaryText": "UT, USA",
                "addressType": "ADDRESS"
              },
              {
                "placeId": "ChIJwz4wNq_Lj4ARR-PU9hShHFY",
                "description": "Santa Clara University, El Camino Real, Santa Clara, CA, USA",
                "mainText": "Santa Clara University",
                "secondaryText": "El Camino Real, Santa Clara, CA, USA",
                "addressType": "PLACE"
              },
              {
                "placeId": "ChIJd_Y0eVIvkIARuQyDN0F1LBA",
                "description": "Santa Clara County, CA, USA",
                "mainText": "Santa Clara County",
                "secondaryText": "CA, USA",
                "addressType": "ADDRESS"
              },
              {
                "placeId": "ChIJ1S45YvwyjoARV406NohMnyE",
                "description": "Santa Clara County Fairgrounds, Tully Road, San Jose, CA, USA",
                "mainText": "Santa Clara County Fairgrounds",
                "secondaryText": "Tully Road, San Jose, CA, USA",
                "addressType": "PLACE"
              }
            ])
          })
      })
    },
    getResultValue(result) {
      if (result.addressType === 'ZIPCODE') {
        return result.mainText + ", " + result.secondaryText
      } else {
        return result.description
      }
    },
    handleUpdate(results, selectedIndex) {
      this.results = results
      this.selectedIndex = selectedIndex
    },
    
    handleFormSubmit(event) {
      event.preventDefault()
      if (!this.submitted) {
        const result = this.results[this.selectedIndex]
        this.handleSubmit(result)
      }
    },
    
    handleAutocompleteSubmit(result) {
      if (result !== undefined) {
        this.submitted = true
      }
      this.handleSubmit(result)
    },
    // Handler result that's read from google map autocomplete
    handleSubmit(result) {
      console.log(result);
      /*axios.get(this.$backendURL + '/api/search/address_search?place_id=' + result.placeId)
      .then(res => {
          console.log(res)
          if (res.data.status == "FOUND_PROPERTY") {
            this.$router.push({ path: `/property/${res.data._id}` })
          } else if (res.data.status == "FOUND_LOCATION") {
            this.$router.push({ path: 'browse', query: { query: res.data.result }})
          }
        })
      .catch(err => console.log(err));*/
    },
    // Handle user input.
    submit() {
      console.log("handle user input")
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search {
  display: flex;
  width: 50%;
  margin: auto;
}

/**
 * Autocomplete has a root div which wraps the
 * entire component, and messes up styling a
 * bit. Sorry!
 */
 .search > form {
   flex: 2;
 }
.form > div {
  flex: 1;
}

.autocomplete-input {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

button {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 1px solid #ddd;
  padding: 16px;
  line-height: 1;
  background: #ddd;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: normal;
  letter-spacing: .5px;
  text-transform: uppercase;
}
</style>
