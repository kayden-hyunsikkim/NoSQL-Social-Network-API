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
  .route('/:applicationId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/thoughts/:applicationId/reactions
router.route('/:applicationId/reactions').post(addReaction);

// /api/thoughts/:applicationId/tags/:reationId
router.route('/:applicationId/reactions/:reationId').delete(removeReaction);

module.exports = router;
