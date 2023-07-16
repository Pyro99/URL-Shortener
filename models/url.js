const mongoose = require("mongoose");

const URLSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitedHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const shortURL = mongoose.model("url", URLSchema);

module.exports = shortURL;
