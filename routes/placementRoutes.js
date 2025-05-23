const express = require('express');
const router = express.Router();
const {
  createPlacement,
  getAllPlacements,
  getPlacementById,
  updatePlacement,
  editPlacementUpdate,
  deletePlacementUpdate,
  addPlacementUpdate,
  deletePlacement,
} = require('../controllers/placementController');

const { protect, adminOnly } = require('../middlewares/authMiddleware');

router
  .route('/')
  .get(getAllPlacements)
  .post(protect, adminOnly, createPlacement);

router
  .route('/:id')
  .get(protect, getPlacementById)
  .put(protect, adminOnly, updatePlacement)
  .delete(protect, adminOnly, deletePlacement);

router.post('/:id/updates', protect, adminOnly, addPlacementUpdate); // Add update to placement

router
  .route('/:placementId/updates/:updateId')
  .put(protect, adminOnly, editPlacementUpdate) // Edit update in placement
  .delete(protect, adminOnly, deletePlacementUpdate); // Delete update from placement

module.exports = router;
