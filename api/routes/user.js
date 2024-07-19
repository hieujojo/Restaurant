const express = require("express");
const { updateUser,deleteUser,getUser,getUsers } = require("../controllers/users.js");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken.js");

const router = express.Router();
//UPDATE
router.put("/:id",verifyUser, updateUser);
//DELETE
router.delete("/:id",verifyUser, deleteUser);
//GET
router.get("/:id",verifyUser, getUser);
//GET ALL
router.get("/",verifyAdmin, getUsers);

module.exports = router;
