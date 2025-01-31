// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const farm = parseInput(data);

	if (fileName.endsWith("_III")) {
		const locations: Map<string, number> = new Map();

		for (const palm of farm.palms) {
			const [x, y] = palm.split(",").map(Number);

			for (const [coord, distance] of findSpringLocation({ x, y }, farm.path)) {
				if (farm.palms.has(coord)) continue;
				locations.set(coord, (locations.get(coord) ?? 0) + distance);
			}
		}

		return [...locations].sort((a, b) => a[1] - b[1])[0][1];
	}

	return waterFarm(farm);
}

type Point = { x: number; y: number };
type State = { pos: Point; time: number };

interface Farm {
	entries: Point[];
	path: Set<string>;
	palms: Set<string>;
}

// Functions
function parseInput(data: string) {
	const grid: string[] = data.split("\n");
	const farm: Farm = {
		entries: [],
		path: new Set(),
		palms: new Set(),
	};

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			const tile = grid[y][x];

			switch (tile) {
				case "#":
					break;
				default: {
					const coord = `${x},${y}`;
					if (tile === "P") farm.palms.add(coord);
					if (x === 0 || x === grid[0].length - 1) farm.entries.push({ x, y });

					farm.path.add(coord);
				}
			}
		}
	}

	return farm;
}
function waterFarm({ entries, path, palms }: Farm) {
	const queue: State[] = entries.map((entry) => ({ pos: entry, time: 0 }));

	let totalTime = 0;

	while (queue.length) {
		const current = queue.shift()!;
		const coord = `${current.pos.x},${current.pos.y}`;

		if (palms.has(coord)) {
			palms.delete(coord);
		}

		if (palms.size === 0) {
			totalTime += current.time;
			continue;
		}

		pushNewStates(current);
		path.delete(coord);
	}

	return totalTime;

	function pushNewStates(current: State): void {
		for (const { x, y } of getNeighbours(current.pos)) {
			queue.push({ pos: { x, y }, time: current.time + 1 });
		}
	}

	function getNeighbours({ x, y }: Point): Point[] {
		const neigbours: Point[] = [];
		const directions = [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0],
		];

		for (const [dx, dy] of directions) {
			const [nx, ny] = [dx + x, dy + y];
			const coord = `${nx},${ny}`;

			if (path.has(coord)) {
				neigbours.push({ x: nx, y: ny });
			}
		}

		return neigbours;
	}
}
function findSpringLocation(start: Point, path: Set<string>) {
	const distanceMap: Map<string, number> = new Map();
	const queue: State[] = [{ pos: start, time: 0 }];

	while (queue.length) {
		const current = queue.shift()!;
		const coord = `${current.pos.x},${current.pos.y}`;

		if (distanceMap.has(coord)) {
			continue;
		} else {
			pushNewStates(current);
			distanceMap.set(coord, current.time);
		}
	}

	return distanceMap;

	function pushNewStates(current: State): void {
		for (const { x, y } of getNeighbours(current.pos)) {
			queue.push({ pos: { x, y }, time: current.time + 1 });
		}
	}

	function getNeighbours({ x, y }: Point): Point[] {
		const neigbours: Point[] = [];
		const directions = [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0],
		];

		for (const [dx, dy] of directions) {
			const [nx, ny] = [dx + x, dy + y];
			const coord = `${nx},${ny}`;

			if (path.has(coord)) {
				neigbours.push({ x: nx, y: ny });
			}
		}

		return neigbours;
	}
}
