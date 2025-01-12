import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import solve from "./06.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe("I", () => {
		it("Example", () => {
			expect(solve("example_I", currentQuest)).toBe("RRB@");
		});

		it("Solution", () => {
			expect(solve("input_I", currentQuest)).toBe("RRWZFPGMZKBM@");
		});
	});

	describe("II", () => {
		it.skip("Example", () => {
			expect(solve("example_II", currentQuest)).toBe("");
		});

		it("Solution", () => {
			expect(solve("input_II", currentQuest)).toBe("RJVDGLRZJF@");
		});
	});

	describe("III", () => {
		it.skip("Example", () => {
			expect(solve("example_III", currentQuest)).toBe("");
		});

		it("Solution", () => {
			expect(solve("input_III", currentQuest)).toBe("RSHPKNPBKQCS@");
		});
	});
});
