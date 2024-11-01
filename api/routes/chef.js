const express = require("express");
const { updateUser,deleteUser,getUser,getUsers, getUserByName, getDishesByChefId, createChef } = require("../controllers/chefController.js");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken.js");

const router = express.Router();
// CREATE
router.post('/', createChef);
//UPDATE
router.put("/:id",verifyUser, updateUser);
//DELETE
router.delete("/:id",verifyUser, deleteUser);
//GET
router.get("/:id", getUser);
//GET ALL
router.get("/",verifyAdmin, getUsers);
// GET BY NAME
router.get("/search/:name", verifyAdmin, getUserByName);
// get with dish
router.get("/withdish/:chefId",verifyAdmin, getDishesByChefId);

module.exports = router;
