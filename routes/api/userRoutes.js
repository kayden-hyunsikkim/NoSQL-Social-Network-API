const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateuser,
  deleteUser,
  addFriend,
  removeFriend

} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateuser) 
.delete(deleteUser);

// /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);

// /api/thoughts/:applicationId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);


module.exports = router;
