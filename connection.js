const mongoose = require("mongoose");

const getDBConnection = (url) => {
  return mongoose.connect(url);
};

module.exports = getDBConnection;
