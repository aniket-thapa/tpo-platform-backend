const express = require('express');
const router = express.Router();
const {
  createFinalSelection,
  getSelectionByPlacement,
  updateFinalSelection,
  deleteFinalSelection,
} = require('../controllers/finalSelectionController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');

router.post('/:placementId', protect, adminOnly, createFinalSelection);
router.get('/:placementId', getSelectionByPlacement);
router.put('/:id', protect, adminOnly, updateFinalSelection);
router.delete('/:id', protect, adminOnly, deleteFinalSelection);

module.exports = router;
