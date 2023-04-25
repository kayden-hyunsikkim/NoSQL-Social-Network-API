const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  removeReaction,
} = require('../../controllers/appController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThoughts);

// /api/thoughts/:applicationId
router
  .route('/:thoughtId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/thoughts/:applicationId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:applicationId/tags/:reationId
router.route('/:thoughtId/reactions/:reationId').delete(removeReaction);

module.exports = router;
