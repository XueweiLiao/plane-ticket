<template>
  <ul class="list-group col-md-8">
    <li class="list-group-item">
      <span class="badge rounded-pill bg-primary">手机号</span>{{ user.phone }}
    </li>
    <li class="list-group-item">
      <span class="badge rounded-pill bg-success">姓名</span>
      {{ user.name }}
    </li>
    <li class="list-group-item">
      <span class="badge rounded-pill bg-success">身份证</span>{{ idcard }}
    </li>
    <li class="list-group-item">
      <span class="badge rounded-pill bg-light text-dark">总订单</span
      >{{ user.orderNum?user.orderNum:0 }} 单
    </li>
    <li class="list-group-item">
      <span class="badge rounded-pill bg-light text-dark">总消费</span
      >{{ user.consume }} 元
    </li>
    <li class="list-group-item">
      <span class="badge rounded-pill bg-light text-dark">总里程</span
      >{{ user.mileage }} km
    </li>
    <li class="list-group-item" v-if="vip">
      <span class="badge rounded-pill bg-warning">vip</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      defaultUser: {
        id: "1012",
        name: "张三",
        phone: "12345678910",
        idcard: "45454654684246874",
        consume: "9999.9",
        orderNum: "20",
        type: "vip",
        mileage: "9456",
        detail: "这是描述用户的",
      },
    };
  },
  computed: {
    idcard() {
      let ic = this.user.idcard;
      let num = 4;
      return ic.substr(0, num) + "************" + ic.substr(ic.length - num);
    },
    vip() {
      return this.user.type.toLowerCase() == "vip";
    },
    user(){
      
      if(this.$store.getters.getUser){
        return this.$store.getters.getUser
      }else{
        return this.defaultUser
      }
    }
  },
  mounted() {
    console.log(this.idcard);
  },
};
</script>

<style scoped>
.list-group span {
  font-size: 14px;
  float: left;
}
</style>