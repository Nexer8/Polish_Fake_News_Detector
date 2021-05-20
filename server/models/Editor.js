const mongoose = require("mongoose");
const { Schema } = mongoose;

const editorSchema = new Schema({});

const Editor = mongoose.model("Editor", editorSchema);

module.exports = Editor;
