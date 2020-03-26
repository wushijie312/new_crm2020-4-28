<template>
  <div class="qu_box" style="font-size:14px;">
    <div class="qu_body">
      <p>
        Leader本人+销售，在该客户提高销售额方面的具体做什么？
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          placeholder="请详述具体计划，如需上传附件可直接拖拽至本输入框中完成上传，附件支持word、excel、pdf、图片等，不支持压缩包，最多可上传10个附件"
          v-model="a_play"
        ></el-input>
      </p>
      <h3 class="qu_body_h3 m_t10">一、主要销售工作开展</h3>
      <div>
        1、描述该客户最重要的工作是扩大收入还是稳定收入，并详述过去进度及未来计划？
        <div>
          <el-radio v-model="a_income1" label="扩大收入">扩大收入</el-radio>
        </div>
        <div>
          <el-radio v-model="a_income1" label="稳定收入">稳定收入</el-radio>
        </div>
        <div>
          <el-radio v-model="a_income1" label="其他">其他</el-radio>
        </div>
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          placeholder="请详述该针对该客户以前的进度或未来计划，如需上传附件可直接拖拽至本输入框中完成上传，附件支持word、excel、pdf、图片等，不支持压缩包，最多可上传10个附件"
          v-model="a_income2"
        ></el-input>
      </div>
      <div class="m_t10">
        2、扩大/稳定该客户收入主要问题是什么？
        <div>
          <el-radio v-model="a_question1" label="控制成本">控制成本</el-radio>
        </div>
        <div>
          <el-radio v-model="a_question1" label="增加品类">增加品类</el-radio>
        </div>
        <div>
          <el-radio v-model="a_question1" label="创意方案">创意方案</el-radio>
        </div>
        <div>
          <el-radio v-model="a_question1" label="其它">其它</el-radio>
          <el-input style="width:150px;" size="mini" placeholder="请输入密码" v-model="a_action11"></el-input>
        </div>
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          placeholder="请输入详述扩大/稳定该客户收入主要问题是什么，如需上传附件可直接拖拽至本输入框中完成上传，附件支持word、excel、pdf、图片等，不支持压缩包，最多可上传10个附件"
          v-model="a_question2"
          class="m_t10"
        ></el-input>
      </div>
      <div class="m_t10">
        3、是否考虑现场驻场服务，为什么？
        <div>
          <el-radio v-model="a_fuwu1" label="是">是</el-radio>
        </div>
        <div>
          <el-radio v-model="a_fuwu1" label="否">否</el-radio>
        </div>
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          placeholder="请输入驻场或不驻场原因，如需上传附件可直接拖拽至本输入框中完成上传，附件支持word、excel、pdf、图片等，不支持压缩包，最多可上传10个附件"
          v-model="a_fuwu2"
        ></el-input>
      </div>
      <div class="m_t10">
        4、该客户有需求的时候你是否能够第一时间拿到需求？
        <div>
          <el-radio v-model="a_demand1" label="是">是</el-radio>
        </div>
        <div>
          <el-radio v-model="a_demand1" label="否">否</el-radio>
        </div>
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          placeholder="如不能第一时间拿到需求或其它情况，请详述原因，如有问题请说明，如需上传附件可直接拖拽至本输入框中完成上传，附件支持word、excel、pdf、图片等，不支持压缩包，最多可上传10个附件"
          v-model="a_demand2"
        ></el-input>
      </div>
      <div class="m_t10">
        5、你认为该客户完成今年任务的重要动作是什么？
        <div>
          <el-radio v-model="a_action1" label="控制成本">控制成本</el-radio>
        </div>
        <div>
          <el-radio v-model="a_action1" label="增加品类">增加品类</el-radio>
        </div>
        <div>
          <el-radio v-model="a_action1" label="创意方案">创意方案</el-radio>
        </div>
        <div>
          <el-radio v-model="a_action1" label="保证交期">保证交期</el-radio>
        </div>
        <div>
          <el-radio v-model="a_action1" label="其它">其它</el-radio>
          <el-input style="width:150px;" size="mini" placeholder="请输入密码" v-model="a_action11"></el-input>
        </div>
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          placeholder="请详述，如需上传附件可直接拖拽至本输入框中完成上传，附件支持word、excel、pdf、图片等，不支持压缩包，最多可上传10个附件"
          v-model="a_action2"
          class="m_t10"
        ></el-input>
      </div>

      <h3 class="qu_body_h3 m_t10">二、销售、利润、品类、改进</h3>
      <div>
        1、预计该客户年采购规模，该预计的依据是什么？怎么得到的依据（自己估算？访谈某人的介绍？或者其它渠道）？
        <div>
          <el-radio v-model="b_guimo1" label="0万">0万</el-radio>
        </div>
        <div>
          <el-radio v-model="b_guimo1" label="1万-100万">1万-100万</el-radio>
        </div>
        <div>
          <el-radio v-model="b_guimo1" label="101-1000万">101-1000万</el-radio>
        </div>
        <div>
          <el-radio v-model="b_guimo1" label="1001万-1亿">1001万-1亿</el-radio>
        </div>
        <div>
          <el-radio v-model="b_guimo1" label="其他">其他</el-radio>
          <el-input size="mini" style="width:70px;" placeholder="请输入内容" v-model="b_rate1">
            <template slot="append">%</template>
          </el-input>
          <el-input size="mini" style="width:70px;" placeholder="请输入内容" v-model="b_rate1">
            <template slot="append">%</template>
          </el-input>
        </div>
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          placeholder="请详述该针对该客户以前的进度或未来计划，如需上传附件可直接拖拽至本输入框中完成上传，附件支持word、excel、pdf、图片等，不支持压缩包，最多可上传10个附件"
          v-model="b_guimo2"
        ></el-input>
      </div>
      <div class="m_t10">
        2、该客户已经做什么品类（可多选）？
        <div>
          <el-checkbox-group v-model="b_pinlei1">
            <el-checkbox label="印刷" class="all_block"></el-checkbox>
            <el-checkbox label="服装" class="all_block"></el-checkbox>
            <el-checkbox label="包材" class="all_block"></el-checkbox>
            <el-checkbox label="礼品" class="all_block"></el-checkbox>
            <el-checkbox label="数码工装" class="all_block"></el-checkbox>
            <el-checkbox label="其它" style="margin-right:10px;"></el-checkbox>
             <el-input style="width:150px;" size="mini" placeholder="请输入密码" v-model="a_action11"></el-input>
          </el-checkbox-group>
         
        </div>
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          placeholder="请详述客户已采购品类及采购时间，如需上传附件可直接拖拽至本输入框中完成上传，附件支持word、excel、pdf、图片等，不支持压缩包，最多可上传10个附件"
          v-model="b_pinlei2"
          class="m_t10"
        ></el-input>
      </div>
      <div class="m_t10">
        3、该客户我们还能扩大做什么品类？为了做这些品类你觉得应该做些什么具体工作（可多选）？
        <div>
          <el-checkbox-group v-model="b_kuoda1">
            <el-checkbox label="印刷"></el-checkbox>
            <el-checkbox label="服装"></el-checkbox>
            <el-checkbox label="包材"></el-checkbox>
            <el-checkbox label="礼品"></el-checkbox>
            <el-checkbox label="数码工装"></el-checkbox>
            <el-checkbox label="其它"></el-checkbox>
          </el-checkbox-group>
          <el-input style="width:150px;" size="mini" placeholder="请输入密码" v-model="a_action11"></el-input>
        </div>
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          placeholder="请详述如客户扩展已选的这些品类，你需要做的具体工作内容或计划，如需上传附件可直接拖拽至本输入框中完成上传，附件支持word、excel、pdf、图片等，不支持压缩包，最多可上传10个附件"
          v-model="b_kuoda2"
          class="m_t10"
        ></el-input>
      </div>
      <div class="m_t10">
        4、你部门对该客户今年计划收入是多少？为什么？
        <div>
          <el-radio v-model="b_shouru1" label="0万">0万</el-radio>
          <el-radio v-model="b_shouru1" label="1万-100万">1万-100万</el-radio>
          <el-radio v-model="b_shouru1" label="101-1000万">101-1000万</el-radio>
          <el-radio v-model="b_shouru1" label="1001万-1亿">1001万-1亿</el-radio>
          <el-radio v-model="b_shouru1" label="其他">其他</el-radio>
          <el-input size="mini" style="width:70px;" placeholder="请输入内容" v-model="b_rate1">
            <template slot="append">%</template>
          </el-input>
          <el-input size="mini" style="width:70px;" placeholder="请输入内容" v-model="b_rate1">
            <template slot="append">%</template>
          </el-input>
        </div>
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          placeholder="请详述你选择该金额做为今年计划收入的原因，如需上传附件可直接拖拽至本输入框中完成上传，附件支持word、excel、pdf、图片等，不支持压缩包，最多可上传10个附件"
          v-model="b_shouru2"
          class="m_t10"
        ></el-input>
      </div>
      <div class="m_t10 b_rate">
        5、该客户提高毛利的办法？去年毛利率
        <el-input size="mini" style="width:70px;" placeholder="请输入内容" v-model="b_rate1">
          <template slot="append">%</template>
        </el-input>,今年目标
        <el-input size="mini" style="width:70px;" placeholder="请输入内容" v-model="b_rate2">
          <template slot="append">%</template>
        </el-input>。
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          placeholder="如不能第一时间拿到需求或其它情况，请详述原因，如有问题请说明，如需上传附件可直接拖拽至本输入框中完成上传，附件支持word、excel、pdf、图片等，不支持压缩包，最多可上传10个附件"
          v-model="b_rate3"
          class="m_t10"
        ></el-input>
      </div>
      <div class="m_t10">
        6、历史中标情况、历史流标情况的相关问题。
        <el-input
          size="mini"
          type="textarea"
          :rows="4"
          placeholder="请详述中标、丢标相关问题。如需上传附件可直接拖拽至本输入框中完成上传，附件支持word、excel、pdf、图片等，不支持压缩包，最多可上传10个附件"
          v-model="b_lishi"
        ></el-input>
      </div>
      <h3 class="qu_body_h3 m_t10">三、客户管理</h3>
      <div>
        1、你和Leader跟客户哪个岗位的谁关系不错？哪些岗位不认识/不熟悉原因，改进方式，或者哪些需加强关系？
        <span style="display:inline-block;">
          <el-button type="primary" icon="el-icon-tickets" @click="recorddraw = true">协助记录</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="drawer = true">发起协助请求</el-button>
        </span>
      </div>
    </div>

    <el-drawer
      title="高管协助记录"
      :visible.sync="recorddraw"
      :direction="direction"
      class="open-drawer"
      custom-class="open-drawer-1"
      :before-close="recordhandleClose"
      style="font-size:12px;"
    >
      <el-table :data="tableData" border style="width: 100%;font-size:12px;" size="mini">
        <el-table-column prop="name1" label="发起人"></el-table-column>
        <el-table-column prop="name2" label="协助人"></el-table-column>
        <el-table-column prop="type" label="协助方式"></el-table-column>
        <el-table-column prop="starttimer" label="发起时间" width="120px"></el-table-column>
        <el-table-column label="协助时间" width="120px">
          <template slot-scope="scope">
            <p>起：{{scope.row.helptime.start}}</p>
            <p>止：{{scope.row.helptime.end}}</p>
          </template>
        </el-table-column>
        <el-table-column label="协助要求" width="300">
          <template slot-scope="scope">
            <p :class="scope.row.is_ggDc?'':'ggDc_hide'">{{scope.row.require}}{{scope.row.is_ggDc}}</p>
            {{!scope.row.is_ggDc}}
            <el-button
              size="mini"
              type="primary"
              round
              @click="changeshow(tableData,scope.$index)"
            >{{!scope.row.is_ggDc?'查看全部':'隐藏'}}{{scope.row.is_ggDc}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>

    <el-drawer
      title="发起协助请求"
      :visible.sync="drawer"
      :direction="direction"
      class="open-drawer"
      custom-class="open-drawer-1"
      :before-close="handleClose"
    >
      <div class="qu_open_box">
        <div class="qu_open_a">
          <span class="qu_open_a1">发起人：</span>
          <div class="qu_open_a2">销售名字</div>
        </div>
        <div class="qu_open_a">
          <span class="qu_open_a1">所属部门：</span>
          <div class="qu_open_a2">孵化中心</div>
        </div>
        <div class="qu_open_a">
          <span class="qu_open_a1">协助人：</span>
          <div class="qu_open_a2 clearfix">
            <el-checkbox-group class="clearfix" style="display:inline-block;" v-model="checkList">
              <el-checkbox class="fl" label="复选框 A"></el-checkbox>
              <el-checkbox class="fl" label="复选框 b"></el-checkbox>
              <el-checkbox class="fl" label="复选框 C"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
        <div class="qu_open_a">
          <span class="qu_open_a1">协助时间：</span>
          <div class="qu_open_a2">
            <el-date-picker
              v-model="dateStart"
              type="date"
              size="mini"
              placeholder="选择开始日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:130px;margin-right:2px;margin-bottom:2px;"
            ></el-date-picker>
            <el-date-picker
              v-model="dateEnd"
              type="date"
              size="mini"
              placeholder="选择结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:130px;"
            ></el-date-picker>
          </div>
        </div>
        <div class="qu_open_a">
          <span class="qu_open_a1">协助方式：</span>
          <div class="qu_open_a2">
            <el-select size="mini" v-model="fztype" placeholder="请选择">
              <el-option
                v-for="item in fztypeoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="qu_open_a">
          <span class="qu_open_a1">协助要求：</span>
          <div class="qu_open_a2">
            <el-input size="mini" type="textarea" :rows="4" placeholder="请输入内容" v-model="xzRequire"></el-input>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { chabumen } from "@/api/config";
export default {
  data() {
    return {
      a_play: "",
      a_income1: "",
      a_income2: "",
      a_question1: "",
      a_question2: "",
      a_fuwu1: "",
      a_fuwu2: "",
      a_demand1: "",
      a_demand2: "",
      a_action1: "",
      a_action11: "",
      a_action2: "",
      b_guimo1: "",
      b_guimo2: "",
      b_pinlei1: [],
      b_pinlei2: "",
      b_kuoda1: [],
      b_kuoda2: "",
      b_shouru1: "",
      b_shouru2: "",
      b_rate1: "",
      b_rate2: "",
      b_rate3: "",
      b_lishi: "",
      is_ggDc: false,
      tableData: [
        {
          name1: "小王小王王111",
          name2: "王小虎",
          type: "线下拜访",
          starttimer: "2020-02-02  12:12:12",
          helptime: { start: "2020-02-02", end: "2020-02-10" },
          require:
            "这个位置可以提取显示一部分，超过部分隐藏，当只有点击最后的“查看全部”，然后展开全部这个位置可以提取显示一部分，超过部分隐藏，当只有点击最后的“查看全部”，然后展开全部"
        },
        {
          name1: "小王小王王222",
          name2: "王小虎",
          type: "线下拜访",
          starttimer: "2020-02-02  12:12:12",
          helptime: { start: "2020-02-02", end: "2020-02-10" },
          require:
            "这个位置可以提取显示一部分，超过部分隐藏，当只有点击最后的“查看全部”，然后展开全部这个位置可以提取显示一部分，超过部分隐藏，当只有点击最后的“查看全部”，然后展开全部"
        }
      ],
      xzRequire: "",
      fztypeoptions: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      fztype: "",
      dateStart: "",
      dateEnd: "",
      checkList: ["选中且禁用", "复选框 A"],
      recorddraw: false,
      drawer: false,
      direction: "btt"
    };
  },
  mounted() {},
  methods: {
    handleClose(done) {
      this.drawer = false;
    },
    recordhandleClose(done) {
      this.recorddraw = false;
    },
    changeshow(row, len) {
      this.tableData.map((item, index) => {
        if (len == index) {
          item.is_ggDc = !item.is_ggDc;
          this.$set(this.tableData, index, item);
        }
        return item;
      });
    }
  }
};
</script>

<style scoped>
.qu_body_h3 {
  line-height: 30px;
  font-size: 16px;
  color: #000;
  font-weight: normal;
}

.ggDc_hide {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.qu_open_bi {
  color: red;
}
.qu_open_box {
  padding: 0 10px;
}
.qu_open_a {
  margin: 5px 0;
  font-size: 14px;
  line-height: 20px;
  position: relative;
}
.qu_open_a1 {
  width: 72px;
  text-align: right;
  position: absolute;
  left: 0;
  top: 0;
}
.qu_open_a2 {
  margin-left: 75px;
}
.qu_ke_a1 {
  text-align: right;
  width: 120px;
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
}
.qu_ke_a2 {
  margin-left: 125px;
}
.qu_body {
  font-size: 14px;
  line-height: 24px;
  text-align: left;
}
.qu_box {
  padding: 20px 10px 10px;
}
.qu_head {
  text-align: center;
  padding-bottom: 20px;
}
.qu_head h3 {
  font-size: 14px;
  color: #333;
  line-height: 24px;
}
.qu_head p {
  font-size: 12px;
  color: #666;
  line-height: 14px;
}
</style>