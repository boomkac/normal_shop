<template>
    <div class="user_nav" id="user_nav">
        <div class="user_nav_container">
            <div class="user_nav_left">
                <div class="user_nav_left_1 user_nav_left_item">
                    <span>
                        <router-link to="/index/advertise">首页</router-link>
                    </span>
                </div>
                <div class="user_nav_left_2 user_nav_left_item">
                    <span>
                        <router-link to="/dboperate">成为商家</router-link>
                    </span>
                </div>

            </div>
            <div class="user_nav_right" v-if="user">
                <div class="user_nav_right_1 user_nav_right_item ">
                    <span>
                        {{user.username}}
                        欢迎！
                        <a href="#" @click="logout">退出登录</a>
                    </span>
                </div>
                <div class="user_nav_right_2 user_nav_right_item">
                    <span>
                        <router-link to="/order">我的订单</router-link>
                    </span>
                </div>
                <div class="user_nav_right_3 user_nav_right_item">
                    <span>
                        <router-link to="/cart">购物车</router-link>
                    </span>
                </div>
            </div>
            <div class="user_nav_right" v-else>
                <div class="user_nav_right_1 user_nav_right_item ">
                    <span>
                        欢迎！请
                        <router-link to="/login">登录</router-link>
                        /
                        <router-link to="/register">注册</router-link>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>




<script>
import {mapState} from 'vuex'
export default {
    name:'UserNav',
    methods:{
        //退出登录
        logout(){
            sessionStorage.removeItem('user')
            this.$router.push('/index/advertise')
            location.reload()
        },
        //保存登录状态
        keepLogin(){
            setTimeout(()=>{
                var session = JSON.parse(sessionStorage.getItem('user'))
                if(session !== undefined){
                    this.$store.commit('User/STORE_SESSION',session)
                }
            },500)
            
        }
    },
    computed:{
        ...mapState('User',['user'])
    },
    beforeMount(){
        this.keepLogin()
    }
}
</script>




<style  scoped>
    
/**  user_nav  **/

.user_nav{
    min-width: 1280px;
    background-color: rgb(234, 234, 234);
}
.user_nav_container{
    margin: auto;
    display: flex;
    width: 80%;
    min-width: 1280px;
}
.user_nav_left{
    display: flex;
    flex: 1;
}
.user_nav_right{
    display: flex;
    flex: 1;
    flex-direction: row-reverse;
    margin-left: 8%;
}
.user_nav_right_item, 
.user_nav_left_item{
    height: 25px;
    text-align: center;
}
.user_nav_right_1,
 .user_nav_right_2,
.user_nav_left_item{
    margin:auto 20px ;
}

.user_nav_right_1{
    margin-right: 100px;
}

.user_nav_right_item span,
.user_nav_left_item span,
.user_nav_right_item a,
.user_nav_left_item a{
    line-height: 25px;
    font-size: 12px;
    color: rgb(100, 100, 100);
    text-decoration: none;
    display: inline-block;
}


.user_nav_right_item a:hover,
.user_nav_left_item a:hover{
    color: rgb(235, 75, 47);
}


</style>