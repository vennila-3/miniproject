const express = require('express')
let mongodb = require('mongodb')
//import url
let url = require('../url')
//create mongoclient
let mcl = mongodb.MongoClient
//create router instance
let router = express.Router()
//create rest api
router.get("/", (req, res) => {
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniprj')
            db.collection('products').find().toArray((err, array) => {
                if (err)
                    console.log('Error :- ' + err)
                else {
                    console.log('Data sent')
                    res.json(array)
                    conn.close()
                }
            })
        }
    })
})

//User login Authentication
router.post("/auth", (req, res) => {
    let uname = req.body.uname
    let upwd = req.body.upwd
    let obj = { uname, upwd }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db("miniprj")
            db.collection('users').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    if (array.length > 0)
                        res.json({ 'auth': 'success', 'user': uname })
                    else
                        res.json({ 'auth': 'failed' })
                    console.log('Auth response sent')
                    conn.close()
                }
            })
        }
    })
})
//Fetch cart data
router.post("/fetchCart", (req, res) => {
    let uname = req.body.uname
    let obj = { uname }
    //connect to mongodb
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db("miniprj")
            db.collection('cart').find(obj).toArray((err, array) => {
                if (err)
                    console.log(err)
                else {
                    res.json(array)
                    console.log(`Cart response for ${obj.uname} sent`)
                    conn.close()
                }
            })
        }
    })
})


//export router
module.exports = router
