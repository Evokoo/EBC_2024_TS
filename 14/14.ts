// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const tree = growTree(parseInput(data));

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
	}

	return { min, max, segments };
}
