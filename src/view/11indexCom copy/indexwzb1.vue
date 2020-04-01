<template>
  <div>
    <div
      class="flex_1"
      style="width:90%;font-size:0.3rem;padding-top:0.1rem;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:0.2rem;"
      v-for="(item,index) in tabdata1"
      :key="index"
    >
      <h3 style="text-align:left;line-height:0.8rem;font-size:0.4rem;">
        <p style="line-height:0.8rem;padding-bottom:0.2rem;overflow:hidden;">
          <img style="width:0.8rem;height:0.8rem;border-radius:50%;float:left;margin-right:0.2rem;" :src="item.imgUrl" alt="">
          <span class="left">{{item.departmentName}}</span>
          <span
            class="right"
            style="font-weight:900;font-size:0.3rem;"
            @click="jxq(item.id,item.departmentName,item.departmentId)"
          >查看详情</span>
        </p>
        <p
          v-if="false"
          style="line-height:0.4rem;font-size:0.3rem;color:#999;font-weight:300;overflow:hidden;"
        >
          <span style="width:28%;float:left;">
            <span>销售额</span>
            <span :class="item.saleNo<3?'red':'cheng'">no{{item.saleNo}}</span>
          </span>
          <span style="width:39%;float:left;">
            <span>标准销售额</span>
            <span :class="item.standSaleNo<3?'red':'cheng'">no{{item.standSaleNo}}</span>
          </span>
          <span style="width:33%;float:left;">
            <span>完成率</span>
            <span :class="item.rateNo<3?'red':'cheng'">no{{item.rateNo}}</span>
          </span>
          <span style="width:28%;float:left;overflow:hidden;">
            <span style="text-align-last:justify;width:0.9rem;float:left;text-align:justify;">净利</span>
            <span
              style="float:left;margin-left:0.1rem;"
              :class="item.rateNo<3?'red':'cheng'"
            >no{{item.netNo}}</span>
          </span>
          <span style="width:39%;float:left;">
            <span style="text-align-last:justify;width:1.5rem;float:left;text-align:justify;">净净利</span>
            <span
              style="float:left;margin-left:0.1rem;"
              :class="item.rateNo<3?'red':'cheng'"
            >no{{item.netsNo}}</span>
          </span>
        </p>
      </h3>
      <div style="text-align:right;padding-bottom:0.2rem;">
        <!-- <p id="share-code">1111</p> -->
         <el-button class="copy-btn" data-clipboard-action="copy" :data-clipboard-target="'#textDiv'+index" @click="copy">一键复制</el-button>
        <!-- <button style="text-decoration: underline;" data-clipboard-action="copy"  data-clipboard-target="#foo">一键复制</button> -->
      </div>
      <div :id='"textDiv"+index' ref="copy">
        <div >
          <span  class="blue">
            年任务：<span>{{item.totalYearPlanMoney}}万</span><br>
          </span>
        </div>
        <div style="border-bottom:1px solid #ccc;">
          <span  class="blue">
            本月任务：<span>{{item.monthMoney}}万</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            今日完成：
            <span :class="item.dayMoney>=0?'red':'green'">{{item.dayMoney}}万</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            目前应完成：
            <span :class="item.monthShouldMoney>=0?'red':'green'">{{item.monthShouldMoney}}万</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            实际累计完成：
            <span :class="item.finishMoney>=0?'red':'green'">{{item.finishMoney}}万</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            年累计完成：
            <span :class="item.finishMoney>=0?'red':'green'">{{item.totalFinishYearMoney}}万</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            今日毛利率：
            <span
              :class="item.grossProfit.split('/')[0]>=0?'red':'green'"
            >{{item.grossProfit.split('/')[0]}}</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            累计毛利率：
            <span
              :class="item.grossProfit.split('/')[1]>=0?'red':'green'"
            >{{item.grossProfit.split('/')[1]}}</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            实时完成率：
            <span
              :class="item.finishRate.split('/')[0]>=0?'red':'green'"
            >{{item.finishRate.split('/')[0]}}</span><br>
          </span>
        </div>
        <div style>
          <span class="blue">
            超额/差额：
            <span :class="item.differenceMoney>=0?'red':'green'">{{item.differenceMoney}}万</span><br>
          </span>
        </div>
        <div style="color:black;width:100%;font-size:0.3rem;font-weight:900;text-align:left;border-bottom:1px solid #ccc;">
          <span style>
            上月环比
            <span :class="item.monthCompare>=0?'red':'green'">
              <!-- <i v-if="hb>=0" class="el-icon-top"></i>
              <i v-if="hb<0" class="el-icon-bottom"></i>-->
              {{item.monthCompare}}%
            </span>,去年同比
            <span :class="item.yearCompare>=0?'red':'green'">
              <!-- <i v-if="tb>=0" class="el-icon-top"></i>
              <i v-if="tb<0" class="el-icon-bottom"></i>-->
              {{item.yearCompare}}%
            </span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            本月目标实现毛利：
            <span :class="item.targetProfit>=0?'red':'green'">{{item.targetProfit}}万</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            目前毛利润：
            <span :class="item.grossProfitMoney>=0?'red':'green'">{{item.grossProfitMoney}}万</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            本月费用：
            <span :class="item.deptBear>=0?'red':'green'">{{item.deptBear}}万</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            本月净利润：
            <span :class="item.netProfit>=0?'red':'green'">{{item.netProfit}}万</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            本月分摊及财务费用：
            <span :class="item.bearsMoney>=0?'red':'green'">{{item.bearsMoney}}万</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            本月净净利：
            <span :class="item.netsProfit>=0?'red':'green'">{{item.netsProfit}}万</span><br>
          </span>
        </div>
        <div style="border-bottom:1px solid #ccc;">
          <span class="blue">
            距离实现本月目标毛利：
            <span
              :class="item.targetProfitDif>=0?'red':'green'"
            >{{item.targetProfitDif}}万</span><br>
          </span>
        </div>
        
        

        <div>
          <span class="blue">
            年净利：
            <span :class="item.yearNet>=0?'red':'green'">{{item.yearNet}}万</span><br>
          </span>
        </div>
        <div>
          <span class="blue">
            年净净利：
            <span :class="item.yearNets>=0?'red':'green'">{{item.yearNets}}万</span><br>
          </span>
        </div>
        <div style="border-bottom:1px solid #ccc;">
          <span class="blue">
            实现目标月净利：
            <span :class="item.targetNet>=0?'red':'green'">{{item.targetNet}}万</span><br>
          </span>
        </div>
        <div>
                <span class="blue" >TB线索：</span>
                <span class="black">
                  <span
                    :class="item.tbClueMoney>=0?'red':'green'"
                  >{{item.tbClueMoney}}万</span>
                </span>
              </div>
              <div>
                <span class="blue">本月开标：</span>
                <span class="black">
                  <span
                    :class="item.openTenderMoney>=0?'red':'green'"
                  >{{item.openTenderMoney}}万</span>
                </span>
              </div>
              <div>
                <span class="blue">本月中标：</span>
                <span class="black">
                  <span
                    :class="item.getTenderMoney>=0?'red':'green'"
                  >{{item.getTenderMoney}}万</span>
                </span>
              </div>
              <div style="border-bottom:1px solid #ccc;" >
                <span class="blue">已中标未下单：</span>
                <span class="black">
                  <span
                    :class="item.getTenderNotMoney>=0?'red':'green'"
                  >{{item.getTenderNotMoney}}万</span>
                </span>
                <span  style="text-decoration: underline;float:right;" @click="zhankai(2,item.departmentId)">
                  <!-- <router-link :to="{path:'/tanchujh/jrwc',query:{date:value1}}"></router-link> -->
                  展开
                </span>
              </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'

export default {
  props: ["tabdata1",'value1','jxq'],
  data() {
    return {
      box: ""
    };
  },
  mounted() {},
  methods: {
     getnum(a) {
      if (a < 10) {
        a = a.toString();
        return 0 + a;
      } else {
        return a;
      }
    },
    zhankai(a,b){
      var date = new Date(this.value1);
      var date1 =
        date.getFullYear() +
        "-" +
        this.getnum(Number(date.getMonth()) + 1) +
        "-" +
        this.getnum(date.getDate());
        if(a==1){
          this.$router.push({path:'/tanchujh/jrwc',query:{date:date1}})
        }else if(a==2){
           this.$router.push({path:'/zbwxd',query:{date:date1,type:2,role:b}})
        }
      
    },
    copy() {
        
        var clipboard = new Clipboard('.copy-btn')
        console.log(clipboard)
        clipboard.on('success', e => {
          this.$message.success("复制成功");
          // this.toast('copy success');
          // 释放内存
          clipboard.destroy();
        })
        clipboard.on('error', e => {
          // 不支持复制
　　　　　　//console.log('该浏览器不支持自动复制')
          // 释放内存
          this.$message.success("暂时无法复制");
          clipboard.destroy()
        })
      },
    
    // copyCode(a) {
    //   console.log(this.$refs.copy);
    //   var input = document.createElement("textarea");
    //   let str = "";
    //   var list = this.$refs.copy[a].children;
    //   for (var i = 0; i < list.length; i++) {
    //     str += list[i].innerText;
    //   }
    //   console.log(this.$refs.copy[a].innerText);
    //   input.value = str; // 设置内容
    //   document.body.appendChild(input); // 添加临时实例
    //   input.select(); // 选择实例内容
    //   document.execCommand("Copy"); // 执行复制
    //   document.body.removeChild(input);
    //   this.$message.success("复制成功");
    // }
  }
}
</script>

<style scoped>
.flex_1 > div > div {
  width: 100%;
  /* padding-bottom: 0.1rem; */
  line-height: 0.6rem;
  height: 0.6rem;
}
.blue {
  color: black;
  font-weight: 900;
  /* width: 30%; */
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  font-size: 0.3rem;
}
.black {
  color: black;
  /* width: 40%; */
  float: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.3rem;
  font-weight: 900;
}
.red {
  color: #f16c5d;
  font-weight: 900;
}
.cheng {
  color: #fe8b16;
}

/* 刷新 */
.green {
  color: green;
  font-weight: 900;
}
#textDiv2 {
  -webkit-user-select: text;
  user-select: text;
}
</style>