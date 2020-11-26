var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');

const {signout,signup,signin,isSignedIn}=require("../controllers/auth")

router.post("/signup",[
    check("name","Name should be atleast 3 characters").isLength({ min: 3 }),
    check("email","Email must be valid").isEmail(),
    check("password","password should be atleast 5 characters").isLength({ min: 3 })
],signup)

router.post("/signin",[
    check("email","Email must be valid").isEmail(),
    check("password","password field is required").isLength({ min: 1 })
],signin)

router.get("/signout",signout);

//Protected route
router.get("/testroute",isSignedIn,(req,res)=>{
    res.json({message:req.auth})

});

//custom middleware

module.exports=router;