const FinalSelection = require('../models/FinalSelection');

// Create selection
exports.createFinalSelection = async (req, res) => {
  try {
    const selection = await FinalSelection.create(req.body);
    res.status(201).json(selection);
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error creating final selection', error: err.message });
  }
};

// Get by placement
exports.getSelectionByPlacement = async (req, res) => {
  try {
    const selection = await FinalSelection.findOne({
      placementId: req.params.placementId,
    });
    if (!selection)
      return res.status(404).json({ message: 'No selection found' });
    res.json(selection);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching selection', error: err.message });
  }
};

// Update
exports.updateFinalSelection = async (req, res) => {
  try {
    const updated = await FinalSelection.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated)
      return res.status(404).json({ message: 'Selection not found' });
    res.json(updated);
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error updating selection', error: err.message });
  }
};

// Delete
exports.deleteFinalSelection = async (req, res) => {
  try {
    const deleted = await FinalSelection.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: 'Selection not found' });
    res.json({ message: 'Final selection deleted' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting selection', error: err.message });
  }
};
