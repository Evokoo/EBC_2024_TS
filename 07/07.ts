// Imports
import Utils from "Utils";

//Solution
export function I(fileName: string, quest: string): string {
	const data = Utils.readData(fileName, quest);
	const race = parseInput(data);

	return getRaceResult(simulateRace(race, 10));
}
export function II(fileName: string, quest: string): string {
	const data = Utils.readData(fileName, quest);
	const race = parseInput(data);

	return getRaceResult(simulateRace(race, 10));
}
export function III(fileName: string, quest: string): number {
	const data = Utils.readData(fileName, quest);
	const { racers, track } = parseInput(data);
	const rival = simulateRace({ racers, track }, 11).get("A")!.score;

	let wins = 0;

	for (const plan of generatePlanPermutations()) {
		racers.set("X", { actions: plan, essence: 10, score: 0 });
		if (simulateRace({ racers, track }, 11).get("X")!.score > rival) {
			wins++;
		}
	}

	return wins;
}

type Race = { racers: Map<string, Racer>; track: number[] };
type Racer = { actions: number[]; essence: number; score: number };

function parseInput(data: string): Race {
	const inputSections = data.split("\n\n");
	const racers: Map<string, Racer> = parseRacers(inputSections[0]);
	const track: number[] = inputSections[1] ? pasrseTrack(inputSections[1]) : [];

	return { racers, track };

	function parseRacers(racerData: string): Map<string, Racer> {
		const table: Map<string, Racer> = new Map();

		for (const row of racerData.split("\n")) {
			const sections = row.split(":");

			table.set(sections[0], {
				actions: sections[1].split(",").map(getOperatorValue),
				essence: 10,
				score: 0,
			});
		}

		return table;
	}
	function pasrseTrack(trackData: string): number[] {
		const grid: string[][] = trackData.split("\n").map((row) => [...row]);
		const track: number[] = [];

		const seen: Set<string> = new Set(["0,0"]);
		const queue = [{ x: 1, y: 0 }];
		const directions: number[][] = [
			[0, 1],
			[0, -1],
			[1, 0],
			[-1, 0],
		];

		while (queue.length) {
			const { x, y } = queue.shift()!;
			const coord = `${x},${y}`;

			if (seen.has(coord)) {
				continue;
			} else {
				track.push(getOperatorValue(grid[y][x]));
				seen.add(coord);
			}

			for (const [dx, dy] of directions) {
				const [nx, ny] = [x + dx, y + dy];

				if (grid[ny] && grid[ny][nx] && grid[ny][nx] !== " ") {
					queue.push({ x: nx, y: ny });
				}
			}
		}

		track.push(0);
		return track;
	}
	function getOperatorValue(operator: string): number {
		const lookup: Record<string, number> = { "+": 1, "-": -1, "=": 0, S: 0 };

		if (operator in lookup) {
			return lookup[operator];
		} else {
			throw Error("Invalid Operator");
		}
	}
}
function getRaceResult(racers: Map<string, Racer>): string {
	return [...racers]
		.sort((a, b) => b[1].score - a[1].score)
		.map((racer) => racer[0])
		.join("");
}
function simulateRace(
	{ racers, track }: Race,
	laps: number
): Map<string, Racer> {
	const distance = track.length ? laps * track.length : laps;

	for (let i = 0; i < distance; i++) {
		for (const [id, racer] of racers) {
			if (track.length && track[i % track.length] !== 0) {
				racer.essence += track[i % track.length];
			} else {
				const action = racer.actions[i % racer.actions.length];
				racer.essence += action;
			}

			racer.score += racer.essence;
			racers.set(id, racer);
		}
	}
	return racers;
}
function generatePlanPermutations(): number[][] {
	const permutations: number[][] = [];

	const generate = (
		a: number, // "+"
		b: number, // "-"
		c: number, // "="
		sequence: number[] = []
	) => {
		if (a === 0 && b === 0 && c === 0) {
			permutations.push(sequence);
		} else {
			if (a > 0) generate(a - 1, b, c, [...sequence, 1]);
			if (b > 0) generate(a, b - 1, c, [...sequence, -1]);
			if (c > 0) generate(a, b, c - 1, [...sequence, 0]);
		}
	};

	generate(5, 3, 3);

	return permutations;
}
