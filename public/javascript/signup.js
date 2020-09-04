const express = require('express');
var router = express.Router();


router.get('/',(req,res)=>{
    res.render("./signup.hbs")
})
router.post('/signup',(req,res)=>{
    insertsignup(req,res)
})
function insertsignup(req,res){
    var signup = new Signup();
    signup.password = req.body.password;
    signup.email=req.body.email;
    signup.save((err,docs)=>{
        if(!err){
            res.redirect('/');
            console.log("Sign-up completed");
        }
        else{
            console.log('error during insertion  '  + err);
        }
    })
}
module.exports= router;