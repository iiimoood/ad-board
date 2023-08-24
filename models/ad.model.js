const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 10, maxLength: 50 },
  content: { type: String, required: true, minLength: 20, maxLength: 1000 },
  dateOfPublication: { type: Date, required: true },
  photo: { type: String, required: true },
  price: { type: Number, required: true, min: 1 },
  location: { type: String, required: true },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    select: '-password',
  },
});

module.exports = mongoose.model('Ad', adSchema);
