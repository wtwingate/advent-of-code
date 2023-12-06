const lines = require("fs").readFileSync("data", "utf-8").split("\n");
const regex = /(?<=([1-9]|one|two|three|four|five|six|seven|eight|nine))/g;

let calVal = 0.0;
lines.forEach((line) => {
	const digits = Array.from([...line.matchAll(regex)]);
	if (digits.length > 0) {
		const rawCal = digits[0][1] + " " + digits[digits.length - 1][1];
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
		calVal += Number(cookCal);
	}
})
console.log(calVal);
