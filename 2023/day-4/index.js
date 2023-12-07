const fs = require("fs");
const file = fs.readFileSync("data.txt", "utf-8");

const lines = file.trim().split("\n");

class card {
	constructor(cardID) {
		this.cardID = cardID;
	}
	winningNumbers = [];
	playerNumbers = [];
	getScore = function() {
		let score = 0;
		this.playerNumbers.forEach((number) => {
			if (this.winningNumbers.includes(number)) {
				if (score === 0) {
					score += 1;
				} else {
					score *= 2;
				}
			}
		})
		return score;
	}
}

const deck = [];

lines.forEach((line) => {
	const cardObj = new card(line.split(":")[0].match(/\d+/)[0]);
	const winningNumbers = line.split(/:|\|/g)[1];
	cardObj.winningNumbers = winningNumbers.trim().split(/\s+/);
	const playerNumbers = line.split(/:|\|/g)[2];
	cardObj.playerNumbers = playerNumbers.trim().split(/\s+/);
	deck.push(cardObj);
})

let totalScore = 0;
deck.forEach((card) => {
	totalScore += card.getScore();
})

console.log(totalScore);
