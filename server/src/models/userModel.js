import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        teams: [{
          type: mongoose.Schema,Types.ObjectID,
          ref: 'User'
        }]
    }
)

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;