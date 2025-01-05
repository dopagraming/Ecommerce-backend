const express = require("express")
const { getUsers, setUser, getUser, deleteUser, updateUser, updatePasswordUser, getLoggedUserData, updateLoggedUserData } = require("../services/userServices")
const { createUserValidator, changeUserPasswordValidator } = require("../utils/validators/userValidator")
const { protect } = require("../services/authServices")


const rotuer = express.Router()

rotuer.route("/").get(getUsers).post(createUserValidator, setUser)
rotuer.route("/:id").get(getUser).delete(deleteUser).put(updateUser)
rotuer.route("/:id/changePassword").put(changeUserPasswordValidator, updatePasswordUser)
// rotuer.get("/getMe", protect, getLoggedUserData, getUser) // test
// rotuer.put("/changeMyPassword", protect, changeLoggedUserPassword) //test
// rotuer.put("/updateMyData", protect, updateLoggedUserData) //test and add the validator there is another middelwaer
module.exports = rotuer