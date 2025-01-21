import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import solve from "./11.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe("I", () => {
		it("Example", () => {
			expect(solve("example_I", currentQuest)).toBe(8);
		});

		it("Solution", () => {
			expect(solve("input_I", currentQuest)).toBe(48);
		});
	});

	describe("II", () => {
		it.skip("Example", () => {
			expect(solve("example_II", currentQuest)).toBe(0);
		});

		it("Solution", () => {
			expect(solve("input_II", currentQuest)).toBe(196466);
		});
	});

	describe("III", () => {
		it("Example", () => {
			expect(solve("example_III", currentQuest)).toBe(268815);
		});

		it("Solution", () => {
			expect(solve("input_III", currentQuest)).toBe(1043058809124);
		});
	});
});
