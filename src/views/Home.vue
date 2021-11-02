<template>
  <div>
    <div class="home">
      <Header />
      <Main />
      <Footer />
    </div>
  </div>

</template>

<script>
import Header from '../components/Header.vue'
import Main from '../components/Main.vue'
import Footer from '../components/Footer.vue'
export default {
  name: 'Home',
  components: {
    Header, Main, Footer
  },
  props: [],
  data() {
    return {
      chartData: {
        labels: ["A", "B", "C"],
        series:[[1, 3, 2], [4, 6, 5]]
      },
      chartOptions: {
        lineSmooth: false
      }
    };
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style>
</style>
