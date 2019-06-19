<template>
  <div class="btm-nav">
    <md-tab-bar v-model="currentTab" :items="items" :has-ink="false" @change="navOnChage">
      <template slot="item" slot-scope="{ item }">
        <div class="custom-item">
          <div class="icon">
            <md-icon :name="item.icon"/>
          </div>
          <div class="text">
            <span v-text="item.label"></span>
          </div>
        </div>
      </template>
    </md-tab-bar>
  </div>
</template>

<script>
import { TabBar, Icon } from "mand-mobile";

export default {
  name: "barTab",
  components: {
    [TabBar.name]: TabBar,
    [Icon.name]: Icon
  },
  data() {
    return {
      currentTab: "",
      items: [
        { name: "trip", label: "出行", icon: "home" },
        { name: "traffic", label: "交通", icon: "location" },
        { name: "history", label: "历史", icon: "calendar" },
        { name: "user", label: "我的", icon: "authentication" }
      ]
    };
  },
  methods: {
    navOnChage(e) {
      this.$router.push({ path: `/${e.name}` });
    }
  },
  computed: {
    getCurrentTab() {
      let currentTab = this.$route.path.split("/")[1];
      return currentTab;
    }
  },
  mounted() {
    let currentTab = this.$route.path.split("/")[1];
    this.currentTab = currentTab;
  }
};
</script>

<style lang="scss" scoped>
.btm-nav {
  width: 100%;
  height: 100px;
  // border:1px solid black;
}
.icon {
  text-align: center;
}
</style>
