const express = require('express');
const router = express.Router();
const { getAll, signup, login } = require('../controllers/users');


router.get('/api', getAll);
router.post('/api/signup', signup);
router.post('/api/login', login);



module.exports = router;