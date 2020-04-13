<template>
  <div class="wrapper cccgo" style="font-size:0.3rem;text-align:left;background:#fff;">
      <p style="overflow:hidden;">
          
          <span
            style="float:right;font-size:0.3rem;font-weight:900;line-height:0.6rem;margin-right:0.3rem; text-decoration: underline;color:blue;"
            @click="$router.go(-1)"
          >返回</span>
        </p>
    <div
      class="text item"
      style="overflow:hidden;font-size:0.28rem;"
    >
      <div>
        <div class="showAll"><span>供应商名称</span>：{{tabdata.providerName}}</div>
      </div>
      <div>
        <div class="showAll"><span>联系电话</span>：{{tabdata.firm_phone}}</div>
      </div>
      <div>
      	<div class="showAll"><span>主营业务</span>：{{tabdata.major}}</div>
      </div>
      <div>
      	<div class="showAll"><span>付款方式</span>：{{tabdata.resultSectionByStr}}</div>
      </div>
      <div>
      	<div class="showAll"><span>省</span>：{{tabdata.provinceName}}</div>
      </div>
      <div>
      	<div class="showAll"><span>市</span>：{{tabdata.cityName==tabdata.provinceName?tabdata.areaName:tabdata.cityName}}</div>
      </div>
      <div>
      	<div class="showAll"><span>接单金额</span>(万元)：{{tabdata.orderPriceStr}}</div>
      </div>
      <div>
        <div class="showAll"><span>接单数量</span>：{{tabdata.orderCount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { providerXq } from "@/api/configWu";
export default {
  name: "kehuedit",
  data() {
    return {
      tabdata: {},
      ruleForm: [],
      rules: [],
      quxian: true,
      level: 0,
      options: [],
      alllevel: 4
    };
  },
  mounted() {
    this.gettail();
  },
  methods: {
    gettail() {
//    if (
//      localStorage.getItem("departmentId") == 0 ||
//      localStorage.getItem("departmentId") == ""
//    ) {
//      this.quxian = false;
//    }
//    this.level = localStorage.getItem("level");
//
//    for (var i = this.level != 0 ? this.level : 1; i <= this.alllevel; i++) {
//      this.options.push(Number(i));
//    }
//    console.log(this.options);
      providerXq({ id: this.$route.query.id }).then(res => {
        if(res.code==200){
        	this.tabdata = res.data;
        }
      });
    },
    fanhui() {
      this.$router.go(-1);
    }
  }
};
</script>

<style  scoped>
.item > div{
    overflow: hidden;
}

.item > div>div {
  width: 50%;
  float: left;
  text-align: left;
  box-sizing: border-box;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
 
}
.item > div>div >span{
	width: 6em;display: inline-block;
	text-align: justify;
	text-align-last:justify;
	font-weight: bold;
}
.item > div>div.showAll{
	width: 100%;
	white-space: pre-wrap;
}
.item > div:nth-child(2n+1){
    background: #f0f9eb;
}
</style>