import mongoose, { Schema } from 'mongoose';

const GameSchema = new Schema(
    {
        date: { type: String },
        team: {
          type: mongoose.Schema,Types.ObjectID,
          ref: 'Team'
        },
        //history: {[]},
    }
)

const GameModel = mongoose.model('Game', GameSchema);

export default GameModel;