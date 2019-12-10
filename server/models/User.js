const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  tickets: Array,
  admin: Boolean,
  serviceAdmin:  [{ type: String, enum: ['Web Development', 'Social Media', "Web Marketing", "Graphic Design"] }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
