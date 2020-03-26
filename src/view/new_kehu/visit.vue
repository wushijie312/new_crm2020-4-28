<template>
	<el-form
	  label-position="left"
	  inline
	  class="demo-table-expand"
	  style="max-height: 50vh;overflow:auto;font-size:0.3rem;text-align:left;"
	>
	  <div>
	    <div v-for="(visitItem,index) in visitsdataSon">
	    	<div class="itemVisit" v-show="visitItem && index==0">
		    		<p>{{visitItem.start_time}}--{{visitItem.end_time}}</p>
		    		<p style="margin-top:0.2rem;">
		    		 	 {{visitItem.user_name}}<span style="color:#1c9ad2;">&nbsp;{{visitItem.visit_way}}</span>
		    		  &nbsp;{{visitItem.to_level}} {{visitItem.to_person}}<span style="color:#1c9ad2;">({{visitItem.person_phone}})</span>
		    		</p>
		    		<p style="color:#1c9ad2;margin-top:0.2rem;">主要交流事宜:</p>
		    		<p>{{visitItem.talk_main}}</p>
		    		<p style="color:#1c9ad2;margin-top:0.2rem;">拜访结果&合作机会点:</p>
		    		<p>{{visitItem.visit_result}}</p>
		    		<p v-if="visitsdataSon.length>1 && !showmore" @click="showmore=true" style="text-decoration: underline;text-align: center;color: #EF5AA1;">
		    			查看更多 <el-button slot="reference" type="text" @click="addVisit()" style="margin-left:10px; textDecoration: underline;font-size: 0.3rem;padding: 0px;" size="mini">添加拜访</el-button>
		    		</p>
	    	</div>
	    	<div class="itemVisit" v-show="visitItem && index>0 && showmore">
		    		<p>{{visitItem.start_time}}--{{visitItem.end_time}}</p>
		    		<p style="margin-top:0.2rem;">
		    		 	 {{visitItem.user_name}}<span style="color:#1c9ad2;">&nbsp;{{visitItem.visit_way}}</span>
		    		  &nbsp;{{visitItem.to_level}} {{visitItem.to_person}}<span style="color:#1c9ad2;">({{visitItem.person_phone}})</span>
		    		</p>
		    		<p style="color:#1c9ad2;margin-top:0.2rem;">主要交流事宜:</p>
		    		<p>{{visitItem.talk_main}}</p>
		    		<p style="color:#1c9ad2;margin-top:0.2rem;">拜访结果&合作机会点:</p>
		    		<p>{{visitItem.visit_result}}</p>
		    		<p v-if="index+1==visitsdataSon.length && showmore" @click="showmore=false" style="text-decoration: underline;text-align: center;color: #EF5AA1;">收起</p>
	    	</div>
	    </div>
	    <div v-show="!visitsdataSon || !visitsdataSon.length">
	      <p style="text-indent:150px;line-height:100px;"> 
	      	<el-button slot="reference" type="text" @click="addVisit()" style="textDecoration: underline;font-size: 0.3rem;padding: 0px;" size="mini">添加拜访</el-button>
	      </p>
	    </div>
	  </div>
  </el-form>
</template>

<script>
export default {
    props: ["visitsdataSon","supplierId","companyName"],
    data() {
	    return {
	    	box: "",
	    	showmore:false,
	    	arr:{
		    		"start_time":"开始时间无",
		    		"end_time":"结束时间无",
		    		"visit_result":"无",
		    		"user_name":"销售无",
		    		"visit_way":"拜访方式无",
		    		"to_level":"客户职务无",
		    		"to_person":"拜访人无",
		    		"person_phone":"电话无",
		    		"talk_main":"无",
		    		"visit_result":"无"
		    	}
	    };
    },
    mounted() {
			this.initData();
    },
    methods: {
    	initData() {
	    	this.visitsdataSon.forEach((item,index)=>{
	    		for(var i in item){
	    			for(var ii in this.arr){
	    				if(i==ii && !item[i]){
	//  					this.$set(this.visitsdataSon[index][i],arr[ii]);
	    					item[i] = this.arr[ii]
	    				}
	    			}
	    		}
	    	})
    	},
    	addVisit(data) {
    		this.$router.push({
		        path: "/createData",
		        query: { customerId: this.supplierId,customerName:this.companyName,type: 1 }
	      	});
    	}
    },
    watch:{
    	"visitsdataSon" (newData,oldData){
    		if(newData!=oldData){
    			this.initData();
    			this.showmore = false;
    		}
    	}
    }
}
</script>

<style scoped>
	.itemVisit{
		 padding:0.3rem;
		 border-bottom: 1px solid #CCCCCC;
	}
</style>