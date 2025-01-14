// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);

	if (fileName.endsWith("_I")) {
		const sizes = [10, 5, 3, 1];
		return requiredStamps(data, sizes);
	}

	if (fileName.endsWith("_II")) {
		const stamps = [1, 3, 5, 10, 15, 16, 20, 24, 25, 30];
		return requiredStamps(data, stamps);
	}

	return -1;
}

// Functions
function parseInput(data: string): number[] {
	return data.split("\n").map(Number);
}
function requiredStamps(input: string, sizes: number[]): number {
	let total = 0;

	for (const target of parseInput(input)) {
		total += countStamps(target, sizes);
	}

	return total;
}
function countStamps(target: number, sizes: number[]): number {
	const dp = new Array(target + 1).fill(Infinity);
	dp[0] = 0;

	for (const size of sizes) {
		for (let i = size; i <= target; i++) {
			dp[i] = Math.min(dp[i], dp[i - size] + 1);
		}
	}

	if (dp[target] === Infinity) {
		throw Error("Stamp count not found");
	} else {
		return dp[target];
	}
}
