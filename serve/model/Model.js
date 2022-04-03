const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shop_db',()=>{
    console.log('数据库shop_db已连接')
})
const schema = mongoose.Schema

const userSchema = new schema({
    phone: Number,
    password: String,
    username: String,
    photo: String
})
module.exports.userModel = mongoose.model('user',userSchema)


const goodsScheam = new schema({
    goodsname: String,
    goodsoptions: Object,
    shopid: String,
    goodspicture: Array,
    infopicture: Array,
    goodsparams: Object,
    price: Number,
    classify: String
})
module.exports.goodsModel = mongoose.model('goods',goodsScheam)

const shopSchema = new schema({
    shopname: String,
    labels: Array,
    shopphoto: String
})
module.exports.shopModel = mongoose.model('shop',shopSchema)

const commentSchema = new schema({
    content: String,
    commenttime: String,
    like: Number,
    userid: String,
    goodsid: String,
    username: String
})
module.exports.commentModel = mongoose.model('comment',commentSchema)

const cartSchema = new schema({
    goods: Object,
    goodsparams: Object,
    count: Number,
    userid: String
})
module.exports.cartModel = mongoose.model('cart',cartSchema)

const orderSchema = new schema({
    goodsid: String,
    goodsname: String,
    goodspicture: String,
    goodsprice: Number,
    count: Number,
    goodsparams: Object,
    allprice: Number,
    address: String,
    ordertime: String,
    paystatus: Number,
    userid: String
})
module.exports.orderModel = mongoose.model('order',orderSchema)

const addressSchema = new schema({
    userid: String,
    address: String,
})
module.exports.addressModel = mongoose.model('address',addressSchema)

