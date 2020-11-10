const express = require("express");
const userAuth = require("../middlewares/userAuth");


const router = express.Router();

const { createOrder , getOrder , updateUsersOrder } = require("../controllers/order");

router.post("/order",userAuth, async (req, res) => {
    await createOrder(req, res);
  });


router.get("/order",userAuth, async (req, res) => {
    await getOrder(req, res);
});


router.put("/order/:userId", async (req, res) => {
    await updateUsersOrder(req, res);
});

module.exports = router;