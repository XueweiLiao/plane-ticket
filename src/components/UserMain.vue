<template>
  <div class="container text-center" style="margin-top: 10px">
    <div class="d-flex align-items-start">
      <div
        class="nav flex-column nav-pills me-3 col-md-1"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <button
          class="nav-link"
          :class="{active:type == 0}"
          id="v-pills-settings-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-settings"
          type="button"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
          @click="toPath('/userMain/user')"
        >
          个人信息
        </button>
         <button
          class="nav-link"
          :class="{ active: type == 2 }"
          id="v-pills-settings-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-settings"
          type="button"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
          @click="toPath('/userMain/userInfo')"
        >
          修改信息
        </button>
        <button
          class="nav-link"
          :class="{ active: type == 1 }"
          id="v-pills-settings-tab"
          data-bs-toggle="pill"
          data-bs-target="#v-pills-settings"
          type="button"
          role="tab"
          aria-controls="v-pills-settings"
          aria-selected="false"
          @click="toPath('/userMain/password')"
        >
          修改密码
        </button>
      </div>
      <div class="tab-content" style="width: 100%" id="v-pills-tabContent">
        <div
          class="tab-pane fade active show"
          id="v-pills-settings"
          role="tabpanel"
          aria-labelledby="v-pills-settings-tab"
        >
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserMain",
  methods: {
    toPath(path) {
      if(path == this.$route.path) return
      this.$router.push({
        path: path,
      });
    },
  },
  computed: {
    type() {
      return this.$route.query.type
    },
  },
  mounted() {
    console.log(this.type)
    if (this.type == 1) {
      this.toPath("/userMain/password");
    } else if (this.type == 2) {
      this.toPath("/userMain/userInfo");
    } else {
      this.toPath("/userMain/user");
    }
  },
};
</script>

<style>
</style>