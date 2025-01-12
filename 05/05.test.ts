import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import solve from "./05.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe("I", () => {
		it("Example", () => {
			expect(solve("example_I", currentQuest)).toBe(2323);
		});

		it("Solution", () => {
			expect(solve("input_I", currentQuest)).toBe(2325);
		});
	});

	describe("II", () => {
		it("Example", () => {
			expect(solve("example_II", currentQuest)).toBe(50877075);
		});

		it("Solution", () => {
			expect(solve("input_II", currentQuest)).toBe(17089733162436);
		});
	});

	describe("III", () => {
		it("Example", () => {
			expect(solve("example_III", currentQuest)).toBe(6584);
		});

		it("Solution", () => {
			expect(solve("input_III", currentQuest)).toBe(2693100410001002);
		});
	});
});
