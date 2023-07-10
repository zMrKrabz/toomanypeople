import { useState, FC, MouseEventHandler } from "react";
import Participant from "./participant";

export type Rules = { [key: string]: string[] };

interface RuleProps {
	groupKey: string;
	addParticipantToGroup: (key: string, participant: string) => void;
	removeParticipantFromGroup: (key: string, participant: string) => void;
	removeGroup: (key: string) => void;
	initialParticipants: string[];
}

const Rule: FC<RuleProps> = ({ groupKey: key, addParticipantToGroup, removeParticipantFromGroup, removeGroup, initialParticipants }) => {
	const [ participants, setParticipants ] = useState<string[]>(initialParticipants);
	const onParticipantDelete = (name: string) => {
		removeParticipantFromGroup(key, name);
		setParticipants(participants.filter(p => p != name));
	}

	const [ addParticipantCurr, setAddParticipantCurr ] = useState("");
	const onAddParticipant: MouseEventHandler<HTMLButtonElement> = (e) => {
		setParticipants([...participants, addParticipantCurr]);
		addParticipantToGroup(key, addParticipantCurr);
		setAddParticipantCurr("");
	}

	const onGroupDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
		removeGroup(key);
	}

	return (
		<div className="flex flex-col border border-black p-5 justify-center w-fit space-y-2 align-start">
			{/* Rule Header */}
			<div className="flex flex-row justify-between text-lg">
				<p>Together</p>
				<button className="text-right" onClick={onGroupDelete}>X</button>
			</div>

			<div className="space-y-1">
				{participants.map(p => <Participant name={p} onParticipantDelete={onParticipantDelete} key={p}/>)}
			</div>

			{/* Add participants input */}
			<div className="flex flex-col justify-center">
				<input className="border border-black p-1" onChange={e => setAddParticipantCurr(e.target.value)} value={addParticipantCurr}/>
				<button className="p-1 hover:underline hover:font-bold text-sm text-right" onClick={onAddParticipant}>ADD</button>
			</div>
		</div>
	)
}
export default Rule;