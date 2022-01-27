const express=require('express')
const router=express.Router()
const app=express()
const jsonwebtoken=require('jsonwebtoken')
const jsonsecret="5sa5sa67s66s66sa6saww"
const main=require('../Sendmail/Sendmail')
const jwt_decode =require('jwt-decode')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const userModel=require('../db/userSchema.js');
const sendEmail=require('../Sendmail/Sendemail1')
function autenticateToken(req,res,next){
    //console.log(req!=undefined)

    if(req!=undefined){
    const token=req.query.token
    //console.log(req.headers)
    if(token==null){
        res.json({"err":1,"msg":"Token not match"})
    }
    else {
        jsonwebtoken.verify(token,jsonsecret,(err,data)=>{
            if(err){
                res.send("Token expired")
            }
            else {
                //console.log("Match")
                next();
            }
        })
    }
}
else{
    next()
}
}
router.post("/adduser",(req,res)=>{
    let username=req.body.username;
    let email=req.body.email;
    let mobile=req.body.mobile;
    let age=req.body.age;
    let address=req.body.address;
    let password=req.body.password;
    //console.log(req.body)
    //insert data
    const data={username:username,email:email,mobile:mobile,age:age,address:address,password:password}
    let ins=new userModel(data);
    //console.log(data)
    ins.save((err)=>{
        if(err){ res.json({err:"user already added",message:"user already added."})}
        else{
        res.json({data:data,err:"",message:"user added"});
        }
    })
})
router.get("/getuser",(req,res)=>{
    userModel.find({},(err,data)=>{
        if(err) throw err;
        else{
        res.send(data);}
    })
})
router.post("/checkuser",(req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    //console.log('a')
    console.log(email,password)
    let token=jsonwebtoken.sign({ UID:email },jsonsecret,{ expiresIn: 60*60 }) //1 minute expire time for jwt token
    //console.log(token)
    userModel.find({$and:[{email:email},{password:password}]},(err,data)=>{
        if(err){
            res.json({err:err,message:"incorrect username And password."})
        }   
        else{
            console.log(data)
            if(data.length==0){
                res.json({err:"user not exist",message:"incorrect username And password."})
            }
            else{
        res.json({data:data,err:"",token:token});
            }
    }
    })
})

router.delete("/deluser/:id",(req,res)=>{
    let id=req.params.id;
    userModel.deleteOne({_id:id},(err)=>{
        if(err) throw err 
        res.send("user Data Deleted .")
    })
})
router.put("/updateuser/:id",(req,res)=>{
    let id=req.params.id;
    let username=req.body.username;
    let email=req.body.email;
    let mobile=req.body.mobile;
    let age=req.body.age;
    let address=req.body.address;
    userModel.updateOne({_id:id},{$set:{username:username,email:email,mobile:mobile,age:age,address:address}},(err)=>{
        if(err) throw err;
        else {
            res.end("user data Updated .");
        }
    })
})
router.post("/forgetpassword",(req,res)=>{
    let email=req.body.email;
    let token=jsonwebtoken.sign({ UID:email },jsonsecret,{ expiresIn: 60*5 })
    userModel.find({email:email},(err,data)=>{
        if(err) throw err;
        else if(data.length==0){
            res.json({err:"1",msg:"user not found"})
        }
        else{
            main(token,email,"Forget Password")
            res.json({data:email})
        }
    })
})
router.get('/changepassword',autenticateToken,(req,res)=>{
    let token=req.query.token
    const data=jwt_decode(token)
    console.log(data)
    //console.log(jwt_decode(token))
    res.render('Forgetpassword',{email:data.UID})
})
router.post('/updatepassword',(req,res)=>{
    console.log(req.body)
    userModel.updateOne({email:req.body.email},{$set:{password:req.body.password}},(err)=>{
        if(err) throw err;
        else {
            res.end("password Updated .");
        }
    })
})
router.get('/sendemail',(req,res)=>{
    sendEmail()
    res.send("send email")
})

//end
module.exports=router;