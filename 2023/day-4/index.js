const fs = require("fs");
const file = fs.readFileSync("example.txt", "utf-8");

const lines = file.trim().split("\n")
console.log(lines)

class card {
	constructor(cardID) {
		this.cardID = cardID;
	}
	winningNumbers = [];
	playerNumbers = [];
}

lines.forEach((line) => {
	const cardObj = new card(line.split(":")[0].match(/\d+/)[0]);
	const winningNumbers = line.split(/:|\|/g)[1];
	cardObj.winningNumbers = winningNumbers.trim().split(" ");
	const playerNumbers = line.split(/:|\|/g)[2];
	cardObj.playerNumbers = playerNumbers.trim().split(" ");
	console.log(cardObj);
})
