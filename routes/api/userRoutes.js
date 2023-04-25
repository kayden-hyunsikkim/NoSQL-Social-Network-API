const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateuser,
  deleteUser
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateuser) 
.delete(deleteUser);

module.exports = router;
