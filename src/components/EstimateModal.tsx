import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import DynamicForm from "./DynamicForm";
import { steps } from "../helpet";

interface EstimateModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const EstimateModal: React.FC<EstimateModalProps> = ({ isOpen, onClose }) => {
	const [stepHistory, setStepHistory] = useState<string[]>([]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		// Cleanup function to restore scroll when component unmounts
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
			<div className="bg-white w-[80%] h-[80%] rounded-2xl shadow-lg relative">
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 p-2 hover:bg-transparent hover:border-black border border-transparent bg-black rounded-full transition-all group"
				>
					<X className="w-6 h-6 text-white group-hover:text-black transition-colors" />
				</button>
				{/* Modal content */}
				<div className="p-6 h-full">
					<h2 className="text-2xl font-semibold mb-4">
						Get an Estimate
					</h2>
					{/* Add your modal content here */}
					<DynamicForm
						steps={steps}
						initialStep="start"
						stepHistory={stepHistory}
						setStepHistory={setStepHistory}
					/>
				</div>
			</div>
		</div>
	);
};

export default EstimateModal;
