const mongoose = require('mongoose');

const interviewRoundSchema = new mongoose.Schema(
  {
    placementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Placement',
      required: true,
    },
    interviewDate: { type: Date, required: true },
    startTime: String,
    endTime: String,
    mode: { type: String, enum: ['Online', 'Offline'], required: true },
    venue: String,
    meetingLink: String,
    shortlistedStudentsDoc: String,
    additionalNotes: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('InterviewRound', interviewRoundSchema);
