const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
  },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;