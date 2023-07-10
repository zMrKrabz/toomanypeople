import { Rules } from "@/components/rule";

const createGroups = (rules: Rules, participants: string[], numGroups: number, groupLength: number): string[][] => {
	const items: string[][] = [];
	const rulesParticipants: { [participant: string]: boolean } = {};

	for (const key of Object.keys(rules)) {
		const rule = rules[key];
		for (const p of rule) {
			rulesParticipants[p] = true;
		}

		items.push(rule);
	}

	for (const p of participants) {
		if (p in rulesParticipants) continue;
		items.push([p]);
	}

	const groups: string[][] = [];
	for (let i = 0; i < numGroups; i++) {
		groups.push([]);
	}

	while (items.length > 0) {
		const randomItemIndex = Math.floor(items.length * Math.random());
		const item = items[randomItemIndex];
	
		const randomGroupIndex = Math.floor(groups.length * Math.random());
		const group = groups[randomGroupIndex];
		if (group.length + item.length > groupLength) {
			continue;
		}

		group.push(...item);
		items.splice(randomItemIndex, 1);
	}

	return groups;
}
export default createGroups;