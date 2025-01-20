// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string) {
	const data = Utils.readData(fileName, quest);
	const ruins = findMissingRuins(parseInput(data));

	if (fileName.endsWith("_II")) {
		return -1;
	}

	if (fileName.endsWith("_I")) {
		return ruins;
	}

	return;
}

interface Ruins {
	rows: Map<number, Set<string>>;
	columns: Map<number, Set<string>>;
	width: number;
	height: number;
}

// Functions
function parseInput(data: string): Ruins {
	const rows: Map<number, Set<string>> = new Map();
	const columns: Map<number, Set<string>> = new Map();
	const grid = data.split("\n").map((row) => [...row]);

	//Rows
	for (let y = 2; y < grid.length - 2; y++) {
		const rowSet: Set<string> = new Set();

		for (let x = 0; x < grid[0].length; x++) {
			const tile = grid[y][x];

			if (tile !== ".") {
				rowSet.add(tile);
			}
		}

		rows.set(y, rowSet);
	}

	//Columns
	for (let x = 2; x < grid[0].length - 2; x++) {
		const colSet: Set<string> = new Set();

		for (let y = 0; y < grid.length; y++) {
			const tile = grid[y][x];

			if (tile !== ".") {
				colSet.add(tile);
			}
		}

		columns.set(x, colSet);
	}

	return { rows, columns, width: grid[0].length, height: grid.length };
}
function findMissingRuins({ rows, columns, width, height }: Ruins) {
	const ruins: string[] = [];

	for (let y = 2; y < height - 2; y++) {
		for (let x = 2; x < width - 2; x++) {
			const row = rows.get(y)!;
			const col = columns.get(x)!;
			ruins.push([...row.intersection(col)][0]);
		}
	}

	return ruins.join("");
}
