<template>
  <el-submenu :index="menuInfo.id" :key="menuInfo.id">
    <template slot="title">
                <i :class="menuInfo.icon">
                </i>
                <span slot="title" style="position:relative;">
                  <img
                    v-show="menuInfo.isshow"
                    :src="newPic"
                    alt
                    style="position:absolute;top: 4px;right: -24px;width: 24px;"
                  />
                  {{menuInfo.source}}
                  <span
                    v-show="isread&&menuInfo.source=='我的派单'"
                     class="un_read"
                  ></span>
                </span>
              </template>
    <template v-for="item in menuInfo.menus">
      <el-menu-item
        :key="item.path"
        :index="item.path"
      >
       <template slot="title">
                <i :class="item.menuInfo">
                </i>
                <span slot="title" style="position:relative;">
                  <img
                    v-show="item.isshow"
                    :src="newPic"
                    alt
                    style="position:absolute;top: 4px;right: -24px;width: 24px;"
                  />
                  {{item.source}}
                  <span
                    v-show="isread&&item.source=='我的派单'"
                    class="un_read"
                  ></span>
                </span>
              </template>
      </el-menu-item>
      
    </template>
  </el-submenu>
</template>
<script>
export default {
  props: ['menuInfo','isread'],
  data() {
    return {
      newPic: require("../../assets/new.png")
    };
  },
};
</script>