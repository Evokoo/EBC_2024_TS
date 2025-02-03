import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import solve from "./19.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe("I", () => {
		it("Example", () => {
			expect(solve("example_I", currentQuest)).toBe("WIN");
		});

		it("Solution", () => {
			expect(solve("input_I", currentQuest)).toBe("3451799363427263");
		});
	});

	describe("II", () => {
		it("Example", () => {
			expect(solve("example_II", currentQuest)).toBe("VICTORY");
		});

		it("Solution", () => {
			expect(solve("input_II", currentQuest)).toBe("4515136565211891");
		});
	});

	describe("III", () => {
		it.skip("Example", () => {
			expect(solve("example_III", currentQuest)).toBe(0);
		});

		it("Solution", () => {
			expect(solve("input_III", currentQuest)).toBe("8954727742465868");
		});
	});
});
