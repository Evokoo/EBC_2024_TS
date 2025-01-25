import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import solve from "./13.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe("I", () => {
		it("Example", () => {
			expect(solve("example_I", currentQuest)).toBe(28);
		});

		it("Solution", () => {
			expect(solve("input_I", currentQuest)).toBe(159);
		});
	});

	describe("II", () => {
		it.skip("Example", () => {
			expect(solve("example_II", currentQuest)).toBe(0);
		});

		it("Solution", () => {
			expect(solve("input_II", currentQuest)).toBe(646);
		});
	});

	describe.skip("III", () => {
		it("Example", () => {
			expect(solve("example_III", currentQuest)).toBe(0);
		});

		it.skip("Solution", () => {
			expect(solve("input_III", currentQuest)).toBe(0);
		});
	});
});
