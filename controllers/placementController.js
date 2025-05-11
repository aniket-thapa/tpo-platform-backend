const Placement = require('../models/Placement');

// Create Placement (Admin only)
exports.createPlacement = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: 'Placement data is required' });
    const placement = await Placement.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res
      .status(201)
      .json({ message: 'Placement created successfully', placement });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error creating placement', error: err.message });
  }
};

// Get all placements
exports.getAllPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });
    if (placements.length === 0)
      return res.status(404).json({ message: 'No placements found' });
    res.json({ message: 'Placements fetched successfully', placements });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching placements', error: err.message });
  }
};

// Get single placement
exports.getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);
    if (!placement)
      return res.status(404).json({ message: 'Placement not found' });
    res.json({
      message: 'Placement fetched successfully',
      placement,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching placement', error: err.message });
  }
};

// Update placement for edits (Admin only)
exports.updatePlacement = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: 'Placement data is required' });
    const data = await Placement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) return res.status(404).json({ message: 'Placement not found' });
    res.json({ message: 'Placement updated successfully', data });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error updating placement', error: err.message });
  }
};

// Delete placement (Admin only)
exports.deletePlacement = async (req, res) => {
  try {
    const deleted = await Placement.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res
        .status(404)
        .json({ message: 'Placement not found for deletion' });
    res.json({ message: 'Placement deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error in deleting placement', error: err.message });
  }
};

exports.addPlacementUpdate = async (req, res) => {
  try {
    const { updateType, message } = req.body;

    if (!updateType || !message) {
      return res
        .status(400)
        .json({ message: 'Update type and message are required' });
    }

    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }

    // Add the new update to the placement
    placement.updates.push({ updateType, message });

    await placement.save();

    res.status(201).json({
      message: 'Update added successfully',
      updates: placement.updates,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error adding update', error: err.message });
  }
};

exports.editPlacementUpdate = async (req, res) => {
  try {
    const { placementId, updateId } = req.params;
    const { updateType, message } = req.body;

    const placement = await Placement.findById(placementId);

    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }

    const update = placement.updates.id(updateId);
    if (!update) {
      return res.status(404).json({ message: 'Update not found' });
    }
    if (updateType === update.updateType && message === update.message) {
      return res
        .status(400)
        .json({ message: 'No changes detected in the update' });
    }

    if (updateType) update.updateType = updateType;
    if (message) update.message = message;

    await placement.save();

    res.json({ message: 'Update edited successfully', update });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error editing update', error: err.message });
  }
};

exports.deletePlacementUpdate = async (req, res) => {
  try {
    const { placementId, updateId } = req.params;

    const placement = await Placement.findByIdAndUpdate(
      placementId,
      {
        $pull: {
          updates: { _id: updateId }, // Removes the update with the given ID
        },
      },
      { new: true }
    );

    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }

    res.json({ message: 'Update deleted successfully', placement });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting update', error: err.message });
  }
};
