const express = require("express");
const router = express.Router();

const user = require("./user");

router.get('/', (req, res) => {
    res.send('Wel-Come PrimeCon V1 Initial Routes')
  })

router.use("/user", user);

module.exports = router;
