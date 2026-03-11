import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    supervisorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "Correction",
        "Suggestion",
        "Appreciation",
        "Positive",
        "Negative",
        "Neutral",
      ],
      default: "Suggestion",
      title: String,
      message: String,
      priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
      },
    },
  },
  { timestamps: true },
);

const projectSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Student ID is required"],
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      maxlength: [200, "Project title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      minlength: [10, "Project description must be atleast 10 characters"],
      maxlength: [2000, "Project description cannot exceed 2000 characters"],
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Completed"],
      default: "Pending",
    },
    files: [
      {
        fileType: String,
        fileUrl: String,
        originalName: String,
        category: {
          type: String,
          enum: ["Report", "Presentation", "Code", "Other"],
          default: "Other",
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    feedback: [feedbackSchema],

    deadline: Date,
  },
  { timestamps: true },
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
