// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const dance = parseInput(data);

	if (fileName.includes("III")) return solveIII(dance);
	if (fileName.includes("II")) return solveII(dance);
	if (fileName.includes("I")) return solveI(dance);

	throw Error("Invalid filename");
}

// Functions
function solveI(dance: number[][]): number {
	for (let round = 0; round < 10; round++) {
		simulateDance(dance, round);
	}
	return Number(getShout(dance));
}
function solveII(dance: number[][]): number {
	const shouts: Map<number, number> = new Map();

	for (let round = 0; Number.MAX_SAFE_INTEGER; round++) {
		simulateDance(dance, round);

		const shout = Number(getShout(dance));
		const shoutCount = (shouts.get(shout) ?? 0) + 1;

		if (shoutCount === 2024) {
			return (round + 1) * shout;
		} else {
			shouts.set(shout, shoutCount);
		}
	}

	throw Error("Result not found");
}
function solveIII(dance: number[][]): number {
	let max = 0;

	for (let i = 0; i < 100_000; i++) {
		simulateDance(dance, i);

		const shout: number = Number(getShout(dance));

		if (shout > max) {
			max = shout;
		}
	}

	return max;
}

function parseInput(data: string): number[][] {
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
function getShout(grid: number[][]): string {
	let result = "";

	for (let i = 0; i < grid.length; i++) {
		result += grid[i][0];
	}

	return result;
}
