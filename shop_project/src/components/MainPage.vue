<template>
    <div>
        <user-nav/>
        <div :class="nav_class" id="search_nav">
            <div class="search_nav_container">
                <div class="shop_logo">
                    <img src="https://s1.ax1x.com/2022/03/28/qDYSL6.png" alt="">
                </div>
                <div class="search_container">
                    <form action="">
                        <div class="search_form">
                            <div class="search_bar">
                                <div class="input_text">
                                    <span><svg t="1646904958826" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1006" width="200" height="200"><path d="M469.333 192c153.174 0 277.334 124.16 277.334 277.333 0 68.054-24.534 130.411-65.216 178.688L846.336 818.24l-48.341 49.877L630.4 695.125a276.053 276.053 0 0 1-161.067 51.542C316.16 746.667 192 622.507 192 469.333S316.16 192 469.333 192z m0 64C351.51 256 256 351.51 256 469.333s95.51 213.334 213.333 213.334 213.334-95.51 213.334-213.334S587.157 256 469.333 256z" p-id="1007"></path></svg></span>
                                    <input type="text">
                                    <span></span>
                                </div>
                                <button class="search_btn">搜索</button>
                            </div>
                                
                        </div>
                    </form>
                </div>
                <div class="shop_cart">
                    <router-link to="/cart">
                        <button>
                            <span>我的购物车</span>
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="main" id="main">
            <div class="main_body">
                <div class="goods_nav">
                <ul>
                    <li class="nav_item" v-for="(item,index) in classisyList" :key="index">
                            <i class="iconfont" v-html="item[0]"></i>
                            <router-link :to="{
                                 path:'/index/goods',
                                 query:{
                                     classifyName: item[1]
                                 }       
                                }">
                                <span>{{item[1]}}</span>
                            </router-link>
                            <span>/</span>
                            <router-link :to="{
                                 path:'/index/goods',
                                 query:{
                                     classifyName: item[2]
                                 }       
                                }">
                                <span>{{item[2]}}</span>
                            </router-link>
                            <span>/</span>
                            <router-link :to="{
                                 path:'/index/goods',
                                 query:{
                                     classifyName: item[3]
                                 }       
                                }">
                                <span>{{item[3]}}</span>
                            </router-link>
                    </li>
                </ul>
            </div>
            <router-view></router-view>
        </div>
        </div>
    </div>
</template>

<script>
import UserNav from './UserNav.vue';
export default {
  components: { UserNav },
    name:'MainPage',
    data(){
        return {
            classisyList : [
                            ["&#xe644;","女装","内衣","家居"],
                            ["&#xe645;","女鞋","男鞋","箱包"],
                            ["&#xe646;","母婴","童装","玩具"],
                            ["&#xe647;","男装","运动","户外"],
                            ["&#xe649;","美妆","彩妆","个护"],
                            ["&#xe64c;","手机","数码","企业礼品"],
                            ["&#xe64f;","大家电","生活电器",""],
                            ["&#xe651;","零食","生鲜","茶酒"],
                            ["&#xe652;","厨具","收纳","清洁"],
                            ["&#xe653;","图书","音像","文具"],
                            ["&#xe654;","医药","保健","进口"],
                            ["&#xe655;","汽车","二手车","用品"],
                            ["&#xe656;","家纺","家饰","鲜花"],
                            ["&#xe657;","房产","装修","建材"],
                            ["&#xe658;","手表","眼镜","珠宝饰品"]
                            ],
            nav_class : 'search_nav'
        }
    },
    methods:{
        search_nav_sticky(){
            var main = document.getElementById('main');
            if(main.getBoundingClientRect().top <= 0){
                this.nav_class = 'search_nav_fixed'
            }else{
                this.nav_class = "search_nav";
            }
        }
    },
    mounted(){
        window.addEventListener('scroll', this.search_nav_sticky);
    },
    beforeRouteLeave(to,from,next){
        window.removeEventListener('scroll',this.search_nav_sticky)
        next()
    }
}
</script>


<style scoped src='./../assets/iconfont/iconfont.css'></style>
<style scoped>
    
/*search_nav*/

.search_nav{
    height: 90px;
    width: 100%;
    z-index: 999;
    background-color: rgb(228, 228, 228);
    
}


.search_nav_container{
    padding-top: 4px;
    height: 100%;
    width: 80%;
    min-width: 1280px;
    margin:auto;
    /* background-color: wheat; */
    overflow: hidden;
    display: flex;
}

/*logo*/

.shop_logo{
    height: 90px;
    width: 250px;
    margin-left: 20px;

    /* background-color: aqua; */
}

.shop_logo img{
    height: 100%;
    width: auto;
    margin-left: 80px;
}

/*search input*/
.search_container{
   flex: 1;
}

.search_container form{
    width: 100%;
    height: 66%;
}

.search_form{
   width: 100%;
   height: 100%;
}

.search_bar{
    margin-left: 50px;
    display: flex;
    width: 600px;
    /* background-color: antiquewhite; */
    margin-top: 22px;
}

.input_text{
    flex: 1;
    border: 2px solid red;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    height: 36px;
    display: flex;
    background-color: white;
}

.input_text span{
    margin-top: 10px;
}

.input_text span svg{
    margin-top: -4px;
    margin-left: 4px;
    opacity: 0.3;
    width: 24px;
    height: 24px;
}

.input_text input{
   flex: 1;
   border: 0px;
   outline: none;
}

.search_btn{
    background-color: red;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 40px;
    cursor: pointer;
    width: 100px;
    border: 0px;
    color: white;
    font-family: "微软雅黑", cursive, serif, sans-serif;
    font-size: 16px;
    font-weight: 500;
}

.search_btn:hover{
    background-color: rgb(228, 20, 5);
}

.quick_search{
    margin: auto;
    width: 80%;
    display: flex;
    justify-content: space-around;
}

.quick_search>a{
    text-decoration: none;
    line-height: 20px;
    font-size: 13px;
    text-decoration: none;
    color: rgb(120,120,120);
    margin-right: 16px;
}

.quick_search>a:hover{
    color: red;
}


/*购物车*/
.shop_cart{
    width: 300px;
    height: 90px;
    overflow: hidden;
}

.shop_cart a{
    text-decoration: none;
}

.shop_cart button{
    width: 200px;
    height: 38px;
    padding: 0px;
    border-radius: 20px;
    /* border: 1px solid rgb(100, 100, 100); */
    border: 1px solid red;
    display: block;
    margin: 24px 30px;
    color: red;
    background-color: white;
    cursor:pointer;
} 

.shop_cart button:hover{
    border: 2px solid rgb(255, 51, 0);
}

.search_nav_fixed{
    height: 54px;
    width: 100%;
    /* background-color: yellowgreen; */
    position: sticky;
    top: 0px;
    z-index: 999;
    background-color: white;
    opacity: 1;
    
}

.search_nav_fixed .shop_logo{
    height: 50px;
    width: 250px;
    margin-left: 20px;
}

.search_nav_fixed .search_bar{
    margin-top: 2px;
}

.search_nav_fixed .shop_cart{
    display: none;
}

.search_nav_fixed .quick_search{
    display: none;
}


/************** */
/************** */
/************** */
/************** */
/************** */
/************** */



   
/*main body*/

.main{
    margin: auto;
    width: 80%;
    min-width: 1280px;
    /* background-color: aqua; */
}

.main_body{
    /* background-color: antiquewhite; */
    width: 100%;
    /* height: 2000px; */
    display: flex;
}



/*导航列表*/
.goods_nav{
    /* background-color: skyblue; */
    background-image: linear-gradient(rgb(255, 130, 113),white);
    height: 620px;
    position: sticky;
    top: 54px;
    border-radius: 20px;
}

.goods_nav>ul{
    list-style-type: none;
    margin-left: -30px;
    
}

/*导航项*/
.nav_item{
    width: 200px;
    /* background-color: aqua; */
    height: 40px;
    font-size: 16px;
    color: rgb(122, 122, 122);
    font-family:'微软雅黑', 'Courier New', Courier, monospace;
    display: flex;
}
.nav_item>a, .nav_item>span{
    margin-right: 8px;
    display: block;
    height: 40px;
    line-height: 40px;
    text-decoration: none;
    color: rgb(100,100,100);
    font-size: 14px;
}
.nav_item i{
    margin-right: 16px;
    width: 20px;
    height: 20px;
    margin-top: 9px;
    opacity: 0.4;
    color: black;
    font-size: 20px;
}

.nav_item:hover>a{
    color: rgb(255, 72, 0);
}

.nav_item:hover>span,
.nav_item:hover>i{
    color: red;
}

.nav_item>a:hover{
    text-decoration: underline;
}

</style>