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
  destroyed(){
     window.removeEventListener("scroll", this.scrollbacktop, true);
  },
  methods: {
    scrollbacktop() {
      if (window.pageYOffset > 10) {
        this.showbackTop = true;
      } else {
        this.showbackTop = false;
      }
    },
     gotop() {
       alert(1);
      this.showbackTop = false;
      // document.documentElement.scrollTop = 0;
      document.body.scrollTop = document.documentElement.scrollTop=0;
    },
  }
};
</script>
<style lang="stylus"  scoped>
.showback {
  position: fixed;
  display :block;
  bottom: 40px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: $color409eff;
  border-radius: 50px;
  color: #fff;
  font-size: 24px;
  line-height: 50px;
  opacity: 0.8;
  cursor :pointer;
  z-index:1001;
}
</style>