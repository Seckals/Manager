import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import login from '../components/login/login'
import bound from '../components/login/bound'
import QRcode from '../components/login/QRcode'
// *********** 物料组件模块 ****************/
import matter from '../components/matter/matter'
// 物料查询，物料列表，物料详情
import matterList from '../components/matter/showMatter/matterList'
// 添加物料
import addmatter from '../components/matter/addMatter/addMatter'
import chooseOne from '../components/matter/addMatter/chooseOne'
import chooseTwo from '../components/matter/addMatter/chooseTwo'
import inpThreeInfo from '../components/matter/addMatter/inpThreeInfo'

// *********** 个人中心 ****************/
import me from '../components/me/person'
// 我已处理
import dealbox from '../components/me/hadDeal/dealbox'
// 我已处理报修
import replist from '../components/me/hadDeal/hadRep/replist'
import repinfo from '../components/me/hadDeal/hadRep/repinfo'
// 我的信息
import myInfo from '../components/me/myInfo'


// 台账
import standingBook from '../components/standingBook/index'
import bookbox from '../components/standingBook/list/box'
import booklist from '../components/standingBook/list/list'
import bookinfo from '../components/standingBook/list/info'
import bookadd from '../components/standingBook/add'

// 用户管理
import userbox from '../components/me/user/userbox'
import userList from '../components/me/user/userList'
import userinfo from '../components/me/user/userInfo'
import useradd from '../components/me/user/adduser'
// *********** 消息模块 ****************/
import notice from '../components/notice/notice'
import noticebox from '../components/notice/notice/noticebox'
import noticeList from '../components/notice/notice/noticeList'
import shownotice from '../components/notice/notice/shownotice'
import addNotice from '../components/notice/notice/addNotice'
import annouceBox from '../components/notice/annouce/annouceBox'
import annoumcementList from '../components/notice/annouce/AnnoumcementList'
import annoumcement from '../components/notice/annouce/Announcement'
import annoumcementInfo from '../components/notice/annouce/AnnouncementInfo'
// *********** 任务模块 ****************/
import work from '../components/work/work'
// 任务报修
import appRepbox from '../components/work/rep/appRepbox'
import appRepList from '../components/work/rep/appRepList'
import addRepMat from '../components/work/rep/addRepMat'
import repIteminfo from '../components/work/rep/repIteminfo'
// 任务已处理
import wdealbox from '../components/work/hadDeal/dealbox'
// 任务已处理报修
import wreplist from '../components/work/hadDeal/hadRep/replist'
import wrepinfo from '../components/work/hadDeal/hadRep/repinfo'
// 处理中
import dealBox from '../components/work/dealling/dealBox'
import dealling from '../components/work/dealling/dealling'
import dealinfo from '../components/work/dealling/dealinfo'
import first from '../components/work/dealling/first'
import second from '../components/work/dealling/second'
import third from '../components/work/dealling/third'
import frouth from '../components/work/dealling/frouth'
// 物业申请
import apply from '../components/apply/apply'

import user from '../components/apply/applyUser/user'
import repUser from '../components/apply/applyUser/repUser'

import self from '../components/apply/applySlef/self'
import repSelf from '../components/apply/applySlef/repSelf'
Vue.use(Router)

export default new Router({
	routes: [
	{
		path: '/App',
		component: App,
		children: [
	  // 物料模块
	  {
	  	path: 'matter',
	  	component: matter,
	  	children: [
	  	{
	  		path: 'matterList',
	  		component: matterList
	  	},
	  	{
	  		path: 'addMatter',
	  		component: addmatter,
	  		children: [
	  		{
	  			path: 'chooseOne',
	  			component: chooseOne
	  		},
	  		{
	  			path: 'chooseTwo',
	  			component: chooseTwo
	  		},
	  		{
	  			path: 'inpThreeInfo',
	  			component: inpThreeInfo
	  		},
	  		{
	  			path: '/',
	  			redirect: 'chooseOne'
	  		}
	  		]
	  	},
	  	{
	  		path: '/',
	  		redirect: 'matterList'
	  	}
	  	]
	  },
	// 个人中心
	{
		path: 'me',
		component: me,
		children: [
		{
			path: 'dealbox',
			component: dealbox,
			children: [
			{
				path: 'replist',
				component: replist
			},
			{
				path: 'repinfo',
				component: repinfo
			},
			{
				path: '/',
				redirect: 'replist'
			}
			]
		},
		{
			path: 'myInfo',
			component: myInfo
		},
		{
			path: 'userbox',
			component: userbox,
			children: [
			{
				path: 'userList',
				component: userList
			},
			{
				path: 'userinfo',
				component: userinfo
			},
			{
				path: 'useradd',
				component: useradd
			},
			{
				path: '/',
				redirect: 'userList'
			}
			]
		},
		{
			path: '/',
			redirect: 'dealbox'
		}
		]
	},
	// 通知模块
	{
		path: 'notice',
		component: notice,
		children: [
		{
			path: 'noticebox',
			component: noticebox,
			children: [
			{
				path: 'noticeList',
				component: noticeList
			},
			{
				path: 'shownotice',
				component: shownotice
			},
			{
				path: '/',
				redirect: 'noticeList'
			}
			]
		},
		{
			path:'annouceBox',
			component: annouceBox,
			children:[
				{
					path: 'annoumcementList',
					component: annoumcementList
				},
				{
					path: 'annoumcementInfo',
					component: annoumcementInfo
				},
				{
					path: '/',
					redirect: 'annoumcementList'
				}
			]
		},
		{
			path: 'addNotice',
			component: addNotice
		},
		{
			path: 'annoumcement',
			component: annoumcement
		},
		{
			path: '/',
			redirect: 'noticebox'
		}
		]
	},
	// 任务模块
	{
		path: 'work',
		component: work,
		children: [
			// 报修列表
			{
				path: 'appRepbox',
				component: appRepbox,
				children: [
				{
					path: 'appRepList',
					component: appRepList
				},
				{
					path: 'addRepMat',
					component: addRepMat
				},
				{
					path: 'repIteminfo',
					component: repIteminfo
				},
				{
					path: '/',
					redirect: 'appRepList'
				}
				]
			},
			// 已处理
			{
				path: 'wdealbox',
				component: wdealbox,
				children: [
				{
					path: 'wreplist',
					component: wreplist
				},
				{
					path: 'wrepinfo',
					component: wrepinfo
				},
				{
					path: '/',
					redirect: 'wreplist'
				}
				]
			},
			// 申请
			{
				path: 'apply',
				component: apply,
				children: [
				{
					path: 'user',
					component: user,
					children: [
					{
						path: 'repUser',
						component: repUser
					},
					{
						redirect: 'repUser',
						path: '/'
					}
					]
				},
				{
					path: 'self',
					component: self,
					children: [
					{
						path: 'repSelf',
						component: repSelf
					},
					{
						redirect: 'repSelf',
						path: '/'
					}
					]
				},
				{
					redirect: 'user',
					path: '/'
				}
				]
			},
			// 处理中
			{
				path: 'dealBox',
				component: dealBox,
				children: [
				{
					path: 'dealling',
					component: dealling,
					children: [
					{
						path: 'first',
						component: first
					},
					{
						path: 'second',
						component: second
					},
					{
						path: 'third',
						component: third
					},
					{
						path: 'frouth',
						component: frouth
					},
					{
						path: '/',
						redirect: 'first'
					}
					]
				},
				{
					path: 'dealinfo',
					component: dealinfo
				},
				{
					path: '/',
					redirect: 'dealling'
				}
				]
			},
			{
				path: '/',
				redirect: 'appRepbox'
			}
			]
		},
		// 台账
		{
			path: 'book',
			component: standingBook,
			children: [
				{
					path: 'info',
					component: bookbox,
					children: [
						{
							path: 'list',
							component: booklist
						},
						{
							path: 'info',
							component: bookinfo
						},
						{
							path: '/',
							redirect: 'list'
						}
					]
				},
				{
					path: 'add',
					component: bookadd
				},
				{
					path: '/',
					redirect: 'info'
				}
			]
		},
		{
			path: '/',
			redirect: 'work'
		}
		]
	},
	{
		path: '/bound',
		component: bound
	},
	{
		path: '/login',
		component: login
	},
	{
		path: '/code',
		component: QRcode
	},
	{
		path: '/',
		redirect: '/login'
	}
	]
})
