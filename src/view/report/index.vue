<template>
  <div class="wrapper wrapwhite">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div
      class="content"
      style="font-size:0.3rem;position:relative;"
      ref="content"
      @click="contentreport"
    >
      <div class="menu-head-top50"></div>
      <div class="shaixuan" v-show="isshaixuan">
        <div
          v-for="(item,index) in sxList"
          :key="index"
          style="margin-top:0.2rem;display: inline-block;"
          @click.stop="stopE"
        >
          <!-- <h3 style="margin-bottom:0.3rem;">{{item.title}}</h3> -->
          <el-radio-group v-model="chadata.msginfo">
            <el-radio-button v-for="(e,ind) in item.data" :key="ind" :label="e.name">{{e.name}}</el-radio-button>
          </el-radio-group>
        </div>
        <div style="margin-top:10px;" @click.stop="stopE">
          <el-date-picker
            style="width:40%;"
            v-model="chadata.start_create_time"
            type="date"
            placeholder="选择开始日期"
          ></el-date-picker>
          <el-date-picker
            style="width:40%;"
            v-model="chadata.end_create_time"
            type="date"
            placeholder="选择结束日期"
          ></el-date-picker>
          <el-input
            style="margin-top:10px;width:81%;"
            v-model="chadata.mainjson"
            placeholder="输入模糊搜索"
          ></el-input>
        </div>
        <el-button style="width:90%;margin:0.5rem auto;" type="primary" @click.stop="search">搜索结果</el-button>
      </div>
     
      <h3 style="position:relative;line-height:0.8rem;">
        <span style="position:absolute;left:0.5rem;" @click="goback">返回</span>我的派单
        <span style="position:absolute;right:0.5rem;" @click="showshaixuan">
          <span style="float:left;">筛选</span>
          <img
            v-show="!isshaixuan"
            style="width:0.4rem;float:left;margin-top:0.2rem;"
            :src="down"
            alt
          />
          <img v-show="isshaixuan" style="width:0.4rem;float:left;margin-top:0.2rem;" :src="up" alt />
        </span>
      </h3>
      <div class="menubox" style="overflow:hidden;font-size:0.3rem;">
        <div
          class="left"
          @click="zhongjiedata({index:1})"
          :class="soit===1?'act':''"
          style="position:relative;"
        >
          全部
          <span
            v-show="isread"
            style="width:8px;height:8px;position:absolute;top:20%;right:20%;background:red;border-radius:50%;"
          ></span>
        </div>
        <div
          class="left"
          @click="zhongjiedata({index:2})"
          :class="soit===2?'act':''"
          style="position:relative;"
        >我发出的</div>
        <div
          class="left"
          @click="zhongjiedata({index:3})"
          :class="soit===3?'act':''"
          style="position:relative;"
        >
          我的团队
          <span
            v-show="isread"
            style="width:8px;height:8px;position:absolute;top:20%;right:20%;background:red;border-radius:50%;"
          ></span>
        </div>
      </div>

      <div>
        <div
          v-for="(item,index) in datalist"
          :key="index"
          style="border-bottom:1px solid #ccc;padding:0.2rem;position:relative;"
        >
          <div
            v-show="soit!=2&&((new Date(item.create_time)-new Date(isread)>0)&&isreadStatus)"
            style="position:absolute;top:0;right:0;font-size:1rem;color:red;height:0.6rem;width:0.6rem;"
          >
            <img style="width:100%;display:block;" :src="weidu" alt />
          </div>
          <div class="over">
            <img
              class="left"
              style="height:0.6rem;width:0.6rem;border-radius:50%;float:left;margin-top:0.05rem;margin-right:0.1rem;"
              :src="item.create_id_pic"
              alt
            />
            <div class="left" style="text-align:left;">
              <p style="font-weight:900;">{{item.create_name}}的{{item.msginfo}}</p>
              <p class="hui" style="font-size:0.2rem;">{{item.create_time}}</p>
            </div>
            <div
              @click="sczg(item.id,item)"
              class="right"
              v-show="item.create_id==chadata.userid"
            >删除</div>
          </div>
          <div>
            <div v-for="(i,o) in item.mainjson.fileds" :key="o">
              <p style="text-align:left;">
                <span style="color:black;font-weight:900;">{{i.remark}}:</span>
                {{i.value}}
              </p>
            </div>
          </div>
          <div v-show="item.mainjson.sclist.length>0" style="margin:10px 0;">
            <!-- 共有{{item.mainjson.sclist.length}}个附件 -->
            <!-- <el-button type="text">点击下载附件</el-button> -->
            <p style="text-align:left;">附件列表（点击下载）</p>
            <div v-for="(li,index) in item.mainjson.sclist" :key="index" style="text-align:left;">
              <a :href="li.response.msg">{{li.name}}</a>
            </div>
          </div>
          <div style="background:#f2f2f2; text-align:left;padding:3px;margin-top:0.3rem;">
            <div v-for="(v,b) in item.replys" :key="b" style="position:relative;margin-top:5px;">
              <span style="color:;">{{v.name}}</span>
              :{{v.log}}
              <span
                v-show="v.create_by==chadata.userid"
                style="position:absolute;right:20px;"
                @click="plsc(v,item.replys)"
              >删除</span>
            </div>
          </div>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="plnr">
              <template slot="append">
                <span @click="pinglun(item.id,item.replys)">评论</span>
              </template>
            </el-input>
          </div>
        </div>
      </div>
    </div>
      <Addcreate></Addcreate>

  </div>
</template>

<script>
import Addcreate from "@/components/addcreate";

import { createRw, getRwList, setxiugai, getisread } from "@/api/configWu";
import {
  templateshow,
  queryByid,
  reply,
  delreply,
  deldaily,
  getisread1
} from "@/api/config";
import Head from "@/view/common/head";
export default {
  components: {
    Head,
    Addcreate

  },
  data() {
    return {
      act: 1,
      act1: this.$route.query.id == 2 ? false : true,
      startTime: "",
      endTime: "",
      mhss: "",
      plnr: "",
      isscroll: false,
      isjia: false,
      userid: "",
      isshaixuan: false,
      sxList: [
        {
          title: "分类",
          choose: "全部",
          data: [{ name: "全部" }]
        }
      ],
      isread: "",
      isreadStatus: "",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      soit: 1,
      yuqi: require("../../assets/img/normal/yuqi.png"),
      weidao: require("../../assets/img/normal/weiyuqi.png"),
      fs: require("../../assets/img/normal/fs.png"),
      add: require("../../assets/img/normal/add.png"),
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
      chadata: {
        type: 0,
        userid: localStorage.getItem("userid"),
        sort: 1,
        page: 1,
        msginfo: "全部",
        mainjson: "",
        pageSize: 10,
        start_create_time: "",
        end_create_time: ""
      },
      datalist: []
    };
  },
  mounted() {
    this.getdata();
    this.gethong();
    this.getact();
    document.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    contentreport() {
      this.isshaixuan = false;
      event.stopImmediatePropagation();
      event.stopPropagation();
    },
    stopE() {},
    showshaixuan() {
      this.isshaixuan = !this.isshaixuan;
      event.stopPropagation();
    },
    getact() {
      var lodata =
        this.$route.query.id == 1
          ? JSON.parse(sessionStorage.getItem("leaderMenus"))
          : JSON.parse(sessionStorage.getItem("userMenus"));
      //   (lodata)

      lodata.forEach((e, index) => {
        console.log(e.path);
        if (e.path == "/rbznzx?id=1" || e.path == "/rbznzx?id=2") {
          this.act = index + 1;
        }
      });
      //   alert(this.act)
    },
    sczg(a, b) {
      deldaily({ id: a }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("删除成功");
          b.forEach((e, index) => {
            if (a.id == e.id) {
              b.splice(index, 1);
            }
          });
        }
      });
    },
    plsc(a, b) {
      delreply({ id: a.id }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("删除成功");
          b.forEach((e, index) => {
            if (a.id == e.id) {
              b.splice(index, 1);
            }
          });
        }
      });
    },
    pinglun(a, b) {
      console.log(a);
      if (this.plnr != "") {
        reply({
          dataid: a,
          log: this.plnr,
          create_by: this.chadata.userid
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            b.push({
              id: res.data,
              name: localStorage.getItem("userName"),
              log: this.plnr,
              create_by: this.chadata.userid
            });
          } else {
            this.$message.error(res.msg);
          }
        });
      } else {
        this.$message.error("评论内容不能为空");
      }
    },
    search() {
      //   console.log(this.sxList);
      this.getdata(this.sxList);
    },
    gethong() {
      templateshow().then(res => {
        console.log(res);
        res.data.forEach(e => {
          this.sxList[0].data.push({ name: e.name });
        });
      });
      getisread1({ userid: localStorage.getItem("userid") }).then(res => {
        // console.log()
        this.isread = res.data.create_time;
        this.isreadStatus = res.data.isread;
        console.log(new Date(this.isread) - new Date());
      });
    },
    goback() {
      this.$router.go(-1);
    },
    jzmp(a) {
      //   console.log(a);
      var e = a || window.even;
      e.stopPropagation();
    },
    jrxq(a) {
      console.log(a);
      // console.log(111)
      this.$router.push({ path: "/xq", query: { id: a.line_code } });
    },
    guanbi(a) {
      setxiugai({ id: a.id, status: 9 }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("关闭成功");
          this.isjia = false;
          this.getdata();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    dafen(a, b, c) {
      console.log(a);
      setxiugai({ id: a.id, dzan: a.dzan }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("评分成功");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    getdata(a) {
      this.userid = localStorage.getItem("userid");
      if (a) {
        this.chadata.page = 1;
        this.datalist = [];
      }
      queryByid(this.chadata).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.isshaixuan = false;
          //    = res.data;
          if (this.isjia == false) {
            this.datalist = [];
            this.isjia = true;
          }
          res.data.forEach(e => {
            this.datalist.push(e);
          });
          this.datalist.forEach(e => {
            e.mainjson = JSON.parse(e.mainjson);
          });
          console.log(this.datalist);
          if (res.data.length > 0) {
            this.chadata.page += 1;
            this.isscroll = true;
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    goxinzeng() {
      console.log();
      this.$router.push({ path: "/create" });
    },
    zhongjiedata(a) {
      if (a.index == 1) {
        this.soit = 1;
      } else if (a.index == 2) {
        this.soit = 2;
      } else {
        this.soit = 3;
      }
      this.chadata.page = 1;
      this.datalist = [];
      this.chadata.type = this.soit - 1;
      this.getdata();
    },
    clientConfirm(node) {
      console.log(node);
      this.ruleForm.projectId = node.key;
      this.ruleForm.clientName = node.title + "-" + node.contacts.title;
      this.ruleForm.clientId = node.contacts.key;
      this.pjId = node.key;
    },
    handleScroll() {
      try {
        console.log(this.$refs.content.clientHeight);
        if (this.$refs.content.clientHeight) {
          var boxnum = this.$refs.content.clientHeight;
        }
        if (
          window.outerHeight + window.pageYOffset + 1000 >= boxnum &&
          this.isscroll
        ) {
          // console.log(111);

          this.isscroll = false;
          this.getdata();
        }
      } catch (err) {
        // console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.shaixuan {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  background: #fff;
  border-top: 1px solid #f2f2f2;
  text-align: left;
  padding: 0.3rem;
  border-bottom: 1px solid #f2f2f2;
}
/*.shaixuanbg{
	position: absolute;top: 0px;left: 0px;
	width: 100%;height: 100%;
	background: rgba(0,0,0,0.3);
}*/
.red {
  color: #fc5c5e;
}
.green {
  color: #ccc;
}
.khname {
  text-indent: 0.3rem;
  background: url("../../assets/img/normal/kh.png") no-repeat 0 0.05rem;
  background-size: 0.2rem 0.2rem;
  font-size: 0.2rem;
  color: #ccc;
  font-weight: 100;
}
.hui {
  color: #ccc;
}
.left {
  float: left;
}
.right {
  float: right;
}
.over {
  overflow: hidden;
}
.menubox {
  border-bottom: 1px solid rgb(220, 223, 230);
}
.menubox > div {
  width: 33%;
  line-height: 30px;
  background: #fff;
}
.menubox .act {
  border-bottom: 2px solid #409eff;
  color: #409eff;
}
</style>