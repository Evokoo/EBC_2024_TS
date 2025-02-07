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
		return getBestHeight(course, 100);
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
					course.start = { x, y }; /* fall through */
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
function getBestHeight({ start, course }: Course, timeLimit: number) {
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
function getQuickestCircuit({ course, checkpoints }: Course) {
	interface Node {
		x: number;
		y: number;
		bearing: number;
		height: number;
		gCost: number;
		hCost: number;
		fCost: number;
	}

	function aStar(start: Point, end: Point, time: number, height: number) {
		const open: BinaryHeap<Node> = new BinaryHeap(
			(a, b) => a.fCost - b.fCost || b.height - a.height
		);
		const closed: Set<string> = new Set();
		const routes: [number, number][] = [];

		open.push({
			x: start.x,
			y: start.y,
			bearing: 180,
			height,
			gCost: time,
			hCost: Utils.manhattanDistance(start, end),
			fCost: Utils.manhattanDistance(start, end),
		});

		while (open.length) {
			const current = open.pop()!;
			const key = `${current.x},${current.y}`;

			if (current.x === end.x && current.y === end.y) {
				routes.push([current.gCost, current.height]);
				continue;
			}

			if (closed.has(key)) {
				continue;
			} else {
				closed.add(key);
			}

			pushNewStates(current, end);
		}

		return routes;

		function pushNewStates(current: Node, target: Point): void {
			for (const { x, y, change, bearing } of getNeigbours(current)) {
				const gCost = current.gCost + 1;
				const hCost = Utils.manhattanDistance({ x, y }, target);
				const fCost = gCost + hCost;

				open.push({
					x,
					y,
					height: current.height + change,
					bearing,
					gCost,
					hCost,
					fCost,
				});
			}
		}

		type Neighbour = Point & { change: number; bearing: number };

		function getNeigbours(current: Node) {
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

	function optimalRoute() {
		const queue: [string[], number, number][] = [
			[["S", "A", "B", "C", "S"], 0, 10000],
		];

		let bestTime = Infinity;

		while (queue.length) {
			const current = queue.shift()!;

			if (current[0].length === 1) {
				console.log(current);
				if (current[2] >= 10_000 && current[1] < bestTime) {
					bestTime = current[1];
				}

				continue;
			}

			const a = checkpoints.get(current[0][0])!;
			const b = checkpoints.get(current[0][1])!;

			for (const [time, height] of aStar(a, b, current[1], current[2])) {
				queue.push([current[0].slice(1), time, height]);
			}
		}

		console.log(bestTime);
	}

	optimalRoute();
}
