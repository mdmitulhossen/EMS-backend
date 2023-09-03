const express =require("express");
const { createAttendance, approveAttendence } = require("../Controller/attendance.js");


const router = express.Router();

router.put("/",createAttendance);
router.put("/approve", approveAttendence)


module.exports=router;