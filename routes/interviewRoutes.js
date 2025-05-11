const express = require('express');
const router = express.Router();
const {
  createInterview,
  getInterviewsByPlacement,
  updateInterview,
  deleteInterview,
} = require('../controllers/interviewController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/:placementId', protect, adminOnly, createInterview);
router.get('/:placementId', getInterviewsByPlacement);
router.put('/:id', protect, adminOnly, updateInterview);
router.delete('/:id', protect, adminOnly, deleteInterview);

module.exports = router;
