<template>
  <div class="text-center" style="margin-top: 100px">
    <div class="login">
      <h1 class="h3 mb-3 fw-normal">请进行登录</h1>

      <div class="form-floating">
        <input
          type="tel"
          class="form-control"
          id="floatingInput"
          placeholder="请输入手机号"
          v-model="phone"
        />
        <label for="floatingInput">手机号</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="请输入密码"
          v-model="password"
        />
        <label for="floatingPassword">密码</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" v-model="rem" /> 记住我
        </label>
      </div>
      <button class="w-100 btn btn-lg btn-primary" @click="login">登录</button>
      <p class="mt-5 mb-3 text-muted">&copy; 2022–2023</p>
    </div>
  </div>
</template>

<script>
import axios from "../axios";

export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: "",
      code: "",
      rem: false,
    };
  },
  methods: {
    login() {
      if (this.phone != "" && this.password != "") {
        let token = "";
        axios
          .post("/login", { phone: this.phone, password: this.password })
          .then(
            (resp) => {
              if (resp.data.code == 200) {
                token = resp.data.data;
                sessionStorage.setItem("token", token);
                if (this.rem) {
                  // let date = new Date()
                  // date.setTime(date.getTime() + 60 * 1000)
                  // document.cookie = 'TOKEN_=' + token + ';expires=' + date.toGMTString()
                  localStorage.setItem('token',token)
                }
                console.log(resp.data);
                this.$store.dispatch("setLogin", true);
                let tid = setInterval(() => {
                  console.log("用户验证");
                  if (this.$store.getters.getUser == null) {
                    if (this.$store.getters.getLogin) {
                      clearInterval(tid);
                      this.$router.push({
                        path: "/home",
                      });
                      alert("用户异常，请重新登录");
                    }
                  }
                }, 3 * 1000);
                axios("/user/get").then((resp) => {
                  if (resp.data.code == 200) {
                    console.log(resp.data);
                    this.$store.dispatch("setUser", resp.data.data);
                    this.$router.push({
                      path: "/home",
                    });
                  }
                  console.log(resp.data.data);
                });
              } else {
                alert(resp.data.msg);
              }
            },
            (err) => {
              console.log(err.message);
            }
          );
      } else {
        alert("输入信息错误！");
      }
    },
  },
 };
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.contain {
  background-color: rgba(222, 252, 255, 0.946);
}

.login {
  display: inline-block;
  padding: 30px;
  /* border: 1px solid rgb(248, 255, 255); */
  border-radius: 10px;
  opacity: 0.8;
  min-height: 250px;
  min-width: 400px;
  background-color: rgba(240, 249, 255, 0.3);
}

.login:hover {
  background-color: rgba(229, 231, 255, 0.3);
  opacity: 1;
}

/* .login div{
  display: inline-block;
} */
</style>>