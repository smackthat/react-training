const router = require('express').Router();
const user = require('../controllers/userController');

router.patch('/:id', user.updateUser);
router.get('/:id', user.getUser);

module.exports = router;
