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
        <div class="showAll"><span>姓名</span>：{{tabdata.name}}</div>
      </div>
      <div>
      	<div class="showAll"><span>部门</span>：{{tabdata.departmentName}}</div>
      </div>
      <div>
      	<div class="showAll"><span>岗位</span>：{{tabdata.position}}</div>
      </div>
      <div>
      	<div class="showAll"><span>从业年限</span>：{{tabdata.cateJobSum}}</div>     	
      </div>
      <div>
      	<div class="showAll"><span>擅长供应品类</span>：{{tabdata.wellCate}}</div>
      </div>
      <div>
      	<div class="showAll"><span>品类</span>：{{tabdata.cateName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { talentXq } from "@/api/configWu";

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
      if (
        localStorage.getItem("departmentId") == 0 ||
        localStorage.getItem("departmentId") == ""
      ) {
        this.quxian = false;
      }
      this.level = localStorage.getItem("level");

      for (var i = this.level != 0 ? this.level : 1; i <= this.alllevel; i++) {
        this.options.push(Number(i));
      }
      console.log(this.options);
      talentXq({ id: this.$route.query.id }).then(res => {
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