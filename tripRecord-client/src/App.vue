<template>
  <div id="app">
    <div class="box">
      <!-- <md-water-mark class="text-container" :content="markContent" spacing="10vw"> -->
      <transition name="fademap">
        <router-view/>
      </transition>
      <!-- </md-water-mark> -->
    </div>
    <btmNav></btmNav>
  </div>
</template>
<script>
// import btmNav from 'views/bottom_nav/btmNav'
import btmNav from 'components/BottomNav'
import { mapActions } from 'vuex'
// import { Toast } from 'mand-mobile'
export default {
  components: {
    btmNav: btmNav
  },
  mounted () {
    // 验证本地是否已经登录过
    let tmpUser = localStorage.getItem('user')
    if (tmpUser) {
      this.setUser(JSON.parse(tmpUser))
      // 请求用户里程数据
      this.allDistanceAjax()
    } else {
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    allDistanceAjax () {
      this.$http.get('/trip/allDistance', {}).then(res => {
        this.setUserData(res.data.data)
      })
    },
    ...mapActions(['setUser', 'setUserData'])
  }
}
</script>

<style>
@import "style/reset.css";
.box {
  width: 100%;
  height: calc(100vh-100px);
  overflow: auto;
  position: relative;
  color: #555555;
  font-size: 24px;
}
.text-container {
  background: #fff;
}
.fademap-enter {
  opacity: 0;
}
.fademap-enter-active {
  transition: all 0.2s;
}
/* .fademap-leave-to {
  opacity: 0;
}
.fademap-leave-active {
  transition: all 0.3s;
} */
</style>
