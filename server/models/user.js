const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    firstName: String,
    lastName: String,
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    reminders: [mongoose.Types.ObjectId]
  },
  {
    collection: "User",
  }
);

mongoose.model("User", userSchema);
