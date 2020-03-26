<template>
  <el-dialog
    :visible.sync="show"
    @close="close"
    :show-close="false"
    width="100%"
    @open="con"
    ref="ref"
  >
    <div id="myCharts" ref="myCharts" :style="{width:heightdate+'px',height:'5rem'}"></div>
      <el-button type="primary" @click="onSubmit">生成图片</el-button>
  </el-dialog>
</template>

<script>
import html2canvas from "html2canvas";
import echarts from "echarts";
export default {
  props: ["show", "projectId"],
  data() {
    return {
      tabdata1: [
        {
          departmentName: 111,
          monthMoney: 222,
          monthYearCompare: "10%/20%",
          grossProfit: "10%/20%",
          finishRate: "10%/20%",
          heightdate:''
        }
      ],
      heightdate:''
    };
  },
  mounted() {
    // this.$nextTick(function () {
    //     this.showchars()
    //   });
  },
  watch: {
    projectId: function(a, b) {
      //   alert(111)
      console.log(a);
      console.log(b);
      // this.showchars()
    }
  },
  methods: {
    getdata() {},
    showchars() {
    this.heightdate = document.body.clientWidth
      console.log(this.projectId);
      var echart = this.$refs.myCharts;
      let myChart = this.$echarts.init(echart);
      var mouth = [];
      var money = [];
      this.projectId.forEach(e => {
        mouth.push(e.mouth + "月");
        money.push(e.money);
      });
      // 绘制图表
      //   console.log(myChart)
      myChart.setOption({
        title: { text: this.projectId[0].name },
        tooltip: {},
        xAxis: {
          data: mouth
        },
        yAxis: {
            name:'万元'
          // data:money
        },
        series: [
          {
            name: "销量",
            type: "line",
            data: money,
            // smooth: true
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
        window.scroll(0,0)
      html2canvas(this.$refs.myCharts, {
        backgroundColor: '#fff'
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