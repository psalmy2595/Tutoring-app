const router = require("express").Router();
const { createSubject, getSubjectById, getAllSubject, getAllCategory, searchSubject } = require('../controllers/category');

router.post('/:category/subject', createSubject);

router.get('/:category/subject', getAllSubject);

router.get('/:category/subject/:id', getSubjectById);

router.get('/category', getAllCategory);

router.get('/subject', searchSubject);

module.exports = router;

