import VueRouter from 'vue-router'
import MainPage from '../components/MainPage.vue'
import ShopCart from '../components/ShopCart.vue'
import GoodsAdvertise from '../components/GoodsAdvertise.vue'
import ClassifyGoods from '../components/ClassifyGoods.vue'
import GoodsInfo from '../components/GoodsInfo.vue'
import UserLogin from '../components/UserLogin.vue'
import UserRegister from '../components/UserRegister.vue'
import OrderPage from '../components/OrderPage.vue'
import SubmitPage from '../components/SubmitPage.vue'
import InsertDb from '../components/InsertDb.vue'

const router = new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/index/advertise'
        },
        {
            path:'/index',
            component:MainPage,
            children:[
                {
                    path:'advertise',
                    component:GoodsAdvertise
                },
                {
                    path:'goods',
                    component:ClassifyGoods
                },
                {
                    name:'info',
                    path:'info',
                    component:GoodsInfo
                },
            ],
        },
        {
            path:'/cart',
            component:ShopCart
        },
        {
            path:'/login',
            component:UserLogin
        },
        {
            path:'/register',
            component:UserRegister
        },
        {
            path:'/order',
            component:OrderPage
        },
        {
            name:'submit',
            path:'/submit',
            component:SubmitPage
        },
        {
            path:'/dboperate',
            component:InsertDb
        }
        
    ]
})

export default router