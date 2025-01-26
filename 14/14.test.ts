import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import solve from "./14.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe.skip("I", () => {
		it("Example", () => {
			expect(solve("example_I", currentQuest)).toBe(7);
		});

		it("Solution", () => {
			expect(solve("input_I", currentQuest)).toBe(144);
		});
	});

	describe("II", () => {
		it("Example", () => {
			expect(solve("example_II", currentQuest)).toBe(32);
		});

		it("Solution", () => {
			expect(solve("input_II", currentQuest)).toBe(5074);
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
