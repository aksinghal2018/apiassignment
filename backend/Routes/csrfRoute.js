const express=require('express')
const PORT=8899
const router=express.Router()
var { randomBytes } = require('crypto');
//const history=require('history')


router.get('/csrfform',(req,res)=>{
    if (req.session.csrf === undefined) {
        req.session.csrf = randomBytes(100).toString('base64'); // convert random data to a string
      }
    res.render('Home',{csrf:req.session.csrf})
})

router.post('/csrfpost',(req,res)=>{
    if(req.body.csrf==undefined){
        res.send("csrf token not found.")
    }
    else if(req.session.csrf!==req.body.csrf){
        res.send("csrf not match.")
    }
    else{
    res.render('Postdata',{data:req.body.name})
    }
})
//end
module.exports=router;