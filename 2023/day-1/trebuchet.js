const fs = require("fs")

const lines = fs.readFileSync("alt-data", "utf-8").split("\n");
const digits = [
	 "1", "2", "3", "4", "5", "6", "7", "8", "9",
	 "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"
]

const regex = new RegExp(digits.join("|"), "g");

let calVal = 0.0;

lines.forEach((line) => {
	const digits = [...line.matchAll(regex)];
	const rawCal = digits[0] + " " + digits[digits.length - 1];
	const rawArr = rawCal.split(" ");
	const cookArr = rawArr.map((num) => {
		if (isNaN(num)) {
			switch (num) {
				case "one": return "1";
				case "two": return "2";
				case "three": return "3";
				case "four": return "4";
				case "five": return "5";
				case "six": return "6";
				case "seven": return "7";
				case "eight": return "8";
				case "nine": return "9";
			}
		} else {
			return num;
		}
	})
	const cookCal = cookArr.join(""); 
	console.log(cookCal);
	calVal += Number(cookCal);
})
console.log(calVal);

/*
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
*/
