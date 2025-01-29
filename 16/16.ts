// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string) {
	const data = Utils.readData(fileName, quest);
	const wheels = parseInput(data);

	if (fileName.endsWith("_II")) {
		return coinTotal(wheels, 202420242024);
	}

	if (fileName.endsWith("_I")) {
		return getSequence(wheels, 100);
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
function getSequence(wheels: Wheel[], n: number) {
	const result: string[] = [];

	for (const wheel of wheels) {
		const symbolIndex = (wheel.rotation * n) % wheel.symbols.length;
		result.push(wheel.symbols[symbolIndex]);
	}

	return result.join(" ");
}
function coinTotal(wheels: Wheel[], target: number) {
	const loop = Utils.arrLCM(wheels.map((wheel) => wheel.symbols.length));
	const spins: Map<number, number> = new Map();

	let coins = 0;

	for (let i = 1; i <= loop; i++) {
		const result = getSequence(wheels, i);
		coins += coinCount(result);
		spins.set(i, coins);
	}

	return coins * Math.floor(target / loop) + spins.get(target % loop)!;
}
function coinCount(result: string, count: number = 0) {
	const symbolCount: Map<string, number> = new Map();

	for (const symbol of result.split(" ")) {
		const [a, _, b] = [...symbol];
		symbolCount.set(a, (symbolCount.get(a) ?? 0) + 1);
		symbolCount.set(b, (symbolCount.get(b) ?? 0) + 1);
	}

	for (const [_, amount] of symbolCount) {
		if (amount >= 3) {
			count += 1 + Math.max(amount - 3, 0);
		}
	}

	return count;
}
