const mongoose = require('mongoose');
const InterviewRound = require('./InterviewRound');
const FinalSelection = require('./FinalSelection');

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
    modeOfRecruitment: {
      type: String,
      enum: ['Online', 'Off-Campus', 'On-Campus'],
    },
    tentativeDriveDate: Date,
    selectionProcess: [String],
    registrationLink: String,
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

// Middleware to delete related InterviewRound and FinalSelection documents
placementSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await InterviewRound.deleteMany({ placementId: doc._id });
    await FinalSelection.deleteMany({ placementId: doc._id });
  }
});

module.exports = mongoose.model('Placement', placementSchema);
