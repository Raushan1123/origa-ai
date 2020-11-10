const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuth");


const {
  userRegister,
  userLogin,
  serializeUser,

} = require("../controllers/user");

router.post("/signup", async (req, res) => {
  await userRegister(req, "user", res);
});

router.post("/signup-admin", userAuth, async (req, res) => {
  await userRegister(req, "admin", res);
});

router.post("/login", async (req, res) => {
  await userLogin(req, res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  await serializeUser(req, res);
});


module.exports = router;
