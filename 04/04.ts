// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const nails = parseInput(data);
	const targetHeight = fileName.includes("III")
		? getMedian(nails)
		: Math.min(...nails);
	return countStrikes(nails, targetHeight);
}

// Functions
function parseInput(data: string): number[] {
	return data
		.split("\n")
		.map(Number)
		.sort((a, b) => a - b);
}
function countStrikes(nails: number[], targetHeight: number) {
	return nails.reduce((acc, cur) => acc + Math.abs(cur - targetHeight), 0);
}
function getMedian(nails: number[]) {
	const mid = Math.floor(nails.length / 2);

	return nails.length % 2 !== 0
		? nails[mid]
		: (nails[mid - 1] + nails[mid]) / 2;
}
