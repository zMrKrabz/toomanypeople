import Modal from './modal';
import { MouseEvent, FC } from 'react';

interface ButtonProps {
	onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({ onClick }) => {
	return (
		<button
				className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded-none shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
				type="button"
				onClick={onClick}
			>
				Help
		</button>
	)
}

interface QuestionProps {
	title: string;
	body: string;
}

const Question: FC<QuestionProps> = ({ title, body }) => {
	return (
		<div className="flex flex-col">
			<p className="font-bold">{title}</p>
			<p className="text-sm">{body}</p>
		</div>
	)
}

const Body = () => {
	return (
		<div className="relative px-6 pb-8 flex-auto flex flex-col space-y-3">
			<Question title="What is toomanypeople?" body="toomanypeople is an application to split a number of people into groups" />
			<Question title="Adding a Participant" body='To add a participant, write their name on the field above "Add Participant" and press "Add Participant" ' />
			<Question title="GENERATE" body="This button creates the groups to split the participants into" />
			<Question title="RULES" body="Rules are the groups of people that are always to be together."/>
		</div>
	)
}

const InfoModal = () => {
	return (
		<>
			<Modal Icon={Button} Body={Body}/>
		</>
	)
}

export default InfoModal;