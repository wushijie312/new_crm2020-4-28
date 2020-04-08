<template>
  <div v-show="showbackTop" @click="gotop" class="showback"><i class="el-icon-top"></i></div>
</template>

<script>
export default {
  data() {
    return {
      showbackTop: false
    };
  },
  created() {
     //
    window.addEventListener("scroll", this.scrollbacktop, true);
  },
  methods: {
    scrollbacktop() {
      if (window.pageYOffset > 1000) {
        this.showbackTop = true;
      } else {
        this.showbackTop = false;
      }
    },
     gotop() {
      this.showbackTop = false;
      document.documentElement.scrollTop = 0;
    },
  }
};
</script>
<style lang="stylus"  scoped>
.showback {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: $color409eff;
  border-radius: 50px;
  color: #fff;
  font-size: 24px;
  line-height: 50px;
  opacity: 0.8;
}
</style>