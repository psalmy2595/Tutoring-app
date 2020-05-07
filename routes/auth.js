const router = require("express").Router();
const { signUp, signIn, makeAdmin, getTutors } = require("../controllers/auth");
const { verifyToken, isAdmin } = require('../utils/auth');

router.get("/", (req, res) => {
    res.send("This is the express app. You have now entered express");
});

router.post('/signup', signUp);
router.post('/signin', signIn);


router.get('/tutors', verifyToken, isAdmin, getTutors);
router.get('/tutor/:id', verifyToken);
router.put('/tutor/deactivate', verifyToken)


router.post('/makeAdmin', verifyToken, makeAdmin);

module.exports = router;