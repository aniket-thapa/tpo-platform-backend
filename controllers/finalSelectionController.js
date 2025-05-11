const FinalSelection = require('../models/FinalSelection');

// Create selection
exports.createFinalSelection = async (req, res) => {
  try {
    const { placementId } = req.params;

    if (!req.body)
      return res
        .status(400)
        .json({ message: 'Final selection data is required' });

    const selection = await FinalSelection.create({
      placementId,
      ...req.body,
    });
    res
      .status(201)
      .json({ message: 'Final selection created successfully', selection });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error creating final selection', error: err.message });
  }
};

// Get by placement
exports.getSelectionByPlacement = async (req, res) => {
  try {
    const selections = await FinalSelection.find({
      placementId: req.params.placementId,
    });
    if (selections.length === 0)
      return res
        .status(404)
        .json({ message: 'No final selection found for this placement' });
    res.json(selections);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching final selection', error: err.message });
  }
};

// Update
exports.updateFinalSelection = async (req, res) => {
  try {
    if (!req.body)
      return res
        .status(400)
        .json({ message: 'Final selection data is required' });
    const selection = await FinalSelection.findById(req.params.id);
    if (!selection)
      return res.status(404).json({ message: 'Final selection not found' });

    const updated = await FinalSelection.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ message: 'Final selection updated successfully', updated });
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
      return res.status(404).json({ message: 'Final selection not found' });
    res.json({ message: 'Final selection deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting selection', error: err.message });
  }
};
