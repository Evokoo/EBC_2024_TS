// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string) {
	const data = Utils.readData(fileName, quest);

	if (fileName.endsWith("_III")) {
		simulateMetors(data);
	} else {
		return simulateBattle(parseInput(data));
	}
}

type Point = { x: number; y: number };
type Knight = Point & { id: string; value: number };
type Target = Point & { hp: number };
interface Battle {
	targets: Target[];
	knights: Knight[];
}

// Functions
function parseInput(data: string): Battle {
	const knights: Knight[] = [];
	const targets: Target[] = [];
	const grid = data.split("\n");

	for (let y = 0; y < grid.length - 1; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			const tile = grid[y][x];

			if (tile === ".") continue;
			else if (tile === "T") targets.push({ x, y, hp: 1 });
			else if (tile === "H") targets.push({ x, y, hp: 2 });
			else knights.push({ x, y, id: tile, value: tile.charCodeAt(0) - 64 });
		}
	}

	return { knights, targets };
}
function simulateBattle({ knights, targets }: Battle) {
	let score = 0;

	targetLoop: while (targets.length) {
		const target = targets.shift()!;

		for (const { x, y, value } of knights) {
			for (let power = target.x; power > 0; power--) {
				const hit = collision({ x, y }, power, target);

				if (hit) {
					score += power * value * target.hp;
					continue targetLoop;
				}
			}
		}
	}

	return score;
}
function collision({ x, y }: Point, power: number, target: Point): boolean {
	const path = [
		[1, -1],
		[1, 0],
	];

	for (const [dx, dy] of path) {
		for (let i = 0; i < power; i++) {
			[x, y] = [x + dx, y + dy];
			if (x === target.x && y === target.y) {
				return true;
			}
		}
	}

	while (x <= target.x && y <= target.y) {
		[x, y] = [x + 1, y + 1];
		if (x === target.x && y === target.y) {
			return true;
		}
	}

	return false;
}
function simulateMetors(data: string) {
	const knights: Knight[] = [
		{ x: 1, y: 0, id: "C", value: 3 },
		{ x: 1, y: 1, id: "B", value: 2 },
		{ x: 1, y: 2, id: "A", value: 1 },
	];

	for (const coord of data.split("\n")) {
		const [x, y] = coord.split(" ").map(Number);
		const basePower = Math.max(0, y - x);

		//m = -1
		//y1 = y2 - slope * (x2 - x1);

		const y1 = y - -1 * (x - 1);
		console.log(basePower);
	}
}
