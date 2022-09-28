<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light" style="margin: 10px 0">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">起飞日期 : {{ date }}</a>
      </div>
    </nav>
    <div class="accordion" id="accordionExample">
      <Accordion v-for="(item, key) in page.records" :key="key" :t_k="key">
        <template v-slot:top>
          <ul class="list-group list-group-horizontal-md">
            <li class="list-group-item">{{ item.name }}</li>
            <li class="list-group-item">
              {{ item.flyTime }} -- {{ item.toTime }}
            </li>
            <li class="list-group-item">
              {{ item.flyPlace }} -> {{ item.toPlace }}
            </li>
            <li class="list-group-item">
              {{ item.ticketANum + item.ticketBNum + item.ticketCNum }} 张
            </li>
          </ul>
        </template>
        <template v-slot:body>
          <div class="row x-card">
            <div class="col-md-12" v-if="item.ticketANum > 0">
              <span class="badge bg-success">特等座</span>
              <span class="badge rounded-pill bg-light text-dark"
                >剩余：{{ item.ticketANum }} 张
              </span>
              <span class="badge rounded-pill bg-light text-dark">
                {{ item.ticketAPrice }} 元</span
              >
              <button class="btn btn-primary card-btn" @click="search('A',item)">
                订购
              </button>
            </div>
            <div class="col-md-12" v-if="item.ticketBNum > 0">
              <span class="badge bg-success">二等座</span>
              <span class="badge rounded-pill bg-light text-dark"
                >剩余：{{ item.ticketBNum }} 张
              </span>
              <span class="badge rounded-pill bg-light text-dark">
                {{ item.ticketBPrice }} 元</span
              >
              <button class="btn btn-primary card-btn" @click="search('B',item)">
                订购
              </button>
            </div>
            <div class="col-md-12" v-if="item.ticketCNum > 0">
              <span class="badge bg-success">经济座</span>
              <span class="badge rounded-pill bg-light text-dark"
                >剩余：{{ item.ticketCNum }} 张
              </span>
              <span class="badge rounded-pill bg-light text-dark">
                {{ item.ticketCPrice }} 元</span
              >
              <button class="btn btn-primary card-btn" @click="search('C',item)">
                订购
              </button>
            </div>
          </div>
        </template>
      </Accordion>
    </div>
    <div style="margin: 40px auto" class="row col-4">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item" v-show="page.current > 2">
            <button class="page-link" @click="updatePage(1)">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          <li class="page-item" v-show="page.current > 1">
            <button class="page-link" @click="updatePage(page.current-1)">{{ page.current - 1 }}</button>
          </li>
          <li class="page-item active">
            <button class="page-link" >{{ page.current }}</button>
          </li>
          <li class="page-item" v-show="page.pages >= page.current + 1">
            <button class="page-link" @click="updatePage(page.current+1)">{{ page.current + 1 }}</button>
          </li>
          <li class="page-item" v-show="page.pages > page.current +2">
            <button class="page-link" @click="updatePage(page.pages)">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "../axios";
import Accordion from "./Accordion.vue";

export default {
  name: "FlightList",
  data() {
    return {
      page: {
        current: 1,
        pages: 3,
        total: 8,
        records: [
          {
            id: "001",
            name: "东航1001",
            flyPlace: "北京",
            toPlace: "珠海",
            flyTime: "2022-09-21 13:54",
            toTime: "2022-09-21 18:34",
            price: "666.6",
            ticket: "45",
            ticketList: [
              {
                id: "A",
                name: "头等舱",
                price: "645",
                num: "13",
              },
              {
                id: "B",
                name: "二等舱",
                price: "467",
                num: "30",
              },
              {
                id: "C",
                name: "经济舱",
                price: "334",
                num: "0",
              },
            ],
          },
        ],
      },
      pageInfo: {
        current: 1,
        size: 1,
        total: 8,
      },
    };
  },
  methods: {
    search(grade,flight) {
      console.log(flight)
      this.$router.push({
        name: "flight",
        params:{
          flight:flight,
          grade:grade
        },
      })
    },
    updatePage(current) {
      this.pageInfo.current = current;
      this.pageInfo.total = this.page.total;
      this.queryFlightList(this.pageInfo);
    },
    queryFlightList(page) {
      axios
        .post("/test/route/page", {
          page: JSON.stringify(page),
          param: JSON.stringify(this.param),
        })
        .then((resp) => {
          if (resp.data.code == 200) {
            this.page = resp.data.data;
          }
          console.log(resp.data);
          console.log(this.$store.getters.getParam)
        });
    },
  },
  components: {
    Accordion,
  },
  mounted() {
    this.queryFlightList(this.pageInfo);
  },
  computed:{
    date(){
      let time = this.param.time
      return time ? time : new Date()
    },
    param(){
      return this.$store.getters.getParam
    }
  }
};
</script>

<style scoped>
.x-card {
  margin: 10px 0;
}
.x-card span {
  margin-right: 5px;
  font-size: 16px;
}
.card-btn {
  float: right;
}
</style>