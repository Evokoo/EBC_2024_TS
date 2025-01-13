import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import { I, II, III } from "./07.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe("I", () => {
		it("Example", () => {
			expect(I("example_I", currentQuest)).toBe("BDCA");
		});

		it("Solution", () => {
			expect(I("input_I", currentQuest)).toBe("ICKAJHFBG");
		});
	});

	describe("II", () => {
		it("Example", () => {
			expect(II("example_II", currentQuest)).toBe("DCBA");
		});

		it("Solution", () => {
			expect(II("input_II", currentQuest)).toBe("IACKFGDBJ");
		});
	});

	describe("III", () => {
		it.skip("Example", () => {
			expect(III("example_III", currentQuest)).toBe(0);
		});

		it("Solution", () => {
			expect(III("input_III", currentQuest)).toBe(4275);
		});
	});
});
