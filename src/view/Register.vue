<template>
<div class="text-center" style="margin-top:100px">
  <div class="register " >
    <h1 class="h3 mb-3 fw-normal" >新用户注册</h1>

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
    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        id="floatingPassword2"
        placeholder="请再次输入密码"
        v-model="password2"
      />
      <label for="floatingPassword2">确认密码</label>
    </div>

    <button
      class="w-100 btn btn-lg btn-primary"
      type="submit"
      style="margin-top: 50px"
      @click="check"
    >
      注册
    </button>
    <p class="mt-5 mb-3 text-muted">&copy; 2022–2023</p>
  </div>
</div>
  
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    check() {
      if (
        this.password === "" ||
        this.password2 === "" ||
        this.password !== this.password2 ||
        phone === ""
      ) {
        alert('信息有误，请检查')
      }
    },
  },
};
</script>

<style scoped>
.register {
  display: inline-block;
  padding: 30px;
  /* border: 1px solid rgb(248, 255, 255); */
  border-radius: 10px;
  opacity: 0.8;
  min-height: 250px;
  min-width: 400px;
  background-color: rgba(240, 249, 255, 0.3);
}
</style>