const router = require("express").Router();
const { signUp, signIn } = require("../controllers/auth");

router.get("/", (req, res) => {
    res.send("This is the express app. You have now entered express");
});

router.post('/signup', signUp);

router.post('/signin', signIn);
module.exports = router;




