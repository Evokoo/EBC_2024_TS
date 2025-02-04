// Imports
import Utils from "Utils";
import { BinaryHeap } from "@std/data-structures";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const course = parseInput(data);

	if (fileName.endsWith("_II")) {
		getQuickestCircuit(course);
		return -1;
	}

	if (fileName.endsWith("_I")) {
		return getBestheight(course, 100);
	}

	throw Error("Invalid filename");
}

type Point = { x: number; y: number };

interface State {
	x: number;
	y: number;
	bearing: number;
	height: number;
	time: number;
}

interface Course {
	start: Point;
	course: string[];
	checkpoints: Map<string, Point>;
}

// Functions
function parseInput(data: string) {
	const grid: string[] = data.split("\n");
	const course: Course = {
		start: { x: -1, y: -1 },
		course: grid,
		checkpoints: new Map(),
	};

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			const tile = grid[y][x];

			switch (tile) {
				case "S":
					course.start = { x, y };
					break;
				case "A":
				case "B":
				case "C":
					course.checkpoints.set(tile, { x, y });
					break;
				default:
					break;
			}
		}
	}

	return course;
}
function getBestheight({ start, course }: Course, timeLimit: number) {
	const visited: Map<string, number> = new Map();
	const queue: BinaryHeap<State> = new BinaryHeap(
		(a, b) => b.height - a.height
	);

	queue.push({ x: start.x, y: start.y, bearing: 180, height: 1000, time: 0 });

	while (queue.length) {
		const current = queue.pop()!;
		const stateKey = `${current.x},${current.y}`;

		if (current.time === timeLimit) {
			return current.height;
		}

		if (visited.has(stateKey) && visited.get(stateKey)! > current.height) {
			continue;
		} else {
			pushNewStates(current);
			visited.set(stateKey, current.height);
		}
	}

	throw Error("Uh oh something went wrong?");

	function pushNewStates(current: State): void {
		for (const { x, y, change, bearing } of getNeigbours(current)) {
			queue.push({
				x,
				y,
				height: current.height + change,
				bearing,
				time: current.time + 1,
			});
		}
	}

	type Neighbour = Point & { change: number; bearing: number };

	function getNeigbours(current: State) {
		const neighbours: Neighbour[] = [];

		for (const direction of [0, 90, -90]) {
			const bearing = (current.bearing + direction + 360) % 360;
			const [dx, dy] = { 0: [0, -1], 90: [1, 0], 180: [0, 1], 270: [-1, 0] }[
				bearing
			]!;
			const [nx, ny] = [current.x + dx, current.y + dy];

			if (course[ny] && course[ny][nx] && course[ny][nx] !== "#") {
				const change = { "-": -2, "+": 1 }[course[ny][nx]] ?? -1;
				neighbours.push({ x: nx, y: ny, change, bearing });
			}
		}

		return neighbours;
	}
}
function getQuickestCircuit({ start, course, checkpoints }: Course) {
	function BFS(
		from: Point,
		to: Point,
		time: number,
		height: number
	): [number, number] {
		const visited: Set<string> = new Set();
		const queue: BinaryHeap<State> = new BinaryHeap(
			(a, b) => a.time - b.time || b.height - a.height
		);

		queue.push({ x: from.x, y: from.y, bearing: 180, height, time });

		while (queue.length) {
			const current = queue.pop()!;
			const stateKey = `${current.x},${current.y}`;

			if (current.x === to.x && current.y === to.y) {
				return [current.time, current.height];
			}

			if (visited.has(stateKey)) {
				continue;
			} else {
				pushNewStates(current);
				visited.add(stateKey);
			}
		}

		throw Error("Uh oh something went wrong?");

		function pushNewStates(current: State): void {
			for (const { x, y, change, bearing } of getNeigbours(current)) {
				queue.push({
					x,
					y,
					height: current.height + change,
					bearing,
					time: current.time + 1,
				});
			}
		}

		type Neighbour = Point & { change: number; bearing: number };

		function getNeigbours(current: State) {
			const neighbours: Neighbour[] = [];

			for (const direction of [0, 90, -90]) {
				const bearing = (current.bearing + direction + 360) % 360;
				const [dx, dy] = { 0: [0, -1], 90: [1, 0], 180: [0, 1], 270: [-1, 0] }[
					bearing
				]!;
				const [nx, ny] = [current.x + dx, current.y + dy];

				if (course[ny] && course[ny][nx] && course[ny][nx] !== "#") {
					const change = { "-": -2, "+": 1 }[course[ny][nx]] ?? -1;
					neighbours.push({ x: nx, y: ny, change, bearing });
				}
			}

			return neighbours;
		}
	}

	let current = start;
	let height = 10000;
	let time = 0;

	for (const [n, checkpoint] of [...checkpoints].sort((a, b) =>
		a[0].localeCompare(b[0])
	)) {
		[time, height] = BFS(start, checkpoint, time, height);
		current = checkpoint;

		console.log({ n, time, height });
	}

	console.log(BFS(current, start, time, height));
}
