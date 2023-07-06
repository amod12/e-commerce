const express = require("express");
const router = express.Router();
const Items = require("../models/Items");
  
router.post("/items", async (req, res) => {
    try {
      Items.findOne({ catagoryName: req.body.catagoryName }).then((item) => {
        if(!item){
          const itemData =  Items.create(req.body);
          
          if (itemData) {
            res.json({ msg: "Item is added" });
          } else {
            res.json({ msg: "something went worng" });
          } 
        }
        else{
          res.status(409).json({ error: "item already exists" });
        }
   
      });
    } catch (err) {
      console.log(err);
    }
  });

router.put("/items", async (req, res) => {
  try {
    const data = await Items.findByIdAndUpdate(req.body._id, req.body)
    if(data){
      res.status(200).json({msg: "updated successfully!"})
    }
  } catch (err) {
    console.log(err);
  }
});
  
router.get("/items", async (req, res) => {
  
try {
    const data = await Items.find()
    if(data){
        res.status(200).json({
            validItemOptions: data
        })
    }else{
        res.status(500).json({
            msg: "something went wrong"
        })
    }
} catch (err) {
    console.log(err);
}
});

router.delete("/items", async (req, res) => {
  try {
    const data = await Items.findByIdAndDelete(req.body._id)
    if(data){
      res.status(204).json({msg: 'deleted successfully'})
    }
  } catch (err) {
      console.log(err);
  }
  });

router.get('/items/:name', async(req, res) => { 
  const items = req.params.name; // get the name from the URL parameter
  // perform a database query or some other logic to find the resource by name
  const data = await Items.find({catagoryRole:items});
  if (data) {
    // if the resource is found, return it as a JSON object
    res.status(200).json({
      validItemOptions: data
  })    } else {
    // if the resource is not found, return a 404 error
    res.status(404).json({ error: 'Resource not found' });
  }
});

router.get('/item/',async (req, res) => {
  // const data = await Items.find({ catagoryName: {$regex : "^" + req.query.qSearch}});
  var regexp = new RegExp("^"+ req.query.qSearch);
  const data = await Items.find({ catagoryName: regexp});

  try {
    if (data) {
      res.status(200).json({
        validItemOptions: data
    })    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
