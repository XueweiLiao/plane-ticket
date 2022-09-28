<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" >
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/home" style="font-weight: 600;">民航订票</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        >
          <li class="nav-item">
            <router-link class="nav-link" to="/home">首页</router-link>
          </li>

          <li class="nav-item dropdown" >
            <a
              :class="{disabled:user == null}"
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarScrollingDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              个人用户
            </a>
            <ul class="dropdown-menu" id="x-menu" aria-labelledby="navbarScrollingDropdown">
              <li><router-link class="dropdown-item" :to="{path:'/userMain/user',query:{type:0} }">个人中心</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><router-link class="dropdown-item" :to="{path:'/userMain/userInfo',query:{type:2} }">修改信息</router-link></li>
              <li><router-link class="dropdown-item" :to="{path:'/userMain/password',query:{type:1} }">修改密码</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><button class="dropdown-item" @click="logout">退出登录</button></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:;" :class="{disabled:user == null}" @click="getOrderPage(1,8)">我的订单</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/message" :class="{disabled:user == null}">消息中心</router-link>
          </li>
        </ul>
        <div class="nav-item">
          <!-- 此处使用了user.name -->
            <router-link class="nav-link" to="/" v-if="user == null">登录</router-link>
            <router-link class="nav-link" to="/userMain/user" v-else>{{user.phone}}</router-link>
        </div>
        <div class="nav-item">
            <router-link class="nav-link" to="/register">注册</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "../axios";

export default {
  name: "Top",
  computed:{
    user(){
      return this.$store.getters.getUser
    },
  },
  methods:{
    logout(){
      this.$store.dispatch('setLogin',false)
      this.$store.dispatch('logout')
      document.getElementById('x-menu').classList.remove('show')
      sessionStorage.removeItem('token')
      axios.post('/logout',{token:sessionStorage.getItem('token')}).then(
          resp => {
            console.log('logout:'+resp.data.data)
          }
      )
      this.$router.push({
        path:'/'
      })
    },
    getOrderPage(current,size){
      axios.post('/order/page',{current:current,size:size}).then(
        resp => {
          if(resp.data.code == 200){
            this.$router.push({
              name:'orderList',
              params:{
                pageOut:resp.data.data
              }
            })
          }
        }
      )
    },
    
  }
};
</script>

<style scoped>
.contain {
  background-color: rgb(255, 184, 184);
}
.nav-link{
  font-size: 16px;
  font-weight: 550;
}
</style>