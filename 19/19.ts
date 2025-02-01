// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string) {
	const data = Utils.readData(fileName, quest);

	if (fileName.endsWith("_III")) {
		return decodeMessage(parseInput(data), 1000);
	}

	if (fileName.endsWith("_II")) {
		return decodeMessage(parseInput(data), 100);
	}

	if (fileName.endsWith("_I")) {
		return decodeMessage(parseInput(data));
	}
}

type Point = { x: number; y: number };

interface Message {
	directions: string;
	grid: string[][];
	pivotPoints: Point[];
}

// Functions
function parseInput(data: string): Message {
	const sections = data.split("\n\n");
	const directions = sections[0];
	const grid = sections[1].split("\n").map((row) => [...row]);
	const pivotPoints: Point[] = [];

	for (let y = 1; y < grid.length - 1; y++) {
		for (let x = 1; x < grid[0].length - 1; x++) {
			pivotPoints.push({ x, y });
		}
	}

	return { directions, grid, pivotPoints };
}

function decodeMessage(
	{ directions, grid, pivotPoints }: Message,
	cycles: number = 1
) {
	for (let cycle = 0; cycle < cycles; cycle++) {
		for (let i = 0; i < pivotPoints.length; i++) {
			const point = pivotPoints[i];
			const direction = directions[i % directions.length];
			grid = rotateGrid(point, grid, direction);
		}
	}

	printGrid(grid);

	for (const row of grid) {
		if (!row.includes(">")) continue;
		return row.slice(row.indexOf(">") + 1, row.indexOf("<")).join("");
	}
}
function rotateGrid({ x, y }: Point, grid: string[][], direction: string) {
	const cells: [number, number][] = [
		[-1, 1], //BL
		[-1, 0], //L
		[-1, -1], //TL
		[0, -1], //TC
		[1, -1], //TR
		[1, 0], //R
		[1, 1], //BR
		[0, 1], //BC
	];

	const values = cells.map(([dx, dy]) => grid[y + dy][x + dx]);
	const offset = direction === "R" ? -1 : 1;

	for (let i = 0; i < cells.length; i++) {
		const [dx, dy] = cells[i];
		const index = (i + offset + cells.length) % cells.length;
		grid[dy + y][dx + x] = values[index];
	}

	return grid;
}
function printGrid(grid: string[][]): void {
	const msg = grid.map((row) => row.join("")).join("\n");

	console.log(msg + "\n");
}
