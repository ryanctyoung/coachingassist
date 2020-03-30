import mongoose, { Schema } from 'mongoose';

const PlayerSchema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        team: {
          type: mongoose.Schema,Types.ObjectID,
          ref: 'Team'
        },
        stats: {
        	kills: {type: Number},
        	spikes: {type: Number},
        },
    }
)

const PlayerModel = mongoose.model('Player', PlayerSchema);

export default PlayerModel;