const express =require("express");
const { getCompany, CreateCompany, getAllCompany, signInCompany, logoutCompany } = require("../Controller/company.js");

const router = express.Router();

router.post("/",CreateCompany);
router.post("/login",signInCompany);
router.get("/loginout",logoutCompany);

//get
router.get("/:id",getCompany);
//GET ALL
router.get("/",getAllCompany);





module.exports=router;