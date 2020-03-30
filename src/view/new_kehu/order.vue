<template>
		<el-form
	  label-position="left"
	  inline
	  class="demo-table-expand"
	  style="max-height: 50vh;overflow:auto;font-size:0.3rem;text-align:left;"
	>
	  <div style="font-size:0.3rem;">
	    <div class="nrbo" v-for="(item,index) in orderdataSon" :key="index" style="padding:0.2rem;">
	      <div :class="item.to_user_id ==userid?'myself':''">
	        <div style="overflow:hidden;width:100%;margin:0 auto;">
	          <div class="left over" style="width:30%;">
	            <img
	              class="left"
	              style="height:0.6rem;width:0.6rem;border-radius:50%;float:left;margin-top:0.05rem;margin-right:0.1rem;"
	              :src="item.create_id_pic"
	              alt
	            />
	            <div class="left" style="text-align:left;">
	              <p>{{item.create_name}}</p>
	              <p class="hui" style="font-size:0.2rem;">发送者</p>
	            </div>
	          </div>
	          <img style="width:40%;float:left;margin-top:0.2rem;" :src="fs" alt />
	          <div class="right over">
	            <img
	              class="left"
	              style="height:0.6rem;width:0.6rem;border-radius:50%;float:left;margin-top:0.05rem;margin-right:0.1rem;"
	              :src="item.to_user_id_pic"
	              alt
	            />
	            <div class="left" style="text-align:left;">
	              <p>{{item.to_user_name}}</p>
	              <p class="hui" style="font-size:0.2rem;">接收者</p>
	            </div>
	          </div>
	        </div>
	        <div style="text-align:left;overflow:hidden;margin-top:0.2rem;">
	          <h3 class="khname left">{{item.customername}}</h3>
	          <img :src="rw" style="height:0.4rem;float:right;margin-right:0.4rem;" alt />
	        </div>
	        <p style="padding:0.1rem;box-sizing:border-box;text-align:left;">{{item.msginfo}}</p>
	        <p style="text-align:left;overflow:hidden;font-size:0.28rem;">
	          <span style="float:left;" :class="item.timeout==1?'red':'green'">
	            <img v-show="item.timeout==1" :src="yuqi" alt style="width:0.24rem;" />
	            <img v-show="item.timeout==0" :src="weidao" alt style="width:0.24rem;" />
	            {{item.create_time}}&nbsp;-&nbsp;{{item.end_time}}
	          </span>
	        </p>
	      </div>
	    </div>
	    
	    <p v-show="orderdataSon && orderdataSon.length" style="text-align:center"><el-button slot="reference" type="text" @click="addOrder()" style="textDecoration: underline;font-size: 0.3rem;padding: 0px;" size="mini">添加派单</el-button></p>
	    <div  v-show="!orderdataSon || !orderdataSon.length">
	      <p style="text-indent:150px;line-height:100px;">
	      	<el-button slot="reference" type="text" @click="addOrder()" style="textDecoration: underline;font-size: 0.3rem;padding: 0px;" size="mini">添加派单</el-button>
	      </p>
	    </div>
	  </div>
	</el-form>
</template>

<script>
import { createRw, getRwList, setxiugai, getxqlist } from "@/api/configWu";
export default {
  name: "lcxq",
  props:["orderdataSon","supplierId","companyName"],
  data() {
    return {
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      input2:'',
      yuqi: require("../../assets/img/normal/yuqi.png"),
      weidao: require("../../assets/img/normal/weiyuqi.png"),
      fs: require("../../assets/img/normal/fs.png"),
      zf: require("../../assets/img/normal/zf.png"),
      weidu: require("../../assets/img/normal/wd.png"),
      rw: require("../../assets/img/normal/rw.png"),
      jy: require("../../assets/img/normal/jy.png"),
      bz: require("../../assets/img/normal/bz.png"),
      gb: require("../../assets/img/normal/guanbi.png"),
      wgb: require("../../assets/img/normal/yiguanbi.png"),
      gb: require("../../assets/img/normal/guanbi.png"),
      up: require("../../assets/img/normal/up.png"),
      down: require("../../assets/img/normal/down.png"),
      zhuanfa: require("../../assets/img/normal/zhuanfa.png"),
      yizhuanfa: require("../../assets/img/normal/weizhuanfa.png"),
      zx: require("../../assets/img/normal/zx.png"),
      fx: require("../../assets/img/normal/fx.png"),
      act: 2,
      userid: "",
    };
  },
  mounted() {
//  this.getdata(2);
    // document.addEventListener("scroll", this.handleScroll);
  },
  methods: {
  	addOrder() {
  		this.$router.push({
	        path: "/create",
	        query:{customerName:this.companyName,customerId:this.supplierId}
      	});
  	}
  	
  }
};
</script>

<style  scoped>
.iconJh img {
  float: right;
}
.act {
  color: #ccc;
}
.nrbo {
	border-bottom: 1px solid #cccccc;
}
.myself {
  border-left: 3px solid #3999fd;
}
.khname {
  text-indent: 0.3rem;
  background: url("../../assets/img/normal/kh.png") no-repeat 0 0.05rem;
  background-size: 0.2rem 0.2rem;
  font-size: 0.2rem;
  color: #ccc;
  font-weight: 100;
}
</style>