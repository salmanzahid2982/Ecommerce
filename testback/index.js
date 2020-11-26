const express=require("express");

const app=express();

const port=3000;
const islogedin=(req,res,next)=>{
    console.log("YEs");
next();
}

const isadmin = (req,res,next)=>{
    console.log("Yeah")
    next();
}
app.get("/admin",islogedin,isadmin,(req,res)=>{
    return res.send("this is my admin blok")
});

app.get("/",(req,res)=>{
    return res.send("Hello World")
});

app.get("/signup",(req,res)=>{
    return res.send("This is sign up route")
});

app.listen(port,()=>{
    console.log("Server is up and running");
});
