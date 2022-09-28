import VueRouter from 'vue-router'

// 登录页，默认页面
import Login from '../view/Login.vue'
// 首页，查询航班
import Home from '../view/Home.vue'
// 注册
import Register from '../view/Register.vue'
// 航班列表
import FlightList from '../view/FlightList.vue'
// 航班
import Flight from '../view/Flight.vue'
// 订单列表
import OrderList from '../view/OrderList.vue'
// 消息中心
import Message from '../view/Message.vue'
// 用户信息
import User from '../view/User.vue'
// 用户主页
import UserMain from '../components/UserMain.vue'
// 修改密码
import Password from '../view/Password.vue'
// 修改信息
import UserInfo from '../view/UserInfo.vue'

// 测试页面
import MyTest from '../components/MyTest.vue'

const router = new VueRouter({
    mode:'history',
    routes:[
        {
            // name:'login',
            path:'/',
            component:Login,
            meta:{
                pass:true
            }
        },
        {
            path:'/home',
            component:Home,
            meta:{
                pass:true
            }
        },
        {
            path:'/register',
            component:Register,
            meta:{
                pass:true
            }
        },
        {
            name:'flightList',
            path:'/flightList',
            component:FlightList,
            meta:{
                pass:true
            },
            
        },
        {
            name:'flight',
            path:'/flight',
            component:Flight,
            meta:{
                pass:true
            },
            props:true
        },
        {
            name:'orderList',
            path:'/orderList',
            component:OrderList,
            // props($router){
            //     return{
            //         pageOut:$router.query.page
            //     }
            // }
            props:true
        },
        {
            path:'/message',
            component:Message
        },
        {
            path:'/userMain',
            component:UserMain,
            children:[
                {
                    path:'user',
                    component:User
                },
                {
                    path:'password',
                    component:Password
                },
                {
                    path:'userInfo',
                    component:UserInfo
                }
            ],
        },
        {
            path:'/test',
            component: MyTest,
            meta:{
                pass:true
            }
        }
    ]
})

router.beforeEach((to,from,next)=>{
    console.log(to,from)                                                                                                                                                                                           
    if(to == from){
        return
    }
    if(sessionStorage.getItem('token') || to.meta.pass){
        next()
    }else{
        alert("未登录，无权限访问！")
    }
})

export default router