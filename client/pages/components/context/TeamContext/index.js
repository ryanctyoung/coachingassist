import { createContext } from 'react';

const TeamContext = createContext({
	players: [
		{name: "Ryan Young", id: 1},
		{name: "Tom Long", id: 2},
		{name: "Gary Ying", id: 3},
	]});

export default TeamContext;