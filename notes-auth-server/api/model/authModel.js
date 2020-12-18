import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username required'
    },
    password: {
        type: String,
        required: 'Password required'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const RefreshTokenSchema = new mongoose.Schema({
    refreshToken: String
});

const userModel = mongoose.model('User', UserSchema);
const refreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);
export{ userModel, refreshTokenModel };
