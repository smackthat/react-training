const router = require('express').Router();
const user = require('../controllers/userController');

router.patch('/:id', user.updateUser);

module.exports = router;
