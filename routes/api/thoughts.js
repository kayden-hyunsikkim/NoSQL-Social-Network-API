const router = require('express').Router();
const {
  getThoughts,
  getSingleThoughts,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addTag,
  removeTag,
} = require('../../controllers/appController');

// /api/applications
router.route('/').get(getThoughts).post(createThoughts);

// /api/applications/:applicationId
router
  .route('/:applicationId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/applications/:applicationId/tags
router.route('/:applicationId/tags').post(addTag);

// /api/applications/:applicationId/tags/:tagId
router.route('/:applicationId/tags/:tagId').delete(removeTag);

module.exports = router;
