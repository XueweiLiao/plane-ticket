<template>
  <div class="container">
    <nav class="navbar navbar-light bg-light" style="margin: 10px 0">
      <div class="container-fluid">
        <div class="col-md-4">
          <h4>通知</h4>
        </div>
        <div class="d-flex" role="search">
          <button class="btn"><i class="bi bi-headset">联系客服</i></button>
        </div>
      </div>
    </nav>
    <div class="d-flex align-items-start" style="margin-top: 10px">
      <div
        class="nav flex-column nav-pills me-3 col-2"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <button
          class="nav-link"
          :id="'v-pills-' + key + '-tab'"
          data-bs-toggle="pill"
          :data-bs-target="'#v-pills-' + key"
          type="button"
          role="tab"
          :aria-controls="'v-pills-' + key"
          aria-selected="false"
          v-for="(message, key) in getPage()"
          :class="{active:key == 0}"
          :key="key"
        >
            <div style="font-size: 18px; text-align: left">
              {{ message.title }}
            </div>
            <div style="font-size: 12px; text-align: right; margin-top: 10px">
              {{ message.date }}
            </div>
        </button>
      </div>
      <div
        class="tab-content"
        id="v-pills-tabContent"
        style="max-width: 80%; padding: 5%"
      >
        <div
          class="tab-pane fade"
          :id="'v-pills-' + key"
          role="tabpanel"
          :aria-labelledby="'v-pills-' + key + '-tab'"
          v-for="(message, key) in getPage()"
          :class="{show:key == 0,active:key == 0}"
          :key="key"
        >
            <div class="text-center" style="display: block">
              <h4>{{ message.title }}</h4>
            </div>
            <div style="margin: 30px 0">
              {{ message.data }}
            </div>
            <div style="text-align: right">
              {{ message.author }}
            </div>
            <div style="text-align: right">
              {{ message.date }}
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messageList: [
        {
          author: "机场管理员",
          data: "尊敬的旅客，本次航班由于天气原因，故延迟5分钟出航，请重新查看订单信息，确定好出发时间，因此为您带来的不便我们深感歉意！",
          title: "航班延误",
          date: "2022-9-20 13:44",
        },
        {
          author: "航班管理员",
          data: "尊敬的旅客，本次航班由于天气原因，故延迟5分钟出航，请重新查看订单信息，确定好出发时间，因此为您带来的不便我们深感歉意！",
          title: "航班延误",
          date: "2022-9-20 13:44",
        },
        {
          author: "平台管理员",
          data: "尊敬的旅客，本次航班由于天气原因，故延迟5分钟出航，请重新查看订单信息，确定好出发时间，因此为您带来的不便我们深感歉意！",
          title: "航班延误",
          date: "2022-9-20 13:44",
        },
        {
          author: "平台管理员",
          data: "尊敬的旅客，本次航班由于天气原因，故延迟5分钟出航，请重新查看订单信息，确定好出发时间，因此为您带来的不便我们深感歉意！",
          title: "123航班延误",
          date: "2022-9-20 13:44",
        },
        {
          author: "平台管理员",
          data: "尊敬的旅客，本次航班由于天气原因，故延迟5分钟出航，请重新查看订单信息，确定好出发时间，因此为您带来的不便我们深感歉意！",
          title: "航班延误",
          date: "2022-9-20 13:44",
        },
        {
          author: "平台管理员",
          data: "尊敬的旅客，本次航班由于天气原因，故延迟5分钟出航，请重新查看订单信息，确定好出发时间，因此为您带来的不便我们深感歉意！",
          title: "航班延误",
          date: "2022-9-20 13:44",
        },
        {
          author: "平台管理员",
          data: "尊敬的旅客，本次航班由于天气原因，故延迟5分钟出航，请重新查看订单信息，确定好出发时间，因此为您带来的不便我们深感歉意！",
          title: "航班延误",
          date: "2022-9-20 13:44",
        },
        {
          author: "平台管理员",
          data: "尊敬的旅客，本次航班由于天气原因，故延迟5分钟出航，请重新查看订单信息，确定好出发时间，因此为您带来的不便我们深感歉意！",
          title: "asa航班延误",
          date: "2022-9-20 13:44",
        },
        {
          author: "平台管理员",
          data: "尊敬的旅客，本次航班由于天气原因，故延迟5分钟出航，请重新查看订单信息，确定好出发时间，因此为您带来的不便我们深感歉意！",
          title: "航班延误",
          date: "2022-9-20 13:44",
        },
        {
          author: "平台管理员",
          data: "尊敬的旅客，本次航班由于天气原因，故延迟5分钟出航，请重新查看订单信息，确定好出发时间，因此为您带来的不便我们深感歉意！",
          title: "航班延误",
          date: "2022-9-20 13:44",
        },
      ],
      page: {
        num: 2,
        size: 6,
      },
    };
  },
  methods:{
    getPage(){
        let page = this.page
        return this.messageList.slice((page.num - 1) * page.size,page.num  * page.size)
    }
  }
};
</script>

<style scoped>
.cl {
}
</style>