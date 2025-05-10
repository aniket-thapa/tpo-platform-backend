const Placement = require('../models/Placement');

// Create Placement (Admin only)
exports.createPlacement = async (req, res) => {
  try {
    const placement = await Placement.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(placement);
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
    res.json(placements);
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
    res.json(placement);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching placement', error: err.message });
  }
};

// Update placement for edits (Admin only)
exports.updatePlacement = async (req, res) => {
  try {
    const updated = await Placement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ message: 'Placement not found' });
    res.json(updated);
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
      return res.status(404).json({ message: 'Placement not found' });
    res.json({ message: 'Placement deleted' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting placement', error: err.message });
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
