<template>
  <div>
    <p><input type="text" placeholder="手机号" v-model="phone"></p>
    <p><input type="text" placeholder="密码" v-model="password"></p>
    <p><input type="checkbox" placeholder="密码" v-model="rem"></p>
    <p><input type="button" value="登录" @click="login"></p>
    <p><input type="button" value="获取token" @click="getCookie('token')"></p>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "MyTest",
  data() {
    return {
      phone: '',
      password: '',
      rem:false
    }
  },
  methods: {
    login() {
      if (this.phone != '' && this.password != '') {
        // 成功
        /*axios.get('/test/test1').then(
            resp => {
              console.log(resp.data)
            }
        )*/

        // 出错了 415
        /*axios.post('/test/test2',this.$qs.stringify({phone:this.phone,password:this.password})).then(
            resp => {
              console.log(resp.data)
            }
        )*/
        axios.post('/test/test2',{phone:this.phone,password:this.password}).then(
            resp => {
              let data = resp.data
              if(data.code == 200){
                sessionStorage.setItem('token',data.data)
              }
              if(this.rem){
                let date = new Date()
                date.setTime(date.getTime()+60*1000)
                document.cookie = 'token='+data.data
                document.cookie = 'age=46;expires='+date.toGMTString()
                document.cookie = 'name=张三'

                console.log(document.cookie)

                localStorage.setItem('token',data.data)
              }
              console.log(resp.data)
            }
        )
        // console.log(this.$qs.stringify({phone:this.phone,password:this.password}))

        // 成功了
        /*let _this = this
        axios({
          url:'/test/test2',
          method:'post',
          data: {phone:_this.phone,password:_this.password}
        }).then(
            resp => {
              console.log(resp.data)
            }
        )*/
      }
    },
    getCookie(key){
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
    }
  }
}
</script>

<style scoped>
input {
  margin: 20px;
}
</style>