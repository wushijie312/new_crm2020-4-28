<!-- A.html -->
<template>
  <div style="font-size:12px;">
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="permId"
      size="mini"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="permName" label="页" sortable width="180"></el-table-column>
      <el-table-column prop="permRequest" label="请求" sortable width="180"></el-table-column>
      <el-table-column prop="level" label="级"></el-table-column>
    </el-table>
  </div>
</template>
<script>

import lists from "./demo.js"
export default {
  components: {},
  data() {
    return {
        tableData: [],
    };
  },
  created() {
    this.tableData=lists.lists;
    console.log(this.tableData,lists);
  },
  mounted() {}
};
</script>