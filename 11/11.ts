// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const genMap = parseInput(data);

	if (fileName.endsWith("_III")) {
		let min = Infinity;
		let max = -Infinity;

		for (const [type, _] of genMap) {
			const population = calculatePopulation(genMap, 20, [type, 1]);
			min = Math.min(population, min);
			max = Math.max(population, max);
		}

		return max - min;
	} else if (fileName.endsWith("_II")) {
		return calculatePopulation(genMap, 10, ["Z", 1]);
	} else if (fileName.endsWith("_I")) {
		return calculatePopulation(genMap, 4, ["A", 1]);
	} else {
		throw Error("Invalid input file");
	}
}

type GenerationMap = Map<string, string[]>;

// Functions
function parseInput(data: string) {
	const generationMap: GenerationMap = new Map();

	for (const line of data.split("\n")) {
		const [key, nextGen] = line.split(":");
		generationMap.set(key, nextGen.split(","));
	}

	return generationMap;
}
function calculatePopulation(
	genMap: GenerationMap,
	days: number,
	initialPopulation: [string, number]
) {
	let current: Map<string, number> = new Map([initialPopulation]);

	for (let day = 0; day < days; day++) {
		const future: Map<string, number> = new Map();

		for (const [key, count] of current) {
			for (const nextGen of genMap.get(key)!) {
				future.set(nextGen, (future.get(nextGen) ?? 0) + count);
			}
		}

		current = future;
	}

	return [...current].reduce((acc, cur) => acc + cur[1], 0);
}
