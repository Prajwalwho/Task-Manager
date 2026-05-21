const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,//song;
      required: [true, "Title is required"],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    category: {
      type: String,
      trim: true,
      default: "General",
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Task", taskSchema);