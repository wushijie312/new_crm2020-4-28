
import request from '@/untils/request'
   	var HOSTNAME = window.location.hostname;
     var PATHNAME = window.location.pathname.indexOf("crm_page_test");
     
    //  if(HOSTNAME=="localhost"){//本地
      if(HOSTNAME=="10.0.0.56"){//本地
      // if(HOSTNAME=="192.168.0.9"){//本地192.168.20.100
        // if(HOSTNAME=="192.168.20.102"){//本地192.168.20.100



         var htp = 'http://101.200.137.247:9112/supplierRelation'
        //  var htp = 'http://u.easypnp.com/supplierRelation'



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

export function tblist(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/customerDetail/tblist.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
export function getPersonInfo(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/visit/getPersonInfo.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}

export function alldepartmentSale(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/depSale/search/alldepartmentSale.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}



export function editkpi(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/salkpi/editkpi.do',
    method: 'post',
    data
  })
}
export function salesman(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/salkpi/countbydepartid.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
export function salekpisure(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/salkpi/countbyuserid.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
export function salkpi(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/salkpi/count.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}

export function getisread(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/task/getisread.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}

export function getxqlist(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/task/getListByCode.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
export function needdata(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/visit/personCount.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
export function createRw(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/task/create',
    method: 'post',
    params: {"param":JSON.stringify(data)}
  })
}
export function getRwList(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/task/queryByid',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
export function setxiugai(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/task/updatebyid',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
export function getTree(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/visit/getDDTree',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}
export function infobyUser(data) {
  return request({
    // url: htp + '/visit/data',
    url: htp + '/visit/infobyUser.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
  })
}

export function getSheng(data) {
  return request({
    url: htp + '/visit/getarea.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
    // data
  })
}
export function getgxtp(data) {
  return request({
    url: htp + '/visit/getTo_person.do',
    method: 'get',
    params: {"param":JSON.stringify(data)}
    // data
  })
}

export function biaotou1(data) {
  return request({
    url: htp + '/visit/count',
    method: 'post',
    params: {"param":JSON.stringify(data)}
  })
}


export function adddata(data) {
  let userid = localStorage.getItem('userid')
  let username = localStorage.getItem('userName')
  let departmentId = localStorage.getItem('departmentId')
  let departmentName = localStorage.getItem('departmentName')
  let Object1 = {}
  let all = Object.assign(Object1, data, { 'user_id': userid, 'user_name': username, 'dept_id': departmentId, 'dept_name': departmentName })
  console.log(all)
  return request({
    url: htp + '/visit/create',
    method: 'post',
    params: {"param":JSON.stringify(all)}
    
  })
}


export function gettail(data) {
  let userid = localStorage.getItem('userid')

  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userid': userid})

  return request({
    url: htp + '/customer/data',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function gettail1(data) {
  let userid = localStorage.getItem('userid')

  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userid': userid})

  return request({
    url: htp + '/relation/info',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  }).then(body => {
    if (body.code === 200) {
      body.data.map(item => {
        item.referrer = item.referrer?JSON.parse(item.referrer):[];
        item.is_contact_person = item.is_contact_person?true:false;
        return item;
      })
    }
    return body;
  })
}

export function updata1(data) {
  // let userid = localStorage.getItem('userid')
  // let Object1 = {}
  // let all = Object.assign(Object1, data, { })
  // console.log(all)
  return request({
    url: htp + '/relation/update',
    method: 'post',
    data
  })
}

export function chakehu(data) {
  let userid = localStorage.getItem('userid')

  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userid': userid})
  console.log('lll',all);
  return request({
    url: htp + '/customer/data',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}




export function chabumen(data) {
  let userid = localStorage.getItem('userid')
  let username = localStorage.getItem('userName')
  let role = localStorage.getItem('role')

  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userId': userid, 'userName': username, "role": role })

  return request({
    url: `http://wxtest1.98ep.com/supplierRelation/visitPlan/saleInfo/search/department`,
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function chakh(data) {
  let userid = localStorage.getItem('userid')
  let username = localStorage.getItem('userName')
  let role = localStorage.getItem('role')

  let Object1 = {}
  let all = Object.assign(Object1, data, { 'userId': userid, 'userName': username, "role": role })

  return request({
    url: `http://wxtest1.98ep.com/supplierRelation/visitPlan/saleInfo/search/customer`,
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function getbfl(data) {

  let Object1 = {}
  let all = Object.assign(Object1, data, {})

  return request({
    url:  htp + '/visit/leaderCount',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function customerpoolData(data) {
  let Object1 = {}
  let all = Object.assign(Object1, data, {})
  return request({
    url:  htp + '/relation/customerPool',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function departData(data) {
  let Object1 = {}
  let all = Object.assign(Object1, data, {})
  return request({
    url:  htp + '/relation/getDepart',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function customerTag(data) {
  let Object1 = {}
  let all = Object.assign(Object1, data, {})
  return request({
    url:  htp + '/relation/getCustomerTag',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function addCustomer(data) {
  let Object1 = {}
  let all = Object.assign(Object1, data, {})
  return request({
    url:  htp + '/customer/addCustomer',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function flowinC(data) {
  let Object1 = {}
  let all = Object.assign(Object1, data, {})
  return request({
    url:  htp + '/customer/flowIn',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function salers(data) {
  let Object1 = {}
  let all = Object.assign(Object1, data, {})
  return request({
    url:  htp + '/relation/getAllUserInfo',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function providerList(data) {
  let Object1 = {}
  let all = Object.assign(Object1, data, {})
  return request({
    url:  htp + '/provider/getProviderList',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function providerXq(data) {
  let Object1 = {}
  let all = Object.assign(Object1, data, {})
  return request({
    url:  htp + '/provider/providerDetail',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function talent(data) {
  let Object1 = {}
  let all = Object.assign(Object1, data, {})
  return request({
    url:  htp + '/provider/getTalent',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}
export function talentXq(data) {
  let Object1 = {}
  let all = Object.assign(Object1, data, {})
  return request({
    url:  htp + '/provider/talentDetail',
    method: 'post',
    params: {"param":JSON.stringify(all)}
  })
}