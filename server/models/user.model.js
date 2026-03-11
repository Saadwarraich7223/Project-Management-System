import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      maxlength: [100, "Email cannot exceed 100 characters"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    department: {
      type: String,
      trim: true,
      default: "",
      maxlength: [100, "Department cannot exceed 100 characters"],
    },
    expertise: {
      type: [String],
      default: [],
    },
    maxStudents: {
      type: Number,
      default: 6,
      min: [1, "Min students must be at least 1"],
      max: [6, "Cannot assign more than 6 students"],
    },
    assignedStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    project: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true },
);

// hash the password only if the password is changed
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.pre("save", async function () {
  if (this.isModified("supervisor") && this.supervisor) {
    const supervisor = await this.constructor.findById(this.supervisor);
    if (!supervisor) {
      throw new Error("Supervisor not found");
    }
    if (supervisor.role.toLowerCase() !== "teacher") {
      throw new Error("Supervisor is not a teacher");
    }
    const studentCount = await this.constructor.countDocuments({
      supervisor: this.supervisor,
    });

    if (studentCount >= supervisor.maxStudents) {
      throw new Error(
        `Supervisor ${supervisor.name} has reached their limit of ${supervisor.maxStudents} students.`,
      );
    }
  }
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.comparePasswords = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.hasCapacity = function () {
  if (this.role !== "teacher") {
    return false;
  }

  return this.assignedStudents?.length < this.maxStudents;
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
export default User;
