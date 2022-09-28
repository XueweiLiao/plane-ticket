<template>
  <div class="text-center" style="margin-top: 100px">
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      style="max-width: 70%"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasRightLabel">请选择地点</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div class="accordion" id="accordionExample">
          <div
            class="accordion-item"
            v-for="(place, key) in placeTitleList"
            :key="key"
          >
            <h2 class="accordion-header" :id="'heading' + key">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapse' + key"
                aria-expanded="false"
                :aria-controls="'collapse' + key"
                @click="getDetail(place.name, key)"
              >
                {{ place.name }}
              </button>
            </h2>
            <div
              :id="'collapse' + key"
              class="accordion-collapse collapse"
              :aria-labelledby="'heading' + key"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body x-place">
                <button
                  class="btn btn-light"
                  v-if="placeList.length == 0"
                  @click="getPlace($event)"
                >
                  {{ place.name }}
                </button>
                <button
                  class="btn btn-light"
                  v-for="(item, index) in placeList"
                  :key="index"
                  @click="getPlace($event)"
                >
                  {{ item.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home">
      <h1 class="h3 mb-3 fw-normal">查询航班</h1>

      <div class="form-floating">
        <input type="date" class="x-date" v-model="queryParam.time" />
      </div>
      <div class="form-floating">
        <button
          class="btn btn-primary x-btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          @click="type = 0"
          v-text="queryParam.flyPlace"
        ></button>
        <button class="btn btn-light x-btn" @click="tra">
          <i class="bi bi-arrow-left-right"></i>
        </button>
        <button
          class="btn btn-primary x-btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          @click="type = 1"
          v-text="queryParam.toPlace"
        ></button>
      </div>
      <button class="w-50 btn btn-primary x-submit" @click="query">查询</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2022–2023</p>
    </div>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "Home",
  data() {
    return {
      queryParam: {
        time: "",
        flyPlace: "起飞地",
        toPlace: "目的地",
      },
      type: "",
      placeList: { 广东省: ["汕头市", "珠海市"], 北京市: [] },
      placeTitleList: { 广东省: ["汕头市", "珠海市"], 北京市: [] },
      tar: -1,
    };
  },
  methods: {
    getPlace(event) {
      let place = event.target.innerText;
      console.log(this.type);
      if (this.type == 0) {
        if (this.queryParam.toPlace === place) {
          alert("出错了，出发地与终点不能相同!");
          return;
        }
        this.queryParam.flyPlace = place;
      } else if (this.type == 1) {
        if (this.queryParam.flyPlace === place) {
          alert("出错了，出发地与终点不能相同!");
          return;
        }
        this.queryParam.toPlace = place;
      }
      document
        .getElementsByClassName("offcanvas")[0]
        .classList.replace("show", "hide");
    },
    tra() {
      let p = this.queryParam.flyPlace;
      this.queryParam.flyPlace = this.queryParam.toPlace;
      this.queryParam.toPlace = p;
    },
    query() {
      this.$store.dispatch('setParam',this.queryParam)
      this.$router.push({
        path: "/flightList",
      })
    },
    getDetail(str, tar) {
      if (tar == this.tar) {
        return;
      }
      axios.get(`/place/oneAll?name=${str}`).then((resp) => {
        let data = resp.data.data;
        if (resp.data.code == 200) {
          this.placeList = data;
        }
      });
    },
  },
  mounted() {
    axios.get("/place/all").then((resp) => {
      if (resp.data.code == 200) {
        this.placeTitleList = resp.data.data;
      }
    });
  },
};
</script>

<style scoped>
.home {
  display: inline-block;
  padding: 30px;
  /* border: 1px solid rgb(248, 255, 255); */
  border-radius: 10px;
  opacity: 0.8;
  min-height: 250px;
  min-width: 400px;
  background-color: rgba(240, 249, 255, 0.3);
}
.x-date {
  width: 65%;
  height: 35px;
  margin-bottom: 20px;
}
.x-btn {
  margin: 10px;
}
.x-submit {
  margin-top: 50px;
}
.x-place button {
  margin: 5px 10px;
}
</style>