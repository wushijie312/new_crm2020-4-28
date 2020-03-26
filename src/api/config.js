/* eslint-disable space-infix-ops */
/* eslint-disable spaced-comment */
/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable standard/object-curly-even-spacing */
/* eslint-disable key-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable space-before-function-paren */
// import request from '@/untils/request'


// var htp = 'http://172.16.1.48:9111/supplierRelation'
// var htp = 'http://u.easypnp.com/supplierRelation'
//  var htp = 'http://172.16.0.189:9112/supplierRelation'
//  var htp = 'http://10.0.2.130:9112/supplierRelation'
// var htp = 'http://101.200.137.247:9112/supplierRelation'
// var process_env=process.env.NODE_ENV;
// if(process_env=="development"){
//   var htp = 'http://101.200.137.247:9112/supplierRelation'
// }else if(process_env='production'){
//   var htp = 'http://u.easypnp.com/supplierRelation'
// }

// let username = localStorage.setItem('type' ,1)
// let departmentId = localStorage.getItem('departmentId')
// let departmentName = localStorage.getItem('departmentName')
import request from '@/untils/request'
   	var HOSTNAME = window.location.hostname;
   	var PATHNAME = window.location.pathname.indexOf("crm_page_test");
     if(HOSTNAME=="localhost"){//本地
      // if(HOSTNAME=="10.0.0.56"){//本地
         var htp = 'http://101.200.137.247:9112/supplierRelation'
      // var htp = 'http://101.200.137.247:9112/supplierRelation'
    	// var htp = 'http://172.16.0.189:9112/supplierRelation'	
//    	var htp = 'http://172.16.0.176:9112/supplierRelation'
//    	var htp = 'http://101.200.137.247:9112/supplierRelation'
   	}else if(HOSTNAME="u.easypnp.com"){
   		if(PATHNAME>-1){//测试
		 	var htp = 'http://101.200.137.247:9112/supplierRelation'
   		}else{//正式
   			var htp = 'http://u.easypnp.com/supplierRelation'
   		}
   }



//  问卷调查 start
// 头部信息
export function wqtopinfo(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/question/topinfo.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
export function wqtaskinfo(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/question/taskinfo.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}


export function wqcustomers(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/question/customers.do',
    method: 'get',
    params: { "param": JSON.stringify(data) }
  })
}

export function wqcreate(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/question/create.do',
    method: 'post',
    data
  })
}
export function wqeditQ(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/relation/editQ.do',
    method: 'post',
    data
  })
}
export function wqdepart(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/relation/getDepart.do',
    method: 'get',
    params: { "param": JSON.stringify(data) }
  })
}

// export function wqinfo(data) {
//   return request({
//     // url: htp + '/visit/data',
//     url: htp + '/question/info.do',
//     method: 'get',
//     params: {"param":JSON.stringify(data)}
//   })
// }
export function wqinfo(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/question/info.do',
    method: 'get',
    params: { "param": JSON.stringify(data) }
  }).then(body => {
    if (body.code === 200) {
      body.data.map((item,index) => {
        item.select_values = item.select_values?JSON.parse(item.select_values):'';
        if(item.select_type == "check"){
          item.select_value=item.select_value?JSON.parse(item.select_value):[];
        }
        // if(item.select_type=="no"){
          item.answer_json=item.answer_json?JSON.parse(item.answer_json):'';
        // }
        if(item.select_link=="el-icon-thumb" ){
          item.select_url=item.select_url?JSON.parse(item.select_url):[];
        }
        
        item.file_json = item.file_json?JSON.parse(item.file_json):'';
        return item;
      })
    }
    return body;
  })
}

export function wqeditcompany(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/question/editcompany.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}

export function wqvisits(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/question/visits.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
//  问卷调查 end

// 获取权限token start

export function gettoken(data) {
  return request({
    // url: htp + '/visit/data',
    url:'https://openapi.yangguangqicai.com/bi2crm/oauth/token?grant_type=client_credentials&client_id=crmOnline&client_secret=03ec615459ed779237b48b5bbac5d708&scopes=read',
    method: 'post',
    data
  })
}

export function iframeKB(data) {
  return axios.create({
    baseURL: 'https://openapi.yangguangqicai.com/online/dashboard',
    headers: {'Content-Type': 'application/json',Authorization:localStorage.getItem('Taccess_token')},
    method: 'get',
    params: {"param":JSON.stringify(data)}
  });
}

// 获取权限token end


//日报类型
export function getisread1(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/daily/getisread.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}

export function deldaily(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/daily/deldaily.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}

export function reply(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/daily/reply.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
export function delreply(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/daily/delreply.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}

export function dailycreate(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/daily/create.do',
    method: 'post',
    data
  })
}

export function queryByid(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/daily/queryByid.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}

export function closenotice(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/center/closenotice.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}

export function upload() {
  return htp+'/daily/upload.do'
}
export function templateshow(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/daily/templateshow.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
//

export function pathshow(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/center/treepathshow.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
export function noticeshow(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/center/noticeshow.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
export function adddata(data) {
  let userid = localStorage.getItem('userid')
  let username = localStorage.getItem('userName')
  let departmentId = localStorage.getItem('departmentId')
  let departmentName = localStorage.getItem('departmentName')
  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userId': userid, 'userName': username, 'departmentId': departmentId, 'departmentName': departmentName })
  console.log(all)
  return request({
    url: htp + '/saleInfo/add',
    method: 'post',
    params: { "param": JSON.stringify(all) }

  })
}

export function chakehu(data) {
  let userid = localStorage.getItem('userid')

  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userid': userid })

  return request({
    url: htp + '/customer/data',
    method: 'post',
    params: { "param": JSON.stringify(all) }
  })
}
export function updata(data) {
  let userid = localStorage.getItem('userid')
  let username = localStorage.getItem('userName')
  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userId': userid, 'userName': username })

  return request({
    url: htp + '/saleInfo/update',
    method: 'post',
    params: { "param": JSON.stringify(all) }
  })
}

export function needdata(data) {
  let userid = localStorage.getItem('userid')
  
  let username = localStorage.getItem('userName')

  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userId': userid, 'userName': username})

  return request({
    url: htp + '/saleInfo/search/user',
    method: 'post',
    params: { "param": JSON.stringify(all) }
  })
}

export function chabumen(data) {
  let userid = localStorage.getItem('userid')
  let username = localStorage.getItem('userName')
  // let departmentId = localStorage.getItem('departmentId')
  // let departmentName = localStorage.getItem('departmentName')
  // let role = localStorage.getItem('role')
  // let type = localStorage.getItem('type')


  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userId': userid, 'userName': username })

  // alert("userid" + userid)
  // alert("username" + username)
  // alert("departmentId" + departmentId)
  // alert("departmentName" + departmentName)
  // alert("role" + role)
  // alert("type" + type)
  return request({
    url: htp + '/saleInfo/search/department',
    method: 'post',
    params: { "param": JSON.stringify(all) }
  })
}
export function chazhandui(data) {
  let userid = localStorage.getItem('userid')
  let username = localStorage.getItem('userName')
  // let departmentId = localStorage.getItem('departmentId')
  // let departmentName = localStorage.getItem('departmentName')
  // let role = localStorage.getItem('role')
  // let type = localStorage.getItem('type')


  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userId': userid, 'userName': username })

  // alert("userid" + userid)
  // alert("username" + username)
  // alert("departmentId" + departmentId)
  // alert("departmentName" + departmentName)
  // alert("role" + role)
  // alert("type" + type)
  return request({
    url: htp + '/saleInfo/search/team',
    method: 'post',
    params: { "param": JSON.stringify(all) }
  })
}

export function chakh(data) {
  let userid = localStorage.getItem('userid')
  let username = localStorage.getItem('userName')

  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userId': userid, 'userName': username})

  return request({
    url: htp + '/saleInfo/search/customer',
    method: 'post',
    params: { "param": JSON.stringify(all) }
  })
}


export function getkehu(data) {

  let Object1 = {}
  let all = Object.assign(Object1, data, { 'dept_id': localStorage.getItem('departmentId')})

  return request({
    url:htp + '/relation/data',
    method: 'post',
    params: { "param": JSON.stringify(all) }
  })
}

export function getpics(data) {
  let userid = localStorage.getItem('userid')

  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userid': userid})

  return request({
    url: htp + '/birthday/imginfo',
    method: 'get',
    params : all
  })
}

export function bumenxq(data) {

  let Object1 = {}
  let all = Object.assign(Object1, data, {})

  return request({
    url: htp + '/depSale/search/departmentSale',
    method: 'get',
    params :  { "param": JSON.stringify(all) }
  })
}
export function getechars(data) {

  let Object1 = {}
  let all = Object.assign(Object1, data, { })

  return request({
    url: htp + '/depSale/search/yearInfo',
    method: 'get',
    params :  { "param": JSON.stringify(all) }
  })
}

export function getcyyj(data) {

  let Object1 = {}
  let all = Object.assign(Object1, data, { })

  return request({
    url: htp + '/depSale/search/userInfo',
    method: 'get',
    params :  { "param": JSON.stringify(all) }
  })
}
export function getkhqk(data) {

  let Object1 = {}
  let all = Object.assign(Object1, data, { })

  return request({
    url: htp + '/depSale/search/customerInfo',
    method: 'get',
    params :  { "param": JSON.stringify(all) }
  })
}

export function getyyqk(data) {

  let Object1 = {}
  let all = Object.assign(Object1, data, {})

  return request({
    url:  htp + '/customerDetail/data',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}

export function gettbjl(data) {
  let role = localStorage.getItem('role')
  let Object1 = {}
  let all = Object.assign(Object1, data, {role:role})

  return request({
    url:  htp + '/depSale/search/todaySaleInfo',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}

export function gettc(data) {
  let role = localStorage.getItem('role')
  let Object1 = {}
  let all = Object.assign(Object1, data, {role:role})

  return request({
    url:  htp + '/saleInfo/search/words',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}




