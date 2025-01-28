// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string) {
	const data = Utils.readData(fileName, quest);
	const wheels = parseInput(data);

	if (fileName.endsWith("_I")) {
		return predictSequence(wheels, 100);
	}

	return 0;
}

type Wheel = { rotation: number; symbols: string[] };

// Functions
function parseInput(data: string): Wheel[] {
	const sections = data.split("\n\n");
	const rotation = sections[0].split(",").map(Number);
	const wheels: string[][] = Array.from({ length: rotation.length }, () => []);

	for (const line of sections[1].split("\n")) {
		for (let i = 0; i < rotation.length; i++) {
			const symbol = line.slice(i * 4, i * 4 + 3).trim();
			if (symbol) wheels[i].push(symbol);
		}
	}

	return wheels.map((symbols, i) => ({
		rotation: rotation[i],
		symbols,
	}));
}
function predictSequence(wheels: Wheel[], nth: number) {
	const result: string[] = [];

	for (const wheel of wheels) {
		const symbolIndex = (wheel.rotation * nth) % wheel.symbols.length;
		result.push(wheel.symbols[symbolIndex]);
	}

	return result.join(" ");
}

// function spinWheels(wheels: Wheel[], spins: number) {
// 	const results: Map<string, Set<number>> = new Map();
// 	// let coins = 0;

// 	for (let spin = 0; spin <= spins; spin++) {
// 		const result: string[] = [];

// 		for (let i = 0; i < wheels.length; i++) {
// 			const wheel = wheels[i];
// 			result.push(wheel.symbols[wheel.index]);
// 			wheel.index = (wheel.index + wheel.rotation) % wheel.symbols.length;
// 			wheels[i] = wheel;
// 		}

// 		const resultString = result.join(" ");
// 		const resultIndexes = results.get(resultString) ?? new Set();
// 		resultIndexes.add(spin);

// 		results.set(resultString, resultIndexes);

// 		// coins += scoreResult(result);
// 	}

// 	for (const [result, seenAt] of results) {
// 		if (seenAt.has(spins)) return result;
// 	}
// }

// function scoreResult(result: string) {
// 	let score = 0;

// 	const charCount: Map<string, number> = new Map();

// 	for (const char of result) {
// 		charCount.set(char, (charCount.get(char) ?? 0) + 1);

// 		if (charCount.get(char)! >= 3) {
// 			score++;
// 		}
// 	}

// 	return score;
// }
