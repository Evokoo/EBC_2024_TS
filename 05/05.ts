// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const dance = parseInput(data);
	return simulateDance(dance, 10);
}

// Functions
function parseInput(data: string) {
	const digits: number[][] = data
		.split("\n")
		.map((row) => (row.match(/\d+/g) || []).map(Number));

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
function simulateDance(dance: number[][], rounds: number): number {
	for (let round = 0; round < rounds; round++) {
		const current = dance[round % dance.length];
		const next = dance[(round + 1) % dance.length];

		const dancer = current.shift()!;
		const side = Math.ceil(dancer / next.length) % 2 === 0;
		let index = dancer % next.length;

		if (index === 0) index = next.length;

		next.splice(side ? next.length - --index : --index, 0, dancer);
	}

	return getRoundNumber(dance);
}
function getRoundNumber(grid: number[][]): number {
	const result = [];

	for (let i = 0; i < grid.length; i++) {
		result.push(grid[i][0]);
	}

	return Number(result.join(""));
}
