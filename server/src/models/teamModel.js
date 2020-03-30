import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema(
    {
        name: {type: String},
        year: {type: String},
        players: [{
          type: mongoose.Schema,Types.ObjectID,
          ref: 'Player'
        }],

    }
)

const TeamModel = mongoose.model('Team', TeamSchema);

export default TeamModel;