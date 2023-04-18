const mongoose = require("mongoose");

const remindSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    sender: mongoose.Types.ObjectId,
    recipient: mongoose.Types.ObjectId,
    reminder_interval: Number,
    last_reimind: Number,
    
  },
  {
    collection: "Reminder",
  }
);

mongoose.model("Reminder", remindSchema);
