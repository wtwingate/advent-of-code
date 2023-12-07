class gameObj {
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
	const game = new gameObj(arr[0]);
	rounds.forEach((round) => {
		const roundScores = [];
		const scores = round.split(", ");
		roundScores.push(scores);
		game.rounds.push(roundScores);
	})
	games.push(game);
})

let powerSum = 0;

games.forEach((game) => {
	let bigRed = 0;
	let bigGreen = 0;
	let bigBlue = 0;
	game.rounds.forEach((round) => {
		round.forEach((scores) => {
			scores.forEach((score) => {
				if (score.endsWith("red") && score.match(/\d+/) > bigRed) {
					bigRed = Number(score.match(/\d+/));
				}
				if (score.endsWith("green") && score.match(/\d+/) > bigGreen) {
					bigGreen = Number(score.match(/\d+/));
				}
				if (score.endsWith("blue") && score.match(/\d+/) > bigBlue) {
					bigBlue = Number(score.match(/\d+/));
				}
			})
		})
	})
	powerSum += bigRed * bigGreen * bigBlue;
});

console.log(powerSum);

/*
const validGames = [];

const maxRed = 12;
const maxGreen = 13;
const maxBlue = 14;

games.forEach((game) => {
	let validScore = true;
	game.rounds.forEach((round) => {
		round.forEach((scores) => {
			scores.forEach((score) => {
				if (score.endsWith("red") && score.match(/\d+/) > maxRed) {
					validScore = false;
				}
				if (score.endsWith("green") && score.match(/\d+/) > maxGreen) {
					validScore = false;
				}
				if (score.endsWith("blue") && score.match(/\d+/) > maxBlue) {
					validScore = false;
				}
			})
		})
	})
	if (validScore === true) {
		validGames.push(game.gameID);
	}
});

let sum = 0;
validGames.forEach((game) => {
	sum += Number(game.match(/\d+/))
})
*/

