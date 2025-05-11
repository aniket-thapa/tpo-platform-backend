const InterviewRound = require('../models/InterviewRound');

// Create interview round
exports.createInterview = async (req, res) => {
  const { placementId } = req.params;
  try {
    const interview = await InterviewRound.create({
      placementId,
      ...req.body,
    });
    res.status(201).json(interview);
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error creating interview round', error: err.message });
  }
};

// Get all interview rounds for a placement
exports.getInterviewsByPlacement = async (req, res) => {
  try {
    const interviews = await InterviewRound.find({
      placementId: req.params.placementId,
    }).sort({
      interviewDate: 1,
    });
    if (!interviews || interviews.length === 0)
      return res.status(404).json({ message: 'No interviews found' });
    res.json({ message: 'Interviews fetched successfully', interviews });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching interviews', error: err.message });
  }
};

// Update interview round
exports.updateInterview = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ message: 'No data provided' });
    const updated = await InterviewRound.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated)
      return res.status(404).json({ message: 'Interview round not found' });
    res.json({ message: 'Interview round updated successfully', updated });
  } catch (err) {
    res
      .status(400)
      .json({ message: 'Error updating interview', error: err.message });
  }
};

// Delete interview round
exports.deleteInterview = async (req, res) => {
  try {
    const deleted = await InterviewRound.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: 'Interview round not found' });
    res.json({ message: 'Interview round deleted successfully' });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting interview', error: err.message });
  }
};
