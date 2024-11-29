import { useContext, useState } from "react";
import FormControls from "../components/FormControls";
import Heading from "../components/Heading";
import PillInput from "../components/ui/PillInput";
import { finalFormStateArr } from "../helpers/helper";
import CustomSelect from "../components/ui/CustomSelect";
import ToggleSwitch from "../components/ui/ToggleSwitch";
import { formStateContext } from "../contexts/FormStateContextProvider";
import { toast } from "react-toastify";
import CountryCodeSelector from "../components/ui/CountryCodeSelector";

const stepFourHeading = {
	title: "Customer Info",
	description:
		"In this step of the instant quote estimator you must fill out all of the required fields to move onto the next step. If you had any questions about the online estimator, confused or just have a general comment about the items in this program please feel free to write it in our comment section, we encourage feedback. (Note: All items need to be filled out in order to receive your Instant Quote.",
};

const Step4 = () => {
	const { setFormState, formState } = useContext(formStateContext);

	const [customerInfo, setCustomerInfo] = useState(
		formState?.customerInfo || {
			name: "",
			email: "",
			phone: "",
			address: "",
			city: "",
			state: "",
			zip: "",
		}
	);

	const [installTimeline, setInstallTimeline] = useState(
		formState?.installTimeline || ""
	);
	const [builtInSpa, setBuiltInSpa] = useState(
		formState?.builtInSpa || false
	);
	const [fiberglassKnowledge, setFiberglassKnowledge] = useState<
		"yes" | "no"
	>(formState?.fiberglassKnowledge || "no");
	const [sitePlan, setSitePlan] = useState(formState?.sitePlan || false);
	const [financing, setFinancing] = useState<"yes" | "no">(
		formState?.financing || "no"
	);
	const [comment, setComment] = useState(formState?.comment || "");
	const [phoneCode, setPhoneCode] = useState(formState?.phoneCode);

	const [isNextLoading, setIsNextLoading] = useState(false);

	const installTimelineOptions = [
		{
			value: "immediate",
			label: "Right Now",
		},
		{
			value: "oneMonth",
			label: "In A Month",
		},
		{
			value: "threeMonths",
			label: "In Three Months",
		},
		{
			value: "sixMonths",
			label: "In Six Months",
		},
	];

	// const saveCustomerSubmission = async (): Promise<Response> => {
	// 	const res = await fetch("http://localhost:5000/save", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ customerDetails: formState }),
	// 	});
	// 	return res;
	// };

	const mockAsyncFn = () => {
		return new Promise((resolve, _) => {
			setTimeout(() => {
				// reject(new Error("An error occurred. Please try again."));
				resolve("Operation completed successfully");
			}, 3000);
		});
	};

	const handlePrev = () => {
		setFormState((prev) => {
			return {
				...prev,
				customerInfo,
				installTimeline,
				builtInSpa,
				fiberglassKnowledge,
				sitePlan,
				financing,
				comment,
				phoneCode,
			};
		});
	};

	const handleNext = async () => {
		// Check form validity
		const form = document.getElementById("step4-form") as HTMLFormElement;
		if (!form.checkValidity()) {
			// If the form is invalid, trigger the browser's default validation UI
			form.reportValidity();
			return false;
		}

		setIsNextLoading(true);
		setFormState((prev) => ({
			...prev,
			customerInfo,
			installTimeline,
			builtInSpa,
			fiberglassKnowledge,
			sitePlan,
			financing,
			comment,
			phoneCode,
		}));

		try {
			await mockAsyncFn();
			setIsNextLoading(false);
			toast.success("Estimate generated successfully!");
			return true;
		} catch (error) {
			setIsNextLoading(false);
			toast.error("An error occurred. Please try again.");
			console.error("Error in handleNext:", error);
			return false;
		}
	};

	return (
		<>
			<div className="w-full h-screen flex flex-col p-2 md:p-8">
				{/* Heading */}
				<div className="flex-shrink-0">
					<Heading
						title={stepFourHeading.title}
						description={stepFourHeading.description}
					/>
				</div>

				{/* Main Content */}
				<form
					id="step4-form"
					className="flex-grow overflow-y-auto scrollbar pb-16 pr-1"
					onSubmit={(e) => e.preventDefault()}
					noValidate
				>
					<div>
						<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 my-2">
							{finalFormStateArr.map((obj) => {
								const isPhoneField = obj.fieldName === "phone";

								return (
									<div
										className="relative"
										key={obj.fieldName}
									>
										{isPhoneField && (
											<div className=" w-1/3 absolute  z-10">
												<CountryCodeSelector
													onCodeSelect={(
														code: string
													) => setPhoneCode(code)}
													defaultCode={{
														name: "United States",
														code: "+1",
														flag: "🇺🇸",
													}}
												/>
											</div>
										)}
										<div className={``}>
											<PillInput
												type={obj.type}
												placeHolder={obj.placeHolder}
												fieldName={obj.fieldName}
												formValues={customerInfo}
												setFormValues={setCustomerInfo}
												pattern={obj.pattern}
												required={true}
											/>
										</div>
									</div>
								);
							})}
						</div>
						<div className="w-full h-[1px] bg-gray-300 my-5"></div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
							<div>
								<p className="font-medium text-xl mb-3">
									How soon are you looking to install your San
									Juan Fiberglass pools?
								</p>
								<CustomSelect
									options={installTimelineOptions}
									placeholder="Select"
									selectedOption={installTimeline}
									setSelectedOption={setInstallTimeline}
								/>
							</div>
							<div>
								<p className="font-medium text-xl mb-3">
									Are you interested in adding a built-in spa?
								</p>
								<ToggleSwitch
									state={builtInSpa}
									setState={setBuiltInSpa}
								/>
							</div>
							<div>
								<p className="font-medium text-xl mb-3">
									Do you know why fiberglass pools are the
									best?
								</p>
								<CustomSelect
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "No", value: "no" },
									]}
									placeholder="Select"
									selectedOption={fiberglassKnowledge}
									setSelectedOption={
										setFiberglassKnowledge as React.Dispatch<
											React.SetStateAction<string>
										>
									}
								/>
							</div>
							<div>
								<p className="font-medium text-xl mb-3">
									Have you located a copy of your property
									site plan with your house located on it?
								</p>
								<ToggleSwitch
									state={sitePlan}
									setState={setSitePlan}
								/>
							</div>
							<div>
								<p className="font-medium text-xl mb-3">
									Have you arranged for financing your new
									pool?
								</p>
								<CustomSelect
									options={[
										{ label: "Yes", value: "yes" },
										{ label: "No", value: "no" },
									]}
									placeholder="Select"
									selectedOption={financing}
									setSelectedOption={
										setFinancing as React.Dispatch<
											React.SetStateAction<string>
										>
									}
								/>
							</div>
							<div>
								<p className="font-medium text-xl mb-3">
									Your Comment
								</p>
								<textarea
									onChange={(e) => setComment(e.target.value)}
									className="min-w-full outline-none border border-gray-300 rounded-xl min-h-20 max-h-32 p-1 overflow-y-auto"
								></textarea>
							</div>
						</div>
					</div>
				</form>
			</div>
			<FormControls
				handleNext={handleNext}
				handlePrev={handlePrev}
				isNextLoading={isNextLoading}
			/>
		</>
	);
};

export default Step4;
