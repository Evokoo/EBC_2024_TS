import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import solve from "./04.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe("I", () => {
		it("Example", () => {
			expect(solve("example_I", currentQuest)).toBe(10);
		});

		it("Solution", () => {
			expect(solve("input_I", currentQuest)).toBe(82);
		});
	});

	describe("II", () => {
		it.skip("Example", () => {
			expect(solve("example_II", currentQuest)).toBe(0);
		});

		it("Solution", () => {
			expect(solve("input_II", currentQuest)).toBe(894899);
		});
	});

	describe("III", () => {
		it("Example", () => {
			expect(solve("example_III", currentQuest)).toBe(8);
		});

		it("Solution", () => {
			expect(solve("input_III", currentQuest)).toBe(122610071);
		});
	});
});
