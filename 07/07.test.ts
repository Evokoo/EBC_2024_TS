import * as path from "@std/path";
import { expect } from "@std/expect";
import { describe, it } from "@std/testing/bdd";
import solve from "./07.ts";

const currentQuest = path.basename(Deno.cwd());

describe(`EBC 2014 - Quest ${currentQuest}`, () => {
	describe.skip("I", () => {
		it("Example", () => {
			expect(solve("example_I", currentQuest)).toBe("BDCA");
		});

		it("Solution", () => {
			expect(solve("input_I", currentQuest)).toBe("ICKAJHFBG");
		});
	});

	describe("II", () => {
		it("Example", () => {
			expect(solve("example_II", currentQuest)).toBe("DCBA");
		});

		it("Solution", () => {
			expect(solve("input_II", currentQuest)).toBe("IACKFGDBJ");
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
