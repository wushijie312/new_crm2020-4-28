<template>
  <div>
    <div style="width:100%;overflow-x:auto;">
    <el-radio-group v-model="activeName" style="height:80px;overflow:auto;white-space:wrap;text-align:left;" @change="handleClick">
      <el-radio-button style="width:33%;float:left;" label="1">部门经营情况</el-radio-button>
      <el-radio-button style="width:33%;float:left;" label="2">部门成员业绩</el-radio-button>
      <el-radio-button style="width:33%;float:left;" label="3">客户情况</el-radio-button>
      <el-radio-button style="width:33%;float:left;border-left:1px solid #DCDFE6;border-top:bobe;box-sizing:border-box;" label="4">拜访量</el-radio-button>
      <el-radio-button style="width:33%;float:left;border-top:bobe;" label="5">系统运营情况</el-radio-button>
    </el-radio-group>
</div>
  </div>
</template>

<script>
export default {
  name: "menu1",
  props:['indexnum','routerData'],
  
  data() {
    return {
      activeName: '',
      tzList:['','/leadbmjy','/cyyj','/khqk','/bfl','/yyqk']
    };
  },
  watch:{
      indexnum(a,b){
          console.log(a)
          this.activeName = this.indexnum
      },
      routerData(){
        console.log(this.routerData)
      }
  },
  mounted() {
    this.getindexnum()
  },
  methods: {
    getindexnum(){
      this.activeName = this.indexnum
    },
    handleClick(tab, event) {
        console.log(tab);
        // console.log(this.routerData)
        this.$router.push({path:this.tzList[tab],query:this.routerData})
    }
  }
};
</script>

<style>
</style>