const mongoose = require("mongoose");
const user = require("../model/user");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

//login
router.post("/login",userController.login);


//sign up
router.post("/signUp",userController.signUp)


//get all users
router.get("/users",userController.users);

// router.get("/showUsers",userController.showUser);

//delete all users
router.post("/deleteUsers",userController.deleteUsers)

router.post("/logout",userController.logOut)

module.exports = router;