// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const tree = growTree(parseInput(data));

	if (fileName.endsWith("_III")) {
		return extractSap(tree.segments, tree.leaves);
	}

	if (fileName.endsWith("_II")) {
		return tree.segments.size;
	}

	if (fileName.endsWith("_I")) {
		return tree.max.y;
	}

	return -1;
}

type XYZ = { x: number; y: number; z: number; [key: string]: number };
type Direction = { axis: string; steps: number };
type State = { pos: XYZ; distance: number };

// Functions
function parseInput(data: string): Direction[][] {
	const directions: Direction[][] = [];

	for (const line of data.split("\n")) {
		const branch: Direction[] = [];

		for (const instruction of line.split(",")) {
			const [direction, steps] = [instruction[0], Number(instruction.slice(1))];

			switch (direction) {
				case "U":
					branch.push({ axis: "y", steps: steps });
					break;
				case "D":
					branch.push({ axis: "y", steps: -steps });
					break;
				case "R":
					branch.push({ axis: "x", steps: steps });
					break;
				case "L":
					branch.push({ axis: "x", steps: -steps });
					break;
				case "B":
					branch.push({ axis: "z", steps: steps });
					break;
				case "F":
					branch.push({ axis: "z", steps: -steps });
					break;
				default:
					throw Error("Invalid Direction");
			}
		}
		directions.push(branch);
	}

	return directions;
}
function growTree(branches: Direction[][]) {
	const min: XYZ = { x: Infinity, y: Infinity, z: Infinity };
	const max: XYZ = { x: -Infinity, y: -Infinity, z: -Infinity };
	const segments: Set<string> = new Set();
	const leaves: Set<string> = new Set();

	for (const branch of branches) {
		const location: XYZ = { x: 0, y: 0, z: 0 };

		for (const { axis, steps } of branch) {
			const stepValue = Math.sign(steps);

			for (let i = 0; i < Math.abs(steps); i++) {
				location[axis] += stepValue;
				segments.add(`${location.x},${location.y},${location.z}`);
			}

			min[axis] = Math.min(min[axis], location[axis]);
			max[axis] = Math.max(max[axis], location[axis]);
		}

		leaves.add(`${location.x},${location.y},${location.z}`);
	}

	return { min, max, segments, leaves };
}
function extractSap(segments: Set<string>, leaves: Set<string>): number {
	let bestRating = Infinity;
	const trunk: string[] = [];

	for (const segment of segments) {
		const [x, _, z] = segment.split(",").map(Number);
		if (x === 0 && z === 0) trunk.push(segment);
	}

	for (const piece of trunk) {
		let rating = 0;

		for (const leaf of leaves) {
			const [x, y, z] = leaf.split(",").map(Number);
			rating += getDistance({ x, y, z }, segments, piece);
		}

		bestRating = Math.min(rating, bestRating);
	}

	return bestRating;
}
function getDistance(start: XYZ, segments: Set<string>, end: string) {
	const queue: State[] = [{ pos: start, distance: 0 }];
	const seen: Set<string> = new Set();

	while (queue.length) {
		const current = queue.shift()!;
		const coord = `${current.pos.x},${current.pos.y},${current.pos.z}`;

		if (coord === end) {
			return current.distance;
		}

		if (!seen.has(coord)) {
			pushNewStates(current);
			seen.add(coord);
		}
	}

	function pushNewStates(current: State): void {
		for (const pos of getPaths(current.pos)) {
			queue.push({ pos, distance: current.distance + 1 });
		}
	}
	function getPaths({ x, y, z }: XYZ): XYZ[] {
		const paths: XYZ[] = [];
		const directions = [
			[0, 1, 0],
			[0, -1, 0],
			[1, 0, 0],
			[-1, 0, 0],
			[0, 0, 1],
			[0, 0, -1],
		];

		for (const [dx, dy, dz] of directions) {
			const [nx, ny, nz] = [dx + x, dy + y, dz + z];
			const coord = `${nx},${ny},${nz}`;

			if (segments.has(coord)) {
				paths.push({ x: nx, y: ny, z: nz });
			}
		}

		return paths;
	}

	throw Error("Distance not found");
}
