<template>
    
    <div class="main_goods" v-if="isReceive === true">
        <div class="main_goods_top">
            <div class="goods_advertise">
                <div class="main_advertise">
                    <a href="#">
                        <img 
                            class="main_ad_img" :src="` ${advertise_list[0].goodspicture[0]}`" 
                            alt="红红火火恍恍惚惚或或或或或"
                            :style="{left:img_left}"
                        >
                        <div class="img_nav">
                            <div v-for="item in 5" :key="item-1" @click="lunbo_change(item-1)"></div>
                        </div>
                    </a>
                    
                </div>
                <div class="minor_advertise">
                    <router-link :to="{
                        path:'/index/info',
                        query:{
                            goodsid:advertise_list[1]._id  
                        }
                    }" >
                        <div class="left_advertise">
                            <img :src="` ${advertise_list[1].goodspicture[0]}`" >
                        </div>
                    </router-link>
                    <router-link :to="{
                        path:'/index/info',
                        query:{
                            goodsid:advertise_list[2]._id  
                        }    
                    }" >
                        <div class="right_advertise">
                            <img :src="` ${advertise_list[2].goodspicture[0]}`" >
                        </div>
                    </router-link>
                    
                </div>
            </div>
            <div class="user_main">
                <div class="user_top" v-if="user">
                    <div class="user_photo">
                        <img :src="` ${user.photo}`">
                    </div>
                    <div class="user_name">
                        <span>hi ~ {{user.username}}</span>
                    </div>
                </div>
                <div class="user_top" v-else>
                    <div class="user_photo"></div>
                    <div class="user_operate">
                        <span>
                            hi ~ 请
                            <router-link to="/login">登录</router-link>
                            /
                            <router-link to="/register">注册</router-link>
                            </span>
                    </div>
                </div>
                <div class="user_center_img">
                    <img src="https://s3.bmp.ovh/imgs/2022/03/5281815ba450b345.png">
                </div>
                <div class="user_notice">
                    <div class="user_gonggao">
                        <span><strong>公告</strong>  新鲜事儿都在这里～</span>
                    </div>
                    <div class="user_notice_list">
                        <a class="user_notice_item" href="#" v-for="(item,index) in notice_list" :key="index">
                            <span>
                                <strong>热点&nbsp;&nbsp;&nbsp;</strong>
                                {{item}}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="today_recommand">
            <div class="recommand_logo">
                <span>今日推荐</span>
            </div>
            <div class="recommand_goods">
                <router-link :to="{
                        path:'/index/info',
                        query:{
                            goodsid:item._id
                        }
                    }" 
                    v-for="(item,index) in recommand_list" 
                    :key="index">
                    <img :src="` ${item.goodspicture[0]}`">
                    <div class="goods_describe">
                        {{item.goodsname}}
                    </div>
                </router-link>
            </div>
        </div>
        <div class="your_like">
            <div class="like_logo">
                <span>猜您喜欢</span>
            </div>
            <div class="like_goods">
                 <router-link :to="{
                        path:'/index/info',
                        query:{
                            goodsid:item._id  
                        }   
                    }" 
                     v-for="(item,index) in like_list" 
                     :key="index"
                     >
                    <img :src="` ${item.goodspicture[0]}`">
                    <div class="like_goods_describe">
                        {{item.goodsname}}
                    </div>
                    <div class="goods_price">
                        <small>￥</small>{{item.price}}
                    </div>
                 </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'GoodsAdvertise',
    data(){
        return {
            lunbo_counter : 0 ,//轮播图计数器
            isReceive: false,
            notice_list : [],
            advertise_list:[],
            recommand_list : [],
            like_list : [],
        }
    },
    computed:{

        user(){
            return this.$store.status.user
        },
        //轮播图位置
        img_left(){
            return '-' + this.lunbo_counter + 'px'
        },
        ...mapState('User',['user'])
    },
    methods:{

        //轮播图函数
        lunbo(){
            let lunbo_nav = document.querySelectorAll('.img_nav div');
            lunbo_nav[0].className = 'img_nav_active'
            setInterval(() => {
                if(this.lunbo_counter === 2400){
                    this.lunbo_counter = 0
                }else{
                    this.lunbo_counter += 600
                }
                for(let i = 0;i<5;i++){
                    lunbo_nav[i].className = ''
                }
                let j = this.lunbo_counter/600;
                lunbo_nav[j].className = 'img_nav_active'
            }, 5000);
        },

        //轮播导航（点击切换）
        lunbo_change(value){
            this.lunbo_counter = 600 * value
            let lunbo_nav = document.querySelectorAll('.img_nav div');
            for(let i = 0;i<5;i++){
                lunbo_nav[i].className = ''
            }
            lunbo_nav[value].className = 'img_nav_active'
        }
    },

    mounted(){
        setTimeout(()=>{
            this.lunbo()
        },500)
    },
    beforeMount(){
        this.$API.getIndexAd().then((res)=>{
            this.notice_list = res.data.notice_list;
            this.advertise_list = res.data.advertise_list;
            this.recommand_list = res.data.recommand_list
            this.like_list = res.data.like_list;
            this.isReceive = true
        }).catch((err)=>{
            alert('服务器错误！'+err.response.status)
        })
    }
}
</script>

<style scoped>
    
/*主要展示区*/
.main_goods{
    flex: 1;
    /* height: 900px; */
    background-color: white;
    border-radius: 20px;
    margin: 0px 10px;
    /* border: 1px solid red; */
}


/*main_goods_top*/
.main_goods_top{
    height: 620px;
    /* background-color: rebeccapurple; */
    border-radius: 20px;
    margin: 10px 10px;
    display: flex;
}

.goods_advertise{
    width: 600px;
    height: 560px;
    margin: 10px 10px;
    border-radius: 20px;
}


.main_advertise{
    border-radius: 20px;
    width: 600;
    height: 360px;
    overflow: hidden;
    position: relative;
    border: 1px solid #c7c7c7;
}

.main_ad_img{
    height: 100%;
    margin: 0px;
    position: relative;
    left: 0px;
    transition: 0.3s left;
}


.img_nav{
    z-index: 999;
    position: absolute;
    bottom: 25px;
    left: 258px;
    height: 10px;
    display: flex;
}

.img_nav>div{
    width: 10px;
    height: 10px;
    margin-left: 5px;
    border-radius: 20px;
    opacity: 0.3;
    background-color: #c7c7c7;
    cursor: pointer;
}

.img_nav_active{
    background-color: white !important;
    opacity: 1 !important;
}


/*minor_advertise*/
.minor_advertise{
    width: auto;
    height: 180px;
    display: flex;
    margin-top: 16px;
    padding: 0px;
}

.left_advertise{
    width: 295px;
    height: 180px;
    border-radius: 20px;
    overflow: hidden;
    border: #c7c7c7 1px solid;
}

.right_advertise{
    margin-left: 10px;
    width: 295px;
    height: 180px;
    border-radius: 20px;
    overflow: hidden;
    border: #c7c7c7 1px solid;
}

.left_advertise>img{
    width: 100%;
    height: 218px;
}
.right_advertise>img{
    width: 100%;
    height: 218px;
}

/*用户模块*/

.user_main{
    width: 380px;
    height: 560px;
    margin: 10px 10px;
    border-radius: 20px;
    background-color: #F3F3F3;
}

.user_top{
    width: 360px;
    height: 80px;
    margin: 10px;
    background-color: white;
    border-radius: 30px;
    display: flex;
}

.user_photo{
    height: 60px;
    width: 60px;
    border-radius: 30px;
    border: 1px solid red;
    margin: 10px;
    overflow: hidden;
}
.user_photo>img{
    height: 60px;
    width: 60px;
}



.user_name{
    height: 60px;
    width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.user_name>span{
    margin-left: 20px;
    line-height: 60px;
    font-size: 20px;
    font-family: '楷体','Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.user_operate{
    height: 60px;
    width: 200px;
    white-space: nowrap;
}


.user_operate>span{
    margin-left: 20px;
    line-height: 60px;
    font-size: 20px;
    font-family: '楷体','Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; 
}

.user_operate>span>a{
    color: #666666;
    text-decoration: none;
}

.user_operate>span>a:hover{
    color: rgb(250, 42, 15);
    text-decoration: none;
}

.user_center_img{
    width: 360px;
    height: 218px;
    margin: 20px 10px;
    border-radius: 30px;
    overflow: hidden;
}

.user_center_img>img{
    width: 100%;
    height: 100%;
}

.user_notice{
    width: 360px;
    height: 200px;
    background-color: white;
    margin: auto;
    border-radius: 30px;
}

.user_gonggao{
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgb(220,220,220);
}

.user_gonggao>span{
    line-height: 40px;
    margin-left: 20px;
    font-size: 16px;
    font-family: '楷体','Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.user_notice_item{
    width: 100%;
    height: 38px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-decoration: none;
    color: rgb(126, 126, 126);
}

.user_notice_item>span{
    line-height: 38px;
    font-size: 14px;
    margin-left: 16px;
}

.user_notice_item strong{
    color: rgb(255, 30, 0);
}

.user_notice_item:hover{
    color: #ff6200;
}


/*今日推荐*/
.today_recommand{
    width: auto;
    margin: 10px 10px;
    border-top: #999999 1px solid;
    border-radius: 20px;
    height: 360px;
}

.recommand_logo{
    width: auto;
    height: 40px;
    border-radius: 20px;
    margin-left: 20px;
}

.recommand_logo span{
    font-size: 20px;
    line-height: 44px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
    color: rgb(202, 57, 57);
}

.recommand_goods{
    margin: 0px 10px;
    width: auto;
    height: 300px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
}


.recommand_goods>a{
    display: block;
    width: 240px;
    height: 300px;
    border-radius: 20px;
    text-decoration: none;
}

.recommand_goods>a>img{
    width: 240px;
    height: 240px;
    border-radius: 20px;
}

.goods_describe{
    width: 220px;
    color: #666666;
    font-size: 20px;
    line-height: 40px;
    margin-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.recommand_goods>a:hover{
    box-shadow: 0px 2px 10px #bbbbbb;
}

.recommand_goods>a:hover .goods_describe{
    color: #F10000;
}

/*猜你喜欢*/
.your_like{
    width: auto;
    margin: 10px 10px;
    border-top: 1px solid #999999;
    border-radius: 20px;
    
}

.like_logo{
    width: auto;
    height: 40px;
    border-radius: 20px;
    margin-left: 20px;
}

.like_logo span{
    font-size: 20px;
    line-height: 44px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
    color: brown;
}

.like_goods{
    margin: 0px 10px;
    width: auto;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}


.like_goods a{
    display: block;
    width: 240px;
    height: 300px;
    border-radius: 20px;
    margin-bottom: 10px;
    text-decoration: none;

}


.like_goods>a>img{
    width: 240px;
    height: 240px;
    border-radius: 20px;
}

.like_goods_describe{
    width: 220px;
    color: #666666;
    font-size: 20px;
    line-height: 30px;
    margin-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.goods_price{
    width: 220px;
    color: #EF0900;
    font-size: 18px;
    line-height: 18px;
    margin-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


.like_goods>a:hover{
    box-shadow: 0px 2px 10px #bbbbbb;
}

.like_goods>a:hover .like_goods_describe{
    color: #FF2300;
}

</style>