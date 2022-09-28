<template>
  <div class="container text-center" style="margin-top: 50px">
    <ul class="list-group">
      <li class="list-group-item">
        <span class="badge rounded-pill bg-primary">航班</span>{{ flight.name }}
      </li>
      <li class="list-group-item">
        <span class="badge rounded-pill bg-light text-dark">起飞时间</span
        >{{ flight.flyTime }}
      </li>
      <li class="list-group-item">
        <span class="badge rounded-pill bg-light text-dark">到达时间</span
        >{{ flight.toTime }}
      </li>
      <li class="list-group-item">
        <span class="badge rounded-pill bg-light text-dark">出发地</span
        >{{ flight.flyPlace }}
      </li>
      <li class="list-group-item">
        <span class="badge rounded-pill bg-light text-dark">到达地</span
        >{{ flight.toPlace }}
      </li>
      <li class="list-group-item">
        <span class="badge rounded-pill bg-light text-dark">出发机场</span
        >{{ flight.airportFlyName }}
      </li>
      <li class="list-group-item">
        <span class="badge rounded-pill bg-light text-dark">到达机场</span
        >{{ flight.airportToName }}
      </li>
      <li class="list-group-item">
        <span class="badge rounded-pill bg-secondary">{{ ticket.value }} </span
        ><span class="badge rounded-pill bg-info">价格</span>{{ ticket.price }} ￥
      </li>
      <li class="list-group-item">
        <span class="badge rounded-pill bg-info">剩余票数</span
        >{{ ticket.num }} 张
      </li>
      <li class="list-group-item">
        <span class="badge rounded-pill bg-info">总里程</span
        >{{ flight.mileage }} km
      </li>
    </ul>
    <div class="col-md-8 x-info">
      <div class="input-group mb-3">
        <span class="badge bg-success" style="font-size: 20px" id="basic-addon1"
          >请输入个人信息</span
        >
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1" >姓名</span>
        <input
          type="text"
          class="form-control"
          placeholder="请输入真实姓名"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="param.name"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">手机号</span>
        <input
          type="text"
          class="form-control"
          placeholder="请输入手机号"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="param.phone"
        />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">居民身份证</span>
        <input
          type="text"
          class="form-control"
          placeholder="请输入身份证号"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="param.idcard"
        />
      </div>
      <div class="input-group mb-3 offset-md-4">
        <button class="btn btn-primary" @click="submitOrder(param)">提交订单</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
export default {
  name: "Flight",
  props: ["flight", "grade"],
  data() {
    return {
      param:{
        name:'',
        phone:'',
        idcard:'',
        flightId:this.flight.id,
        grade:this.grade
      }
    }
  },
  computed: {
    ticket() {
      if (this.grade == "A") {
        return {
          value:'特等座',
          price:this.flight.ticketAPrice,
          num:this.flight.ticketANum,
        }
      }else if (this.grade == "C") {
        return {
          value:'经济座',
          price:this.flight.ticketCPrice,
          num:this.flight.ticketCNum,
        }
      }else{
        return {
          value:'二等座',
          price:this.flight.ticketBPrice,
          num:this.flight.ticketBNum,
        }
      }
    },
  },
  methods:{
    submitOrder(param){
      if(param.name && param.phone && param.idcard){
        axios.post('/order/create',{param:JSON.stringify(param)}).then(
          resp => {
            if(resp.data.code == 200){
              alert('resp200'+resp.data.data)
              axios.get('/user/get').then(
                resp =>{
                  if(resp.data.code == 200){
                    this.$store.dispatch('setUser',resp.data.data)
                    console.log(resp.data)
                  }
                }
              )
            }else{
              alert('resp400'+resp.data)
              console.log(resp.data)
            }
          }
        )
      }else{
        return alert('信息有误，请重新输入')
      }
    }
  }
};
</script>

<style scoped>
.list-group span {
  font-size: 14px;
  float: left;
}
.x-info {
  margin-top: 50px;
}
</style>