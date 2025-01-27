// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const maze = parseInput(data);

	return shortestPath(maze);
}

type Point = { x: number; y: number };
type Herb = Point & { id: number };
type State = { pos: Point; steps: number };

interface Maze {
	start: Point;
	herbs: Herb[];
	path: Set<string>;
}

// Functions
function parseInput(data: string) {
	const grid: string[] = data.split("\n");
	const maze: Maze = {
		start: { x: -1, y: -1 },
		herbs: [],
		path: new Set(),
	};

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			const tile = grid[y][x];
			const coord = `${x},${y}`;

			switch (tile) {
				case "H":
					maze.herbs.push({ x, y, id: maze.herbs.length });
					maze.path.add(coord);
					break;
				case ".": {
					maze.path.add(coord);

					if (y === 0) {
						maze.start.x = x;
						maze.start.y = y;
					}

					break;
				}
				default:
					break;
			}
		}
	}

	return maze;
}
function shortestPath({ start, herbs, path }: Maze): number {
	const herbDistances = herbs.map((herb) => {
		return calculateDistance(start, herb, path);
	});

	return Math.min(...herbDistances) * 2;
}

function calculateDistance(start: Point, end: Point, path: Set<string>) {
	const queue: State[] = [{ pos: start, steps: 0 }];
	const seen: Set<string> = new Set();

	while (queue.length) {
		const current = queue.shift()!;
		const coord = `${current.pos.x},${current.pos.y}`;

		if (current.pos.x === end.x && current.pos.y === end.y) {
			return current.steps;
		}

		if (!seen.has(coord)) {
			pushNewStates(current);
			seen.add(coord);
		}
	}

	function pushNewStates(current: State) {
		for (const { x, y } of getPaths(current.pos)) {
			queue.push({ pos: { x, y }, steps: current.steps + 1 });
		}
	}
	function getPaths({ x, y }: Point): Point[] {
		const paths: Point[] = [];
		const directions = [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0],
		];

		for (const [dx, dy] of directions) {
			const [nx, ny] = [x + dx, y + dy];

			if (path.has(`${nx},${ny}`)) {
				paths.push({ x: nx, y: ny });
			}
		}

		return paths;
	}

	throw Error("Path not found!");
}
