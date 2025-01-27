import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import solve from "./15.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe.skip("I", () => {
		it("Example", () => {
			expect(solve("example_I", currentQuest)).toBe(26);
		});

		it("Solution", () => {
			expect(solve("input_I", currentQuest)).toBe(204);
		});
	});

	describe("II", () => {
		it("Example", () => {
			expect(solve("example_II", currentQuest)).toBe(38);
		});

		it("Solution", () => {
			expect(solve("input_II", currentQuest)).toBe(520);
		});
	});

	describe.skip("III", () => {
		it.skip("Example", () => {
			expect(solve("example_III", currentQuest)).toBe(0);
		});

		it("Solution", () => {
			expect(solve("input_III", currentQuest)).toBe(-1);
		});
	});
});
