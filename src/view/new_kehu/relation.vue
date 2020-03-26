<template>
	  <div>
  	<el-form
	  	  label-position="left"
	  	  inline
	  	  class="demo-table-expand"
	  	  style="max-height: 55vh;overflow:auto;font-size:0.3rem;text-align:left;"
	  	>
	    <div
		    v-for="(relationItem,relationIndex) in relationsdataSon"
		    :key="relationIndex"
		    class="text item"
		    style="overflow:hidden;border-bottom:1px solid #EBEEF5;font-size:0.28rem;"
		    @click="goxq(relationsdataSon)"
		  >
		    <div>层级：{{relationItem.level}}</div>
		    <div>联系人：{{relationItem.contact_person}}</div>
		    <div>职务：{{relationItem.position}}</div>
		    <div>对接人：{{relationItem.correlation_person}}</div>
		    <div style="width: 100%;">地点：{{relationItem.addr}}</div>
		  </div>
		</el-form>
	    <div v-if="relationsdataSon && relationsdataSon.length" style="line-height:0.8rem;background:#21aefb;border-radius: 4px; margin:0 auto;text-align: center;">
	      <router-link
	        :to="{path:'/kehuedit',query:{id:relationsdataSon[0].supplier_id,type:2}}"
	        style="color:#fff;text-decoration:none;width:100%;display:block;"
	      >编 辑</router-link>
	    </div>
	  </div>
</template>

<script>
export default {
    props: ["relationsdataSon"],
    data() {
        return {
        box: ""
        };
    },
    mounted() {
    	
    },
    methods: {
    	initData() {
    		this.relationsdataSon.forEach((val,key)=>{
    			for(var val1 in val){
    				if(!val[val1]) val[val1]="—"; 
    				
    			}
    		})
    	},
	   	goxq(a) {
	      this.$router.push({
	        path: "/kehuedit",
	        query: { id: a[0].supplier_id, type: 1 }
	      });
	    },
    },
    watch:{
    	"relationsdataSon" (newData,oldData){
    		if(newData!=oldData){
    			this.initData();
    		}
    	}
    }
}
</script>

<style scoped>
.text.item{
	border-bottom: 1px solid #999999;
	font-weight: normal;  background: #ffffff;
}
.item > div {
  width: 50%;
  float: left;
  text-align: left;
  box-sizing: border-box;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.text.item >div:nth-child(1),.text.item >div:nth-child(2){
	background: #f0f9eb;
}
</style>