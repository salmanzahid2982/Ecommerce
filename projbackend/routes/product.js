const express=require("express");
const router=express.Router();

const {getProductById,
    createProduct,
    getProduct,
    photo,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getAllUniqueCategories
}=require("../controllers/product");
const {isAdmin,isSignedIn,isAutenticated}=require("../controllers/auth");
const {getUserById}=require("../controllers/user");

//All of Param
router.param("userId",getUserById);
router.param("productId",getProductById);

//All of actual routes
//create routes
router.post("/product/create/:userId",isSignedIn,isAutenticated,isAdmin,createProduct);

//read routes
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//delete routes
router.delete("/product/:porductId/:userId",isSignedIn,isAutenticated,isAdmin,deleteProduct);

//update routes
router.put("/product/:productId/:userId",isSignedIn,isAutenticated,isAdmin,updateProduct);

//Listing routes
router.get("/products",getAllProducts);
router.get("/product/categories",getAllUniqueCategories);


module.exports=router;