const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
  user: String,
  guild: String,
  xp: Number,
  ignore: Boolean
});
module.exports = mongoose.model("member", memberSchema);
