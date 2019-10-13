const express = require('express');
const router = express.Router();
const urlModel  = require('../model/url');


//GET router
router.get('/:code',async(req,res) =>{
    try {
    let url = await urlModel.findOne({ urlCode:req.params.code });  
    if(url)
    {
        return res.redirect(url.longUrl);
    }   
    else{
        return res.status(404).json("No URL Found");
    }
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
});

module.exports = router ;