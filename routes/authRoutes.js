const express = require('express');
const { register, login, getAllUsers, updateUser, deleteUser, getUser } = require('../controllers/authController');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', auth, isAdmin, getAllUsers);
router.get('/user', auth, getUser); 
router.put('/users/:id', auth, isAdmin, updateUser);
router.delete('/users/:id', auth, isAdmin, deleteUser);

module.exports = router;
