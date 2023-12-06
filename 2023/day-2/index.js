class game {
	constructor(gameID) {
		this.gameID = gameID;
	}
	rounds = []
}

class round {
	red = 0
	green = 0
	blue = 0
}

// Process line of input into useable data object
function getGameObject(line) {
	if (line.length > 0) {
		const arr = line.split(/:|;/);
		let gameObj = new game(arr[0]);
		let roundObj = new round;
		for (i = 1; i < arr.length; i++) {
			roundObj.red = 0;
			roundObj.green = 0;
			roundObj.blue = 0;
			const round = arr[i].trim();
			const results = round.split(",");
			results.forEach((result) => {
				if (result.includes("red")) {
					roundObj.red = Number(result.match(/\d+/))
				}
				if (result.includes("green")) {
					roundObj.green = Number(result.match(/\d+/))
				}
				if (result.includes("blue")) {
					roundObj.blue = Number(result.match(/\d+/))
				}
			})
			gameObj.rounds.push(roundObj);
		}
		games.push(gameObj);
	}
}

const MAXRED = 12;
const MAXGREEN = 13
const MAXBLUE = 14

let games = []
const file = require("fs").readFileSync("test-data", "utf-8");
const lines = file.split("\n");
lines.forEach((line) => {
	getGameObject(line);
});

let total = 0;
games.forEach((game) => {
	let validGame = true;
	game.rounds.forEach((round) => {
		if (round.red > MAXRED) {
			validGame = false;
		}
		if (round.green > MAXGREEN) {
			validGame = false;
		}
		if (round.blue > MAXBLUE) {
			validGame = false;
		}
	})
	if (validGame === true) {
		total += Number(game.gameID.match(/\d+/));
	} else {
		total += 0;
	}
})

console.table(games);
console.log(total);
