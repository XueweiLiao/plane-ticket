<template>
  <div class="col-md-6">
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">旧密码</span>
      <input
        type="password"
        class="form-control"
        placeholder="请输入旧密码"
        aria-label="Username"
        aria-describedby="basic-addon1"
        v-model="password.old"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon2">新密码</span>
      <input
        type="password"
        class="form-control"
        placeholder="请输入新密码"
        aria-label="Username"
        aria-describedby="basic-addon2"
        v-model="password.pass"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon3">确认密码</span>
      <input
        type="password"
        class="form-control"
        placeholder="请确认密码"
        aria-label="Username"
        aria-describedby="basic-addon3"
        v-model="password.pass2"
      />
    </div>
    <button class="btn btn-primary" @click="update">确认修改</button>
  </div>
</template>

<script>
import axios from "../axios";
export default {
  name: "Password",
  data() {
    return {
      password: {
        old: "",
        pass: "",
        pass2: "",
      },
    };
  },
  methods: {
    check(str) {
      return str == null && str == "";
    },
    update() {
      if (
        this.check(this.password.old) ||
        this.check(this.password.pass) ||
        this.check(this.password.pass2)
      ) {
        return alert("密码框不能为空！");
      }
      if (!(this.password.pass === this.password.pass2)) {
        return alert("两次新密码不同！");
      }

      let user = this.$store.getters.getUser;
      if (user == null || user.phone == null) {
        return alert("出错了，用户无效");
      }

      axios.post("/user/pass", {
        phone: user.phone,
        oldPassword: this.password.old,
        newPassword: this.password.pass,
      }).then(
        resp =>{
          if(resp.data.code == 200){
            alert('密码修改成功，请重新登录')
            this.$store.dispatch('setUser',null)
            this.$router.push({
              path:'/'
            })
          }else{
            alert('原密码错误')
          }
        }
      )
    },
  },
};
</script>

<style>
</style>