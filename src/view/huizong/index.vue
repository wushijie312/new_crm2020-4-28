<!-- A.html -->
<template>
  <div class="wrapper wrapwhite" style="font-size:14px;">
    <Head :act.sync="act" :ty.sync="act1"></Head>
    <div class="menu-head-top50"></div>
    <div class="cont">
      <span
        id="sobox"
        style="font-size:1.1em;color:#999;width:45%;font-size:0.4rem;line-height:1rem;"
      >
        <el-date-picker
          v-model="value1"
          style="border:none;font-size:0.4rem!importment;font-weight:900;width:45%;"
          align="left"
          value-format="yyyy-MM-dd"
          type="date"
          :clearable="false"
          placeholder="选择日期"
          @change="changetime"
          class="el-icon-arrow-down1"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </span>
      <h3 style="font-size:0.3rem;text-align:left;line-height:0.8rem;">
        部门净利
        <span style="color:red;">(可左右拖动)</span>
      </h3>
      <div style="font-size:14px;">
        <el-table
          :data="listdata"
          size="mini"
          border
          style="width: 100%;"
          :summary-method="getSummaries"
          show-summary
        >
          <el-table-column width="110" fixed prop="leader" label="leader">
            <template v-slot="scope">
              <router-link
                :to="{path:'/create',query:{userid:scope.row.leader_id}}"
                style="text-align:center;"
              >{{scope.row.leader}}</router-link>
            </template>
          </el-table-column>
          <el-table-column width="110" prop="departmentName" label="部门名称"></el-table-column>
          <el-table-column width="110" prop="yearNetMoney" label="年净利" sortable>
            <template v-slot="scope">{{Number(scope.row.yearNetMoney).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column width="110" prop="quarterNetMoney" label="季净利" sortable>
            <template v-slot="scope">{{Number(scope.row.quarterNetMoney).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column width="110" prop="monthNetMoney" label="月净利" sortable>
            <template v-slot="scope">{{Number(scope.row.monthNetMoney).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column width="110" prop="quarterGrossMoney" label="年毛利润" sortable>
            <template v-slot="scope">{{Number(scope.row.quarterGrossMoney).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column width="140" prop="yearBear" label="年部门费用" sortable>
            <template v-slot="scope">{{Number(scope.row.yearBear).toFixed(1)}}万</template>
          </el-table-column>
          <el-table-column width="140" prop="yearBears" label="年部门分摊" sortable>
            <template v-slot="scope">{{Number(scope.row.yearBears).toFixed(1)}}万</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import Head from "@/view/common/head";
import { alldepartmentSale } from "@/api/configWu";
import { getNowDate } from "@/untils/common";

export default {
  components: {
    Head
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      value1: getNowDate(),
      listdata: [],
      act: 5,
      act1: true
    };
  },
  mounted() {
    this.getdata();
    this.getact();
  },
  watch: {
    value1() {
      this.getdata();
    }
  },
  methods: {
    getact() {
      var lodata = JSON.parse(sessionStorage.getItem("leaderMenus"));
      lodata.forEach((e, index) => {
        if (e.path == "/huizong") {
          this.act = index + 1;
        }
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = Number(sums[index]).toFixed(2);
          sums[index] += " 万元";
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },
    changetime() {
      this.getdata();
    },
    getdata() {
      alldepartmentSale({
        role: localStorage.getItem("role"),
        submitTime: this.value1
      }).then(res => {
        if (res.code == 200) {
          this.listdata = res.data;
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="stylus">
.cont {
  text-align: left;
  padding: 0 12px;
}
</style>