// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const dance = parseInput(data);

	if (fileName.includes("III")) {
		let max = 0;
		const rows = dance.length;
		const digits = dance.flat().filter((n) => {
			const side = Math.ceil(n / rows) % 2 === 0;
			const index = n % rows;

			console.log({ n, side });

			return index === 1;
		});

		console.log(digits);
		// }

		console.log(max);
	}

	if (fileName.includes("II")) {
		const shouts: Map<number, number> = new Map();

		for (let round = 0; true; round++) {
			simulateDance(dance, round);

			const shout = getRoundNumber(dance);
			const shoutCount = (shouts.get(shout) ?? 0) + 1;

			if (shoutCount === 2024) {
				return (round + 1) * shout;
			} else {
				shouts.set(shout, shoutCount);
			}
		}
	}
	if (fileName.includes("I")) {
		for (let round = 0; round < 10; round++) {
			simulateDance(dance, round);
		}
		return getRoundNumber(dance);
	}

	throw Error("LAME");
}

// Functions
function parseInput(data: string) {
	const digits: number[][] = data
		.split("\n")
		.map((row) => row.split(" ").map(Number));

	const dance = Array.from({ length: digits[0].length }, () =>
		Array.from({ length: digits.length }, () => 0)
	);

	for (let y = 0; y < digits.length; y++) {
		for (let x = 0; x < digits[0].length; x++) {
			dance[x][y] = digits[y][x];
		}
	}

	return dance;
}
function simulateDance(dance: number[][], round: number): number[][] {
	const current = dance[round % dance.length];
	const next = dance[(round + 1) % dance.length];

	const dancer = current.shift()!;
	const side = Math.ceil(dancer / next.length) % 2 === 0;
	let index = dancer % next.length;

	if (index === 0) index = next.length;

	next.splice(side ? next.length - --index : --index, 0, dancer);

	return dance;
}
function getRoundNumber(grid: number[][]): number {
	const result = [];

	for (let i = 0; i < grid.length; i++) {
		result.push(grid[i][0]);
	}

	return Number(result.join(""));
}
