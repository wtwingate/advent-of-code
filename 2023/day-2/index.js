class game {
	constructor(gameID) {
		this.gameID = gameID;
	}
	rounds = []
}

// Get lines from data
const fs = require("fs");
const file = fs.readFileSync("test-data", "utf-8");
const rawLines = file.split("\n");
const lines = rawLines.filter(rawLine => rawLine.trim());

const games = [];

// Parse lines into useable data
lines.forEach((line) => {
	const arr = line.split(": ");
	const rounds = arr[1].split("; ");
	const gameObj = new game(arr[0]);
	rounds.forEach((round) => {
		const roundScores = [];
		const scores = round.split(", ");
		roundScores.push(scores);
		gameObj.rounds.push(roundScores);
	})
	games.push(gameObj);
})

games.forEach((game) => {
	game.rounds.forEach(round => console.table(round));
})
