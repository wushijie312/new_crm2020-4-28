<template>
  <div style="font-size:14px;padding-bottom:53px;" class="all_change_box">
    <div class="qu_body">
      <div v-for="(item,index) in qu_lists" :key="index">
        <div class="border_b">
          <div v-if="item.select_type=='radio'">
            <p class="qu_border_tit">
              {{item.sort}}、{{item.question}}
              <span class="qu_radio_one">单选</span>
            </p>
            <span style="display:block;">
              <el-button
                v-if="item.select_link"
                size="mini"
                type="primary"
                :icon="item.select_link"
                @click="item.select_link=='el-icon-view'?bfjlHandle():item.select_link=='el-icon-connection'?khgxHandle(item.select_link):item.select_link=='el-icon-search'?zpxqHandle(item,index):item.select_link=='el-icon-set-up'?khgxHandle(item.select_link):item.select_link=='el-icon-thumb'?ggxzHandle(item):item.select_link=='el-icon-check'?khgxHandle(item.select_link):''"
              >{{item.select_link_name}}</el-button>
            </span>
            <el-radio-group
              class="all_block"
              v-model="item.select_value"
              v-for="(itemchild,lenchild) in item.select_values"
              :key="'info2-'+lenchild"
              :disabled="disabled"
            >
              <el-radio :label="itemchild.name">{{itemchild.name}}</el-radio>
            </el-radio-group>
            <el-input
              class="qu_input"
              size="mini"
              placeholder="请输入"
              :disabled="disabled"
              v-model="item.select_other"
              v-if="item.select_value=='其他'"
            ></el-input>
          </div>

          <div v-if="item.select_type=='input'">
            <p class="qu_border_tit">{{item.sort}}、{{item.question}}</p>
            <div v-for="(itemchild,lenchild) in item.select_values" :key="'input1-'+lenchild">
              {{itemchild.name}}
              <el-input
                class="xs_rate"
                :disabled="disabled"
                size="mini"
                style="width:70px;"
                :placeholder="itemchild.question_desc"
                v-model="item.select_value"
              ></el-input>
            </div>
          </div>

          <div v-if="item.select_type=='check'">
            <p class="qu_border_tit">
              {{item.sort}}、{{item.question}}
              <span class="qu_check_one">多选</span>
            </p>
            <span style="display:block;">
              <el-button
                v-if="item.select_link"
                size="mini"
                type="primary"
                :icon="item.select_link"
                @click="item.select_link=='el-icon-view'?bfjlHandle():item.select_link=='el-icon-connection'?khgxHandle(item.select_link):item.select_link=='el-icon-search'?zpxqHandle(item,index):item.select_link=='el-icon-set-up'?khgxHandle(item.select_link):item.select_link=='el-icon-thumb'?ggxzHandle(item):item.select_link=='el-icon-check'?khgxHandle(item.select_link):''"
              >{{item.select_link_name}}</el-button>
            </span>
            <el-checkbox-group
              v-model="item.select_value"
              v-for="(itemchild,lenchild) in item.select_values"
              :key="'info2-'+lenchild"
              :disabled="disabled"
            >
              <el-checkbox class="all_block_checked" :label="itemchild.name"></el-checkbox>
            </el-checkbox-group>
            <el-input
              class="qu_input"
              size="mini"
              placeholder="请输入"
              :disabled="disabled"
              v-model="item.select_other"
              v-if="item.select_value.indexOf('其他')>-1"
            ></el-input>
          </div>
          <div v-if="item.select_type=='no'">
            <p class="qu_border_tit">{{item.sort}}、{{item.question}}</p>
            <span style="display:block;">
              <el-button
                v-if="item.select_link"
                size="mini"
                type="primary"
                :icon="item.select_link"
                @click="item.select_link=='el-icon-view'?bfjlHandle():item.select_link=='el-icon-connection'?khgxHandle(item.select_link):item.select_link=='el-icon-search'?zpxqHandle(item,index):item.select_link=='el-icon-set-up'?yjjlHandle(item.select_link):item.select_link=='el-icon-thumb'?ggxzHandle(item):item.select_link=='el-icon-check'?xzryHandle(item.select_link):''"
              >{{item.select_link_name}}</el-button>
            </span>
          </div>
          <el-input
            v-if="item.showinputbox"
            size="mini"
            type="textarea"
            :placeholder="item.question_desc"
            :disabled="disabled"
            v-model="item.answer"
            :class="disabled?'wqdc_textarea_open m_t12':'wqdc_textarea m_t12' "
          ></el-input>

          <el-upload
            v-if="item.showinputbox && !disabled"
            class="wqdc-upload-c"
            :action="action"
            :on-remove="fileHandleRemove"
            :before-remove="(file, fileList)=>fileBeforeRemove(file, fileList,item)"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="item.file_json"
            :on-success="(response, file, fileList)=>file_handle_change(response, file, fileList,item)"
          >
            <span class="qu_upload_ctit">上传文件</span>
          </el-upload>
          <div v-if="disabled">
            <a
              v-for="(itemchild,index) in item.file_json"
              :key="'load'+index"
              class="qu_download"
              :href="itemchild.url?itemchild.url:itemchild.name"
              title="下载"
            >
              <i class="el-icon-document-copy qu_download_a"></i>
              <p class="qu_download_b">{{itemchild.name?itemchild.name:itemchild.url}}</p>
            </a>
          </div>
        </div>
      </div>
      <div
        v-if="!disabled"
        style="position:fixed;max-width:850px;z-index:1000;width:100%;bottom:0;background:#fff;border-top:1px solid #f0f0f0;padding:10px 12px;box-sizing:border-box;-webkit-box-sizing:border-box;"
      >
        <el-button
          style="width:100%;display:block;padding: 11px 15px;font-weight:normal;font-size:15px;"
          type="primary"
          @click="submitHandel"
        >提交</el-button>
      </div>
    </div>
    <el-drawer
      title="拜访记录"
      :visible.sync="bfjldraw"
      :direction="direction"
      class="wjdc-one-drawer"
      custom-class="wjdc-one-drawer-1"
      :before-close="khgxhandleClose"
      style="font-size:12px;"
    >
      <div style="margin:0 10px 10px; display:flex;display:-webkit-flex;" class="clearfix">
        <el-date-picker
          class="qu_date_open fl qu_card_data"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          size="mini"
          v-model="bf_startdate"
          type="date"
          placeholder="开始时间"
        ></el-date-picker>
        <el-date-picker
          class="qu_date_open fl qu_card_data"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          size="mini"
          v-model="bf_enddate"
          type="date"
          placeholder="结束时间"
        ></el-date-picker>
        <el-button size="mini" class="fl" type="primary" @click="bfjlDateHandle">搜索</el-button>
      </div>
      <div class="qu_bfcard" v-if="bfjlData!=0">
        <div class="qu_bfcard_box" v-for="(item,index) in bfjlData" :key="index">
          <p class="qu_bfcard_btime">
            <span class="qu_bfcard_round"></span>
            {{item.create_time?item.create_time:'尚未拜访'}}
          </p>
          <div class="qu_card_cont_bf">
            <p class="qu_bfcard_a">
              <span>当面拜访</span>
              <span>{{item.customer}}</span>
            </p>
            <p class="qu_bfcard_b">
              <span>拜访人员：</span>
              <span class="qu_bfcard_bdec">{{item.user_name}}（{{item.dept_name}}）</span>
            </p>
            <p class="qu_bfcard_b">
              <span>沟通适宜：</span>
              <span class="qu_bfcard_bdec">{{item.talk_main}}</span>
            </p>
            <p class="qu_bfcard_b">
              <span>开始/结束：</span>
              <span
                style="font-size:12px;"
              >{{item.start_time?item.start_time+'---':''}}{{item.end_time}}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-else class="qu_card_nodata">暂无数据</div>
    </el-drawer>
    <el-drawer
      title="客户关系表"
      :visible.sync="khgxdraw"
      :direction="direction"
      class="wjdc-one-drawer"
      custom-class="wjdc-one-drawer-1"
      :before-close="khgxhandleClose"
      style="font-size:12px;"
    >
      <div class="qu_card" v-if="khgxData!=0">
        <div
           :class="item.is_show?'qu_card_cont clearfix qu_card_active':'qu_card_cont clearfix'"
          v-for="(item,index) in khgxData"
          :key="index"
          @click="showandhide(item,index)"
        >
          <div class="qu_card_icon">
            <i class="el-icon-share qu_card_share"></i>
          </div>
          <div class="qu_card_a clearfix">
            <p class="fl">{{item.contact_person}}</p>
            <p class="fl" v-if="item.position">{{item.position}}</p>
          </div>
          <div v-if="!item.is_show" class="qu_card_b clearfix">
            <p class="clearfix">
              <i
                :class="item.phone?'el-icon-phone fl qu_card_b_icon':item.contact_person_email?'el-icon-message fl qu_card_b_icon':item.birthday?'el-icon-date fl qu_card_b_icon':item.remark?'el-icon-tickets fl qu_card_b_icon_bz':''"
              ></i>
              {{item.phone?item.phone:item.contact_person_email?item.contact_person_email:item.birthday?item.birthday:item.remark?item.remark:''}}
            </p>
          </div>
          <div v-if="item.is_show" class="qu_card_b clearfix">
            <p v-if="item.phone" class="clearfix">
              <i class="el-icon-phone fl qu_card_b_icon"></i>
              {{item.phone}}
            </p>
            <p v-if="item.contact_person_email" class="clearfix">
              <i class="el-icon-message fl qu_card_b_icon"></i>
              {{item.contact_person_email}}
            </p>
            <p v-if="item.birthday" class="clearfix">
              <i class="el-icon-date fl qu_card_b_icon"></i>
              {{item.birthday}}
            </p>
            <p v-if="item.remark" class="clearfix">
              <i class="el-icon-tickets fl qu_card_b_icon_bz"></i>
              {{item.remark}}
            </p>
          </div>

          <div class="qu_card_c">
            <span>{{item.level}}级</span>
            <span>{{item.correlation_person}}</span>
            <span v-if="item.relation">{{item.relation}}</span>
          </div>
        </div>
      </div>
      <div v-else class="qu_card_nodata">暂无数据</div>
    </el-drawer>
    <el-drawer
      title="客户引荐记录"
      :visible.sync="yjjldraw"
      :direction="direction"
      class="wjdc-one-drawer"
      custom-class="wjdc-one-drawer-1"
      :before-close="khgxhandleClose"
      style="font-size:12px;"
    >
      <div class="qu_card" v-if="khgxData!=0">
        <div class="qu_card_cont" v-for="(item,index) in khgxData" :key="index">
          <div class="qu_card_icon" v-if="!disabled">
            <span
              class="qu_card_btn_all"
              @click="changeedit(item,index)"
            >{{item.referrer==0?'推荐':'编辑'}}</span>
          </div>
          <div class="qu_card_a clearfix">
            <p class="fl">{{item.contact_person}}</p>
            <p class="fl" v-if="item.position">{{item.position}}</p>
          </div>
          <div class="qu_card_b clearfix">
            <p>
              <i
                :class="item.phone?'el-icon-phone qu_card_b_icon':item.contact_person_email?'el-icon-message qu_card_b_icon':item.birthday?'el-icon-date qu_card_b_icon':item.remark?'el-icon-tickets qu_card_b_icon':''"
              ></i>
              {{item.phone?item.phone:item.contact_person_email?item.contact_person_email:item.birthday?item.birthday:item.remark?item.remark:''}}
            </p>
          </div>
          <div class="qu_card_c">
            <span>{{item.level}}级</span>
            <span>{{item.correlation_person}}</span>
            <span v-if="item.relation">{{item.relation}}</span>
          </div>
          <p v-if="!item.is_edit &&item.referrer!=0" class="qu_card_tj">
            已推荐给：
            <span>{{getval(item)}}{{item.referrer.indexOf("其他")>-1 && item.referrer_other?','+item.referrer_other:''}}</span>
          </p>

          <div v-if="item.is_edit">
            <p class="qu_card_tj">已推荐给：</p>
            <div class="qu_card_b clearfix">
              <el-checkbox-group
                v-model="item.referrer"
                v-for="(itemchild,lenchild) in ggDataLists"
                :key="'gg-'+lenchild"
              >
                <el-checkbox class="all_block_checked" :label="itemchild.name"></el-checkbox>
              </el-checkbox-group>
              <el-input
                class="qu_input"
                size="mini"
                placeholder="如推荐给多人，请以“，”分割"
                v-model="item.referrer_other"
                v-if="item.referrer.indexOf('其他')>-1"
              ></el-input>
            </div>
            <div class="qu_card_d">
              <el-button size="small" @click="canceledit(item,index)">取消</el-button>
              <el-button size="small" type="primary" @click="editHandelSave(item,index)">保存</el-button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="qu_card_nodata">暂无数据</div>
    </el-drawer>
    <el-drawer
      title="客户联系人表"
      :visible.sync="xzrydraw"
      :direction="direction"
      class="wjdc-one-drawer"
      custom-class="wjdc-one-drawer-1"
      :before-close="khgxhandleClose"
      style="font-size:12px;"
    >
      <div class="qu_card" v-if="khgxData!=0">
        <div
        :class="item.is_show?'qu_card_cont clearfix qu_card_active':'qu_card_cont clearfix'"
          v-for="(item,index) in khgxData"
          :key="index"
          @click="showandhide(item,index)"
        >
          <div class="qu_card_icon">
            <i class="el-icon-share qu_card_share"></i>
            <el-checkbox  @change="editHandelSave(item,index)" v-model="item.is_contact_person" :disabled="disabled"></el-checkbox>
          </div>
          <div class="qu_card_a clearfix">
            <p class="fl">{{item.contact_person}}</p>
            <p class="fl" v-if="item.position">{{item.position}}</p>
          </div>
          <div v-if="!item.is_show" class="qu_card_b clearfix">
            <p class="clearfix">
              <i
                :class="item.phone?'el-icon-phone fl qu_card_b_icon':item.contact_person_email?'el-icon-message fl qu_card_b_icon':item.birthday?'el-icon-date fl qu_card_b_icon':item.remark?'el-icon-tickets fl qu_card_b_icon_bz':''"
              ></i>
              {{item.phone?item.phone:item.contact_person_email?item.contact_person_email:item.birthday?item.birthday:item.remark?item.remark:''}}
            </p>
          </div>
          <div v-if="item.is_show" class="qu_card_b clearfix">
            <p v-if="item.phone" class="clearfix">
              <i class="el-icon-phone fl qu_card_b_icon"></i>
              {{item.phone}}
            </p>
            <p v-if="item.contact_person_email" class="clearfix">
              <i class="el-icon-message fl qu_card_b_icon"></i>
              {{item.contact_person_email}}
            </p>
            <p v-if="item.birthday" class="clearfix">
              <i class="el-icon-date fl qu_card_b_icon"></i>
              {{item.birthday}}
            </p>
            <p v-if="item.remark" class="clearfix">
              <i class="el-icon-tickets fl qu_card_b_icon_bz"></i>
              {{item.remark}}
            </p>
          </div>

          <div class="qu_card_c">
            <span>{{item.level}}级</span>
            <span>{{item.correlation_person}}</span>
            <span v-if="item.relation">{{item.relation}}</span>
          </div>
        </div>
      </div>
      <div v-else class="qu_card_nodata">暂无数据</div>
    </el-drawer>

    <el-drawer
      title="招聘详情"
      :visible.sync="zpxqdraw"
      :direction="direction"
      class="wjdc-one-drawer"
      custom-class="wjdc-one-drawer-1"
      :before-close="zpxqhandleClose"
      style="font-size:12px;"
    >
      <div
        class="qu_open_box zpxq_open_box"
        v-for="(item,index) in zpxqrows.answer_json"
        :key="'zpxq_'+index"
      >
        <div class="qu_open_a">
          <span class="qu_ta_a1">
            <span class="qu_open_bi">*</span>指定被招聘人：
          </span>
          <div class="qu_ta_a2">
            <el-radio-group v-model="item.need" :disabled="disabled">
              <el-radio label="是">是</el-radio>
              <el-radio label="否">否</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="qu_open_a">
          <span class="qu_ta_a1 qu_pos_top">
            <span class="qu_open_bi">*</span>需求部门：
          </span>
          <div class="qu_ta_a2">
            <el-select
              style="width:100%;"
              size="mini"
              v-model="item.section"
              placeholder="请选择部门"
              :disabled="disabled"
            >
              <el-option
                v-for="depart in departList"
                :key="depart.value"
                :label="depart.departmentName"
                :value="depart.departmentName"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="qu_open_a">
          <span class="qu_ta_a1 qu_pos_top">
            <span class="qu_open_bi">*</span>入职时间：
          </span>
          <div class="qu_ta_a2">
            <el-date-picker
              :disabled="disabled"
              class="qu_date_open"
              v-model="item.entryTime"
              type="date"
              size="mini"
              placeholder="选择入职时间"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width:100%;"
            ></el-date-picker>
          </div>
        </div>
        <div v-if="item.need=='是'">
          <div class="qu_open_a">
            <span class="qu_ta_a1 qu_pos_top">姓名：</span>
            <div class="qu_ta_a2">
              <el-input
                size="mini"
                :disabled="disabled"
                style="width:100%;"
                v-model="item.username"
                placeholder="请输入姓名"
              ></el-input>
            </div>
          </div>
          <div class="qu_open_a">
            <span class="qu_ta_a1 qu_pos_top">所在公司：</span>
            <div class="qu_ta_a2">
              <el-input
                size="mini"
                :disabled="disabled"
                style="width:100%;"
                v-model="item.company"
                placeholder="请输入公司名称"
              ></el-input>
            </div>
          </div>
          <div class="qu_open_a">
            <span class="qu_ta_a1 qu_pos_top">电话：</span>
            <div class="qu_ta_a2">
              <el-input
                size="mini"
                :disabled="disabled"
                style="width:100%;"
                v-model="item.phone"
                placeholder="请输入电话"
              ></el-input>
            </div>
          </div>
          <div class="qu_open_a">
            <span class="qu_ta_a1 qu_pos_top">邮箱：</span>
            <div class="qu_ta_a2">
              <el-input
                size="mini"
                :disabled="disabled"
                style="width:100%;"
                v-model="item.email"
                placeholder="请输入邮箱"
              ></el-input>
            </div>
          </div>
          <div class="qu_open_a">
            <span class="qu_ta_a1 qu_pos_top">
              <span class="qu_open_bi">*</span>职位职责：
            </span>
            <div class="qu_ta_a2">
              <el-input
                :disabled="disabled"
                class="wqdc_textarea_open"
                size="mini"
                type="textarea"
                placeholder="请详述被招聘的工作职责、负责内容、工作要求、上级领导、任职职位等"
                v-model="item.duty"
              ></el-input>
            </div>
          </div>
          <div class="qu_open_a">
            <span class="qu_ta_a1 qu_pos_top">
              <span class="qu_open_bi">*</span>任职要求：
            </span>
            <div class="qu_ta_a2">
              <el-input
                size="mini"
                :disabled="disabled"
                class="wqdc_textarea_open"
                type="textarea"
                placeholder="请详述被招聘的工作职责、负责内容、工作要求、上级领导、任职职位等"
                v-model="item.require"
              ></el-input>
            </div>
          </div>
        </div>
        <div v-if="item.need=='否'">
          <div class="qu_open_a">
            <span class="qu_ta_a1 qu_pos_top">
              <span class="qu_open_bi">*</span>招聘职位：
            </span>
            <div class="qu_ta_a2">
              <el-input
                size="mini"
                :disabled="disabled"
                style="width:100%;"
                v-model="item.zpzhiwei"
                placeholder="请输入职位"
              ></el-input>
            </div>
          </div>
          <div class="qu_open_a">
            <span class="qu_ta_a1 qu_pos_top">
              <span class="qu_open_bi">*</span>招聘人数：
            </span>
            <div class="qu_ta_a2">
              <el-input
                size="mini"
                :disabled="disabled"
                style="width:100%;"
                v-model="item.zpnumber"
                placeholder="请输入人数"
              ></el-input>
              <span style="position:absolute;right: 6px;top: 5px;">位</span>
            </div>
          </div>
          <div class="qu_open_a">
            <span class="qu_ta_a1 qu_pos_top">
              <span class="qu_open_bi">*</span>薪资范围：
            </span>
            <div class="qu_ta_a2">
              <el-input
                size="mini"
                :disabled="disabled"
                v-model="item.zpmoney1"
                style="width:80px;"
                placeholder="金额"
              ></el-input>-
              <el-input
                size="mini"
                :disabled="disabled"
                v-model="item.zpmoney2"
                style="width:80px;"
                placeholder="金额"
              ></el-input>
            </div>
          </div>
          <div class="qu_open_a">
            <span class="qu_ta_a1 qu_pos_top">
              <span class="qu_open_bi">*</span>职位职责：
            </span>
            <div class="qu_ta_a2">
              <el-input
                size="mini"
                :disabled="disabled"
                class="wqdc_textarea_open"
                type="textarea"
                :rows="4"
                placeholder="请详述被招聘的工作职责、负责内容、工作要求、上级领导、任职职位等"
                v-model="item.duty"
              ></el-input>
            </div>
          </div>
          <div class="qu_open_a">
            <span class="qu_ta_a1 qu_pos_top">
              <span class="qu_open_bi">*</span>任职要求：
            </span>
            <div class="qu_ta_a2">
              <el-input
                class="wqdc_textarea_open"
                size="mini"
                :disabled="disabled"
                type="textarea"
                :rows="4"
                placeholder="请详述被招聘的工作职责、负责内容、工作要求、上级领导、任职职位等"
                v-model="item.require"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="qu_zpxq_add" v-if="!disabled">
        <el-button icon="el-icon-plus" size="small" @click="addNewzpxqHandel">新增一条招聘要求</el-button>
      </div>
      <div class="qu_draw_btn" v-if="!disabled">
        <el-button @click="zpxqhandleClose()">取消</el-button>
        <el-button type="primary" @click="zpxqHandelSave">保存</el-button>
      </div>
      <!-- <div style="margin:20px 10px;text-align:right;">
        <el-button
          icon="el-icon-plus"
          size="mini"
          type="primary"
          round
          @click="addNewzpxqHandel"
        >新增一条招聘要求</el-button>
        <el-button size="mini" type="primary" round @click="zpxqHandelSave">保存</el-button>
        <el-button size="mini" type="primary" round @click="zpxqhandleClose">取消</el-button>
      </div>-->
    </el-drawer>
  </div>
</template>

<script>
import {
  wqinfo,
  wqcreate,
  upload,
  wqeditcompany,
  wqvisits,
  wqdepart,
  wqeditQ
} from "@/api/config";
import { gettail1 } from "@/api/configWu";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      bf_startdate: "",
      bf_enddate: "",
      action: upload(),
      qu_lists: [],
      direction: "btt",
      bfjldraw: false,
      bfjlData: [],
      khgxdraw: false,
      khgxData: [],
      zpxqdraw: false,
      yjjldraw: false,
      khgxData: [],
      xzrydraw: false,
      addzpxq: {
        need: "",
        section: "",
        entryTime: "",
        duty: "",
        require: "",
        // 是
        username: "",
        company: "",
        phone: "",
        email: "",
        // 否
        zpzhiwei: "",
        zpnumber: "",
        zpmoney1: "",
        zpmoney2: ""
      },
      zpxqanswer_jsonBF: "",
      // zpxqData: [],
      departList: [],
      zpxqrows: {},
      drawerTitle: "",
      disabled: "",
      ggDataLists: [
        { name: "张总" },
        { name: "李总" },
        { name: "宏山总" },
        { name: "杨总" },
        { name: "其他" }
      ]
    };
  },
  props: ["customerId", "tagSource", "customerName"],
  watch: {
    //方式2：使用vue实例提供的watch选项
    // a_income1(newValue, oldValue){
    //     console.log('age被修改啦，原值：' + oldValue + '，新值：' + newValue);
    // },
  },
  computed: {
    ...mapState({ is_hide: state => state.param.is_hide })
  },
  mounted() {
    //  console.log(this.$route.query.disabled);
    this.disabled = this.$route.query.disabled ? true : false;
    // 请求信息
    wqinfo({ customerId: this.customerId, tagSource: this.tagSource }).then(
      res => {
        if (res.msg == "success") {
          this.qu_lists = res.data;
        } else {
          this.$message.error({ message: `msg` });
        }
      }
    );
    wqdepart().then(res => {
      if (res.msg == "success") {
        this.departList = res.dataList;
      }
    });
    // 定时器保存用户数据
    // var self = this;
    // window.xiaoshou_time = setInterval(() => {
    //   console.log("保存的", self.qu_lists);
    // }, 2000);
  },
  destroyed() {
    //导航离开时清除定时器
    // if (window.xiaoshou_time) {
    //   clearInterval(window.xiaoshou_time);
    // }
  },
  methods: {
     /***滑动限制***/
    stop() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },
    /***取消滑动限制***/
    move() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", mo, false);
    },
    ...mapMutations(["CHANGE_OVERFLOW_HIDE"]),
    getval(rows) {
      var row = JSON.parse(JSON.stringify(rows));
      var index = row.referrer.indexOf("其他");
      if (index > -1) {
        row.referrer.splice(index, 1);
      }
      return row.referrer.join(",");
    },
    submitHandel() {
      this.handelCreate(this.qu_lists).then(res => {
        if (res.code == 200) {
          this.$message.success({ message: `提交成功` });
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        } else {
          this.$message.error({ message: `${res.message}` });
        }
      });
    },

    ggxzHandle(item) {
      // var url=item.select_link.slice(0,item.select_link.indexOf("?"));
      // var userid=item.select_link.slice(item.select_link.indexOf("?"));
      // // customerName=财付通--微信支付&customerId=599
      // console.log(url,userid);
      this.$router.push({
        path: item.select_url,
        query: { customerId: this.customerId, customerName: this.customerName }
      });
      // <router-link :to='{path:"/create",query:{userid:item.userId}}' style="float:right;">给他派单</router-link>
    },
    yjjlHandle() {
       this.stop();
      this.CHANGE_OVERFLOW_HIDE(true);
      this.yjjldraw = true;
      // getkehu
      gettail1({ supplier_id: this.customerId }).then(res => {
        this.khgxData = res.data;
      });
    },
    editHandelSave(rows, len) {
     
      var rowsData = {};
      var row = JSON.parse(JSON.stringify(rows));
      rowsData.id = row.id;
      rowsData.remark = row.remark;
      rowsData.contact_person_email = row.contact_person_email;
      rowsData.referrer = JSON.stringify(row.referrer);
      rowsData.referrer_other = row.referrer_other;
      rowsData.is_contact_person = row.is_contact_person?1:0;
      wqeditQ([rowsData]).then(res => {
        if (res.code == 200) {
          this.$message.success({
            message: `保存成功`
          });
        } else {
          this.$message.error({
            message: `${res.message}`
          });
        }
      });
      row.is_edit = false;
      this.$set(this.khgxData, len, row);
    },

    zpxqHandelSave() {
      for (var i = 0; i < this.zpxqrows.answer_json.length; i++) {
        var row = this.zpxqrows.answer_json[i];
        if (!row.need) {
          this.$message.error({ message: `请选择指定被招聘人！` });
          return false;
        } else {
          if (row.need == "是") {
            if (!row.section) {
              this.$message.error({ message: `请选择需求部门！` });
              return false;
            }
            if (!row.entryTime) {
              this.$message.error({ message: `请选择入职时间！` });
              return false;
            }
            if (!row.duty) {
              this.$message.error({ message: `请填写职位职责！` });
              return false;
            }
            if (!row.require) {
              this.$message.error({ message: `请填写任职要求！` });
              return false;
            }
          } else {
            if (!row.section) {
              this.$message.error({ message: `请选择需求部门！` });
              return false;
            }
            if (!row.entryTime) {
              this.$message.error({ message: `请选择入职时间！` });
              return false;
            }
            if (!row.duty) {
              this.$message.error({ message: `请填写职位职责！` });
              return false;
            }
            if (!row.zpzhiwei) {
              this.$message.error({ message: `请填写职位！` });
              return false;
            }
            if (!row.zpnumber) {
              this.$message.error({ message: `请填写招聘人数！` });
              return false;
            }
            if (!row.zpmoney1) {
              this.$message.error({ message: `请填写薪资范围！` });
              return false;
            }
            if (!row.zpmoney2) {
              this.$message.error({ message: `请填写薪资范围！` });
              return false;
            }
            if (!row.require) {
              this.$message.error({ message: `请填写任职要求！` });
              return false;
            }
          }
        }
      }

      this.handelCreate([this.zpxqrows]).then(res => {
        if (res.code == 200) {
          this.$message.success({ message: `保存成功` });
        } else {
          this.$message.error({ message: `${res.message}` });
        }
      });
      this.zpxqdraw = false;
    },
    addNewzpxqHandel(rows) {
      var addzpxq = JSON.parse(JSON.stringify(this.addzpxq));
      this.zpxqanswer_jsonBF = JSON.parse(
        JSON.stringify(this.zpxqrows.answer_json)
      );
      this.zpxqrows.answer_json.push(addzpxq);
    },
    zpxqHandle(rows, len) {
       this.stop();
      this.CHANGE_OVERFLOW_HIDE(true);
      this.zpxqdraw = true;
      rows.answer_json = rows.answer_json
        ? rows.answer_json
        : [JSON.parse(JSON.stringify(this.addzpxq))];
      this.zpxqanswer_jsonBF = rows.answer_json;
      // for(var i=0;i<this.qu_lists.length;i++){
      //   var qu_list=this.qu_lists[i];

      // }
      // this.qu_lists.map((row,index)=>{
      //   if(index==len){
      //     return row.answer_json=rows.answer_json;
      //   }
      // })
      this.zpxqrows = rows;
    },
    xzryHandle() {
       this.stop();
      this.CHANGE_OVERFLOW_HIDE(true);
      this.xzrydraw = true;
      gettail1({ supplier_id: this.customerId }).then(res => {
        this.khgxData = res.data;
      });
    },
    khgxHandle(icon) {
       this.stop();
      this.CHANGE_OVERFLOW_HIDE(true);
      this.khgxdraw = true;
      // getkehu
      gettail1({ supplier_id: this.customerId }).then(res => {
        this.khgxData = res.data;
      });
    },
    bfjlHandle() {
       this.stop();
      this.CHANGE_OVERFLOW_HIDE(true);
      this.bfjldraw = true;
      wqvisits({ customerId: this.customerId }).then(res => {
        if (res.msg == "success") {
          this.bfjlData = res.data;
        }
      });
    },
    bfjlDateHandle() {
      // this.bfjldraw = true;
      wqvisits({
        customerId: this.customerId,
        start_time: this.bf_startdate,
        endtime: this.bf_enddate
      }).then(res => {
        if (res.msg == "success") {
          this.bfjlData = res.data;
        }
      });
    },
    canceledit(row, len) {
      row.is_edit = false;
      this.$set(this.khgxData, len, row);
    },
    changeedit(row, len) {
      this.khgxData.map((item, index) => {
        if (len == index) {
          row.is_edit = !row.is_edit;
          this.$set(this.khgxData, len, row);
        } else {
          item.is_edit = false;
        }
      });
    },
    changeshow(row, len) {
      this.khgxData.map((item, index) => {
        if (len == index) {
          row.is_ggDc = !row.is_ggDc;
          row.is_edit = false;
          this.$set(this.khgxData, len, row);
        } else {
          item.is_ggDc = false;
          item.is_edit = false;
        }
      });
    },
    showandhide(row, len) {
      this.khgxData.map((item, index) => {
        if (len == index) {
          row.is_show = !row.is_show;
          this.$set(this.khgxData, len, row);
        } else {
          item.is_show = false;
        }
      });
    },

    khgxhandleClose(done) {
      this.move();
      this.CHANGE_OVERFLOW_HIDE(false);
      this.bfjldraw = false;
      this.khgxdraw = false;
      this.yjjldraw = false;
      this.xzrydraw = false;
    },
    zpxqhandleClose() {
       this.move();
      this.CHANGE_OVERFLOW_HIDE(false);
      this.zpxqdraw = false;
      this.zpxqrows.answer_json = this.zpxqanswer_jsonBF;
    },
    fileBeforeRemove(file, fileList, row) {
      // this.$confirm(`确定移除 ${file.name}？`);
      row.file_json = row.file_json.filter((val, index) => {
        return val.name != file.name;
      });
    },
    file_handle_change(res, file, fileList, row) {
      if (res.code == "200") {
        row.file_json.push({ name: file.name, url: res.msg });
      }
      this.$message.success({
        message: `${file.name}上传成功`,
        duration: "3000",
        fontSize: "24px"
      });
    },

    handelCreate(rows) {
      var company_code = this.customerId;
      var user_id = localStorage.getItem("userid");
      var user_name = localStorage.getItem("userName");
      var rowData = [];
      for (var j = 0; j < rows.length; j++) {
        var row = JSON.parse(JSON.stringify(rows[j]));
        // var row= Object.assign({}, rows[j]);
        var vals = {};
        if (row.select_type == "check") {
          row.select_value = JSON.stringify(row.select_value);
        }
        // if (row.select_type == "no") {
        row.answer_json = row.answer_json
          ? JSON.stringify(row.answer_json)
          : "";
        // }
        vals.company_code = company_code;
        vals.user_id = user_id;
        vals.user_name = user_name;
        vals.q_id = row.q_id;
        vals.select_value = row.select_value;
        vals.select_other = row.select_other;
        vals.answer = row.answer;
        vals.file_json = JSON.stringify(row.file_json);
        vals.answer_json = row.answer_json;
        rowData.push(vals);
      }
      // // 请求信息
      return wqcreate(rowData).then(res => {
        return res;
      });
    },

    fileHandleRemove(file, fileList) {
      this.$message.success({ message: `${file.name} 删除成功` });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    }
  }
};
</script>

<style scoped>
.qu_card_nodata {
  text-align: center;
  margin-top: 30px;
  line-height: 20px;
  font-size: 14px;
  color: #999;
}
.qu_bfcard_box {
  margin-left: 12px;
  border-left: 1px solid #f1f1f1;
  padding-bottom: 10px;
}
.qu_bfcard_box:last-child {
  padding-bottom: 0;
}
.qu_bfcard_a {
  line-height: 24px;
  font-size: 15px;
  color: #333;
}
.qu_bfcard_a span:nth-child(1) {
  margin-right: 10px;
}
.qu_bfcard_b {
  min-height: 20px;
  line-height: 20px;
  font-size: 13px;
  color: #999;
  position: relative;
}
.qu_bfcard_btime {
  line-height: 24px;
  font-size: 14px;
  color: #999;
  position: relative;
  padding: 0px 12px 0;
}
.qu_bfcard_round {
  line-height: 8px;
  width: 8px;
  height: 8px;
  position: absolute;
  display: inline-block;
  background: #fff;
  border: 3px solid #409eff;
  left: -7px;
  top: 4px;
  border-radius: 50%;
}
.qu_bfcard_b span:nth-child(1) {
  position: absolute;
  top: 0;
  left: 0;
  width: 75px;
  display: block;
}
.qu_bfcard_b span:nth-child(2) {
  margin-left: 75px;
  display: block;
}
.qu_bfcard_bdec {
  color: #555;
}

.qu_card_data {
  margin-right: 10px;
}
.qu_card_tj {
  line-height: 24px;
  color: #666;
  font-size: 14px;
  padding: 8px 0 0;
}
.qu_card_share {
  font-size: 22px;
  color: #999;
  display: none;
}
.qu_card_b_icon {
  margin: 5px 5px 0 0;
}

.qu_card_b_icon_bz {
  margin: 4px 5px 0 0;
}

.qu_card_icon {
  position: absolute;
  right: 10px;
  top: 13px;
}
.qu_card_icon .qu_card_btn_all {
  line-height: 30px;
  font-size: 14px;
  color: #409eff;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  margin-left: 8px;
  -webkit-user-select: none;
}
.qu_card_cont {
  margin: 3px 12px 10px;
  border: 1px solid #f1f1f1;
  padding: 10px 10px 10px 13px;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  background: #fff;
}
.qu_card_cont_bf {
  margin: 0px 12px 0px;
  border: 1px solid #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  background: #fff;
}
.qu_card_c {
  margin-top: 3px;
}
.qu_card_c span {
  display: inline-block;
  line-height: 16px;
  padding: 1px 10px;
  font-size: 12px;
  border-radius: 3px;
  margin-right: 3px;
}
.qu_card_c span:nth-child(1) {
  background: #ffede9;
  color: #ff8062;
}
.qu_card_c span:nth-child(2) {
  background: #e2f5ed;
  color: #37c088;
}
.qu_card_c span:nth-child(3) {
  background: #fef1e1;
  color: #f4b15e;
}
.qu_card_d {
  border-top: 1px solid #f1f1f1;
  padding: 10px 0 0;
  margin-top: 10px;
  text-align: right;
  display: flex;
  display: -webkit-flex;
}
.qu_card_d button {
  width: 50%;
}
.qu_card_b p {
  line-height: 24px;
  font-size: 14px;
  color: #666;
}
.qu_card_a p:nth-child(1) {
  line-height: 24px;
  font-size: 16px;
  color: #333;
  display: inline-block;
  font-weight: normal;
}
.qu_card_a p:nth-child(2) {
  line-height: 24px;
  font-size: 13px;
  color: #999;
  margin-left: 10px;
}
.qu_download {
  width: 90px;
  height: 80px;
  line-height: 20px;
  color: #666;
  position: relative;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
}
.qu_download_a {
  font-size: 40px;
  display: block;
  padding: 10px 0 0;
  text-align: center;
}
.qu_download_b {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.qu_zpxq_add {
  padding: 0 12px;
  margin-bottom: 20px;
}
.qu_zpxq_add button {
  width: 100%;
  border: 1px dashed #dcdfe6;
  font-weight: normal;
}
.qu_draw_btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 850px;
  padding: 10px 12px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  background: #fff;
  display: flex;
  border-top: 1px solid #f0f0f0;
}
.qu_draw_btn button {
  width: 50%;
  padding: 11px 15px;
  font-size: 15px;
  font-weight: normal;
}
.qu_radio_one {
  font-size: 12px;
  line-height: 12px;
  padding: 2px 7px;
  transform: scale(0.8);
  -webkit-transform: scale(0.8);
  display: inline-block;
  transform: scale(0.8);
  border: 1px solid rgb(64, 158, 255);
  color: #409eff;
  border-radius: 20px;
}
.qu_check_one {
  font-size: 12px;
  line-height: 12px;
  padding: 2px 7px;
  transform: scale(0.8);
  -webkit-transform: scale(0.8);
  display: inline-block;
  transform: scale(0.8);
  border: 1px solid #f09951;
  color: #f09951 /*  */;
  border-radius: 20px;
}
.qu_body_h3 {
  line-height: 30px;
  font-size: 16px;
  color: #000;
  margin: 15px 0 0 10px;
  font-weight: normal;
}
/* 
.ggDc_hide {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
} */
.qu_open_bi {
  color: red;
}
.qu_open_box {
  padding: 0 10px;
}
.zpxq_open_box {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f1f1f1;
}
.qu_open_a {
  margin: 10px 0;
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
.qu_ta_a1 {
  text-align: right;
  width: 106px;
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  color: #333;
  font-weight: normal;
}

.qu_ta_a2 {
  margin-left: 111px;
  position: relative;
}
.qu_card_a1 {
  text-align: right;
  width: 60px;
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  color: #333;
  font-weight: normal;
}

.qu_card_a2 {
  margin-left: 65px;
  position: relative;
}
.qu_pos_top {
  top: 5px;
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
.qu_card_active{
  box-shadow: 0 0 5px rgba(64,158,255,0.5);
}
</style>