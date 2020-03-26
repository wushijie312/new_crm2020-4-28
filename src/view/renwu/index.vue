<template>
  <div class="wrapper wrapwhite">
      <Head :act.sync="act" :ty.sync="act1"></Head>

    <div class="content" style="font-size:0.3rem;position:relative;" ref="content">
      <div class="menu-head-top50"></div>


      <div class="shaixuan" v-show="isshaixuan">
        <div v-for="(item,index) in sxList" :key="index" style="margin-top:0.2rem;">
          <h3 style="margin-bottom:0.3rem;">{{item.title}}</h3>
          <el-radio-group v-model="item.choose">
            <el-radio-button v-for="(e,ind) in item.data" :key="ind" :label="e.id">{{e.name}}</el-radio-button>
          </el-radio-group>
        </div>
        <el-button style="width:90%;margin:0.5rem auto;" type="primary" @click="search">搜索结果</el-button>
      </div>
     
      <h3 style="position:relative;line-height:0.8rem;">
        我的派单
        <span style="position:absolute;right:0.5rem;" @click="isshaixuan=!isshaixuan">
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
        <div class="left" @click="zhongjiedata({index:1})" :class="soit===1?'act':''">我的派单</div>
        <div
          class="left"
          @click="zhongjiedata({index:2})"
          :class="soit===2?'act':''"
          style="position:relative;"
        >
          派给我的单
          <span
            v-show="isread"
            style="width:8px;height:8px;position:absolute;top:20%;right:20%;background:red;border-radius:50%;"
          ></span>
        </div>
        <div class="left" @click="zhongjiedata({index:3})" :class="soit===3?'act':''">我的可看</div>
      </div>

      <div>
        <div
          v-for="(item,index) in datalist"
          :key="index"
          style="border:1px solid #ccc;padding:0.2rem;position:relative;"
          @click="jrxq(item)"
        >
          <div
            v-show="soit==2&&((new Date(item.create_time)-new Date(isread)>0)&&isreadStatus)"
            style="position:absolute;top:0;right:0;font-size:1rem;color:red;height:0.6rem;width:0.6rem;"
          >
            <img style="width:100%;display:block;" :src="weidu" alt />
          </div>
          <div style="overflow:hidden;width:80%;margin:0 auto;">
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
            <img
              v-show="item.tagcode==1"
              :src="bz"
              style="height:0.4rem;float:right;margin-right:0.4rem;"
              alt
            />
            <img
              v-show="item.tagcode==2"
              :src="jy"
              style="height:0.4rem;float:right;margin-right:0.4rem;"
              alt
            />
            <img
              v-show="item.tagcode==3"
              :src="rw"
              style="height:0.4rem;float:right;margin-right:0.4rem;"
              alt
            />
          </div>
          <p
            style="padding:0.1rem;box-sizing:border-box;text-align:left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
          >{{item.msginfo}}</p>
          <p style="text-align:left;overflow:hidden;font-size:0.28rem;">
            <span style="float:left;" :class="item.timeout==1?'red':'green'">
              <img v-show="item.timeout==1" :src="yuqi" alt style="width:0.24rem;" />
              <img v-show="item.timeout==0" :src="weidao" alt style="width:0.24rem;" />
              {{item.create_time.slice(0,10)}}&nbsp;-&nbsp;{{item.end_time.slice(0,10)}}
            </span>
          </p>
          <div style="line-height:0.6rem;height:0.6rem;">
            <span style="float:left;margin-top:0.1rem;" @click.stop="jzmp">
              <el-rate
                v-if="item.create_id !=userid"
                v-model="item.dzan"
                :colors="colors"
                disabled
                @change="dafen(item)"
              ></el-rate>
              <el-rate
                v-if="item.create_id ==userid"
                v-model="item.dzan"
                :colors="colors"
                @change="dafen(item)"
              ></el-rate>
            </span>
            <div v-show="soit!=3" class="right" style="height:100%;" @click.stop="jzmp">
              <img
                style="width:0.5rem;display:block;"
                v-show="item.status!=9&&item.create_id ==userid"
                @click="guanbi(item)"
                :src="gb"
                alt
              />
              <img style="width:0.5rem;display:block;" v-show="item.status===9" :src="wgb" alt />
            </div>
          </div>
          <div
            v-if="item.status===9"
            @click.stop="jzmp"
            style="border-top:1px solid #f2f2f2;margin-top:0.2rem;color:#ccc;font-size:0.24rem;"
          >
            <div
              v-show="item.tagpath==null"
              style="width:100%;height:0.6rem;line-height:0.6rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align:left;padding-right:0.5rem;box-sizing:border-box;position:relative;"
            >
              {{item.resultinfo}}
              <img
                @click="item.tagpath=true"
                :src="down"
                style="position:absolute;top:0;right:0;width:0.5rem;"
              />
            </div>
            <div
              v-show="item.tagpath!=null"
              style="width:100%;line-height:0.6rem;padding-right:0.5rem;box-sizing:border-box;position:relative;text-align:left;"
            >
              {{item.resultinfo}}
              <img
                @click="item.tagpath=null"
                :src="up"
                style="position:absolute;top:0;right:0;width:0.5rem;"
              />
            </div>
            <p style="text-align:left;">{{item.close_time?item.close_time.slice(0,10):''}}</p>
          </div>
        </div>
      </div>
    </div>
      <Addcreate></Addcreate>

  </div>
</template>

<script>
import { createRw, getRwList, setxiugai, getisread } from "@/api/configWu";
import Head from "@/view/common/head";
import Addcreate from "@/components/addcreate";

export default {
  components: {
    Head,
    Addcreate

  },
  data() {
    return {
      isscroll: false,
      isjia: false,
      userid: "",
      isshaixuan: false,
      sxList: [
        {
          title: "分类",
          choose: 1,
          data: [
            { name: "帮助", id: 1 },
            { name: "任务", id: 3 },
            { name: "建议", id: 2 }
          ]
        },
        {
          title: "状态",
          choose: 0,
          data: [
            { name: "未关闭", id: 0 },
            { name: "已关闭", id: 9 }
          ]
        }
      ],
      isread: "",
      isreadStatus: "",
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      soit: 1,
      yuqi: require("../../assets/yuqi.png"),
      weidao: require("../../assets/weiyuqi.png"),
      fs: require("../../assets/fs.png"),
      add: require("../../assets/add2.png"),
      zf: require("../../assets/zf.png"),
      weidu: require("../../assets/wd.png"),
      rw: require("../../assets/rw.png"),
      jy: require("../../assets/jy.png"),
      bz: require("../../assets/bz.png"),
      gb: require("../../assets/guanbi.png"),
      wgb: require("../../assets/yiguanbi.png"),
      gb: require("../../assets/guanbi.png"),
      up: require("../../assets/up.png"),
      down: require("../../assets/down.png"),
      chadata: {
        type: 0,
        userid: localStorage.getItem("userid"),
        sort: 2,
        page: 1,
        status: -1,
        tagcode: "",
        pageSize: 10
      },
      datalist: [],
      act: 1,
      act1: this.$route.query.id == 2 ? false : true
    };
  },
  mounted() {
    this.getdata();
    this.gethong();
    this.getact();
    document.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    getact() {
      var lodata =
        this.$route.query.id == 1
          ? JSON.parse(sessionStorage.getItem("leaderMenus"))
          : JSON.parse(sessionStorage.getItem("userMenus"));
      console.log(lodata);
      lodata.forEach((e, index) => {
        if (e.path == "/znzx?id=1" || e.path == "/znzx?id=2") {
          this.act = index + 1;
        }
      });
    },
    search() {
      console.log(this.sxList);
      this.getdata(this.sxList);
    },
    gethong() {
      getisread({ userid: localStorage.getItem("userid") }).then(res => {
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
          this.chadata.page = 1;
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
        this.chadata.status = a[1].choose;
        this.chadata.tagcode = a[0].choose;
        this.datalist = [];
      }
      getRwList(this.chadata).then(res => {
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
.red {
  color: #fc5c5e;
}
.green {
  color: #ccc;
}
.khname {
  text-indent: 0.3rem;
  background: url("../../assets/kh.png") no-repeat 0 0.05rem;
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