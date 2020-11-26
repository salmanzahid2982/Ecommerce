const express=require("express");
const router=express.Router();

const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,removeCategory}=require("../controllers/category");
const {isSignedIn,isAutenticated,isAdmin}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");

//params
router.param("userId",getUserById);
router.param("categoryId",getCategoryById);

//actual routes goes here

//cteate Routes
router.post("/category/create/:userId",isSignedIn,isAutenticated,isAdmin,createCategory);

//Read routes
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);

//Update routes
router.put("/category/:categoryId/:userId",isSignedIn,isAutenticated,isAdmin,updateCategory);

//Delete routes
router.delete("/category/:categoryId/:userId",isSignedIn,isAutenticated,isAdmin,removeCategory);


module.exports=router;