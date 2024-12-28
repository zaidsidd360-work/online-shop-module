import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import DynamicForm from "./DynamicForm";
import { dfySteps } from "../helpet";

interface EstimateModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const EstimateModal: React.FC<EstimateModalProps> = ({ isOpen, onClose }) => {
	const [stepHistory, setStepHistory] = useState<string[]>([]);
	const [formData, setFormData] = useState<Record<string, string>>({});
	const [priceEstimate, setPriceEstimate] = useState<number>(0);
	const [leadScore, setLeadScore] = useState<number>(0);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleOptionSelect = (_stepName: string, selectedOption: any) => {
		if (selectedOption) {
			// Update price
			setPriceEstimate((prev) => prev + (selectedOption.price || 0));

			// Update lead score
			setLeadScore((prev) => prev + (selectedOption.score || 0));
		}
	};

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
					className="absolute z-50 top-4 right-4 p-2 hover:bg-transparent hover:border-black border border-transparent bg-black rounded-full transition-all group"
				>
					<X className="w-6 h-6 text-white group-hover:text-black transition-colors" />
				</button>
				{/* Modal content */}
				<div className="p-6 h-full relative">
					<h2 className="text-2xl font-semibold mb-4">
						Get an Estimate
					</h2>

					{/* Display current estimates */}
					<div className="mb-4 flex gap-4 absolute top-20 left-8">
						<div className="p-3 bg-white rounded-lg">
							<p className="text-sm text-gray-600">
								Estimated Price
							</p>
							<p className="text-lg font-semibold">
								${priceEstimate}
							</p>
						</div>
						<div className="p-3 bg-white rounded-lg">
							<p className="text-sm text-gray-600">Lead Score</p>
							<p className="text-lg font-semibold">{leadScore}</p>
						</div>
					</div>

					<DynamicForm
						steps={dfySteps}
						initialStep="initialQualificationStep"
						stepHistory={stepHistory}
						setStepHistory={setStepHistory}
						formData={formData}
						setFormData={setFormData}
						onOptionSelect={handleOptionSelect}
					/>
				</div>
			</div>
		</div>
	);
};

export default EstimateModal;
