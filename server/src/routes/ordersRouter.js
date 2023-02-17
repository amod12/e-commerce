const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/orders",  async (req, res) => {
    try {
        const dbResponse = await Orders.create(req.body)
        if(dbResponse){
            res.status(200).json({
                msg: "orders dispatched successfully"
            })
        }
    } catch (err) {
      console.log(err);
    }
  });

  // router.patch("/orders/status",  async (req, res) => {
  //   try {
  //      console.log(req.body)
  //       const data =await  Orders.findByIdAndUpdate(req.body.id, {"orderStatus": "Accepted"})
        
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  // const tokenValidator = (req, res, next)=> {
  //   if(req.headers.authorization){
  //     const token = req.headers.authorization.split(' ')[1]
  //     jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
  //       if(err) return res.sendStatus(403)
  //       if(decoded)  next()
  //     });
  //   }else return res.sendStatus(403)
  // }

  router.get("/orders", async (req, res) => {
    try {
        const totalOrdersLength = await Orders.find()
        if(req.query.userId){
          const data = await Orders.find({"userId":req.query.userId})
          res.status(200).json({
            orders: data
        })
        }else{
         const data = await Orders.find().limit(req.query.size).skip(req.query.size* req.query.page - req.query.size)
          if(data){
              res.status(200).json({
                  orders:data,
                  totalOrdersCount: totalOrdersLength.length
              })
          }
        }
       
    } catch (err) {
      console.log(err);
    }
  });

  router.delete("/orders", async (req, res) => {
    try {
      const totalOrdersLength = await Orders.find()
      if(req.query.userId){
        const data = await Orders.find({"userId":req.query.userId})
        res.status(200).json({
          orders: data
      })
      }else{
       const docsFilteredByStatus =  req.query.role == 'admin' ? {orderStatus:req.query.orderStatus} : { orderStatus: { $nin:[ 'Pending']} }
       const data = await Orders.find(docsFilteredByStatus).limit(req.query.size).skip(req.query.size* req.query.page - req.query.size)
        if(data){
            res.status(200).json({
                orders:data,
                totalOrdersCount: totalOrdersLength.length
            })
        }
      }
     
  }  catch (err) {
        console.log(err);
    }
    });

    router.put("/orders", async (req, res) => {
      try {
        const data = await Orders.findByIdAndUpdate(req.body._id, req.body)
        if(data){
          res.status(200).json({msg: "updated successfully!"})
        }
        else{
          res.status(500).json({msg:"something went wrong"})
        }
      } catch (err) {
        console.log(err);
      }
    });
      

module.exports = router;
