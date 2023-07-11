import { FC, ComponentType } from "react";
import Group from "@/components/group";
import Modal from "@/components/modal";

interface ResultProps {
	groups: string[][];
}

const Result: FC<ResultProps> = ({ groups }) => {
	const Body = () => {
		return (
			<div className="flex flex-row justify-center flex-wrap space-x-2 space-y-2">
				{groups ? groups.map(participants => <Group participants={participants}/>) : null}
			</div>
		)
	}

	return (
	)
}

export default Result;