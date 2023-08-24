const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { data: Buffer, contentType: String },
  phone: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
