<template>
    <div>
        <user-nav/>
        <div class="order_area" v-if="orders.length !== 0">
            <div class="order_top">
                <span>我的订单</span>
            </div>
            <div class="property_name">
                <span class="top_name">宝贝</span>
                <span class="top_price">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="top_amount">数量</span>
                <span class="top_truly_price">实付款</span>
                <span class="order_status">交易状态</span>
                <span class="order_operate">操作</span>
            </div>
            <div class="order_list">
                <div class="order_item" v-for="(item,index) in orders" :key="index">
                    <div class="item_top">
                        <span class="order_time">{{item['ordertime']}}</span>
                        <span>订单号：{{item['_id']}}</span>
                        <span class="order_delete">删除</span>
                    </div>
                    <div class="item_body">
                        <img class="goods_img" :src="item['goodspicture']">
                        <div class="goods_name">
                            <div>{{item['goodsname']}}</div>   
                            <div class="goods_param">
                                <span v-for="(item1,index1) in item['goodsparams']"
                                 :key="index1">
                                 {{index1}}:{{item1}}&nbsp;
                                 </span>    
                            </div>   
                        </div>
                        <span class="goods_price"></span>
                        <span class="goods_amount">{{item['count']}}</span>
                        <span class="truly_price">{{item['allprice']}}</span>
                        <div class="order_info">
                            <div>交易成功</div>
                            <a href="">订单详细</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserNav from './UserNav.vue'
export default {
    components: { UserNav },
    data(){
        return {
            orders:[]
        }
    },
    methods:{
        getOrders(){
            console.log(JSON.parse(sessionStorage.getItem('user'))['_id'])
            this.$API.orderPost(JSON.parse(sessionStorage.getItem('user'))['_id'])
            .then(value=>{
                this.orders = value.data
                console.log(this.orders)
            })
        }
    },
    beforeMount(){
        this.getOrders()
    }
}
</script>

<style scoped>
.order_area{
    padding-bottom: 10px;
    background-color: white;
    border-radius: 20px;
    margin: auto;
    width: 80%;
    min-width: 1280px;
}
/** */
.order_top{
    height: 80px;
    font-size: 30px;
    line-height: 80px;
    border-bottom: 1px solid #999;
    box-shadow: 0px 2px 4px #eee;
}
.order_top>span{
    margin-left: 30px;
    color: red;
    font-weight: 600;
    font-family: '宋体', 'Arial Narrow', Arial, sans-serif;
}

/** */
.property_name{
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    border-bottom: 1px solid #999;
    background-color: #eee;
}

.top_name{
    margin-left: 160px;
}
.top_price{
    margin-left: 320px;
}
.top_amount{
    margin-left: 120px;
}
.top_truly_price{
    margin-left: 110px;
}
.order_status{
    margin-left: 140px;
}
.order_operate{
    float: right;
    margin-right: 25px;
}


/** */
.order_list{
    margin-top: 10px;
}
.order_item{
    margin: 10px;
    border: 1px solid #666666;
    height: 120px;
}

/** */
.item_top{
    background-color: #ccc;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
}
.order_time{
    margin: auto 20px;
}
.order_delete{
    float: right;
    margin-right: 20px;
}


/** */
.item_body{
    display: flex;
    font-size: 14px;
}
.goods_img{
    width: 60px;
    height: 60px;
    margin-top: 20px;
    margin-left: 30px;
}
.goods_name{
    display: block;
    text-align: left;
    margin-top: 20px;
    margin-left: 30px;
    width: 300px;
}
.goods_param{
    color: #999;
    font-size: 12px;
    overflow: hidden;
}
.goods_price{
    display: block;
    text-align: center;
    margin-top: 20px;
    margin-left: 30px;
    width: 160px;
}
.goods_amount{
    display: block;
    text-align: center;
    margin-top: 20px;
    margin-left: 30px;
    width: 100px;
}
.truly_price{
    display: block;
    text-align: center;
    margin-top: 20px;
    margin-left: 30px;
    width: 160px;
    border-left: #666666 1px solid;
}
.order_info{
    display: block;
    text-align: center;
    margin-top: 20px;
    margin-left: 30px;
    width: 200px;
    border-left: #666666 1px solid;
}


</style>