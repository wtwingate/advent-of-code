const file = require("fs").readFileSync("test-data", "utf-8");

class game {
	constructor(gameID) {
		this.gameID = gameID;
	}
	rounds = []
}

// Process line of input into useable data object
function getGameObject(line) {
	if (line.length > 0) {
		const arr = line.split(/:|;/);
		let gameObj = new game(arr[0]);
		for (i = 1; i < arr.length; i++) {
			let round = arr[i].trim();
			let results = round.split(",");
			gameObj.rounds.push(results.map((e) => e.trim()));
		}
		games.push(gameObj);
	}
}

let games = []
const lines = file.split("\n");
lines.forEach((line) => {
	getGameObject(line);
});

console.table(games);
console.table(games[0]);
