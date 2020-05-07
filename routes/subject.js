const router = require("express").Router();
const { 
    createSubject, 
    getSubjectById, 
    getAllSubject, 
    getAllCategory, 
    searchSubject, 
    updateSubject,
    deleteSubject, updateCategory, deleteCategory } = require('../controllers/category');
const { verifyToken, isAdmin } = require('../utils/auth');

router.get('/:category/subjects', getAllSubject);
router.post('/:category/subject', verifyToken, isAdmin, createSubject);
router.put('/subject/:subjectId', verifyToken, isAdmin, updateSubject);
router.delete('/subject/:subjectId', verifyToken, isAdmin, deleteSubject);
router.get('/:category/subject/:id', getSubjectById);
router.get('/subject', searchSubject);

router.get('/category', verifyToken, getAllCategory);
router.put('/:category', verifyToken, isAdmin, updateCategory)
router.delete('/:category', verifyToken, isAdmin, deleteCategory)



module.exports = router;

