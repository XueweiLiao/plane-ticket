<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light" style="margin: 10px 0">
      <div class="container-fluid">
        <div class="col-md-4">
          <div style="float: left; margin-right: 10px">
            <span class="badge rounded-pill bg-info">起始</span>
            <select class="form-select" v-model="date.from">
              <option selected>{{getDate(0)}}</option>
              <option v-for="i in 8" :key="i">{{ getDate(-i)}}</option>
            </select>
          </div>
          <div style="float: left">
            <span  class="badge rounded-pill bg-info">截止</span>
            <select class="form-select" v-model="date.to">
              <option selected>{{getDate(0)}}</option>
              <!-- <option>2022-09-27</option> -->
              <option v-for="i in 8" :key="i">{{getDate(-i)}}</option>
            </select>
          </div>
        </div>
        <div class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="请输入航班名"
            aria-label="Search"
            v-model="name"
          />
          <button class="btn btn-outline-success" @click="getPageByDN(1,8,date,name,tSel)">Search</button>
        </div>
      </div>
    </nav>
    <template v-if="page != null">
      <div class="accordion" id="accordionExample">
        <Accordion v-for="(item, key) in page.records" :key="key" :t_k="key">
          <template v-slot:top>
            <ul class="list-group list-group-horizontal-md">
              <li class="list-group-item">
                <span
                  class="badge rounded-pill bg-info"
                  v-if="item.state === 'DOING'"
                  >进行中</span
                >
                <span
                  class="badge rounded-pill bg-secondary"
                  v-if="item.orderState === 'DONE'"
                  >已完成</span
                >
                <span
                  class="badge rounded-pill bg-danger"
                  v-if="item.orderState === 'ERROR'"
                  >异常</span
                >
              </li>
              <li class="list-group-item">{{ item.flightName }}</li>
              <li class="list-group-item">
                {{ subDate(item.flightFlyTime) }} -- {{ subDate(item.flightToTime) }}
              </li>
              <li class="list-group-item">
                {{ item.flightFlyPlace }} -> {{ item.flightToPlace }}
              </li>
              <li class="list-group-item">
                <span class="badge rounded-pill bg-light text-dark x-span">{{
                  value(item.ticket)
                }}</span
                >{{ item.flightPrice }}
              </li>
              <li class="list-group-item bg-primary text-white">
                {{ item.userName }}
              </li>
            </ul>
          </template>
          <template v-slot:body>
            <div class="card">
              <h5 class="card-header">详情</h5>
              <div class="card-body">
                <h5 class="card-title">用户信息</h5>
                <ul class="list-group">
                  <li class="list-group-item">
                    <span>姓名：</span>{{ item.userName }}
                  </li>
                  <li class="list-group-item">
                    <span>手机号：</span>{{ item.userPhone }}
                  </li>
                  <li class="list-group-item">
                    <span>身份证号码：</span>{{ idcard(item.userIdcard) }}
                  </li>
                </ul>
              </div>
              <div class="card-body">
                <h5 class="card-title">航班信息</h5>
                <ul class="list-group">
                  <li class="list-group-item">
                    <span>起飞机场：</span>{{ item.airportFlyName }}
                  </li>
                  <li class="list-group-item">
                    <span>终点机场：</span>{{ item.airportToName }}
                  </li>
                  <li class="list-group-item">
                    <span>状态：</span>
                    <span
                      class="badge rounded-pill bg-secondary"
                      v-if="item.flightState === '已完成'"
                      >{{ item.flightState }}</span
                    >
                    <span
                      class="badge rounded-pill bg-danger"
                      v-else-if="item.flightState === 'ERROR'"
                      >异常</span
                    >
                    <span class="badge rounded-pill bg-info" v-else>正常</span>
                  </li>
                </ul>
              </div>
              <div class="card-body">
                <h5 class="card-title">订单详情</h5>
                <ul class="list-group">
                  <li class="list-group-item">
                    <span>订单号：</span>{{ item.id }}
                  </li>
                  <li class="list-group-item">
                    <span>下单时间：</span>{{ item.date }}
                  </li>
                </ul>
                <button class="btn btn-primary x-span" style="margin: 20px 0">
                  取消订单
                </button>
              </div>
            </div>
            <!-- <div
            class="row x-card"
            v-for="(value, index) in item.ticketList"
            :key="index"
          >
            <div class="col-12" v-if="value.num != 0">
              <span class="badge bg-success">{{ value.name }}</span>
              <span class="badge rounded-pill bg-light text-dark"
                >剩余：{{ value.num }} 张
              </span>
              <span class="badge rounded-pill bg-light text-dark">
                {{ value.price }} 元</span
              >
              <button class="btn btn-primary card-btn">订购</button>
            </div>
          </div> -->
          </template>
        </Accordion>
      </div>
      <div style="margin: 40px auto" class="row col-4">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" v-show="page.current > 2">
              <button class="page-link" @click="getPage(1, page.size)">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li class="page-item" v-show="page.current > 1">
              <button
                class="page-link"
                @click="getPage(page.current - 1, page.size)"
              >
                {{ page.current - 1 }}
              </button>
            </li>
            <li class="page-item active">
              <button
                class="page-link"
                @click="getPage(page.current, page.size)"
              >
                {{ page.current }}
              </button>
            </li>
            <li class="page-item" v-show="page.current < page.pages">
              <button
                class="page-link"
                @click="getPage(page.current + 1, page.size)"
              >
                {{ page.current + 1 }}
              </button>
            </li>
            <li class="page-item" v-show="page.current < page.pages - 1">
              <button class="page-link" @click="getPage(page.pages, page.size)">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "../axios";
import Accordion from "./Accordion.vue";
export default {
  name: "OrderList",
  props: ["pageOut"],
  data() {
    return {
      page: this.pageOut,
      date: {
        from: this.getDate(0),
        to: this.getDate(0),
      },
      name:''
    };
  },
  methods: {
    getPage(current, size) {
      axios
        .post("/test/order/page", { current: current, size: size })
        .then((resp) => {
          if (resp.data.code == 200) {
            this.page = resp.data.data;
            console.log(this.page);
          }
        });
    },
    value(str) {
      if (str == "A") {
        return "特等座";
      } else if (str == "C") {
        return "经济座";
      } else {
        return "二等座";
      }
    },
    subDate(str) {
      let date = new Date(str)
      return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()
    },
    getDate(value){
      let d = new Date()
      console.log(d)
      let date = new Date(d.getTime()+(1000*60*60*24*value))
      console.log('date:'+date)
      let month = date.getMonth()+1
      month = month.toString().length == 1?'0'+month:month
      console.log()
      let day = date.getDate()
      day = day.toString().length == 1?'0'+day:day
      return date.getFullYear()+'-'+month+'-'+day
    },
    idcard(str) {
      return (
        str.substring(0, 4) +
        "***************" +
        str.substring(str.length - 4, str.length)
      );
    },
    getPageByDN(current,size,date,name,sel){
      axios
        .post("/order/don", { current: current, size: size,from:date.from,to:date.to,name:name,sel:sel })
        .then((resp) => {
          if (resp.data.code == 200) {
            this.page = resp.data.data;
            console.log(this.page);
          }
        });
    },
  },
  components: {
    Accordion,
  },
  computed:{
    tSel(){
      return !(this.name == null || this.name == '')
    }
  }
};
</script>

<style scoped>
.x-span {
  margin-right: 10px;
}
</style>