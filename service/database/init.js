const mongoose = require('mongoose')
const db = "mongodb://localhost/simle-db2" //simle-db数据库的名字

const glob = require('glob')
const { resolve } = require('path')
    //读取 schema 文件夹下的文件
exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

mongoose.Promise = global.Promise

//导出方法
exports.connect = () => {
    //连接次数
    let maxConnectTimes = 0
        //是否连接成功
    return new Promise((resolve, reject) => {
        //连接数据库
        mongoose.connect(db)
            //增加数据库连接的事件监听
        mongoose.connection.on('disconnected', err => {
                console.log(`**************数据库断开`);
                //进行重连
                if (maxConnectTimes < 3) {
                    maxConnectTimes++
                    mongoose.connect(db)
                } else {
                    reject(err)
                    throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
                }
            })
            //数据库出现错误的时候
        mongoose.connection.on('error', err => {
                console.log(`**************数据库报错`, err);
                if (maxConnectTimes < 3) {
                    maxConnectTimes++
                    mongoose.connect(db)
                } else {
                    reject(err)
                    throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
                }

            })
            //链接打开的时候
        mongoose.connection.once('open', () => {
            console.log('链接打开成功!')
            resolve()
        })
    })
}