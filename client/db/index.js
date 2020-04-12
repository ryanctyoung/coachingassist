import { Datastore } from 'nedb-async-await';
// import Player from './schemas/PlayerSchema.js'

export default class DbManager{

	constructor(){
		this.players = Datastore();
		this.init(); 
	}

	async init() {
		let test1 = {name:  "Ryan Young", team: "Davis" };
		await this.players.insert(test1);

		let test2 = {name:  "Gary Ying", team: "Davis" };
		await this.players.insert(test2);
		console.log("init done");
	}

	async getPlayers (team) {
		let result;
		await this.players.find({'team': team }).then(function(docs) {
			result = [...docs];
		}); 
		console.log(result);
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

