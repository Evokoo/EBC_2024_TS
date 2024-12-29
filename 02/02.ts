// Imports
import Utils from "Utils";

//Part 1
export default function solve(
	fileName: string,
	quest: string,
	part: string
): number {
	const data = Utils.readData(fileName, quest);

	if (part === "I" || part === "II") {
		return countRunes(parseInput(data), part);
	} else {
		return countScales(parseInput(data));
	}
}

interface RunicText {
	needles: string[];
	haystacks: string[];
}

// Functions
function parseInput(data: string): RunicText {
	const sections: string[] = data.split("\n\n");
	const needles: string[] = sections[0].split(":")[1].split(",");
	return { needles, haystacks: sections[1].split("\n") };
}
function countRunes({ needles, haystacks }: RunicText, part: string) {
	let runeCount: number = 0;

	for (const haystack of haystacks) {
		const highlighted: Set<number> = new Set();

		for (const needle of needles) {
			const needleSize = needle.length;

			for (let i = 0; i <= haystack.length - needleSize; i++) {
				let forward = "";
				let reverse = "";

				for (let j = i; j < i + needleSize; j++) {
					forward += haystack[j];
					reverse = haystack[j] + reverse;
				}

				if (part === "I" && forward === needle) {
					runeCount++;
				}

				if (part === "II" && (forward === needle || reverse === needle)) {
					for (let j = i; j < i + needleSize; j++) {
						highlighted.add(j);
					}
				}
			}
		}

		runeCount += highlighted.size;
	}

	return runeCount;
}
function countScales({ needles, haystacks }: RunicText) {
	const grid = haystacks.map((haystack) => [...haystack]);
	const [width, height] = [grid[0].length, grid.length];

	const highlighted: Set<string> = new Set();

	for (const needle of needles) {
		const needleSize = needle.length;

		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				// Horiztonal
				const xRange = [];
				let LTR = ""; //Left to right
				let RTL = ""; //Right to left

				for (let i = x; i < x + needleSize; i++) {
					LTR += grid[y][i % width];
					RTL = grid[y][i % width] + RTL;
					xRange.push(i % width);
				}

				if (needle === RTL || needle === LTR) {
					for (const xValue of xRange) {
						highlighted.add(`${y},${xValue}`);
					}
				}

				// Vertical
				const yRange = [];
				let TTB = ""; //Top to bottom
				let BTT = ""; //Bottom to top

				if (y <= height - needleSize) {
					for (let i = y; i < y + needleSize; i++) {
						TTB += grid[i][x];
						BTT = grid[i][x] + BTT;
						yRange.push(i);
					}

					if (needle === BTT || needle === TTB) {
						for (const yValue of yRange) {
							highlighted.add(`${yValue},${x}`);
						}
					}
				}
			}
		}
	}

	return highlighted.size;
}
