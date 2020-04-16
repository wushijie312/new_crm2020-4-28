<template>
  <div class="wrapper wrapwhite">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    
    <div class="content" ref="wrapper">
       <div class="menu-head-top50"></div>
    	<!--日期和返回-->
      <h3 style="text-align:left;line-height:0.8rem;padding:0px 1%; font-size: 0.3rem; color: black;">
        <p style="overflow:hidden;display: flex;display: -webkit-flex;justify-content: space-between;-webkit-justify-content: space-between;">
           <span
              id="sobox"
              style="font-size:1.1em;color:#999;width:45%;font-size:0.4rem;line-height:1rem;"
            >
              <el-date-picker
                ref="timechoose"
                v-model="value1"
                type="date"
                placeholder="选择日期"
                style="border:none;font-size:0.4rem!importment;font-weight:900;"
                :clearable="false"
                :picker-options="pickerOptions0"
               value-format = 'yyyy-MM-dd'
               class="el-icon-arrow-down1"
               :editable = 'false'
              >
                <template></template>
              </el-date-picker>
            </span>
          <span
            style="float:right;font-size:0.3rem;font-weight:900;"
            @click="$router.go(-1)"
          >返回首页</span>
        </p>
       
      </h3>
      <!--搜索条件-->
      <div class="searchBox">
      	<el-select 	v-if="department.options.length"  class="customerForm" v-model="department.checked" placeholder="选择部门" @change="zhongjian">
		      <el-option 
		      	v-for="(departname,departcode) in department.options" 
            :key="departcode"
		      	:label="departname.departmentName" 
		      	:value="departname.departmentId"
		      	></el-option>
		    </el-select>
        <el-input class="customerForm" placeholder="请输入客户名称" v-model="customername">
          <el-button slot="append" icon="el-icon-search" @click="zhongjian"></el-button>
        </el-input>
      </div>
      <!--客户分类-->
      <div class="customerType">
		    <span v-for="(citem,ckey) in customerType.options" :key="ckey">
		    	<el-button type="text" :class="{'choosed':customerType.checked==citem.source}" @click="getcustomerType(citem.source)">{{citem.result}}</el-button>
		    	<el-divider direction="vertical"></el-divider>
		    </span>
		  </div>
		  <!--客户-->
   		<div style="padding: 0px 1%;">
      	<el-card class="box-card" v-for="(item,key) in tabdata2" :key="key">
				  <div class="dataitem">
				    <h1 @click="foldFromParent('item'+key)">{{item.company_name}}<Fold :ref="'item'+key" changekey="itemhide" :index="key" :parantData="tabdata2" selfColor="#409EFF"></Fold></h1>
				    <p @click="foldFromParent('item'+key)" class="c_s_info" style="margin-bottom: 4px;">
				    	<span v-show="item.flowInFlag!='true'">{{item.dept_name}}-{{item.leader_name}} <span>销售：{{item.seller}}</span></span>
				    	<span v-show="item.flowInFlag=='true'">
								<el-button slot="reference" type="text" @click="flowin(item,$event)" style="textDecoration: underline;font-size: 0.3rem;padding: 0px;" size="mini">转入客户</el-button>
				    	</span>
				    </p>
				    <!--调查问卷-->
			     	<div  
					  	style="background:#fafafa;box-sizing:border-box;margin-bottom: 6px; font-size: 0.3rem;text-align: left;font-weight: 900;"
					  	v-show="item.itemhide">
				      <div  @click="wjdcHandel(item)" style="line-height:0.8rem;background:#21aefb;margin:0 auto;color: #FFFFFF;border-radius: 4px;text-align: center;"><span style="position:relative;">调查问卷<img :src="newPic" style="position:absolute;top: 4px;right: -46px;width: 24px;" class="wjdc_kehu_icon"/></span></div>
				  	</div>
            <!--销售数据-->
			     	<div  
					  	style="background:#fafafa;box-sizing:border-box;margin-bottom: 6px; font-size: 0.3rem;text-align: left;font-weight: 900;"
					  	v-show="item.itemhide">
				      <div  @click="foldFromParent('itemsaleInfos'+key)" style="line-height:0.8rem;background:#21aefb;margin:0 auto;color: #FFFFFF;border-radius: 4px;text-align: center;">销售数据
				      <Fold :ref="'itemsaleInfos'+key" changekey="saleInfoshide" :index="key" :parantData="tabdata2" @foldChange = "reciveChange"></Fold></div>
						  <Kehu v-show="item.saleInfoshide" :dataSon.sync="item.saleInfos"></Kehu>
				  	</div>
				  	<!--拜访-->
					  <div  
							style="background:#fafafa;box-sizing:border-box;margin-bottom: 6px; font-size: 0.3rem;text-align: left;font-weight: 900;"
							v-show="item.itemhide">
					  	<div @click="foldFromParent('itemvisits'+key)"  style="line-height:0.8rem;background:#21aefb;margin:0 auto;color: #FFFFFF;border-radius: 4px;text-align: center;">最新拜访进展
					  	<Fold :ref="'itemvisits'+key" changekey="visitshide" :index="key" :parantData="tabdata2" @foldChange = "reciveChange"></Fold></div>
					  	<Visit v-show="item.visitshide" :supplierId="item.supplier_id" :companyName="item.company_name" :visitsdataSon.sync="item.visits"></Visit>
			      </div>
			      <!--派单-->
			      <div  
					  	style="background:#fafafa;box-sizing:border-box;margin-bottom: 6px; font-size: 0.3rem;text-align: left;font-weight: 900;"
					  	v-show="item.itemhide">
					  	<div  @click="foldFromParent('itemtasks'+key)" style="line-height:0.8rem;background:#21aefb;margin:0 auto;color: #FFFFFF;border-radius: 4px;text-align: center;">最新派单情况
					  		<Fold :ref="'itemtasks'+key" changekey="taskshide" :index="key" :parantData="tabdata2" @foldChange = "reciveChange"></Fold>
					  	</div>
					  	<Order v-show="item.taskshide" :supplierId="item.supplier_id" :companyName="item.company_name" :orderdataSon.sync="item.tasks"></Order>
			      </div>
			      <!--客户关系-->
			      <div  
					  	style="background:#fafafa;box-sizing:border-box;margin-bottom: 6px; font-size: 0.3rem;text-align: left;font-weight: 900;"
					  	v-show="item.itemhide">
		        	<div @click="foldFromParent('itemrelations'+key)" style="line-height:0.8rem;background:#21aefb;margin:0 auto;color: #FFFFFF;border-radius: 4px;text-align: center;">关系图谱
		        		<Fold :ref="'itemrelations'+key" changekey="relationshide" :index="key" :parantData="tabdata2" @foldChange = "reciveChange"></Fold></div>
		        		<RelationTable v-show="item.relationshide" :relationsdataSon.sync="item.relations"></RelationTable>
		          
			      </div>  
				  </div>
				</el-card>
			
     	</div>
      
      
    </div>
	    <el-dialog
			  title=""
			  :visible.sync="dialogCon.dialogVisible"
			  width="80%"
			  center>
			  <span>确定转入客户<span style="color:#409EFF ;">{{dialogCon.val.company_name}}</span>？</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogCon.dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="flowinConfirm(dialogCon.val)">确 定</el-button>
			  </span>
			</el-dialog>
      <Addcreate v-if="!act1"></Addcreate>
    </div>
      
    
  </div>
</template>
<script>
import { departData ,customerpoolData,customerTag,flowinC} from "@/api/configWu";
import BScroll from "better-scroll";
import {getNowDate} from "@/untils/common";
const Head = () => import('@/view/common/head')
const Kehu = () => import('@/view/new_kehu/kehu')
const Order = () => import('@/view/new_kehu/order')
const Visit = () => import('@/view/new_kehu/visit')
const Relation = () => import('@/view/new_kehu/relation')
const RelationTable = () => import('@/view/new_kehu/relationTable')
const Fold = () => import('@/view/new_kehu/fold')
const Addcreate = () => import('@/components/addcreate')
// import ShowbackTop from "@/components/showbackTop";
export default {
  name: "index",
  components: {
    Head,
    Kehu,
    Order,
    Fold,
    Visit,
    RelationTable,
    Addcreate,
    // ShowbackTop
  },
  data() {
    return {
      loading:true,
      pageSize:20,
      act:1,
      act1:this.$route.query.id == 2 ? false : true,
      isread: false,
      dialogCon:{
      	center:true,
      	dialogVisible:false,
      	val:{}
      },
      
      pagenum: 1,
      customername: "",
      ty: true,
      urlA: "",
      options: [],
//    routerData:{
//    	date:new Date()
//    },
      value1: getNowDate(),//日期
   		pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      department:{//部门
      	checked:"",
      	options:[],
      },
      tabdata2: [],//table组件数据
      customerType:{
      	checked:"",
      	options:[]//{result:"全部",source:"0"}
      },
      empty:require("../../assets/img/normal/empty.png"),
      newPic: require("../../assets/img/normal/new.png"),
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollBottom, true);
    this.getdepartment();//部门
    this.getCustomerTag(this.getallData);
    this.getact()
  },
   destroyed() {
    window.removeEventListener("scroll", this.scrollBottom, true);
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    value1() {
      this.pagenum = 1;
      this.getallData();
    },
    topScroll(){
    	
    }
  },
  methods: {
    scrollBottom() {
      // 滚动到页面底部时
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight;
        const toBottom = scrollHeight - scrollTop - clientHeight;
        if (toBottom < 30 &&this.loading &&this.tabdata2.length == this.pagenum * this.pageSize) {
          this.loading = false;
          customerpoolData({
        	submitTime: this.value1,//提交时间
          search: this.customername,//客户搜索
          dept_id:this.department.checked,//部门搜索
          tagSource:this.customerType.checked,//客户类型
          page: ++this.pagenum,//页码
          pageSize:this.pageSize,
          userId:localStorage.getItem("userid"),
          level:localStorage.getItem("level"),
          role: localStorage.getItem("role"),
          visitSize:10
        })
          .then(res => {
          	if(res && res.code==200){
              this.loading = true;
	            this.alldata = res;
              this.tabdata2 = this.tabdata2.concat(res.dataList);
          	}else{
              this.$message.error({ message: `${res.message}` });
          	}
          });
        }
    },
     getact() {
      var lodata = this.$route.query.id == 1 ?JSON.parse(sessionStorage.getItem('leaderMenus')):JSON.parse(sessionStorage.getItem('userMenus'))
      lodata.forEach((e, index) => {
        if (e.path == "/newkehu?id=1"||e.path == "/newkehu?id=2") {
          this.act = index + 1;
        }
      });
    },
    wjdcHandel(item){
      this.$router.push({
        path: '/wjdc',
        query: { company_id:item.supplier_id}
      });
    },
  	foldFromParent(a){
  		this.$refs[a][0].parentClick();
  	},
    reciveChange(val){
    	console.log(val)
    },
    flowin(item){
    	this.dialogCon.dialogVisible = true;
    	this.dialogCon.val = item;
    	if(event) event.stopPropagation()
    },
    flowinConfirm(item){
    	flowinC({
    		userId:localStorage.getItem("userid"),
    		userName:localStorage.getItem("userName"),
    		customerId:item.supplier_id,
    	}).then((res)=>{
    		if(res.code==200){
    			this.$message.success("转入成功");
    			item.flowInFlag = false;
    			this.dialogCon.dialogVisible = false;
    		}else{
    			this.$message.error("转入失败");
    		}
    	}).catch(error=>{
    		
    	})
    	
    },
    getdepartment() {//获取部门
      departData({ userid: localStorage.getItem("userid") }).then(res => {
        if(res.code==200 && res.dataList){
        	this.department.options = res.dataList;
        }
      });
    },
    getCustomerTag(callback) {//获取客户类型
      customerTag({ userid: localStorage.getItem("userid") }).then(res => {
        if(res.code==200 && res.dataList){
        	this.customerType.options = this.customerType.options.concat(res.dataList) ;
        	if(this.customerType.options.length) this.customerType.checked = this.customerType.options[0].source;
        	if(callback) callback();
        }
      });
    },
    zhongjian() {
      this.pagenum = 1;
	 	
      this.$nextTick(() => {
		    this.getallData();
		  })
    },
    getcustomerType(val){
    	this.customerType.checked = val;
    	this.zhongjian();
    },
  
		getallData() {
        customerpoolData({
        	submitTime: this.value1,//提交时间
          search: this.customername,//客户搜索
          dept_id:this.department.checked,//部门搜索
          tagSource:this.customerType.checked,//客户类型
          page: this.pagenum,//页码
           pageSize:this.pageSize,
          userId:localStorage.getItem("userid"),
          level:localStorage.getItem("level"),
          role: localStorage.getItem("role"),
          visitSize:10
        })
          .then(res => {
          	if(res && res.code==200){
	            this.alldata = res;
	              this.tabdata2 = res.dataList;
          	}
          });
    }
  }
};
</script>

<style type="text/css" scoped>
.wjdc_kehu_icon{
  padding-right:20px;
}
.content {
  /*background: #f2f2f5;*/
}
.el-card__header {
  background: #21aefb;
}
#sobox .el-date-editor.el-input{
	background: #FFFFFF;
}
.searchBox{
	margin: 0px 1%;text-align: left;
	display: flex;display: -webkit-flex;
	justify-content: space-between;-webkit-justify-content: space-between;
}
.customerForm.el-select{
	width: 40%;
}
.customerForm.el-input-group{
	width: 57%;
}
.customerType{
	margin: 12px 1%;text-align: left;padding: 0px 2px;
	font-size: 0.3rem;color: #21aefb;white-space: nowrap;overflow: auto;
}
.customerType .choosed{
	color: red;
}
.customerType span{
	cursor: pointer;
}
.customerType span .el-button{
	padding: 4px 0px;
}
.customerType .el-divider--vertical{
	height: 1.4em;background: #21aefb;
}
.customerType span:last-child .el-divider--vertical{
	display: none;
}
.box-card{
	padding: 0px 6px;
}
.dataitem{
	text-align: left;margin-top: 12px;
}
.dataitem h1{
	font-weight: 900;font-size: 0.4rem;
}
.dataitem p.c_s_info{
	font-size: 0.3rem;color: #21aefb;
}
.dataitem p.c_s_info span{
	color: #303133;
}
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
.text.item >div:nth-child(4n+3),.text.item >div:nth-child(4n+4){
	background: #f0f9eb;
}

.head {
  height: 1rem;
  font-size: 0.3rem;
  line-height: 1rem;
  background: #21aefb;
  color: #fff;
}
.tap {
  font-size: 0.3rem;
  background: #21aefb;
  height: 0.7rem;
  line-height: 0.7rem;
}
.tap .act {
  background: #fff;
  color: #333;
}
.tap .act a {
  color: #333;
}
.tap a {
  color: #fff;
  text-decoration: none;
}
.maincontent {
  font-size: 0.3rem;
  height: 2.5rem;
  background: #fff;
  padding: 0.2rem;
  box-sizing: border-box;
}
.nianBt {
  height: 1.3rem;
  width: 20%;
  background: red;
  padding-top: 0.6rem;
  color: #fff;
}
table,
tbody,
thead {
  width: 100% !important;
}

.el-table .cell,
.el-table th div,
.el-table--border td:first-child .cell,
.el-table--border th:first-child .cell {
  padding: 0;
  text-align: center;
}

/* 刷新 */

.newxin {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  background: none;
  color: #ccc;
  font-size: 0.24rem;
}
.empty{
	line-height:50vh;height: 50vh;
	font-size: 0.3rem;text-align: center;color: #999999;background: url(../../assets/img/normal/empty.png) no-repeat center;background-size: 40vw;
}
</style>