const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  purpose: {
    type: String,
    required: true,
  },

  about: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
});

const Details = mongoose.model("Detail", detailSchema);

module.exports = Details;
