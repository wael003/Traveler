const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    UserName: { type: String, required: true},
    Password: { type: String, required: true},
    Email: { type: String, required: true },
    VerificationCode: { type: Number, required: true }
});

module.exports = mongoose.model('User', UserSchema);