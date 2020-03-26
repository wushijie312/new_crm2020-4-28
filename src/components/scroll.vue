<template>
  <transition name="el-fade-in">
    <div class="page-up" @click="scrollToTop" v-show="toTopShow">
      <i class="el-icon-caret-top"></i>
    </div>
  </transition>
</template>

<script >
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.handleScroll, true);
    });
  },
  destroyed() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  handleScroll() {
    let dom = document.getElementsByClassName("content-container")[0];
    this.scrollTop = dom.scrollTop;
    if (this.scrollTop > 300) {
      this.toTopShow = true;
    } else {
      this.toTopShow = false;
    }
  }
};
</script>
<style scoped lang="scss">
.page-up {
  background-color: #409eff;
  position: fixed;
  right: 50px;
  bottom: 30px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  z-index: 100;
  .el-icon-caret-top {
    color: #fff;
    display: block;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
  }
  p {
    display: none;
    text-align: center;
    color: #fff;
  }
  &:hover {
    opacity: 1;
  }
}
</style>