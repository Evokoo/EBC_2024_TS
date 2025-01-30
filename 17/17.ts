// Imports
import Utils from "Utils";
import { BinaryHeap } from "@std/data-structures";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);

	if (fileName.endsWith("_III")) {
		return findBrillant(parseInput(data));
	}

	return analyseConstellation(parseInput(data));
}

type Node = { id: number; distance: number; parent: number | null };
type Point = { x: number; y: number };
type Stars = Map<number, Point>;

// Functions
function parseInput(data: string) {
	const stars: Map<number, Point> = new Map();
	const grid: string[] = data.split("\n");

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			const tile = grid[y][x];

			if (tile === "*") {
				stars.set(stars.size + 1, { x, y });
			}
		}
	}

	return stars;
}
function analyseConstellation(stars: Stars) {
	const queue: BinaryHeap<Node> = new BinaryHeap(
		(a, b) => a.distance - b.distance
	);
	const distanceMap: Map<number, number> = new Map(
		[...stars.keys()].map((id) => [id, Infinity])
	);
	const visited: Set<number> = new Set();
	const connections: [number, number][] = [];

	queue.push({ id: [...stars][0][0], distance: 0, parent: null });

	while (queue.length) {
		const current = queue.pop()!;

		if (visited.has(current.id)) {
			continue;
		} else {
			visited.add(current.id);
		}

		if (current.parent !== null) {
			connections.push([current.parent, current.id]);
		}

		for (const [id, point] of stars) {
			if (visited.has(id)) continue;

			const currentPoint: Point = stars.get(current.id)!;

			const distance = Utils.manhattanDistance(currentPoint, point);

			if (distance < distanceMap.get(id)!) {
				distanceMap.set(id, distance);
				queue.push({ id, distance, parent: current.id });
			}
		}
	}

	let totalDistance = 0;

	for (const [_, distance] of distanceMap) {
		totalDistance += distance === Infinity ? 0 : distance;
	}

	return totalDistance + stars.size;
}
function findBrillant(stars: Stars) {
	const seen: Set<number> = new Set();

	function BFS(star: { id: number; point: Point }) {
		const constellation: Stars = new Map([[star.id, star.point]]);
		const queue = [star];

		while (queue.length) {
			const current = queue.shift()!;

			if (seen.has(current.id)) {
				continue;
			} else {
				seen.add(current.id);
			}

			for (const [id, point] of stars) {
				if (seen.has(id)) continue;
				if (Utils.manhattanDistance(current.point, point) < 6) {
					constellation.set(id, point);
					queue.push({ id, point });
				}
			}
		}

		return constellation;
	}

	const brillantConstellations: number[] = [];

	for (const [id, point] of stars) {
		if (seen.has(id)) continue;
		const constellationSize = analyseConstellation(BFS({ id, point }));
		brillantConstellations.push(constellationSize);
	}

	return brillantConstellations
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((acc, cur) => acc * cur, 1);
}
