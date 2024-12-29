import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import solve from "./01.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe("I", () => {
		it("Example", () => {
			expect(solve("example_I", currentQuest, 1)).toBe(5);
		});

		it("Solution", () => {
			expect(solve("input_I", currentQuest, 1)).toBe(1306);
		});
	});

	describe("II", () => {
		it("Example", () => {
			expect(solve("example_II", currentQuest, 2)).toBe(28);
		});

		it("Solution", () => {
			expect(solve("input_II", currentQuest, 2)).toBe(5636);
		});
	});

	describe("III", () => {
		it("Example", () => {
			expect(solve("example_III", currentQuest, 3)).toBe(30);
		});

		it("Solution", () => {
			expect(solve("input_III", currentQuest, 3)).toBe(27983);
		});
	});
});
