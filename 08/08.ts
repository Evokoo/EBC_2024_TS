// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);

	if (fileName.endsWith("_I")) {
		return I(Number(data));
	}

	if (fileName.endsWith("_II")) {
		const [acolytes, blocks] = fileName.startsWith("input")
			? [1111, 20240000]
			: [5, 50];
		return II(Number(data), acolytes, blocks);
	}

	return 0;
}

// Functions
function I(blocks: number): number {
	const layers: number[] = [];
	let available = blocks;

	while (available > 0) {
		// Add two blocks to each existing layer
		if (layers.length) {
			for (let i = 0; i < layers.length; i++) {
				layers[i] = layers[i] + 2;
				available -= 2;
			}
		}

		// Add new layer
		layers.push(1);
		available--;
	}

	return (layers.reduce((acc, cur) => acc + cur, 0) - blocks) * layers[0];
}
function II(priests: number, acolytes: number, blocks: number) {
	let [width, thickness, used] = [1, 1, 1];

	while (true) {
		width += 2;
		thickness = (thickness * priests) % acolytes;
		used += width * thickness;

		if (used > blocks) {
			break;
		}
	}

	return width * (used - blocks);
}
