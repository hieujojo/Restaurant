const mongoose = require('mongoose');

const socialAuthSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
}, { timestamps: true });

const SocialAuthUser = mongoose.models.SocialAuthUser || mongoose.model('SocialAuthUser', socialAuthSchema);

module.exports = SocialAuthUser;
