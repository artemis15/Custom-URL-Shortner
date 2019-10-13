const express = require('express');
const router = express.Router();
const validURL = require('valid-url');
const shortID = require('shortid');
const config = require('config');
const urlModel  = require('../model/url');


// Route POSt Method /api/url/shorturl

router.post('/shorturl',async (req,res)=>{
const {longUrl} = req.body;
const baseUrl = config.get('baseURL');

if(!validURL.isUri(baseUrl)){
    res.status(401).json({
        msg: "Enter Valid Base URL"
    });
}

//url code
const urlCode = shortID.generate();

//check long url
if(validURL.isUri(longUrl))
{
try {
    let url = await urlModel.findOne({longUrl:longUrl});
    if(url)
    {
        res.status(203).json({
            msg: ' URL already exists',
            data: url
        })
    }
    else{
        const shorturl = baseUrl+"/"+urlCode; 

        url = new  urlModel({
            longUrl: longUrl,
            shortURL: shorturl,
            urlCode: urlCode,
            date: new Date()
        });

        await url.save();
        res.json(url);
    }
} catch (error) {
    console.log(error);
    res.status(500).json('Server Error');
}
}
else{
    res.status(401).json('Invalid Long URL');
}

});

module.exports = router ;