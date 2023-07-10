import { FC } from "react";
import Participant from "./participant";

interface GroupProps {
	participants: string[];
}

const Group: FC<GroupProps> = ({ participants }) => {
	return (
		<div className="flex flex-col border border-black p-1 w-fit space-y-2 align-start">
			{participants.map(p => <Participant name={p} />)}
		</div>
	)
}
export default Group;