import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    message: {
      type: String,
      required: true,
      maxlength: [500, "Feedback message cannot exceed 500 characters"],
    },

    isRead: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      enum: [
        "Project",
        "Feedback",
        "Request",
        "System",
        "Approval",
        "Rejection",
        "Meeting",
        "Deadline",
        "General",
        "Other",
      ],
      default: "General",
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },
  },
  { timestamps: true },
);

//indexing or data query optimization
notificationSchema.index({ user: 1, isRead: 1 });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
