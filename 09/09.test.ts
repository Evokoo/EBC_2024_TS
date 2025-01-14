import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import solve from "./09.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe("I", () => {
		it("Example", () => {
			expect(solve("example_I", currentQuest)).toBe(10);
		});

		it("Solution", () => {
			expect(solve("input_I", currentQuest)).toBe(13603);
		});
	});

	describe("II", () => {
		it("Example", () => {
			expect(solve("example_II", currentQuest)).toBe(10);
		});

		it("Solution", () => {
			expect(solve("input_II", currentQuest)).toBe(4987);
		});
	});

	describe("III", () => {
		it("Example", () => {
			expect(solve("example_III", currentQuest)).toBe(0);
		});

		it("Solution", () => {
			expect(solve("input_III", currentQuest)).toBe(0);
		});
	});
});
