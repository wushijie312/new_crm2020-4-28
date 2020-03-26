<template>
  <div>
    <div  id="myCharts" ref="myCharts" :style="{width:heightdate+'px',height:'5rem'}"></div>
    <el-button  type="primary" @click="onSubmit">生成图片</el-button>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import echarts from "echarts";
import { getechars } from "@/api/config";
export default {
  props: ["date", "departId"],
  data() {
    return {
      tabdata1: [
        {
          departmentName: 111,
          monthMoney: 222,
          monthYearCompare: "10%/20%",
          grossProfit: "10%/20%",
          finishRate: "10%/20%",
          heightdate: ""
        }
      ],
      heightdate: "",
      showdate: "",
      showdepartId: "",
      jinum: 4,
      feiyong:[],
      jingjingli:[],
      biaozhun:[],
      jingli:[]

    };
  },
  watch: {
      date(){
          this.getdata();
      },
    jinum(a, b) {
        
      if (a === 0) {
          var that = this
          setTimeout(() => {
              that.showchars()
          }, 500)
        //   this.showchars()
        //   this.nextTick({})
        // this.showchars();
      }
    }
  },
  mounted() {
    this.getdata();
  },

  methods: {
    getdata() {
    this.jinum = 4
      console.log(this.date);
      console.log(this.departId);
      getechars({
        submitTime: this.date,
        type: "yearAllBear",
        departmentId: this.departId
      }).then(res => {
        this.feiyong = res.departmentYearList;
        console.log(res.departmentYearList);
        this.jinum--;
        console.log(this.jinum)
      });
      getechars({
        submitTime: this.date,
        type: "stand",
        departmentId: this.departId
      }).then(res => {
        this.biaozhun = res.departmentYearList;
        console.log(res.departmentYearList);
        this.jinum--;
        // this.showchars()
      });
      getechars({
        submitTime: this.date,
        type: "nets",
        departmentId: this.departId
      }).then(res => {
        this.jingjingli = res.departmentYearList;
        console.log(res.departmentYearList);
        this.jinum--;
        // this.showchars()
      });
      getechars({
        submitTime: this.date,
        type: "net",
        departmentId: this.departId
      }).then(res => {
        this.jingli = res.departmentYearList;
        console.log(res.departmentYearList);
        this.jinum--;
        // this.showchars()
      });
    },
    showchars() {
      this.heightdate = document.body.clientWidth;
      console.log(this.projectId);
      var echart = this.$refs.myCharts;
      let myChart = this.$echarts.init(echart);
      var mouth = [];
      var money = [];
      var money1 = [];
      var money2 = [];
      var money3 = []

      this.feiyong.forEach(e => {
        mouth.push(e.month + "月");
        money.push(e.money);
      });
      this.jingjingli.forEach(e => {
        money2.push(e.money);
      });
      this.biaozhun.forEach(e => {
        money1.push(e.money);
      });
      this.jingli.forEach(e => {
        money3.push(e.money);
      });
      console.log(mouth);
      // 绘制图表
      myChart.setOption({
        title: { text: '' },
        legend: {
            data:['费用','标准销售额','净净利','净利']
        },
        tooltip: {
            trigger: 'axis',
            formatter:'{b}<br/>{a0}:{c0}万,<br/>{a1}:{c1}万,<br/>{a2}:{c2}万,<br/>{a3}:{c3}万,'
        },
        // tooltip: {},
        xAxis: {
          data: mouth
        },
        yAxis: {
          name: "万元"
        },
        series: [
          {
            name: "费用",
            type: "line",
            data: money
          },
          {
            name: "标准销售额",
            type: "line",
            data: money1
          },
          {
            name: "净净利",
            type: "line",
            data: money2
          },
          {
            name: "净利",
            type: "line",
            data: money3
          }
        ]
      });
      myChart.resize();
    },
    close() {
      this.$emit("update:show", false);
    },
    con() {
      // var heightCss = window.getComputedStyle(this.$refs.ref).width;
      console.log(document.body.clientWidth);

      // this.showchars()
      this.$nextTick(function() {
        this.showchars();
      });
    },
    onSubmit() {
      window.scroll(0, 0);
      html2canvas(this.$refs.myCharts, {
        backgroundColor: "#fff"
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

<style>
</style>