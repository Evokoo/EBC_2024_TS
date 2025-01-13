// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): string {
	const data = Utils.readData(fileName, quest);
	const race = parseInput(data);

	return getRaceResult(simulateRace(race, 10));
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

		const seen: Set<string> = new Set();
		const queue = [{ x: 1, y: 0, bearing: 90 }];
		const directions: Record<number, number[]> = {
			90: [1, 0],
			180: [0, 1],
			270: [-1, 0],
			0: [0, -1],
		};

		while (queue.length) {
			const { x, y, bearing } = queue.shift()!;
			const coord = `${x},${y}`;

			if (seen.has(coord)) {
				continue;
			} else {
				const [dx, dy] = directions[bearing];
				const [nx, ny] = [x + dx, y + dy];

				if (grid[ny] && grid[ny][nx]) {
					seen.add(coord);
					track.push(getOperatorValue(grid[y][x]));
					queue.push({ x: nx, y: ny, bearing });
				} else {
					queue.push({ x, y, bearing: (bearing + 90) % 360 });
				}
			}
		}

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
