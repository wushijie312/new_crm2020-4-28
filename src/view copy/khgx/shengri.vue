<template>
  <div style="height:100%;">
    <div
      id="faultTree"
      ref="faultTree"
      :style="{width: '100%',position:'relative'}"
    >
      <div class="swiper-container" style="height:100%;">
        <div class="swiper-wrapper" >
          <div class="swiper-slide" v-for="(item,index) in pics" :key="index">
              <img :src="item" style="width:100%;height:100%;display:block;">
          </div>
        </div>
      </div>
      <div
        :style="{position:'absolute',top:top,left:left,zIndex:'200',fontSize:fontSize,color:fontColor,width:shuruK,height:shuruH}"
      >{{srzf}}</div>
    </div>
    <div style="position:fixed;bottom:10px;left:0;width:100%;z-index:999;">
        
      <el-form ref="form" label-width="100px" >
        
        
        <el-button type="primary" @click="qiehuan" style="width:40%;">切换祝福语</el-button>
        <el-button type="primary" @click="onSubmit" style="width:40%;">生成贺卡</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import html2canvas from "html2canvas";
import Swiper from "swiper";
import img1 from "@/static/shengri1.png";
import img2 from "@/static/shengri2.jpg";
import {getpics } from "@/api/config";
export default {
  name: "shengri",
  data() {
    return {
      srzf: "",
      pics: [img1, img2],
      fontSize: "0.4rem",
      fontColor: "#5770df",
      top: "20%",
      left: "20%",
      srkl:'生日快乐',
      shuruH:'',
      shuruK:'',
      js:0,
      getdata:{},
      options: [
      ],
      options1: [
        {
          value: "#fa0e2f",
          label: "红色"
        }
      ]
    };
  },
  mounted() {
    
    this.getpics()
  },
  methods: {
      qiehuan(){
          var num = this.getdata.content.length
           this.js = this.js+1
           if(this.js==num){
               this.js = 0
           }
           if(this.$route.query.name){
               this.srzf = this.$route.query.name+': '+this.getdata.content[this.js].content
           }else{
               this.srzf = this.getdata.content[this.js].content
           }
           
      },
      getpics(){
          console.log(this.$route.query.name)
          
          getpics().then(res=>{
              console.log(res)
              this.getdata.content = res.content
              this.getdata.img1 = res.img
              console.log(this.getdata.img1)
              this.options = res.content
              if(this.$route.query.name){
                this.srzf = this.$route.query.name+': '+res.content[0].content
              }else{
                   this.srzf = res.content[0].content
              }
              var that = this
              that.fontSize = that.getdata.img1[0].wordSize
                that.fontColor = that.getdata.img1[0].wordColour
                that.top = that.getdata.img1[0].minTop
                that.left = that.getdata.img1[0].minLeft
                that.shuruH = Number(that.getdata.img1[0].maxTop.split("%")[0])-Number(that.getdata.img1[0].minTop.split("%")[0])+'%'
                that.shuruK = Number(that.getdata.img1[0].maxLeft.split("%")[0])-Number(that.getdata.img1[0].minLeft.split("%")[0])+'%'
                console.log(that.shuruH)
              this.initswiper();
          })
      },
    initswiper() {
        var that = this
      var mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        
        on: {
            slideChangeTransitionEnd: function(){
                console.log(that.getdata);//切换结束时，告诉我现在是第几个slide
                
                that.fontSize = that.getdata.img1[this.snapIndex].wordSize
                that.fontColor = that.getdata.img1[this.snapIndex].wordColour
                that.top = that.getdata.img1[this.snapIndex].minTop
                that.left = that.getdata.img1[this.snapIndex].minLeft
                that.shuruH = Number(that.getdata.img1[this.snapIndex].maxTop.split("%")[0])-Number(that.getdata.img1[this.snapIndex].minTop.split("%")[0])+'%'
                that.shuruK = Number(that.getdata.img1[this.snapIndex].maxLeft.split("%")[0])-Number(that.getdata.img1[this.snapIndex].minLeft.split("%")[0])+'%'
                console.log(Number(that.getdata.img1[this.snapIndex].maxTop.split("%")[0])-Number(that.getdata.img1[this.snapIndex].minTop.split("%")[0]))
                console.log(that.shuruK)
                
            },
        },
      });
    },

    onSubmit() {
      html2canvas(this.$refs.faultTree, {
        backgroundColor: null
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.downloadIamge(dataURL, "pic");
      });
    },

    downloadIamge(imgsrc, name) {
      //下载图片地址和图片名
      var image = new Image();
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据

        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    }
  }
};
</script>
<style scoped>
@import "../../../node_modules/swiper/css/swiper.css";
</style>