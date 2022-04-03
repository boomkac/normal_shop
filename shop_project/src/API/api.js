import request from "./request";

export default {
    //广告页数据
    getIndexAd : () => request({url:`/index/advertise`},'get'),

    //登录
    loginPost : (phone,password)=> request.post(`/user/login`,{'phone':phone, 'password':password}),
    
    //注册
    registerPost : (phone,username,password)=> request.post(`/user/register`,{'phone':phone,'username':username, 'password':password}),
    //获取验证码
    rcodeGet: ()=>request.get('/user/registercode'),

    //获取信息页数据
    infoGet: (goodsid)=> request.get(`/goods/info?goodsid=${goodsid}`),

    //获取提交页信息
    addressGet: (userid)=>request.post('/order/address',userid),

    //添加购物车
    addCartPost: (goods)=>request.post('/cart/add',goods),

    //渲染购物车
    cartGet: (userid)=>request.get(`/cart/get?userid=${userid}`),

    //购物车加减数量
    cartCount: (item,flag)=>request.post('/cart/count',[item, flag]),

    //商品提交
    orderSubmit:(orders)=>request.post('/order/submit',orders),

    //订单获取
    orderPost: (userid)=>request.post('/order/get',{'userid':userid})
}

