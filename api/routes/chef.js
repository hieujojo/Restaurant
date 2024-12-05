const express = require("express");
const { updateUser, deleteUser, getUser, getUsers, getUserByName, getDishesByChefId, createChef } = require("../controllers/chefController.js");

const router = express.Router();

// CREATE
router.post('/', createChef);
// UPDATE
router.put("/:id", updateUser);
// DELETE
router.delete("/:id", deleteUser);
// GET
router.get("/:id", getUser);
// GET ALL
router.get("/", getUsers);
// GET BY NAME
router.get("/search/:name", getUserByName);
// GET WITH DISH
router.get("/withdish/:chefId", getDishesByChefId);

module.exports = router;
