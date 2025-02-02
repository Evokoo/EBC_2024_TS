// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string) {
	const data = Utils.readData(fileName, quest);
	const message = parseInput(data);

	if (fileName.endsWith("_III")) {
		findLoop(message);
		return -1;
	}

	if (fileName.endsWith("_II")) {
		findLoop(message);
		return extractSecret(decodeMessage(message, 100));
	}

	if (fileName.endsWith("_I")) {
		return extractSecret(decodeMessage(message));
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

	return grid;
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
function extractSecret(grid: string[][]): string {
	for (const row of grid) {
		if (!row.includes(">")) continue;
		return row.slice(row.indexOf(">") + 1, row.indexOf("<")).join("");
	}

	throw Error("Message not found");
}
function getMoveMap(message: Message): Map<string, string> {
	let coordinateGrid = structuredClone(message.grid);

	for (let y = 0; y < message.grid.length; y++) {
		for (let x = 0; x < message.grid[0].length; x++) {
			coordinateGrid[y][x] = `${x},${y}`;
		}
	}

	coordinateGrid = decodeMessage({ ...message, grid: coordinateGrid });
	const moveMap: Map<string, string> = new Map();

	for (let y = 0; y < message.grid.length; y++) {
		for (let x = 0; x < message.grid[0].length; x++) {
			moveMap.set(`${x},${y}`, coordinateGrid[y][x]);
		}
	}

	return moveMap;
}
function findLoop({ grid, pivotPoints, directions }: Message) {
	const moveMap: Map<string, string> = getMoveMap({
		grid,
		pivotPoints,
		directions,
	});

	console.log(moveMap);
}

// Debug
function printGrid(grid: string[][]): void {
	const msg = grid.map((row) => row.join("")).join("\n");

	console.log(msg + "\n");
}
