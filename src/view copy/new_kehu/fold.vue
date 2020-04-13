<template>
	<div style="position: relative;display: inline-block;width: 0px;height: 20px;float: right;top: 50%;transform: translateY(50%);-webkit-transform: translateY(50%);">
		<div class="foldbox" style="position: absolute;top: 50%;transform: translateY(-50%);-webkit-transform: translateY(-50%);right:10px;">
			<el-button
    		  v-show="parantData[index][changekey]"
    		  style="float: right; padding: 3px 0;padding-left: 20px;"
    		  :style="{color:color}"
    		  type="text"
    		  icon="el-icon-arrow-down"
    		  @click="clishou(false,$event)"
    		></el-button>
        	<el-button
              v-show="!parantData[index][changekey]"
              style="float: right; padding: 3px 0;padding-left: 20px;"
              :style="{color:color}"
              type="text"
              icon="el-icon-arrow-right"
              @click="clishou(true,$event)"
            ></el-button>
		</div>
	</div>
</template>

<script>
export default {
 	name:"fold",
 	props:[
 		"changekey","index","parantData","selfColor"
 	],
 	data() {
 		return {
 			color:this.selfColor?this.selfColor:"#FFFFFF"
 		}
 	},
 	mounted() {
 		
 	},
 	methods:{
 		clishou(val,event) {
 			if(event) event.stopPropagation()
 			this.$set(this.parantData[this.index],this.changekey,val);
 			this.$emit("foldChange",this.parantData)
 		},
 		parentClick() {
 			this.$nextTick(() => {
 				if(this.parantData[this.index][this.changekey]){
 					this.clishou(false)
 				}else{
 					this.clishou(true)
 				}
		  })
 		}
 	}
 }
	
</script>

<style>
</style>