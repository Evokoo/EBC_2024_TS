// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const maze = parseInput(data);

	if (fileName.endsWith("_I")) {
		return collectOneHerb(maze);
	} else {
		return collectManyHerbs(maze);
	}
}

type Point = { x: number; y: number };
type Herb = Point & { type: string };
type State = { pos: Point; steps: number };

interface Maze {
	start: Point;
	herbs: Herb[];
	herbTypes: Set<string>;
	path: Set<string>;
}

// Functions
function parseInput(data: string) {
	const grid: string[] = data.split("\n");
	const maze: Maze = {
		start: { x: -1, y: -1 },
		herbs: [],
		herbTypes: new Set(),
		path: new Set(),
	};

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			const tile = grid[y][x];
			const coord = `${x},${y}`;

			switch (tile) {
				case "#":
				case "~":
					break;
				case ".": {
					maze.path.add(coord);

					if (y === 0) {
						maze.start.x = x;
						maze.start.y = y;
					}
					break;
				}
				default: {
					maze.path.add(coord);
					maze.herbs.push({ x, y, type: tile });
					maze.herbTypes.add(tile);

					break;
				}
			}
		}
	}

	return maze;
}
function collectOneHerb({ start, herbs, path }: Maze): number {
	const herbDistances = herbs.map((herb) => {
		return calculateDistance(start, herb, path);
	});

	return Math.min(...herbDistances) * 2;
}
function collectManyHerbs({ start, herbs, herbTypes, path }: Maze) {
	const cache: Map<string, Map<string, number>> = new Map();

	function calculateCachedDistance(from: Point, to: Point): number {
		const fromKey = `${from.x},${from.y}`;
		const toKey = `${to.x},${to.y}`;

		if (!cache.has(fromKey)) {
			cache.set(fromKey, new Map());
		}

		const fromCache = cache.get(fromKey)!;

		if (!fromCache.has(toKey)) {
			const distance = calculateDistance(from, to, path);

			fromCache.set(toKey, distance);

			if (!cache.has(toKey)) {
				cache.set(toKey, new Map());
			}

			cache.get(toKey)!.set(fromKey, distance);
		}

		return fromCache.get(toKey)!;
	}

	let shortestPath = Infinity;

	function DFS(
		pos: Point,
		steps: number = 0,
		collected: Set<string> = new Set()
	) {
		if (steps > shortestPath) return;

		if (collected.size === herbTypes.size) {
			const finalDistance = steps + calculateCachedDistance(pos, start);
			shortestPath = Math.min(shortestPath, finalDistance);
			return;
		} else {
			for (const { x, y, type } of herbs) {
				if (collected.has(type)) continue;

				const distance = calculateCachedDistance(pos, { x, y });
				const herbCollection = collected.union(new Set([type]));

				DFS({ x, y }, steps + distance, herbCollection);
			}
		}
	}

	DFS(start);

	return shortestPath;
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
