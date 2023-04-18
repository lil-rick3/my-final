const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    creator: mongoose.Types.ObjectId,
    recipient: [mongoose.Types.ObjectId],
    time: Number
    
  },
  {
    collection: "Event",
  }
);

mongoose.model("Event", eventSchema);
