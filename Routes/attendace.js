const express =require("express");
const { createAttendance, approveAttendence, getAttendance } = require("../Controller/attendance.js");


const router = express.Router();

router.put("/",createAttendance);
router.put("/approve", approveAttendence)
router.get("/", getAttendance)


module.exports=router;