// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string) {
	const data = Utils.readData(fileName, quest);
	const message = parseInput(data);

	if (fileName.endsWith("_III")) {
		return decodeMessage(message, 1048576000);
	}

	if (fileName.endsWith("_II")) {
		return decodeMessage(message, 100);
	}

	if (fileName.endsWith("_I")) {
		return decodeMessage(message);
	}
}

type Point = { x: number; y: number };
type Update = Point & { value: string };
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
function rotatePoint(
	{ x, y }: Point,
	grid: string[][],
	direction: string
): Update[] {
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
	const updates: Update[] = [];

	for (let i = 0; i < cells.length; i++) {
		const [dx, dy] = cells[i];
		const index = (i + offset + cells.length) % cells.length;
		updates.push({ value: values[index], x: dx + x, y: dy + y });
	}

	return updates;
}
function extractSecret(grid: string[][]): string {
	for (const row of grid) {
		if (!row.includes(">")) continue;
		return row.slice(row.indexOf(">") + 1, row.indexOf("<")).join("");
	}

	throw Error("Message not found");
}
function generateMoveMap({
	grid,
	pivotPoints,
	directions,
}: Message): Map<string, string> {
	const coordGrid = structuredClone(grid);

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			coordGrid[y][x] = `${x},${y}`;
		}
	}

	for (let i = 0; i < pivotPoints.length; i++) {
		const point = pivotPoints[i];
		const direction = directions[i % directions.length];

		for (const { value, x, y } of rotatePoint(point, coordGrid, direction)) {
			coordGrid[y][x] = value;
		}
	}

	const moveMap: Map<string, string> = new Map();

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			moveMap.set(`${x},${y}`, coordGrid[y][x]);
		}
	}

	return moveMap;
}
function generatePerumations(message: Message) {
	const moveMap: Map<string, string> = generateMoveMap(message);
	const permutations: Map<string, string[]> = new Map();

	for (const location of moveMap.keys()) {
		const seen: Set<string> = new Set();
		let current: string = location;

		while (!seen.has(current)) {
			seen.add(current);
			current = moveMap.get(current)!;
		}

		permutations.set(location, [...seen]);
	}

	return permutations;
}
function decodeMessage(message: Message, cycle: number = 1) {
	const permutations: Map<string, string[]> = generatePerumations(message);
	const newGrid: string[][] = structuredClone(message.grid);

	for (const [point, path] of permutations) {
		const [x1, y1] = point.split(",").map(Number);
		const [x2, y2] = path[cycle % path.length].split(",").map(Number);

		newGrid[y1][x1] = message.grid[y2][x2];
	}

	// printGrid(newGrid);

	return extractSecret(newGrid);
}

// Debug
function printGrid(grid: string[][]): void {
	const msg = grid.map((row) => row.join("")).join("\n");

	console.log(msg + "\n");
}
