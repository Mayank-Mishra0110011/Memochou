const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  data: {
    type: String,
    required: true,
  },
});

module.exports = Image = mongoose.model("image", ImageSchema);
