<!-- A.html -->
<template>
  <div class="wrapper" id="customlist" ref="customlist" style="font-size:14px;">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="menu-head-top50"></div>
    <iframe id="bdIframe" :src="url" scrolling="auto" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>
<script>
import Head from "@/view/common/head";
import { iframeKB } from "@/api/config";

export default {
  components: {
    Head
  },
  data() {
    return {
      url: "",
      act: 2,
      act1: true
    };
  },
  created() {
    // console.log('sdds');
    iframeKB({boardId:3}).then((res)=>{
      console.log(res);
      this.url='';
    });
    // setTimeout(() => {
      // this.url = "https://openapi.yangguangqicai.com/online/dashboard?boardId=9";
    // }, 2000);
  },
  mounted() {
    /**
     * iframe-宽高自适应显示
     */
    const oIframe = document.getElementById("bdIframe");
    const deviceWidth = document.documentElement.clientWidth;
    const deviceHeight = document.documentElement.clientHeight;
    oIframe.style.width = Number(deviceWidth) + "px"; //数字是页面布局宽度差值
    oIframe.style.height = Number(deviceHeight) - 60 + "px"; //数字是页面布局高度差
  }
};
</script>