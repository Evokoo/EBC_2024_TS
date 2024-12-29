// Imports
import Utils from "Utils";

//Part 2
export default function solve(
	fileName: string,
	quest: string,
	size: number
): number {
	const data = Utils.readData(fileName, quest);
	const battle = parseInput(data, size);
	return getPotionCount(battle);
}

// Functions
function parseInput(data: string, size: number): string[] {
	const battles: string[] = [];

	for (let i = 0; i < data.length; i += size) {
		battles.push(data.slice(i, i + size));
	}

	return battles;
}

function getPotionCount(sequence: string[]): number {
	return sequence.reduce((acc, cur) => {
		let monsterCount = 0;

		for (const monster of cur) {
			if (monster === "B") acc += 1;
			if (monster === "C") acc += 3;
			if (monster === "D") acc += 5;
			if (monster !== "x") monsterCount++;
		}

		if (monsterCount === 2) return acc + 2;
		if (monsterCount === 3) return acc + 6;

		return acc;
	}, 0);
}
