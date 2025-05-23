const mongoose = require('mongoose');
const InterviewRound = require('./InterviewRound');

const placementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    batches: [{ type: String, required: true }],
    company: {
      name: { type: String, required: true },
      description: String,
      website: String,
    },
    jobDesignation: { type: String, required: true },
    jobDescriptionLink: String,
    eligibleBranches: [String],
    eligibilityCriteria: {
      activeBacklogs: String,
      deadBacklogs: String,
      otherEligibilities: [String],
    },
    ctcDetails: String,
    location: String,
    modeOfRecruitment: { type: String, enum: ['Online', 'Offline', 'Hybrid'] },
    tentativeDriveDate: Date,
    driveRounds: [String],
    applyLink: String,
    applicationDeadline: Date,
    notes: [String],
    updates: [
      {
        updateType: {
          type: String,
          enum: ['Info', 'Alert', 'Reminder', 'Change'],
          required: true,
        },
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// Firstly, delete all the interview rounds associated with the placement
placementSchema.pre('remove', async function (next) {
  const Placement = this;
  await InterviewRound.deleteMany({ placement: Placement._id });
  next();
});

module.exports = mongoose.model('Placement', placementSchema);
