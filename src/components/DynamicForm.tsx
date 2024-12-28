import React, { useState } from "react";
import { FormSteps, Option } from "../helpet";

type Props = {
	steps: FormSteps;
	initialStep: string;
	stepHistory: string[];
	setStepHistory: (history: string[]) => void;
	formData: Record<string, string>;
	setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
	onOptionSelect?: (stepName: string, option: Option) => void;
};

const DynamicForm: React.FC<Props> = ({
	steps,
	initialStep,
	stepHistory,
	setStepHistory,
	formData,
	setFormData,
	onOptionSelect,
}) => {
	const [currentStep, setCurrentStep] = useState(initialStep);
	const [selectedOption, setSelectedOption] = useState<Option | undefined>(
		undefined
	);

	const step = steps[currentStep];

	const goToNextStep = (nextStep: string | null) => {
		if (nextStep) {
			setStepHistory([...stepHistory, currentStep]);
			setCurrentStep(nextStep);
			setSelectedOption(undefined);
		}
	};

	const goToPreviousStep = () => {
		if (stepHistory.length > 0) {
			const prevStep = stepHistory[stepHistory.length - 1];
			setStepHistory(stepHistory.slice(0, -1));
			setCurrentStep(prevStep);
		}
	};

	const handleOptionSelect = (option: Option) => {
		setFormData((prevData) => ({
			...prevData,
			[step.question]: option.title,
		}));
		setSelectedOption(option);

		// Call the parent handler if provided
		if (onOptionSelect) {
			onOptionSelect(currentStep, option);
		}
	};

	const handleNextClick = () => {
		console.log(formData);
		goToNextStep(selectedOption?.nextStep || step.nextStep || null);
	};

	const handleFieldChange = (fieldName: string, value: string) => {
		setFormData((prevData) => ({
			...prevData,
			[fieldName]: value,
		}));
	};

	const handleFieldSubmit = () => {
		goToNextStep(step.nextStep || null);
	};

	if (!step) {
		return <div className="text-white text-center">Invalid step</div>;
	}

	return (
		<div className="min-h-[93.5%] rounded-xl bg-gray-200 flex flex-col items-center justify-center">
			<div className="w-full max-w-[60%] p-6 space-y-6 border border-gray-300 bg-white rounded-lg shadow-lg">
				<h2 className="text-2xl font-semibold text-zinc-900">
					{step.question}
				</h2>

				{step.options && (
					<div>
						<div className="grid grid-cols-2 gap-4 max-h-[40vh] overflow-y-auto">
							{step.options.map((option, index) => (
								<button
									key={index}
									onClick={() => handleOptionSelect(option)}
									className={`group relative border rounded-lg p-4 bg-white text-left transition-all duration-200 active:scale-95
                                    ${
										selectedOption?.title === option.title
											? "border-zinc-900 border-2"
											: "border-gray-200 hover:border-zinc-900"
									} flex flex-col`}
								>
									{option.image && (
										<div className="mb-3 flex justify-center">
											<img
												src={option.image}
												alt={option.title}
												className="max-h-32 w-auto object-contain rounded-md"
											/>
										</div>
									)}
									<div>
										<h3 className="font-medium text-zinc-900">
											{option.title}
										</h3>
										<p className="text-sm text-zinc-500 mt-1">
											{option.subtext}
										</p>
									</div>
								</button>
							))}
						</div>
						<div className="flex justify-between mt-6">
							<button
								onClick={goToPreviousStep}
								disabled={stepHistory.length === 0}
								className="px-4 py-2 border rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Go Back
							</button>
							<button
								disabled={!selectedOption}
								onClick={handleNextClick}
								className="px-4 py-2 border rounded-lg bg-zinc-900 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Next
							</button>
						</div>
					</div>
				)}

				{step.fields && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleFieldSubmit();
						}}
					>
						<div className="space-y-4">
							{step.fields.map((field, index) => (
								<div key={index} className="space-y-1">
									<label className="block text-sm font-medium text-zinc-700">
										{field.fieldname}{" "}
										{field.required && (
											<span className="text-red-500">
												*
											</span>
										)}
									</label>
									{field.type === "select" ? (
										<select
											required={field.required}
											onChange={(e) =>
												handleFieldChange(
													field.fieldname,
													e.target.value
												)
											}
											className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-zinc-900 border-gray-300 focus:outline-none focus:border-zinc-900"
										>
											<option value="">
												Select {field.fieldname}
											</option>
											{field.options?.map(
												(option, idx) => (
													<option
														key={idx}
														value={option}
													>
														{option}
													</option>
												)
											)}
										</select>
									) : field.type === "textarea" ? (
										<textarea
											required={field.required}
											onChange={(e) =>
												handleFieldChange(
													field.fieldname,
													e.target.value
												)
											}
											className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-zinc-900 border-gray-300 focus:outline-none focus:border-zinc-900 resize-y"
											style={{
												minHeight: "100px",
												maxHeight: "300px",
											}}
											placeholder={`Enter ${field.fieldname}`}
										></textarea>
									) : (
										<input
											type={field.type}
											required={field.required}
											onChange={(e) =>
												handleFieldChange(
													field.fieldname,
													e.target.value
												)
											}
											className="w-full px-3 py-2 border rounded-lg bg-gray-50 text-zinc-900 placeholder-gray-400 border-gray-300 focus:outline-none focus:border-zinc-900"
											placeholder={`Enter ${field.fieldname}`}
										/>
									)}
								</div>
							))}
						</div>
						<div className="flex justify-between mt-6">
							<button
								onClick={goToPreviousStep}
								type="button"
								disabled={stepHistory.length === 0}
								className="px-4 py-2 border rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Go Back
							</button>
							<button
								type="submit"
								className="px-4 py-2 border rounded-lg bg-zinc-900 text-white hover:bg-zinc-700"
							>
								Next
							</button>
						</div>
					</form>
				)}

				{!step.options && !step.fields && step.nextStep && (
					<div className="flex justify-center mt-6">
						<button
							onClick={() => goToNextStep(step.nextStep || null)}
							className="px-4 py-2 border rounded-lg bg-zinc-900 text-white hover:bg-zinc-700"
						>
							Next
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default DynamicForm;
