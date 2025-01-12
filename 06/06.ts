// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): string {
	const data = Utils.readData(fileName, quest);
	const tree = buildTree("RR", parseInput(data));
	return findPowerfulFruit(tree, fileName.endsWith("II"));
}

type Node = { id: string; parent: Node | null; children: Node[] };

// Functions
function parseInput(data: string): Map<string, string[]> {
	const nodeMap: NodeMap = new Map();

	for (const line of data.split("\n")) {
		const [id, ...children] = line.match(/[\w\@]+/g) || [""];
		nodeMap.set(id, children);
	}

	return nodeMap;
}
function findPowerfulFruit(tree: Node, condense: boolean = false) {
	const paths: Map<number, string[]> = new Map();

	for (const nodes of traverseTree(tree)) {
		let path = "";
		let length = 0;

		nodes.forEach((id) => {
			length += id.length;
			path += condense ? id[0] : id;
		});

		paths.set(length, [...(paths.get(length) ?? []), path]);
	}

	for (const [_, pathArray] of paths) {
		if (pathArray.length === 1) {
			return pathArray[0];
		}
	}

	throw Error("Path not found");
}
function buildTree(rootID: string, nodeMap: Map<string, string[]>) {
	function newNode(id: string, parent: Node | null = null): Node {
		return { id, parent, children: [] };
	}

	function DFS(parent: Node): Node {
		for (const childID of nodeMap.get(parent.id) ?? []) {
			if (childID === "BUG" || childID === "ANT") {
				continue;
			}

			const childNode = newNode(childID, parent);
			parent.children.push(childNode);
			DFS(childNode);
		}

		return parent;
	}

	return DFS(newNode(rootID));
}
function traverseTree(tree: Node): string[][] {
	const paths: string[][] = [];

	function DFS(parent: Node, path: string[] = []) {
		const currentPath = path ? [...path, parent.id] : [parent.id];

		if (parent.children.length) {
			for (const child of parent.children) {
				DFS(child, currentPath);
			}
		} else {
			paths.push(currentPath);
		}

		return paths;
	}

	return DFS(tree);
}
