import mongoose from "mongoose";

const deadlineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Deadline name is required"],
      trim: true,
      maxlength: [100, "Deadline name cannot exceed 100 characters"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project ID is required"],
    },
  },
  { timestamps: true },
);

//indexing or data query optimization
deadlineSchema.index({ dueDate: 1, project: 1, createdBy: 1 });

export default mongoose.model("Deadline", deadlineSchema);
