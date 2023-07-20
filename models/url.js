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
    createdBy : {
      type : mongoose.Schema.Types.ObjectId,
      ref :"users"
    }
  },
  { timestamps: true }
);

const shortURL = mongoose.model("url", URLSchema);

module.exports = shortURL;
