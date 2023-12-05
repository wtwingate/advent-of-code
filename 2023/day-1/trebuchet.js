const fs = require("fs")

const lines = fs.readFileSync("data", "utf-8").split("\n");
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

calVal = 0;

lines.forEach((line) => {
	const arr = line.split("");
	const arrDigits = arr.filter((char) => {
		return digits.includes(char);
	})
	const cal = arrDigits[0] + arrDigits[arrDigits.length - 1];
	if (cal.length == 2) {
		calVal += Number(cal);
	}
})

console.log(calVal);
