import { useState, FC, ComponentType, MouseEvent } from "react";

interface ButtonProps {
	onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface ModalProps {
	Icon: ComponentType<ButtonProps>;
	modalTitle?: string;
	Body: ComponentType;
	Footer?: ComponentType;
}

const Modal: FC<ModalProps> = ({ Icon, modalTitle, Footer, Body }) => {
  const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Icon onClick={() => setShowModal(true)} />
			{showModal ? (
				<>
					<div
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded-none"
					>
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5">
									<h3 className="text-3xl font-semibold">
										{ modalTitle }
									</h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowModal(false)}
									>
										<span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
											×
										</span>
									</button>
								</div>
								{/*body*/}
								{ Body ? <Body /> : null }
								{/*footer*/}
								{ Footer ? <Footer /> : null }
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
}
export default Modal;