<template>
    <div>
        <user-nav/>
        <div class="shop_cart_area">
            <div class="cart_body">
                <div class="cart_top">
                    <span>购物车（全部<strong>2</strong>）</span>
                </div>
                <div class="property_name">
                    <span class="name_info">商品信息</span>
                    <span class="name_price">单价</span>
                    <span class="name_count">数量</span>
                    <span class="name_all_price">金额</span>
                    <span class="name_operate">操作</span>
                </div>
                <div class="cart_list">
                    <div class="cart_goods_item" v-for="(item,index) in cartgoods" :key="index">
                        <input type="checkbox" class="check_goods" v-model="isCheck[index]">
                        <img :src="` ${item.goods.goodspicture[0]}`" class="goods_img">
                        <span class="goods_name">{{item.goods.goodsname}}</span>
                        <div class="goods_param">
                            <div v-for="(item1,index1) in item.goodsparams" :key="index1">{{index1}}:{{item1}}</div>
                        </div>
                        <span class="once_price">{{item.goods.price}}</span>
                        <div class="goods_count">
                            <button @click="subGoods(item)">-</button>
                            <input type="number" :value="item.count">
                            <button @click="addGoods(item)">+</button>
                        </div>
                        <span class="all_price">{{item.goods.price*item.count}}</span>
                        <span class="delete_goods">删除</span>
                    </div>
                </div>
                <div class="cart_bottom">
                    <span class="all_select">全选</span>
                    <input type="checkbox" class="all_check" v-model="checkAll" @click="selectAll">
                    <span class="delete_select">删除</span>
                    <span class="goods_selected">已选商品<strong>{{count}}</strong>件</span>
                    <span class="sum_price">合计：￥</span>
                    <span class="sum_price_num">{{allprice}}</span>
                    <div class="submit_goods" @click="submitCart">结算</div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import UserNav from './UserNav.vue'
export default {
  components: { UserNav },
    name:'ShopCart',
    data(){
        return {
            cartgoods:0,
            allprice:0,
            isCheck:[],
            checkAll:false,
            count: 0
        }
    },
    methods:{
        //增加数量
        addGoods(item){
            this.$API.cartCount(item,1)
            .then(()=>{
                this.$router.go(0)
            })
        },
        //减少数量
        subGoods(item){
            if(item.count === 1) return
            this.$API.cartCount(item,0)
            .then(()=>{
                this.$router.go(0)
            })
        },
        //初始化
        initialize(){
            this.allprice = 0
            for(let key in this.cartgoods){
                if(key !== -1)  this.isCheck.push(false)
            }
        },
        //全选
        selectAll(){
            for(let key in this.cartgoods){
                this.isCheck.splice(key,1,!this.checkAll)
            }
        },
        //计算数量和总价
        computePrice(){
            this.allprice = 0
            this.count = 0
            for(let key in this.cartgoods){
                if(this.isCheck[key] === true){
                    this.allprice += this.cartgoods[key].goods.price*this.cartgoods[key].count
                    this.count++
                }
            }
        },
        //提交购物车
        submitCart(){
            let submitGoods = []
            for(let key in this.cartgoods){
                if(this.isCheck[key] === true){
                    submitGoods.push({...this.cartgoods[key].goods,'goodsparams':this.cartgoods[key].goodsparams,'count':this.cartgoods[key].count,'cartid':this.cartgoods[key]['_id']})
                }
            }
            if(submitGoods.length === 0){
                alert('请选择提交的商品')
                return
            }
            sessionStorage.setItem('submitGoods',JSON.stringify(submitGoods))
            this.$router.push('/submit')
        },
    },
    watch:{
        isCheck(){
            let flag = true
            for(let key in this.cartgoods){
                if(this.isCheck[key] === false) flag = false
            }
            this.checkAll = flag
            this.computePrice()
            
        }
    }, 
    beforeMount(){
        this.$API.cartGet(JSON.parse(sessionStorage.getItem('user'))['_id'])
        .then(value=>{
            this.cartgoods = value.data
        })
        .then(()=>{
            this.initialize()
        })
    }
}
</script>

<style scoped>

/*购物车页面*/
.shop_cart_area{
    background-color: white;
    border-radius: 20px;
    margin: auto;
    width: 80%;
    min-width: 1280px;
}

.cart_body{
    width: 100%;
}

.cart_top{
    width: 100%;
    height: 80px;
    border-bottom: 1px solid red;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.cart_top>span{
    line-height: 80px;
    margin-left: 30px;
    font-size: 24px;
    font-weight: 600;
    font-family:'宋体', 'Arial Narrow', Arial, sans-serif;
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
    margin-left: 440px;
}

.name_count{
    margin-left: 115px;
}

.name_all_price{
    margin-left: 180px;
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
    cursor: pointer;
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

/**去除数字输入框右边的加减 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button { 
    -webkit-appearance: none; 
}
input[type="number"]{ 
    -moz-appearance: textfield; 
}
</style>