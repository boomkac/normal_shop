//封装数据库查找

const { default: mongoose } = require("mongoose")

//1.查找
module.exports.find = (db, n)=>{
    return new Promise((resolve, reject)=>{
        if(n === 0){
            db.find((err, data)=>{
                if(err) throw err;
                resolve(data)
            })
        }else{
            db.find().limit(n).exec((err, data)=>{
                if(err) throw err;
                resolve(data)
            })
        }
    })
}

//2.条件查找
module.exports.search = (db,condition,n)=>{
    return new Promise((resolve,reject)=>{
        if(n === 0){
            db.find(condition,(err,data)=>{
                if(err) throw err;
                resolve(data)
            })
        }else{
            db.find(condition).limit(n).exec((err,data)=>{
                if(err) throw err;
                resolve(data)
            })
        }
    })
}

//2.插入
module.exports.insert = (db, insertdata)=>{
    return new Promise((resolve,reject)=>{
        let data = new db(insertdata)
        data.save((err,data)=>{
            if(err) throw err;
            resolve(data)
        })
    })
}

//3.插入多条
module.exports.insertMany = (db, insertdata)=>{
    return new Promise((resolve,reject)=>{
        db.insertMany(insertdata,(err,data)=>{
            if(err) throw err;
            resolve(data)
        })
    })
}

//删除
module.exports.remove = (db,condition)=>{
    return new Promise((resolve,reject)=>{
        db.remove(condition,(err,data)=>{
            if(err) throw err;
            resolve(data)
        })
    })
}


//3.更新
module.exports.update = (db,condition,item)=>{
    return new Promise((resolve,reject)=>{
        db.findOneAndUpdate(condition,{$set:item},{},(err,data)=>{
            if(err) throw err;
            resolve(data)
        })
    })
}

//渲染首页的数据

//注册
// module.exports.register = 
