const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  list: [
    {
      type: Schema.Types.ObjectId,
      ref: "listitem",
    },
  ],
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
  reminder: {
    type: Date,
    default: null,
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "image",
    },
  ],
  willBeDeleted: {
    type: Date,
    default: null,
  },
});

module.exports = Note = mongoose.model("note", NoteSchema);
