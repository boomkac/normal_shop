const express = require('express')
const router = express.Router()
const data = require('./data.js')
const Model = require('../model/Model')
const Controller = require('../controller/controller')
const mongoose = require('mongoose')

//访问
router.get('/',(req,res)=>{
    res.status(200).render('index.html')
})

//首页数据
router.get('/api/index/advertise', (req, res) => {
    console.log('收到首页的GET请求')
    let sendData = {notice_list:[],advertise_list:[],recommand_list:[],like_list:[]}
    sendData.notice_list = data.index.notice_list
    //
    Controller.find(Model.goodsModel,3)
    .then((value)=>{
        //添加到发送的对象上
        value.forEach((item,index)=>{
            sendData.advertise_list.push(item)
        })
        return Controller.find(Model.goodsModel,4)
    }).then((value)=>{
        //添加到发送的对象上
        value.forEach((item,index)=>{
            sendData.recommand_list.push(item)
        })
        return Controller.find(Model.goodsModel,20)
    }).then((value)=>{
        //添加到发送的对象上
        value.forEach((item,index)=>{
            sendData.like_list.push(item)
        })
        res.send(sendData)
    }).catch(err=>{
        return res.status(500).send('服务器错误')
    })
})

//登录提交
router.post('/api/user/login', (req, res) => {
    let receData = req.body
    Controller.search(Model.userModel,{'phone':receData.phone},1)
    .then(value=>{
        //检测账号密码
        if(value.length === 0)  return Promise.reject('id_or_password_err')
        if(value[0].password !== receData.password) return Promise.reject('id_or_password_err')
        res.status(200).send(value[0])
    })
    .catch(err=>{
        res.status(200).send(err)
    })
})

//注册提交
router.post('/api/user/register', (req, res) => {
    let receData = req.body
    Controller.search(Model.userModel,{'phone':receData.phone},0)
    .then((value)=>{
        console.log(value)
        if(value.length !== 0){
            return Promise.reject('phoneed')//手机号已被注册
        }
        return Controller.search(Model.userModel,{'username':receData.username},0)
    })
    .then(value=>{
        if(value.length !== 0){
            return Promise.reject('usernameed')//用户名已被注册
        }
        return Controller.insert(Model.userModel,{'phone':receData.phone,'password':receData.password,'username':receData.username,'photo':'自行车.png'})
    })
    .then(value=>{
        console.log('插入成功')
        return Controller.search(Model.userModel,{'phone':receData.phone})
    })
    .then(value=>{
        return res.status(200).send(value[0])
    })
    .catch(err=>{
        // res.status(500).send('服务器错误')
        res.status(200).send(err)
    })

})
//获取验证码
router.get('/api/user/registercode',(req,res)=>{
    res.send({'code':'6666'})
})

//详细页信息
router.get('/api/goods/info',(req,res)=>{
    console.log('收到info页的GET请求')
    let goodsid = req.query.goodsid
    let shopid = ''
    let sendData = {}
    //查询主要商品                  
    Controller.search(Model.goodsModel,{'_id':mongoose.Types.ObjectId(goodsid)},1)
    // .then(value=>{
    //     res.status(200).send(value[0])
    // })
    //查询店铺
    .then(value=>{
        sendData.goods = value[0];
        shopid = mongoose.Types.ObjectId(value[0].shopid)
        return Controller.search(Model.shopModel,{'_id':shopid},1)
    })
    //查询该店铺的更多商品
    .then(value=>{
        sendData.shop = value[0]
        return Controller.search(Model.goodsModel,{'shopid':shopid},6)
    })
    //查询评论
    .then(value=>{
        sendData.goodss = value
        return Controller.search(Model.commentModel,{'shopid':shopid},20)
    })
    .then(value=>{
        sendData.comment = value
        res.status(200).send(sendData)
    })
    .catch(err=>{
        res.status(500).send(err)
    })
})

//获取地址列表
router.post('/api/order/address',(req,res)=>{
    let userid = req.body.userid
    console.log(userid)
    Controller.search(Model.addressModel,{'userid':userid},0)
    .then((value=>{
        res.status(200).send(value)
    }))
    .catch(err=>{
        res.status(500).send('服务器错误')
    })
})

//添加到购物车
router.post('/api/cart/add',(req,res)=>{
    let receData = req.body

    let count = 0
    Controller.search(Model.cartModel,{'goods':receData.goods,'goodsparams':receData.goodsparams,'userid':receData.userid},1)
    .then(value=>{
        if(value.length === 0){
            return Controller.insert(Model.cartModel,receData)
        }else{
            count = receData.count + value[0].count
            return Controller.update(Model.cartModel,{'goods':value[0].goods,'goodsparams':value[0].goodsparams,'userid':value[0].userid},{'count':count})
        }
    })
    .then(value=>{
        res.status(200).send('添加成功')
    })
    .catch(err=>{
        res.status(500).send('服务器错误')
    })

    // Controller.insert(Model.cartModel,receData).then(value=>{
    //     res.status(200).send('添加成功')
    // })
    // .catch(err=>{
    //     res.status(500).send('服务器错误')
    // })
})

//获取购物车数据
router.get('/api/cart/get',(req,res)=>{
    let receData = req.query
    Controller.search(Model.cartModel,{'userid':receData.userid},0)
    .then(value=>{
        res.status(200).send(value)
    })
    .catch(err=>{
        res.status(500).send('服务器错误')
    })
})

//购物车数量加减
router.post('/api/cart/count',(req,res)=>{
    let receData = req.body[0]
    let flag = req.body[1]
    if(flag){
        Controller.update(Model.cartModel,{'_id':mongoose.Types.ObjectId(receData['_id'])},{'count':receData.count + 1})
        .then(value=>{
            res.status(200).send('添加成功')
        })
        .catch(err=>{
            res.status(500).send('服务器错误')
        })
    }else{
        Controller.update(Model.cartModel,{'_id':mongoose.Types.ObjectId(receData['_id'])},{'count':receData.count - 1})
        .then(value=>{
            res.status(200).send('减少成功')
        })
        .catch(err=>{
            res.status(500).send('服务器错误')
        })
    }
    
})

//订单提交
router.post('/api/order/submit',(req,res)=>{
    // console.log(req.body)
    let receData = req.body
    let cartid = []
    receData.forEach(item => {
        cartid.push(item[1])
    });
    let order = []
    receData.forEach(item => {
        order.push(item[0])
    });
    Controller.insertMany(Model.orderModel,order)
    .then((value)=>{
        return new Promise((resolve,reject)=>{
            Model.cartModel.remove({'_id':{$in:cartid}},(err,value)=>{
                if(err) throw err;
                resolve(value)
            })
        })
    })
    .then(value=>{
        res.status(200).send('提交成功')
    })
    .catch(err=>{
        res.status(500).send('服务器错误')
    })
    // receData.forEach(item => {
    //     console.log(item)
    //     // Controller.insert(Model.orderModel,item)
    // });
    
})

//订单获取
router.post('/api/order/get',(req,res)=>{
    console.log(req.body)
    let receData = req.body
    console.log(receData)
    Controller.search(Model.orderModel,receData,0)
    .then(value=>{
        res.status(200).send(value)
    })
    .catch(err=>{
        res.status(500).send('服务器错误')
    })
})

//插入数据
router.post('/api/insert',(req,res)=>{
    // console.log(req.body)
    let goods = new Model.goodsModel(req.body)
    goods.save((err,res)=>{
        if(err) throw err;
        console.log('插入成功')
    })
    res.status(200).send('')
})

module.exports = router