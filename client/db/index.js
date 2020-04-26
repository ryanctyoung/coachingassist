import { Datastore } from 'nedb-async-await';
// import Player from './schemas/PlayerSchema.js'

export default class DbManager{

	constructor(){
		this.players = Datastore({
			filename: "/db/datastores/player_store",
			autoload: true,
		});
		this.games = Datastore({
			filename: "/db/datastores/game_store",
			autoload: true,
		});
	}

	async init() {
		let test1 = {name:  "Ryan Young", _id: 1, team: "Davis" };
		await insertDB(this.players, test1); 

		let test2 = {name:  "Gary Ying",  _id: 2, team: "Davis" };
		await insertDB(this.players, test2);

		let test3 = {name: "Tom Long", _id: 3, team: "Squad"}; 
		await insertDB(this.players, test3);

		let game1 = {date: "03/21/2020", _id: 1, home: "Davis"};
		await insertDB(this.games, game1); 

	}

	async getPlayers (team) {
		let result;
		await this.players.find({'team': team }).then(function(docs) {
			result = [...docs];
		}); 
		return result;
	}

	async getGames() {
		let result;
		await this.games.find({}).then(function(docs){
			result = [...docs]
		})
		return result;
	}

	/*
	Planned functions:
		updateGame();
		addPlayer(); ??
		getPlayer();
		getGame();
		statCrunch();	
	*/
}

async function insertDB(datastore, object){
	await datastore.update({_id: object._id}, object, {upsert: true});
}
