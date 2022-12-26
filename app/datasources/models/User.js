const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, enum: ['User', 'Admin'], default: 'User' },

  photo: { type: String, default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZO5vYo_dJvLzL0tIWfY31t9msAvClE2I5BpEdS3c&s' },
  bio: { type: String },
  status: { type: String, enum: ['Active', 'Deactivated'] },
}, { timestamps: true });

module.exports = mongoose.model('users', UserSchema);
