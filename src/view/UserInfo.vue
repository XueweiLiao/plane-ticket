<template>
  <div class="col-md-6">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">姓名</span>
      <input
        type="text"
        class="form-control"
        placeholder="请输入真实姓名"
        aria-label="Username"
        aria-describedby="basic-addon1"
        v-model="info.name"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon2">手机号</span>
      <input
        type="text"
        class="form-control"
        placeholder="请输入新手机号"
        aria-label="Username"
        aria-describedby="basic-addon2"
        v-model="info.phone"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon3">身份证号</span>
      <input
        type="text"
        class="form-control"
        placeholder="请输入身份证号码"
        aria-label="Username"
        aria-describedby="basic-addon3"
        v-model="info.idcard"
      />
    </div>
    <button class="btn btn-primary" @click="update">确认修改</button>
  </div>
</template>

<script>
import axios from '../axios'
export default {
  name: "UserInfo",
  data() {
    return {
      defaultInfo: {
        name: "张三",
        phone: "12345678910",
        idcard: "4456545465465839",
      },
    }
  },
  methods:{
    checkInfo(){
      let info = this.info
      for(let key in info){
        if(info[key] == null || info[key] == ''){
          return true
        }
      }
    },
    update(){
      if(this.checkInfo()){
        alert('信息不能为空！')
      }

      axios.post('/user/info',{phone:this.info.phone,name:this.info.name,idcard:this.info.idcard}).then(
        resp =>{
          if(resp.data.code == 200){
            alert('信息修改成功')
            this.$store.dispatch('setUser',resp.data.data)
          }else{
            alert('信息修改失败')
          }
        },
        err =>{
          console.log(err.message)
        }
      )
    }
  },
  computed:{
    info(){
      let user = this.$store.getters.getUser
      return user == null?this.defaultInfo:{
        name:user.name,
        phone:user.phone,
        idcard:user.idcard
      }
    }
  }
};
</script>

<style scoped>
</style>