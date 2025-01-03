const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    UserName: { type: String, required: true},
    Password: { type: String, required: true},
    Email: { type: String, required: true },
    Address :{type : String ,required: false },
    Phone : {type : String , required: false},
    Bio : {type : String , required: false},
    ProfilePic : {type : String , required: false},
    VerificationCode: { type: Number, required: false }
});

module.exports = mongoose.model('User', UserSchema);
