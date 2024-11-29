import { useContext, useState } from "react";
import FormControls from "../components/FormControls";
import Heading from "../components/Heading";
import { packages } from "../helpers/helper";
import { formStateContext } from "../contexts/FormStateContextProvider";
import { Check } from "lucide-react";
import ToggleSwitch from "../components/ui/ToggleSwitch";
import { toast } from "react-toastify";

const stepTwoHeading = {
	title: "Choose Your Equipment Package",
	description:
		'Please select the pool model or shape of pool that you would like to have. There are 8 Categories to choose from to narrow down the search and direct you to your perfect pool. Once you have decided on a model please press the "Quote This Pool" button to move onto the next step.',
};

const Step2 = () => {
	const { formState, setFormState } = useContext(formStateContext);
	const [selectedPackage, setSelectedPackage] = useState(formState?.package);
	const [bioShield, setBioShield] = useState(formState?.bioShield || false);
	const [intelliChem, setIntelliChem] = useState(
		formState?.intelliChem || false
	);

	const handleSubmit = () => {
		if (!selectedPackage) {
			toast.error("Please select a package to continue");
			return false;
		}
		setFormState((prev) => {
			return {
				...prev,
				package: selectedPackage,
				bioShield: bioShield,
				intelliChem: intelliChem,
			};
		});
		return true;
	};

	const handlePrev = () => {
		setFormState((prev) => {
			return {
				...prev,
				package: selectedPackage,
				bioShield: bioShield,
				intelliChem: intelliChem,
			};
		});
	};

	return (
		<>
			<div className="w-full h-screen flex flex-col p-2 md:p-8">
				{/* Heading */}
				<div className="flex-shrink-0">
					<Heading
						title={stepTwoHeading.title}
						description={stepTwoHeading.description}
					/>
				</div>
				{/* Main Content */}
				<div className="flex-grow overflow-y-auto pb-16 scrollbar pr-1">
					{/* Packages */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{packages.map((pack) => (
							<div
								key={pack.name}
								style={{ background: pack["bg-gradient"] }}
								className={`w-full aspect-square rounded-2xl px-7 py-5`}
								onClick={() =>
									setSelectedPackage((prev) => {
										if (prev === pack.name.toLowerCase())
											return undefined;
										return pack.name.toLowerCase() as
											| "silver"
											| "gold"
											| undefined;
									})
								}
							>
								<div className="flex items-center justify-between">
									<h2 className="font-semibold text-2xl">
										{pack.name} Package
									</h2>
									<span
										className={`w-7 h-7 border border-black rounded-md cursor-pointer grid place-items-center ${
											selectedPackage ===
												pack.name.toLowerCase() &&
											"bg-black text-white"
										}`}
									>
										{selectedPackage ===
											pack.name.toLowerCase() && (
											<Check size={18} />
										)}
									</span>
								</div>
								<ul className="list-disc px-5 mt-5 space-y-2">
									{pack.benifits.map((benifit, index) => (
										<li key={index}>{benifit}</li>
									))}
								</ul>
							</div>
						))}
					</div>
					{/* Options */}
					<div className="flex flex-wrap gap-5 my-3 mt-7 items-center">
						<div className="text-center">
							<div className="w-[7.5rem] aspect-square bg-[#00000014] rounded-2xl"></div>
							<p className="text-sm md:text-base">UV Sanitizer</p>
						</div>
						<div className="flex-1">
							<p className="font-medium text-[1rem] md:text-[1.25rem] mb-2 md:mb-4">
								Would you like a Bio-shield UV Sanitizer for
								your pool?
							</p>
							<ToggleSwitch
								state={bioShield}
								setState={setBioShield}
								yesText="Yes"
								noText="No"
							/>
						</div>
					</div>
					<div className="flex flex-wrap gap-5 my-3 items-center">
						<div className="text-center">
							<div className="w-[7.5rem] aspect-square bg-[#00000014] rounded-2xl"></div>
							<p className="text-sm md:text-base">IntelliChem</p>
						</div>
						<div className="flex-1">
							<p className="font-medium text-[1rem] md:text-[1.25rem] mb-2 md:mb-4">
								Would you like a Intellichem/IntellipH for your
								pool?
							</p>
							<ToggleSwitch
								state={intelliChem}
								setState={setIntelliChem}
								yesText="Yes"
								noText="No"
							/>
						</div>
					</div>
				</div>
			</div>
			<FormControls handleNext={handleSubmit} handlePrev={handlePrev} />
		</>
	);
};

export default Step2;
