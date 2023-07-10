import { FC } from "react";
import Group from "@/components/group";

interface ResultProps {
	groups: string[][];
}

const Result: FC<ResultProps> = ({ groups }) => {
	return (
		<div className="flex flex-row justify-center flex-wrap space-x-2 space-y-2">
			{groups ? groups.map(participants => <Group participants={participants}/>) : null}
		</div>
	)
}

export default Result;