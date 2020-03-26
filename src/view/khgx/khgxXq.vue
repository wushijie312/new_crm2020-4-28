<template>
  <div class="wrapper cccgo" style="font-size:0.3rem;text-align:left;background:#fff;padding:0.3rem;">
      <p style="overflow:hidden;">
          
          <span
            style="float:right;font-size:0.3rem;font-weight:900;line-height:0.6rem;margin-right:0.3rem; text-decoration: underline;color:blue;"
            @click="$router.go(-1)"
          >返回</span>
        </p>
    <div
      v-for="(o,c) in tabdata"
      :key="c"
      class="text item"
      style="overflow:hidden;border-bottom:2px solid #ccc;font-size:0.28rem;"
      
      @click="goxq(a)"
    >
      <div>
        <div>层级：{{o.level}}</div>
        <div>联系人：{{o.contact_person}}</div>
      </div>
      <div>
      <div>职务：{{o.position}}</div>
      <div>电&nbsp;&nbsp;&nbsp;话：{{o.phone}}</div>
      </div>
      <div>
      <div>对接人：{{o.correlation_person}}</div>
      <div style="width:50%;">生&nbsp;&nbsp;&nbsp;日：{{o.birthday}}</div>
      </div>
      <div>
      <div>关系：{{o.relation}}</div>
        <div style="width:50%;">关系程度：{{o.customer_position}}</div>
      </div>
      <div><div style="width:100%;">地&nbsp;&nbsp;&nbsp;点：{{o.addr}}</div></div>
      <div><div style="width:100%;">备&nbsp;&nbsp;&nbsp;注：{{o.remark}}</div></div>
    </div>
  </div>
</template>

<script>
import { gettail1, updata1 } from "@/api/configWu";
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
      gettail1({ supplier_id: this.$route.query.id }).then(res => {
        this.tabdata = res.data;
      });
    },
    xinzeng() {
      let userid = localStorage.getItem("userid");
      console.log(this.options.indexOf(6));
      this.tabdata.push({
        id: "",
        level: this.level != 0 ? this.level : 1,
        contact_person: "",
        phone: "",
        position: "",
        correlation_person: "",
        addr: "",
        userid: userid,
        quanxian: false
      });
    },
    queren() {
      var bos = true;
      var tianxie = true;
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
      updata1(this.tabdata)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("添加成功");
            this.$router.go(-1);
          } else {
            this.$message.error("添加失败");
          }
        })
        .catch(err => {
          this.$message.error("请稍后重试");
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
.item > div:nth-child(2n+1){
    background: #f0f9eb;
}
</style>