import { FC } from "react";

interface ParticipantProps {
	name: string;
	onParticipantDelete?: (name: string) => void;
}

const Participant: FC<ParticipantProps> = ({ name, onParticipantDelete }) => {
	return (
		<div className="flex flex-row justify-between items-center w-100">
			<p>{name}</p>
			{
				onParticipantDelete
				? 
				<button 
					className="border w-5 h-5 rounded-full flex text-lg items-center justify-center"
					onClick={e => onParticipantDelete(name)}>
					-
				</button>
				: null
			}
		</div>
	)
}

export default Participant;