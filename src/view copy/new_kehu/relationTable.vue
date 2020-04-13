<template>
	<div >
		<el-table
			class="resetTable"
	        :data="relationsdataSon"
	        :row-class-name="tableRowClassName"
	        border
	        style="width: 100%;font-weight: normal;"
	        @row-click="goxq(relationsdataSon)"
	          >
	        <el-table-column width="30" prop="level" label="级">
	          <template v-slot="scope">
	            {{scope.row.level}}
	          </template>
	        </el-table-column>
	        <el-table-column prop="contact_person" label="联系人">
	          <template v-slot="scope">
	            {{scope.row.contact_person?scope.row.contact_person:'/'}}
	          </template>
	        </el-table-column>
	        <el-table-column prop="position" label="职务">
	          <template v-slot="scope">
	            {{scope.row.position?scope.row.position:'/'}}
	          </template>
	        </el-table-column>
	        <el-table-column prop="correlation_person" label="对接人">
	          <template v-slot="scope">
	            {{scope.row.correlation_person?scope.row.correlation_person:'/'}}
	          </template>
	        </el-table-column>
	        <el-table-column prop="relation" label="关系">
	          <template v-slot="scope">
	            {{scope.row.relation?scope.row.relation:'/'}}
	          </template>
	        </el-table-column>
	  	</el-table>
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
    				if(!val[val1]) val[val1]="/"; 
    				
    			}
    		})
    	},
	   	goxq(a) {
	      this.$router.push({
	        path: "/kehuedit",
	        query: { id: a[0].supplier_id, type: 1 }
	      });
	    },
	    tableRowClassName({ row, rowIndex }) {
	      if (rowIndex%2==0) {
	        return "success-row";
	      } 
	      return "";
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
table,
tbody,
thead {
  width: 100% !important;
}

.resetTable.el-table .cell,
.resetTable.el-table th div,
.resetTable.el-table--border td:first-child .cell,
.resetTable.el-table--border th:first-child .cell {
  padding-left: 0px !important;
  text-align: center;
}
</style>