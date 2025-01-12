// Imports
import Utils from "Utils";

//Solution
export default function solve(fileName: string, quest: string): string {
	const data = Utils.readData(fileName, quest);

	if (fileName.endsWith("_I")) return solveI(data);
	if (fileName.endsWith("_II")) return solveII(data);
	if (fileName.endsWith("_III")) return solveIII(data);

	throw Error("Invalid filename");
}

type NodeMap = Map<string, string[]>;
type Node = {
	id: string;
	parent: Node | null;
	children: Node[];
};

// Functions
function solveI(data: string) {
	const nodeMap = parseInput(data);
	const tree = buildTree("RR", nodeMap);
	const paths: Map<number, string[]> = new Map();

	for (const pathNodes of getTreePaths(tree)) {
		const path = pathNodes.join("");
		const length = path.length;
		paths.set(length, [...(paths.get(length) ?? []), path]);
	}

	for (const [_, pathArr] of paths) {
		if (pathArr.length === 1) {
			return pathArr[0];
		}
	}

	throw Error("Path not found");
}
function solveII(data: string) {
	const nodeMap = parseInput(data);
	const tree = buildTree("RR", nodeMap);
	const paths: Map<number, string[]> = new Map();

	for (const pathNodes of getTreePaths(tree)) {
		const fullPath = pathNodes.join("");
		const path = pathNodes.reduce((acc, cur) => acc + cur[0], "");
		const length = fullPath.length;

		paths.set(length, [...(paths.get(length) ?? []), path]);
	}

	for (const [_, pathArr] of paths) {
		if (pathArr.length === 1) {
			return pathArr[0];
		}
	}

	throw Error("Path not found");
}
function solveIII(data: string) {
	const nodeMap = parseInput(data);
	const tree = buildTree("RR", nodeMap);
	const paths: Map<number, string[]> = new Map();

	for (const pathNodes of getTreePaths(tree)) {
		const fullPath = pathNodes.join("");
		const path = pathNodes.reduce((acc, cur) => acc + cur[0], "");
		const length = fullPath.length;

		paths.set(length, [...(paths.get(length) ?? []), path]);
	}

	for (const [_, pathArr] of paths) {
		if (pathArr.length === 1) {
			return pathArr[0];
		}
	}

	throw Error("Path not found");
}

function parseInput(data: string): NodeMap {
	const nodeMap: NodeMap = new Map();

	for (const line of data.split("\n")) {
		const [id, ...children] = line.match(/[\w\@]+/g) || [""];
		nodeMap.set(id, children);
	}

	return nodeMap;
}
function newNode(id: string, parent: Node | null = null): Node {
	return { id, parent, children: [] };
}
function buildTree(rootID: string, nodeMap: NodeMap) {
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
function getTreePaths(tree: Node): string[][] {
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
