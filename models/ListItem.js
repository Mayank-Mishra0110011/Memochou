const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListItemSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});

module.exports = ListItem = mongoose.model("listitem", ListItemSchema);
