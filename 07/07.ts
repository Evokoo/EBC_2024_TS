// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): string {
	const data = Utils.readData(fileName, quest);
	const table = parseInput(data, 10);

	return sortByPowerLevel(table, 10);
}

// Functions
function parseInput(data: string, segments: number): Map<string, number[]> {
	const table: Map<string, number[]> = new Map();
	const opLookup: Map<string, number> = new Map([
		["+", 1],
		["-", -1],
		["=", 0],
	]);

	for (const row of data.split("\n")) {
		const sections = row.split(":");
		const operators: string[] = sections[1].split(",");
		const sequence: number[] = [];

		for (let i = 0; sequence.length < segments; i++) {
			const op = operators[i % operators.length];
			sequence.push(opLookup.get(op)!);
		}

		table.set(sections[0], sequence);
	}

	return table;
}
function sortByPowerLevel(table: Map<string, number[]>, base: number): string {
	return [...table]
		.sort((a, b) => getPowerLevel(b[1], base) - getPowerLevel(a[1], base))
		.map(([key, _]) => key)
		.join("");
}
function getPowerLevel(values: number[], base: number): number {
	return values.reduce((acc, cur) => (acc += base += cur), 0);
}
