/* eslint-disable indent */
/* eslint-disable quotes */
import Vue from 'vue'
import Router from 'vue-router'
const index5 = () => import('@/view/khgx/kehuguanxi')
const shengri = () => import('@/view/khgx/shengri')
const xsleader = () => import('@/view/leadJh/xsleader')
const bfleader = () => import('@/view/leadJh/bfleader')
const xsuser = () => import('@/view/userJh/xsuser')
const bfuser = () => import('@/view/userJh/bfuser')
const kehuedit = () => import('@/view/khgx/kehuedit')
const leadzong = () => import('@/view/leadzong')
const leadbmjy = () => import('@/view/leadChild/leadbmjy')
const cyyj = () => import('@/view/leadChild/cyyj')
const khqk = () => import('@/view/leadChild/khqk')
const bfl = () => import('@/view/leadChild/bfl')
const yyqk = () => import('@/view/leadChild/yyqk')

const jrwc = () => import('@/view/tanchujh/jrwc')
const zbwxd = () => import('@/view/tanchujh/zbwxd')

const znzx = () => import('@/view/renwu/index')
const create = () => import('@/view/renwu/create')
const xq = () => import('@/view/renwu/xq')


const rbznzx = () => import('@/view/report/index')
const rbcreate = () => import('@/view/report/create')

// import rbxq from '@/view/report/xq'
const CreateData = () => import('@/view/userJh/bfuserdata/createUse')
const xsCreateData = () => import('@/view/userJh/xsuserdata/index')


const huizong = () => import('@/view/huizong/index')
const bmjjl = () => import('@/view/huizong/bmjjl')

const kpi = () => import('@/view/kpi/index')


const khgxXq = () => import('@/view/khgx/khgxXq')


const newKehu = () => import('@/view/new_kehu/index')
const addCustomer = () => import('@/view/new_kehu/addcustomer')


const supply = () => import('@/view/supply/supply')
const supplyd = () => import('@/view/supply/supplyd')
const talent = () => import('@/view/supply/talent')
const talentd = () => import('@/view/supply/talentd')


// 问卷调查 start 

const dcTabs = () => import('@/view/questionDc/dcTabs')
const customers = () => import('@/view/questionDc/customers')
const iframe = () => import('@/view/questionDc/iframe')

// 销售工作台 start
const Gzdetails = () => import('@/view/salework/gzdetails')

// xsuser
// 问卷调查 end

Vue.use(Router)

let router =new Router({
  mode:'hash',
  routes: [
    {
      path: '/',
      component: xsuser,
      meta: {index: 1}
    },
    {
      path: '/bmjjl',
      component: bmjjl,
      meta: {index: 1,title:'部门净利'}
    },
    {
      path: '/gzdetails',
      component: Gzdetails,
      meta: {index: 1,title:'销售详情'}
    },
    {
      path: '/iframe',
      component: iframe,
      meta: {title:'外部资源'}
    },
    {
      path: '/customers',
      component: customers,
      meta: {title:'问卷报告'}
    },
    {
      path: '/wjdc',
      component: dcTabs,
      meta: {title:'问卷调查'}
    },
    {
      path: '/zbwxd',
      name: 'zbwxd',
      component: zbwxd,
      meta: {index: 1}
    },
    {
      path: '/rbznzx',
      name: 'rbznzx',
      component: rbznzx,
      meta: {index: 1,title:'BP&周报'}
    },
    {
      path: '/rbcreate',
      name: 'rbcreate',
      component: rbcreate,
      meta: {index: 1,title:'BP&周报'}
    },
    {
      path: '/khgxXq',
      component: khgxXq,
      meta: {index: 1}
    },
    {
      path: '/newkehu',
      component: newKehu,
      meta: {index: 1,title:'客户池'}
    },
    {
      path: '/kpi',
      component: kpi,
      meta: {index: 1,title:'KPI详情'}
    },
    {
      path: '/huizong',
      name: 'huizong',
      component: huizong,
      meta: {index: 1,title:'部门净利'}
    },

    {
      path: '/xiaoshou',
      name: 'index2',
      component: xsleader,
      meta: {index: 1,title:'销售日报'}
    },

    {
      path: '/baifang',
      component: bfleader,
      meta: {index: 1,title:'拜访日报'}
    },

    {
      path: '/baifang1',
      component: bfuser,
      meta: {index: 1,title:'拜访日报'}
    },

    {
      path: '/xiaoshou1',
      component: xsuser,
      meta: {index: 1,title:'销售日报'}
    },

    {
      path: '/kehu',
      component: index5,
      meta: {index: 1,title:'客户图谱'}
    },

    {
      path: '/shengri',
      component: shengri,
      meta: {index: 1}
    },

    {
      path: '/xsleader',
      component: xsleader,
      meta: {index: 1,title:'销售日报'}
    },
    {
      path: '/kehuedit',
      component: kehuedit,
      meta: {index: 0}
    },
    {
      path: '/leadzong',
      component: leadzong,
      meta: {index: 1}
    },
    {
      path: '/leadbmjy',
      component: leadbmjy,
      meta: {index: 0,title:'销售日报-lead部门详情'}
    },
    {
      path: '/cyyj',
      component: cyyj,
      meta: {index: 0}
    },
    {
      path: '/khqk',
      component: khqk,
      meta: {index: 0}
    },
    {
      path: '/bfl',
      component: bfl,
      meta: {index: 0}
    },
    {
      path: '/yyqk',
      component: yyqk,
      meta: {index: 0}
    },
    {
      path: '/tanchujh/jrwc',
      component: jrwc,
      meta: {index: 0,title:'销售详情'}
    },
    {
      path: '/createData',
      component: CreateData,
      meta: {index: 0,title:'销售日报'}
    },
    {
      path: '/xsCreateData',
      component: xsCreateData,
      meta: {index: 0,title:'销售日报'}
    },
    {
      path: '/znzx',
      component: znzx,
      meta: {index: 0,title:'我的派单'}
    },
    {
      path: '/create',
      component: create,
      meta: {index: 0,title:'新建任务'}
    },
    {
      path: '/xq',
      component: xq,
      meta: {index: 0}
    },
    {
      path: '/addCustomer',
      name: 'addCustomer',
      component: addCustomer,
      meta: {index: 0}
    },
    {
      path: '/supply',
      name: 'supply',
      component: supply,
      meta: {index: 0,title:"供应商图谱"}
    },
    {
      path: '/supplyd',
      name: 'supplyd',
      component: supplyd,
      meta: {index: 0,title:"供应商图谱"}
    },
		{
      path: '/talent',
      name: 'talent',
      component: talent,
      meta: {index: 0,title:"人才图谱"}
    },
    {
      path: '/talentd',
      name: 'talentd',
      component: talentd,
      meta: {index: 0,title:"人才图谱"}
    },
   ]
})

// 根据路由设置标题
router.beforeEach((to, from, next) => {
  
  if (to.meta.title) { document.title = to.meta.title } // 在路由里面写入的meta里面的title字段
  // 设置钉钉导航栏标题 start
  window.dd.biz.navigation.setTitle({
    title: document.title, // 控制标题文本，空字符串表示显示默认文本
    onSuccess: result => {},
    onFail: err => console.error('设置导航栏标题错误', err)
  })
  next()
})
export default router;