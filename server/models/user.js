const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    firstName: String,
    lastName: String,
    phoneNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
  },
  {
    collection: "User",
  }
);

mongoose.model("User", userSchema);
