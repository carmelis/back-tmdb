const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");

router.post("/sigin", controllers.sigIn);
router.post("/sigup", controllers.sigUp);
router.post("/favorites", controllers.AddtoFavs);
router.get("/favorites/:id", controllers.getFavorites);

module.exports = router;
