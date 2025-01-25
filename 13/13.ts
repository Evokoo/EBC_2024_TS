// Imports
import Utils from "Utils";
import { BinaryHeap } from "@std/data-structures";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const maze = parseInput(data);

	if (fileName.endsWith("_III")) {
		return traverseMaze(maze, true);
	} else {
		return traverseMaze(maze);
	}
}

type Point = { x: number; y: number };
type Platform = Point & { level: number };

interface Maze {
	path: Map<string, number>;
	start: Point;
	end: Point;
	width: number;
	height: number;
}

interface State {
	pos: Point;
	level: number;
	time: number;
}

// Functions
function parseInput(data: string): Maze {
	const grid: string[][] = data.split("\n").map((row) => [...row]);
	const path: Map<string, number> = new Map();
	const start: Point = { x: -1, y: -1 };
	const end: Point = { x: -1, y: -1 };

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			const tile = grid[y][x];
			const coord = `${x},${y}`;

			switch (tile) {
				case "#":
				case " ":
					break;
				case "S": {
					start.x = x;
					start.y = y;
					path.set(coord, 0);
					break;
				}
				case "E": {
					end.x = x;
					end.y = y;
					path.set(coord, 0);
					break;
				}
				default:
					path.set(coord, Number(tile));
			}
		}
	}

	return { path, start, end, width: grid[0].length, height: grid.length };
}
function traverseMaze(
	{ start, end, path, width, height }: Maze,
	reverse: boolean = false
) {
	const queue: BinaryHeap<State> = new BinaryHeap((a, b) => a.time - b.time);

	queue.push({ pos: reverse ? end : start, level: 0, time: 0 });

	while (queue.length) {
		const current = queue.pop()!;
		const coord = `${current.pos.x},${current.pos.y}`;

		if (isExitCondition(current)) {
			return current.time;
		} else {
			pushNewStates(current);
			path.delete(coord);
		}
	}

	throw Error("Path not found");

	function isExitCondition(current: State): boolean {
		if (reverse) {
			return (
				current.pos.x === 0 ||
				current.pos.y === 0 ||
				current.pos.x === width - 1 ||
				current.pos.y === height - 1
			);
		} else {
			return current.pos.x === end.x && current.pos.y === end.y;
		}
	}
	function pushNewStates(current: State): void {
		for (const { x, y, level } of getPlatforms(current.pos)) {
			queue.push({
				pos: { x, y },
				level,
				time: current.time + adjustmentTime(current.level, level) + 1,
			});
		}
	}
	function adjustmentTime(current: number, target: number): number {
		const up = (target - current + 10) % 10;
		const down = (current - target + 10) % 10;
		return Math.min(up, down);
	}
	function getPlatforms({ x, y }: Point): Platform[] {
		const platforms: Platform[] = [];
		const directions = [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0],
		];

		for (const [dx, dy] of directions) {
			const [nx, ny] = [dx + x, dy + y];
			const level = path.get(`${nx},${ny}`) ?? -1;

			if (level !== -1) {
				platforms.push({ x: nx, y: ny, level });
			}
		}

		return platforms;
	}
}
