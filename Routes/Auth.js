const express =require("express");
const { CreateEmployee,updateEmployee, deleteEmployee, getEmployee, getAllEmployee, signInEmployee } = require("../Controller/Employee.js");
const router = express.Router();

router.post("/",CreateEmployee);
router.post("/login",signInEmployee);

//update
router.put("/update/:id",updateEmployee);
//Delete

router.delete("/delete/:id",deleteEmployee);

//get

router.get("/:id",getEmployee);

//GET ALL
router.get("/",getAllEmployee);


module.exports=router;