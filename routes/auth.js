const router = require("express").Router();
const { signUp } = require("../controllers/auth");

router.get("/", (req, res) => {
    res.send("This is the express app. You have now entered express");
});

router.post('/signup', signUp);

module.exports = router;




