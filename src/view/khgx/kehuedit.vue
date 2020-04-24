<template>
  <div class="wrapper cccgo" style="font-size:0.3rem;text-align:left;background:#f5f5f7;">
    <el-form
      ref="ruleForm"
      
      label-width="20%"
      class="demo-ruleForm"
      style="padding-bottom:100px;background:#fff;"
    >
      <div
        v-for="item in tabdata"
        :key="item.id"
        class="text item"
        style="overflow:hidden;border-bottom:1px solid #EBEEF5;background:#fff;"
      >
        <el-row style="background:#f5f5f7;line-height:0.6rem;padding-left:0.2rem;">联系人信息</el-row>
        <el-row style="width:98%;">
          <el-col :span="24" >
            <el-form-item label="层级:">
              <span v-show="$route.query.type==1">{{item.level}}</span>
              <!-- <el-input v-model="ruleForm.title"  /> -->
              <el-select  v-show="$route.query.type==2" v-model="item.level" style="width:100%;" :disabled="options.indexOf(Number(item.level))==-1">
                <!-- <el-option value='' label="请选择" /> -->
                <el-option value=1 label="1" :disabled="options.indexOf(1)==-1"/>
                <el-option value=2 label="2" :disabled="options.indexOf(2)==-1"/>
                <el-option value=3 label="3" :disabled="options.indexOf(3)==-1"/>
                <el-option value=4 label="4" :disabled="options.indexOf(4)==-1"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width:98%;">
          <el-col :span="24" >
            <el-form-item label="联系人:">
              <span v-show="$route.query.type==1">{{item.contact_person}}</span>
              <el-input  v-show="$route.query.type==2" style="width:100%;" v-model="item.contact_person"  placeholder="若有多个人，以逗号隔开" :disabled="options.indexOf(Number(item.level))==-1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width:98%;">
          <el-col :span="24" >
            <el-form-item label="电话:">
              <span v-show="$route.query.type==1">{{item.phone}}</span>
              <el-input  v-show="$route.query.type==2" v-model="item.phone" type="" :disabled="options.indexOf(Number(item.level))==-1" />
              
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width:98%;">
          <el-col :span="24" >
            <el-form-item label="职务:">
              <span v-show="$route.query.type==1">{{item.position}}</span>
              <el-input   v-show="$route.query.type==2" v-model="item.position" :disabled="options.indexOf(Number(item.level))==-1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width:98%;">
          <el-col :span="24" >
            <el-form-item label="对接人:">
              <span v-show="$route.query.type==1">{{item.correlation_person}}</span>
              <el-input v-show="$route.query.type==2" v-model="item.correlation_person" placeholder="若有多个人，以逗号隔开" :disabled="options.indexOf(Number(item.level))==-1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width:98%;">
          <el-col :span="24" >
            <el-form-item label="关系程度:">
              <span v-show="$route.query.type==1">{{item.relation}}</span>
              <el-input v-show="$route.query.type==2" v-model="item.relation" placeholder="" :disabled="options.indexOf(Number(item.level))==-1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width:98%;">
          <el-col :span="24" >
            <el-form-item label="生日:">
              <span v-show="$route.query.type==1">{{item.birthday}}</span>
              <!-- <el-input v-model="item.birthday" placeholder="若有多个人，以逗号隔开" :disabled="options.indexOf(Number(item.level))==-1"/> -->
              <el-date-picker
              v-show="$route.query.type==2"
                v-model="item.birthday"
                type="date"
                placeholder="选择日期"
                value-format='yyyy-MM-dd'
                :disabled="options.indexOf(Number(item.level))==-1"
                style="width:100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row style="width:98%;">
          <el-col :span="24" >
            <el-form-item label="客户职务:">
              <el-input v-model="item.customer_position" placeholder="" :disabled="options.indexOf(Number(item.level))==-1"/>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row style="width:98%;">
          <el-col :span="24" >
            <el-form-item label="地址:">
              <span v-show="$route.query.type==1">{{item.addr}}</span>
              <el-input v-show="$route.query.type==2" v-model="item.addr" :disabled="options.indexOf(Number(item.level))==-1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="width:98%;">
          <el-col :span="24" >
            <el-form-item label="备注:">
              <span v-show="$route.query.type==1">{{item.remark}}</span>
              <el-input v-show="$route.query.type==2" v-model="item.remark" placeholder="若有多个人，以逗号隔开" :disabled="options.indexOf(Number(item.level))==-1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row style="width:98%;">
          <el-col :span="24" >
            <el-form-item label="对接人:">
              <el-input v-model="item.correlation_person" placeholder="若有多个人，以逗号隔开" :disabled="options.indexOf(Number(item.level))==-1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-input
          placeholder="关系程度"
          v-model="gxcd"
          clearable
          style="width:98%;margin:10px auto;"
        ></el-input>
        <el-input
          placeholder="客户职务"
          v-model="khzw"
          clearable
          style="width:98%;margin:10px auto;"
        ></el-input>
        <el-date-picker
          v-model="shengri"
          type="date"
          placeholder="选择日期"
          style="width:98%;margin-bottom:10px;"
        ></el-date-picker>
        <el-input placeholder="备注" v-model="beizhu" clearable style="width:98%;margin:10px auto;"></el-input> -->

        
        
      </div>
      <el-row style="width:98%;margin:0 auto;">
      <el-button v-show="$route.query.type==2" type="primary" style="width:100%;margin-top:0.2rem;" @click="xinzeng">新增联系人</el-button>
      
      <el-button v-show="$route.query.type==2" type="primary" style="width:100%;margin-left:0;margin-top:0.2rem;" @click="queren">保存</el-button>
      <el-button style="width:100%;margin-left:0;margin-top:0.2rem;" @click="fanhui" >返回</el-button>
      </el-row>
      <el-row style="position:fixed;bottom:0;width:100%;background:#fff;">
          <!-- <el-col :span="11"  style="float:left;">
            <el-button style="width:100%;" @click="fanhui" >返回</el-button>
          </el-col>
          <el-col :span="11"  style="float:right;">
            <el-button type="primary" style="width:100%;" @click="queren">保存</el-button>
          </el-col> -->
    </el-row>
    </el-form>
  </div>
</template>

<script>
import { gettail1,updata1 } from "@/api/configWu";
export default {
  name: "kehuedit",
  data() {
    return {
      tabdata: {},
      ruleForm: [],
      rules: [],
      quxian:true,
      level:0,
      options:[],
      alllevel:4
    };
  },
  mounted() {
    this.gettail();
  },
  methods: {
    
    gettail() {
      
      if(localStorage.getItem('departmentId') == 0 ||localStorage.getItem('departmentId') == '' ){
        this.quxian = false

      }   
      this.level = localStorage.getItem('level');
      
      for(var i=this.level!=0?this.level:1;i<=this.alllevel;i++){
        this.options.push(Number(i))
      }
      console.log(this.options);
      gettail1({ supplier_id: this.$route.query.id }).then(res => {
        console.log(res);
        this.tabdata = res.data;
        
      });
    },
    xinzeng(){
        let userid = localStorage.getItem('userid')
        console.log(this.options.indexOf(6))
        this.tabdata.push({id:'',level:this.level!=0?this.level:1,contact_person:'',phone:'',position:'',correlation_person:'',addr:'','userid': userid,quanxian:false})
    },
    queren(){
      var bos = true
      var tianxie = true
      // var re = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
      // this.tabdata.forEach(e => {
      //   console.log(e.phone)
      //   if(e.phone!=''){
      //     if(re.test(e.phone)!=true){
      //       bos = false
      //     }
      //   }
      //   if(e.contact_person==''||e.correlation_person==''){
      //     tianxie = false
      //   }
        
      // });
      // if(bos == false){
      //   this.$message.error('请填写正确联系方式')
      //   return
      // }
      // if(tianxie == false){
      //   this.$message.error('对接人，联系人为必填')
      //   return
      // }
        updata1(this.tabdata).then(res=>{
            console.log(res)
            if(res.code == 200){
                this.$message.success('添加成功')
                this.$router.go(-1)
            }else{
              this.$message.error('添加失败')
            }
        }).catch(err=>{
          this.$message.error('请稍后重试')
        })
      
    },
    fanhui(){
        this.$router.go(-1)
    }

  }
};
</script>

<style>
</style>