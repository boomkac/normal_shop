<template>
    <div>
        <user-nav/>
        <div class="submit_cover" :style="`display:${isSubmitted}`"></div>
        <div class="submit_successful" :style="`display:${isSubmitted}`">
            <span style="color:#ee2200;">提交成功！</span><br>
            <span>即将跳转到主页</span>
        </div>
        <div class="order_submit_page">
            <div class="order_submit_container">
                <div class="submit_top">
                    <span>提交订单</span>
                </div>
                <div class="receive_address">
                    <div class="address_top">
                        &nbsp;&nbsp;&nbsp;&nbsp;确认收货地址
                        <span style="float:right;margin-right:40px">编辑收货地址</span>
                    </div>
                    <div class="address_item"
                    v-for="(item,index) in allAddress"
                    :key="index">
                        <input type="radio" name="address" :value="item.address" v-model="address">
                        <span>{{item.address}}</span>
                    </div>
                </div>
                <div class="property_name">
                    <span class="name_info">商品信息</span>
                    <span class="name_price">单价</span>
                    <span class="name_count">数量</span>
                    <span class="name_all_price">金额</span>
                </div>
                <div class="cart_list">
                    <div class="cart_goods_item" v-for="(item,index) in goodss" :key="index">
                        <img :src="` ${item.goodspicture[0]}`" class="goods_img">
                        <span class="goods_name">{{item.goodsname}}</span>
                        <div class="goods_param">
                            <div v-for="(item2,index2) in item.goodsparams" :key="index2">{{index2}}：{{item2}}</div>
                        </div>
                        <span class="once_price">{{item.price}}</span>
                        <div class="goods_count">
                            <button @click="subCount(index)">-</button>
                            <input type="text" :value="item.count" disabled>
                            <button @click="addCount(index)">+</button>
                        </div>
                        <span class="all_price">{{item.sumprice}}</span>
                    </div>
                </div>
                <div class="cart_bottom">
                    <span class="goods_selected">已选商品<strong>{{goodscount}}</strong>件</span>
                    <span class="sum_price">合计：￥</span>
                    <span class="sum_price_num">{{allprice}}</span>
                    <div class="submit_goods" @click="submitAll">结算</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserNav from './UserNav.vue'
export default {
  components: { UserNav },
    name:'SubmitPage',
    data(){
        return {
            isSubmitted : 'none',
            goodss:[],
            allprice:0,
            allAddress:[],
            address:''
        }
    },
    computed:{
        goodscount(){
            return this.goodss.length
        }
    },
    methods:{
        submitAll(){
            // setTimeout(() => {
            //     this.$router.push('/index/advertise')
            // }, 2000);
            let sendData = []
            let dataItem = {}
            let cart = ''
            this.goodss.forEach(item=>{
                dataItem = {}
                dataItem['goodsid'] = item['_id'];
                dataItem['goodsname'] = item['goodsname'];
                dataItem['goodspicture'] = item['goodspicture'][0];
                dataItem['price'] = item['price'];
                dataItem['count'] = item['count'];
                dataItem['goodsparams'] = item['goodsparams'];
                dataItem['allprice'] = item['price'] * item['count'];
                dataItem['address'] = this.address;
                dataItem['ordertime'] = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
                dataItem['paystatus'] = 0
                dataItem['userid'] = JSON.parse(sessionStorage.getItem('user'))['_id']
                cart = item['cartid']

                sendData.push([dataItem,cart])
            })
            this.isSubmitted = 'block'
            this.$API.orderSubmit(sendData)
            .then(value=>{
                sessionStorage.removeItem('submitGoods')
                setTimeout(() => {
                    
                    this.$router.push('/order')
                }, 2000);
                console.log(value.data)
            })
        },
        getSubmitInfo(){
            //获取当前提交的商品信息
            this.goodss = JSON.parse(sessionStorage.getItem('submitGoods'))
            this.goodss.forEach(element => {
                this.$set(element,'sumprice',element['count']*element['price'])
            });
            this.computeAllPrice()
            // console.log(this.goodss)
        
            //获取地址
            this.$API.addressGet({'userid':JSON.parse(sessionStorage.getItem('user'))['_id']})
            .then(value=>{
                this.allAddress = value.data
                this.address = this.allAddress[0]['address']
            })
        },
        computeAllPrice(){
            this.allprice = 0
            this.goodss.forEach(item=>{
                this.allprice += item.sumprice
            })
        },
        addCount(index){
            let tmp = this.goodss[index]
            tmp['count'] = tmp['count']+1
            tmp['sumprice'] = tmp['count'] * tmp['price']
            this.goodss.splice(index,1,tmp)
            this.computeAllPrice()
            console.log(this.goodss)
        },
        subCount(index){
            let tmp = this.goodss[index]
            if(tmp['count']<=1){
                return
            }
            tmp['count'] = tmp['count']-1
            tmp['sumprice'] = tmp['count'] * tmp['price']
            this.goodss.splice(index,1,tmp)
            this.computeAllPrice()
            console.log(this.goodss)
        }
    }, 
    beforeMount(){
        this.getSubmitInfo()
    }
}
</script>

<style scoped>
.submit_cover{
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background-color: #999;
    border: 1px solid red;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
}
.submit_successful{
    border-radius: 20px;
    width: 400px;
    height: 240px;
    background-color: white;
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    transform: translate(-200px,-120px);
    line-height: 100px;
    font-size: 40px;
    font-weight: 600;
    font-family: '宋体', 'Arial Narrow', Arial, sans-serif;
    text-align: center;
}

/*商品购买提交页*/
.order_submit_page{
    /* background-color: white; */
    border-radius: 20px;
    margin: auto;
    width: 80%;
    min-width: 1280px;
}

.order_submit_container{
    width: 80%;
    margin: auto;
    background-color: white;
    /* overflow: hidden; */
    border-radius: 20px;
    position: relative;
    padding-top: 10px;
}

/** */
.submit_top{
    height: 30px;
    font-size: 30px;
    line-height: 30px;
}
.submit_top{
    margin-left: 30px;
}

/** */
.receive_address{
    margin: 20px 20px;
    width: auto;
    border: 1px solid red;
    border-radius: 20px;
}

.address_top{
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    border-bottom: 1px red solid;
}

.address_item{
    height: 30px;
    border: 1px solid red;
    margin: 10px;
    border-radius: 20px;
    display: flex;
}
.address_item>input{
    margin-left: 20px;
    display: block;
    margin-top: 8px;    
}
.address_item>span{
    line-height: 30px;
    margin-left: 10px;
}

/** */
.property_name{
    font-size: 16px;
    font-weight: 600;
    font-family: '宋体', 'Arial Narrow', Arial, sans-serif;
    margin-top: 10px;
}

.name_info{
    margin-left: 120px;
}

.name_price{
    margin-left: 384px;
}

.name_count{
    margin-left: 115px;
}

.name_all_price{
    margin-left: 152px;
}

.name_operate{
    margin-left: 80px;
}


/** */
.cart_list{
    width: 100%;
}

.cart_goods_item{
    width: auto;
    height: 80px;
    margin: 15px 10px;
    border: 1px solid red;
    border-radius: 40px;
    padding: 10px;
    display: flex;
}

.check_goods{
    display: block;
    margin-top: 30px;
    cursor: pointer;
}

.goods_img{
    width: 60px;
    height: 60px;
    margin-top:10px;
    margin-left: 10px;
}

.goods_name{
    display: block;
    margin:10px 10px;
    width: 240px;
}

.goods_param{
    width: 120px;
    margin:10px 30px;
}

.once_price{
    text-align: center;
    width: 160px;
    display: block;
    margin:10px 10px;
}

.goods_count{
    width: 160px;
    display: block;
    margin:10px 10px;
}
.goods_count>button{
    cursor: pointer;
}
.goods_count>input{
    width: 60px;
    outline-style: none;
    text-align: center;
}

.all_price{
    width: 160px;
    display: block;
    margin:10px 10px;
    text-align: center;
}

.delete_goods{
    display: block;
    margin:10px 10px;
    font-size: 14px;
    cursor: pointer;
}
.delete_goods:hover{
    color: rgb(255, 94, 0);
    text-decoration: underline;
}




/** */
.cart_bottom{
    position: sticky;
    width: 100%;
    height: 80px;
    border-top: 1px solid red;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    bottom: 0px;
    background-color: white;
    margin: 0px;
    left: -2px;
    display: flex;
    font-size: 16px;
}

.all_select{
    margin-left: 20px;
    margin-top: 28px;
}

.all_check{
    margin-top: 28px;
    width: 20px;
    height: 20px;
}

.delete_select{
    margin-left: 60px;
    margin-top: 28px;
}

.goods_selected{
    margin-left: 640px;
    margin-top: 19px;
}

.goods_selected>strong{
    font-size: 24px;
    color: red;
}

.sum_price{
    margin-left: 40px;
    margin-top: 28px;
}

.sum_price_num{
    margin-left: 0px;
    margin-top: 20px;
    font-size: 30px;
    font-weight: 600;
    font-family: '宋体', 'Arial Narrow', Arial, sans-serif;
    color: red;
}

.submit_goods{
    margin-left: 40px;
    margin-top: 14px;
    border-radius: 20px;
    width: 80px;
    height: 40px;
    background-color: red;
    line-height: 40px;
    text-align: center;
    color: white;
    font-size: 18px;
    font-weight: 600;
    font-family: '宋体', 'Arial Narrow', Arial, sans-serif;
    cursor: pointer;
}

.submit_goods:hover{
    background-color: rgb(230, 0, 0);
}

</style>