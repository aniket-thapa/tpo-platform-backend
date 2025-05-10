const mongoose = require('mongoose');

const finalSelectionSchema = new mongoose.Schema(
  {
    placementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Placement',
      required: true,
    },
    selectedStudents: [
      {
        name: String,
        rollno: String,
        branch: String,
      },
    ],
    nextSteps: [String],
    documentLink: String,
    additionalNotes: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('FinalSelection', finalSelectionSchema);
