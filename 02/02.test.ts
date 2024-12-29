import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import solve from "./02.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe("I", () => {
		it("Example", () => {
			expect(solve("example_I", currentQuest, "I")).toBe(4);
		});

		it("Solution", () => {
			expect(solve("input_I", currentQuest, "I")).toBe(27);
		});
	});

	describe("II", () => {
		it("Example", () => {
			expect(solve("example_II", currentQuest, "II")).toBe(42);
		});

		it("Solution", () => {
			expect(solve("input_II", currentQuest, "II")).toBe(5076);
		});
	});

	describe("III", () => {
		it("Example", () => {
			expect(solve("example_III", currentQuest, "III")).toBe(10);
		});

		it("Solution", () => {
			expect(solve("input_III", currentQuest, "III")).toBe(11574);
		});
	});
});
