'use client'

import Participant from "@/components/participant";
import { useState, MouseEventHandler, useEffect } from "react";
import Rule, { Rules } from "@/components/rule";
import { v4 as uuid } from "uuid";
import createGroups from "@/utils/createGroups";
import Result from "./result";

export default function Home() {
	const [ participants, setParticipants ] = useState<string[]>([]);
	const [ addParticipantCurr, setAddParticipantCurr ] = useState("");

	const onParticipantDelete = (name: string) => {
		setParticipants(participants.filter(v => v != name));
	}

	const [ numGroups, setNumGroups ] = useState(2);
	const [ groupLength, setGroupLength ] = useState(8);
	const [ rules, setRules ] = useState<Rules>({});

	const addGroup = () => {
		setRules(prevState => ({
			...prevState,
			[uuid()]: [],
		}))
	}

	const addParticipantToGroup = (key: string, participant: string) => {
		setRules(prevState => ({
			...prevState,
			[key]: [...rules[key], participant]
		}));
	}

	const removeParticipantFromGroup = (key: string, participant: string) => {
		setRules(prevState => ({
			...prevState,
			[key]: rules[key].filter(p => p != participant)
		}))
	}

	const removeGroup = (key: string) => {
		setRules(prevState => {
			const newState = { ...prevState };
      delete newState[key];
      return newState;
		})
	}

	const [ generatedGroups, setGeneratedGroups ] = useState<string[][]>([]);
	const onGenerate: MouseEventHandler<HTMLButtonElement> = (e) => {
		const groups = createGroups(rules, participants, numGroups, groupLength);
		setGeneratedGroups(groups);
	}

	useEffect(() => {
		const localParticipants = localStorage.getItem('participants');
		if (localParticipants != null) {
			const parsed = JSON.parse(localParticipants);
			setParticipants(parsed);
		}

		const localRules = localStorage.getItem('rules');
		if (localRules != null) {
			setRules(JSON.parse(localRules))
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('participants', JSON.stringify(participants));
	}, [participants]);
	useEffect(() => {
		localStorage.setItem('rules', JSON.stringify(rules));
	})

	return (
		<div className="rounded-none border-black border p-10 w-full space-y-3">
			{/* Number of groups and generate btn*/}
			<div className="flex flex-row w-full justify-between">
				<div className="flex flex-col">
					<label htmlFor="group-label" className="text-xs">Number of Groups</label>
					<input className="border border-black rounded-none p-1" id="group-label" onChange={e => setNumGroups(parseInt(e.target.value) ? parseInt(e.target.value) : 0)} value={numGroups} />
				</div>
				<div className="flex flex-col">
					<label htmlFor="group-label" className="text-xs">Group Length</label>
					<input className="border border-black rounded-none p-1" id="group-label" onChange={e => setGroupLength(parseInt(e.target.value) ? parseInt(e.target.value) : 0)} value={groupLength} />
				</div>
				<button className="px-7 hover:underline hover:font-bold bg-black text-white" onClick={onGenerate}>GENERATE</button>
			</div>
			
			
			{/* Participants Handler */}
			<div>
				{/* Participants Header */}
				<div className="flex flex-row justify-between items-start">
					{/* TODO: the text here is misaligned, want it to be centered vertically */}
					<div className="flex flex-col align-middle">
						<div className="flex flex-row align-middle">
							<p className="text-lg">Participants <span className="text-slate-500 text-base">{participants.length}</span></p>
						</div>
						<div className="flex flex-row w-full justify-between">
							{/* List of participants */}
							<div className="flex flex-col space-y-1 px-1">
								{participants.map(p => <Participant name={p} onParticipantDelete={onParticipantDelete} key={p} />)}
							</div> 
						</div>
					</div>
					{/* Add participants input */}
					<form className="flex flex-col" onSubmit={e => {
							e.preventDefault();
							if (addParticipantCurr == "") {
								return;
							}
							if (participants.includes(addParticipantCurr)) {
								setAddParticipantCurr("");
								return;
							}
							setParticipants([...participants, addParticipantCurr]);
							setAddParticipantCurr("");
						}}>
						<input className="border border-black rounded-none p-1" onChange={e => setAddParticipantCurr(e.target.value)} value={addParticipantCurr}/>
						<button className="p-1 rounded-none hover:underline hover:font-bold text-sm text-right" type="submit">ADD PARTICIPANT</button>
						<button className="p-1 rounded-none hover:underline hover:font-bold text-xs text-right" onClick={e => {
							setParticipants([]);
							}}>CLEAR ALL PARTICIPANTS</button>
					</form>
				</div>
			</div>
			

			{/* Add rule btn, and all the rules */}
			<div className="flex flex-col justify-between w-full flex-wrap">
				<div className="flex flex-row justify-between w-full">
					<p>RULES</p>
					<button className="p-1 hover:underline hover:font-bold text-sm text-right" onClick={e => addGroup()}>CREATE RULE</button>
				</div>
				<div className="flex flex-row justify-center flex-wrap space-x-2 space-y-2">
					{Object.entries(rules).map(([key, group]) => {
						return <Rule 
							key={key}
							groupKey={key}
							addParticipantToGroup={addParticipantToGroup}
							removeParticipantFromGroup={removeParticipantFromGroup}
							removeGroup={removeGroup}
							initialParticipants={group}
						/>
					})}	
				</div>
			</div>

			{ generatedGroups.length > 0 ? 
				<div>
					<p className="text-center">GENERATED GROUPS</p>
					<Result groups={generatedGroups} key={uuid()} />
				</div>
			 : null }
		</div>
	)
}