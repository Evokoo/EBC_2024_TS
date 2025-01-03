// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const blocks = parseInput(data);
	return removeBlocks(blocks, fileName.split("_")[1]);
}

// Global
const DIRECTIONS = [
	[0, 1], // Up
	[0, -1], // Down
	[1, 0], // Right
	[-1, 0], // Left
	[-1, 1], // Top-right diagonal
	[-1, -1], // Top-left diagonal
	[1, 1], // Bottom-right diagonal
	[1, -1], // Bottom-left diagonal
];

//Types
type Blocks = Set<string>;

// Functions
function parseInput(data: string): Blocks {
	const grid = data.split("\n").map((row) => [...row]);
	const blocks: Blocks = new Set();

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			if (grid[y][x] === "#") {
				blocks.add(`${x},${y}`);
			}
		}
	}

	return blocks;
}
function removeBlocks(blocks: Blocks, part: string): number {
	let removed = 0;

	while (blocks.size) {
		const toRemove: Set<string> = new Set();

		for (const block of blocks) {
			const [x, y] = block.split(",").map(Number);
			const directions = part !== "III" ? DIRECTIONS.slice(0, 4) : DIRECTIONS;

			for (const [dx, dy] of directions) {
				if (!blocks.has(`${x + dx},${y + dy}`)) {
					toRemove.add(block);
					break;
				}
			}
		}

		removed += blocks.size;

		for (const block of toRemove) {
			blocks.delete(block);
		}
	}

	return removed;
}
