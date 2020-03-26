<template>
<div>
  <el-dialog title="选择" :visible.sync="show" @close="close" :show-close="false" width="90%" >
    <el-input
      clearable
      placeholder="输入客户姓名筛选"
      v-model="name"
      class="input-with-select"
      style="margin:10px auto;"
      v-on:input="treeData"
      @keyup.enter="treeData"
      
    >
      <el-button slot="append" icon="el-icon-search" @click="treeData"></el-button>
    </el-input>
    <div style="height:300px;overflow:auto;" v-show="name==''">
    <el-tree
     
      ref="tree" style="margin-bottom:50px;"
      :data="data"
      :props="defaultProps"
      @check="check"
      show-checkbox
      accordion
      node-key="id"
      @node-click='nodeCheck'
    />
    </div>
    <div style="height:300px;overflow:auto;" v-show="name">
      <el-tree
        ref="tree" style="margin-bottom:50px;"
        :data="data"
        :props="defaultProps"
        @check="check"
        show-checkbox
        accordion
        node-key="id"
        @node-click='nodeCheck'
        default-expand-all
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { getTree } from "@/api/configWu";
export default {
  name: "contact",
  model: {
    prop: confirm
  },
  props: ["show"],
  data() {
    return {
      name: "",
      data: [],
      defaultProps: {
        children: "menus",
        label: "text"
      },
      node: {
        id:'',
        name:'',
        url:''
      }
    };
  },
  created() {
    this.treeData();
  },
  methods: {
    close() {
      this.$emit("update:show", false);
    },
    treeData() {
      var isQuery = false;
      if(isQuery) {
        return
      }
      getTree({contactPerson:this.name}).then(res => {
        isQuery = true;
        console.log(res)
       
        this.data = res.data;
      });
    },
    nodeCheck(e){
      console.log(e)
      if(e.disabled===false){
        this.$refs.tree.setCheckedKeys([e.id]);
        var node = this.$refs.tree.getNode(e.id);
        console.log(node)
        this.node = {
          id: node.data.id,
          name: node.data.text,
          url:node.data.url
          
        };
      }
    },
    check(e) {
      console.log(e)
      this.$refs.tree.setCheckedKeys([]);
      
        this.$refs.tree.setCheckedKeys([e.id]);
        var node = this.$refs.tree.getNode(e.id);
        console.log(node)
        this.node = {
          id: node.data.id,
          name: node.data.text,
          url:node.data.url
       }
    },
    confirm() {
      console.log(this.$refs.tree.getCheckedKeys())
      if(this.$refs.tree.getCheckedKeys().length===0){
        this.node = {
          id: '',
          name: '',
          url:''
       }
      }
      this.$emit("confirm", this.node);
      this.close();
    }
  }
};
</script>
<style scoped>
.el-tree {
  /* height: 30rem; */
  overflow-y: auto;
}
</style>