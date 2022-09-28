<template>
  <div id="app">
    <Top></Top>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "./axios";
import Top from "./components/Top.vue";
import FlightList from "./view/FlightList.vue";

export default {
  name: "App",
  components: {
    Top,
    FlightList,
  },
  computed: {
    height() {
      return this.$store.getters.getHeight;
    },
    width() {
      return this.$store.getters.getWidth;
    },
  },
  methods: {
    /* getCookie(key){
      let cookies = document.cookie.split(';')
      let value = ''
      cookies.forEach(item => {
        let obj = item.trim().split('=')
        if(obj[0] == key){
          return value = obj[1]
        }
        console.log(obj)
      })
      console.log('value::'+value)
      return value
    }*/
  },
  mounted() {
    // if (localStorage.getItem("token")) {
    //    axios.get("/user/get").then((resp) => {
    //     if (resp.data.code == 200) {
    //       this.$store.dispatch("setUser", resp.data.data);
    //     }
    //   });
    // }
    window.onresize = () => {
      this.$store.commit("SIZE", [window.innerHeight, window.innerWidth]);
    };
  },
};
</script>

<style>
#app {
  margin: 0;
}
</style>
