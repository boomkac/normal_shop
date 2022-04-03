<template>
    <div>
        <div class="main_info"  v-if="goods !== 0">
            <div class="main_info_top">
                <div class="goods_show">
                    <div class="main_img">
                        <img :src="` ${goods.goodspicture[0]}`">   
                    </div>
                    <div class="little_img">
                        <div class="img_item" v-for="(item,index) in goods.goodspicture" :key="index">
                            <img :src="` ${item}`">
                        </div>
                    </div>
                </div>
                <div class="goods_operate">
                    <div class="goods_name">
                        <span>{{goods.goodsname}}</span>
                    </div>
                    <div class="goods_price">
                        <div class="price_name">价格</div>
                        <div class="g_price">￥{{goods.price}}</div>
                    </div>
                    <div class="select_params">
                        <div class="font_param_item" v-for="(item1,index1) in goods.goodsoptions" :key="index1">
                            <div class="font_param_name">
                                {{index1}}
                            </div>
                            <div class="font_inner_param">
                                <div :class="{'font_param_option':1, 'actived':goodsparams[index1] === item}"
                                 v-for="(item,index2) in goods.goodsoptions[index1]" :key="index2"
                                  @click="choiceParams(index1,item)">
                                    {{item}}
                                </div>
                            </div>
                        </div>
                        <!-- <div class="img_param_item">
                            <div class="img_param_name">
                                颜色
                            </div>
                            <div class="img_inner_param">
                                <div class="img_param_option">
                                    <img src="http://10.252.79.206:3000/lunbo.png">
                                </div>
                                <div class="img_param_option">
                                    <img src="http://10.252.79.206:3000/lunbo.png">
                                </div>
                                <div class="img_param_option">
                                    <img src="http://10.252.79.206:3000/lunbo.png">
                                </div>
                                <div class="img_param_option">
                                    <img src="http://10.252.79.206:3000/lunbo.png">
                                </div>
                            </div>
                        </div> -->
                        
                    </div>
                    <div class="done_amount">
                        <div class="done_name">已选</div>
                        <div class="done_font">
                            <div v-for="(item,index) in goodsparams" :key="index">
                                {{index}}:{{item}}&nbsp;&nbsp;&nbsp;
                            </div>    

                        </div>
                    </div>
                    <div class="goods_amount">
                        <div class="amount_name">数量</div>
                        <div class="amount_body">
                            <button class="amount_btn" @click="decrease">-</button>
                            <input class="amount_input" type="number" v-model="count">
                            <button class="amount_btn" @click="increase">+</button>
                        </div>
                    </div>
                    <div class="operate_goods">
                        <div class="buy_goods" @click="buyNow">立即购买</div>
                        <div class="add_cart" @click="addCart">加入购物车</div>
                    </div>
                    <div class="pay_way"></div>
                </div>
            </div>
            <div class="detail_info">
                <div class="detail_nav">
                    <div class="detail_nav_item detail_nav_active">商品详情</div>
                    <div class="detail_nav_item">评论</div>
                </div>
                <div class="detail_container">
                    <div class="goods_detail" v-if="goods !== 0">
                        <div class="goods_param">
                            <div class="param_label">
                                产品参数：
                            </div>
                            <div class="param_table">
                                <div class="param_cell" v-for="(item1,index1) in goods.goodsparams" :key="index1">
                                    <span v-for="(item2,index2) in item1" :key="index2">
                                        {{index2}} ：{{item2}}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="goods_info_img">
                            <div class="info_img_item" v-for="(item,index) in goods.infopicture" :key="index">
                                <img :src="` ${item}`">
                            </div>
                        </div>
                    </div>
                    <div class="more_goods">
                        <div class="seller_info" v-if="shop !== 0">
                            <div class="seller_photo">
                                <img :src="` ${shop.shopphoto}`">
                            </div>
                            <div class="seller_name">
                                <span>{{shop.shopname}}</span>
                            </div>
                            <div class="seller_label">
                                <div class="label_item" v-for="(item,index) in shop.labels" :key="index">{{item}}</div>
                            </div>
                        </div>
                        
                        <div v-if="goodss !== 0">
                            <span>更多店铺商品</span>
                            <router-link :to="{
                                path:'/index/info',
                                query:{
                                    goodsid:item._id  
                                }   
                            }"  
                            class="more_goods_item" 
                            v-for="(item,index) in goodss"
                             :key="index"
                             >
                                <div class="more_goods_img">
                                    <img :src="` ${item.goodspicture[0]}`">
                                </div>
                                <div class="more_goods_describe">
                                    <span>{{item.goodsname}}</span>
                                </div>
                            </router-link>
                        </div>
                        
                    </div>
                </div>
                    
            </div>
        </div>
        <div v-else><h1>加载中...</h1></div>
    </div>
</template>

<script>
export default {
    name:'GoodsInfo',
    data(){
        return {
            params:[],
            label:[],
            goodsid:'',
            goods:0,
            mainpicture:'',
            shop:0,
            goodss:0,
            comment:0,
            count:1,
            goodsparams:{},
        }
    },
    computed:{
    },
    methods:{
        //发送请求获取数据
        getData(){
            this.$API.infoGet(this.goodsid).then(value=>{
                this.goods = value.data.goods
                this.mainpicture=this.goods.goodspicture[0]
                this.shop = value.data.shop
                this.goodss = value.data.goodss
                this.comment = value.data.comment
            })
        },

        //商品选择参数
        choiceParams(key, value){
            this.$set(this.goodsparams,key,value)
        },

        //选择数量
        increase(){
            this.count++
        },
        decrease(){
            this.count--
        },

        //立即购买
        buyNow(){
            if(!sessionStorage.getItem('user')){
                alert('请登录')
                return
            }
            // console.log(Object.keys(this.goods.goodsoptions).length)
            // console.log(Object.keys(this.goodsparams).length)
            if(Object.keys(this.goods.goodsoptions).length !== Object.keys(this.goodsparams).length){
                alert('请选择商品参数')
                return
            }
            let sdata = {}
            sdata['goods'] = this.goods
            sdata['goodsparams'] = this.goodsparams
            sdata['count'] = this.count
            sdata = {...this.goods,'goodsparams':this.goodsparams,'count':this.count}
            let sendData = []
            sendData.push(sdata)
            
            sessionStorage.setItem('submitGoods',JSON.stringify(sendData))

            this.$router.push({
                name:'submit'
            })
        },
        //加入购物车
        addCart(){
            if(!sessionStorage.getItem('user')){
                alert('请登录')
                return
            }
            if(Object.keys(this.goods.goodsoptions).length !== Object.keys(this.goodsparams).length){
                alert('请选择商品参数')
                return
            }
            let sdata = {}
            sdata['goods'] = this.goods
            sdata['goodsparams'] = this.goodsparams
            sdata['count'] = this.count
            sdata['userid'] = JSON.parse(sessionStorage.getItem('user'))['_id']

            this.$API.addCartPost(sdata)
            .then(value=>{
                console.log(value.data)
            })
        }

            
    },
    beforeRouteUpdate(to, from, next) {
        if(to.name === from.name){
            next()
            this.$router.go(0)
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }else{
            next()
        }
    },
    mounted(){
        this.goodsid = this.$route.query.goodsid
        this.getData()
    },
}
</script>

<style scoped>
    
.actived{
    border: 1px solid red;
}

/*详细页*/
.main_info{
    flex: 1;
    /* height: 900px; */
    background-color: white;
    border-radius: 20px;
    margin: 0px 10px;
}

/*top*/
.main_info_top{
    border-radius: 20px;
    margin: 10px 10px;
    display: flex;
}

.goods_show{
    width: 500px;
    height: 640px;
    margin: 10px 10px;
    border-radius: 20px;
}

.main_img{
    width: 500px;
    height: 500px;
    border-radius: 20px;
    overflow: hidden;
}

.main_img>img{
    width: 500px;
    height: 500px;
}

.little_img{
    width: 498px;
    height: 60px;
    margin-top: 20px;
    border-radius: 20px;
    display: flex;
    justify-content:flex-start;
}
.img_item{
    border: 1px solid #bbbbbb;
    margin-left: 5px;
    width: 60px;
    height: 60px;
    border-radius: 12px;
    overflow: hidden;
}
.img_item>img{
    width: 60px;
    height: 60px;
}

.goods_operate{
    width: 500px;
    height: 640px;
    margin: 10px 10px;
    border-radius: 20px;
}
/** */
.goods_name{
    width: 480px;
    margin: 10px 10px;
}
.goods_name>span{
    font-family: '楷体','Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 20px;
}

/** */
.goods_price{
    width: 480px;
    margin: 20px 10px;
    background-color: rgb(255, 211, 170);
    display: flex;
}
.price_name{
    margin-left: 10px;
    height: 20px;
    margin-top: 10px;
    width: 80px;
    font-size: 16px;
}
.g_price{
    color: rgb(255, 40, 0);
    flex: 1;
    font-size: 30px;
    line-height: 40px;
    font-weight: 600;
}

/*** */
.select_params{
    width: 480px;
    margin: 20px 10px;
}

.font_param_item{
    width: 480px;
    margin: 10px 0px;
    display: flex;
}

.font_param_name{
    margin-left: 10px;
    line-height: 30px;
    width: 80px;
    font-size: 16px;
}

.font_inner_param{
    flex:1;
    display: flex;
    flex-wrap: wrap;
}
.font_param_option{
    height: 30px;
    padding: 0px 10px;
    background-color: antiquewhite;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    margin: 5px 5px;
}
/* .font_param_option{
    height: 30px;
    padding: 0px 10px;
    background-color: antiquewhite;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    margin: 5px 5px;
    border: 1px solid red;
} */

/*图片选项*/

.img_param_item{
    width: 480px;
    margin: 10px 0px;
    display: flex;
}

.img_param_name{
    margin-left: 10px;
    line-height: 40px;
    width: 80px;
    font-size: 16px;
}

.img_inner_param{
    flex:1;
    display: flex;
}
.img_param_option{
    height: 40px;
    width: 40px;
    margin-left: 5px;
    background-color: antiquewhite;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
}
.img_param_option>img{
    height: 40px;
    width: 40px;
}
/** */
.done_amount{
    width: 480px;
    margin: 20px 10px;
    display: flex;
}
.done_name{
    margin-left: 10px;
    line-height: 30px;
    width: 80px;
    font-size: 16px;
}
.done_font{
    line-height : 30px;
    font-size: 13px;
    width: 360px;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    color: #666666;
}

/** */
.goods_amount{
    width: 480px;
    margin: 20px 10px;
    height: 30px;
    display: flex;
}
.amount_name{
    margin-left: 10px;
    line-height: 30px;
    width: 80px;
    font-size: 16px;
}
.amount_body{
    flex: 1;
    height: 30px;
    display: flex;
}
.amount_btn{
    display: block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 20px;
}
.amount_input{
    text-align: center;
    display: block;
    padding: 0px;
    height: 26px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button { 
    -webkit-appearance: none; 
}
input[type="number"]{ 
    -moz-appearance: textfield; 
}
/*** */
.operate_goods{
    display: flex;
    margin-top: 20px;
}
.buy_goods{
    margin-left: 20px;
    width: 120px;
    background-color: red;
    height: 44px;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
    color: white;
    cursor: pointer;
}
.buy_goods:hover{
    background-color: rgb(235, 0, 0);
}
.add_cart{
    margin-left: 30px;
    width: 120px;
    border: 2px solid red;
    height: 40px;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
}
.add_cart:hover{
    border: 3px solid red;
    width: 118px;
    height: 38px;
}


/** */
.detail_info{
    margin: 10px 10px;
}

.detail_nav{
    padding-left: 20px;
    width: 100%;
    height: 50px;
    border-top: 1px solid #666666;
    border-radius: 50px;
}

.detail_nav_item{
    border-left: 1px solid #999999;
    display: inline-block;
    width: 100px;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    cursor: pointer;
}
.detail_nav_item:hover{
    background-color: #f0f0f0;
}
.detail_nav_active{
    background-color: #f0f0f0;
}

.detail_container{
    display: flex;
    border-radius: 20px;
    width: 100%;
    height: 100%;
}

/*商品详情*/
.goods_detail{
    width: 820px;
    margin-right: 20px;
    border-radius: 20px;
}

.goods_param{
    width: 820px;
    border-radius: 20px;
    padding-bottom: 10px;
}

.param_label{
    width: 720px;
    margin: 10px auto;
}

.param_table{
    width: 720px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
}

.param_cell{
    width: 240px;
    height: 30px;
    line-height: 30px;
    text-align: left;
}

.goods_info_img{
    width: 820px;
    border-radius: 20px;
}

.info_img_item{
    margin: auto;
    width: 820px;
    height: 480px;
    border-radius: 20px;
    overflow: hidden;
}
.info_img_item>img{
    width: 820px;
    height: 480px;
}

/*更多店铺商品*/
.more_goods{
    border-radius: 20px;
    width: 200px;
}

/** */
.seller_info{
    margin-bottom: 20px;
    /* border: 1px solid red; */
    border-radius: 20px;
    width: 200px;
    height: 200px;
    background-color: #f1f1f1;
    overflow: hidden;
}

.seller_photo{
    height: 50px;
    width: 50px;
    border-radius: 50px;
    border: 1px solid #666;
    overflow: hidden;
    margin: 10px 0px 0px 10px;
}
.seller_photo>img{
    height: 50px;
    width: 50px;
}

.seller_name>span{
    margin-left: 10px;
    font-size: 16px;
    line-height: 30px;
}

/** */
.seller_label{
    display: flex;
    margin: 10px;
    flex-wrap: wrap;
}

.label_item{
    background-color: wheat;
    padding: 3px 8px;
    border-radius: 10px;
    font-size: 12px;
    margin: 4px;
}


/** */
.more_goods>span{
    font-size: 20px;
}

.more_goods_item{
    margin-top: 20px;
    border-radius: 20px;
    width: 200px;
    height: 240px;
    display: block;
    color: black;
    text-decoration: none;
}

.more_goods_item:hover{
    box-shadow: 0px 2px 10px #bbbbbb;
}

.more_goods_img{
    width: 200px;
    height: 200px;
    border-radius: 20px;
    overflow: hidden;
}

.more_goods_img>img{
    width: 200px;
    height: 200px;
}


.more_goods_describe>span{
    font-size: 16px;
    line-height: 36px;
    margin:auto;
    display: block;
    width: 186px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.more_goods_describe>span:hover{
    color: #EF0900;
}
</style>