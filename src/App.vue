<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { gettoken } from "@/api/config";
import BScroll from "better-scroll";
export default {
  name: "App",
  data() {
    return {
      transitionName: ""
    };
  },
  created() {
    // 获取大客户看板token
    gettoken().then((res)=>{
      if(res.access_token){
        localStorage.setItem('Taccess_token',res.access_token);
        localStorage.setItem('Ttoken_type',res.token_type);
        localStorage.setItem('Texpires_in',res.expires_in);
        localStorage.setItem('Tscopes',res.scopes);
      }
    });

    // 模拟存储用户信息
    localStorage.setItem("userid", "30843");
    localStorage.setItem("userName", "吴世界");
    localStorage.setItem("level", 4);
    localStorage.setItem("departmentId", 1022);
    localStorage.setItem("departmentName", "北京事业一部");
    localStorage.setItem(
      "role",
      "1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020,1022,1023"
    );
  },
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      this.$message.closeAll();
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      // if(to.meta.index > from.meta.index){
      // //设置动画名称
      //   this.transitionName = 'slide-right';
      // }else{
      //   this.transitionName = 'slide-left';
      // }
    }
  }
};
</script>

<style >

</style>

