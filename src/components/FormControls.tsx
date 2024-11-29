import { useContext, useEffect, memo } from "react";
import { formStateContext } from "../contexts/FormStateContextProvider";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { FORM_MAX_STEPS } from "../helpers/helper";

interface FormControlProps {
	handleNext: () => boolean | Promise<boolean>;
	handlePrev?: () => void;
	isNextLoading?: boolean;
}

const FormControls = memo(
	({ handleNext, handlePrev, isNextLoading }: FormControlProps) => {
		const { currStep, setCurrStep } = useContext(formStateContext);

		useEffect(() => {
			const sliderMaxSteps = FORM_MAX_STEPS - 1;
			const thumbPosition = ((currStep - 1) / sliderMaxSteps) * 100;
			document.documentElement.style.setProperty(
				"--thumb-position",
				`${thumbPosition}%`
			);
		}, [currStep]);

		return (
			<div className="flex justify-between items-center absolute bottom-0 py-3 px-4 md:px-10 bg-white bg-opacity-30 backdrop-blur-md shadow-lg min-w-full">
				<button
					onClick={() => {
						handlePrev?.();
						setCurrStep((prev) => {
							if (prev === 1) return 1;
							return prev - 1;
						});
					}}
					disabled={currStep === 1}
					className={`text-black bg-white border border-[#0000001F] p-3 rounded-full font-bold md:multi-[flex;items-center;gap-3;px-5;py-2;font-light;rounded-sm] ${
						currStep === 1 ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					<ChevronLeft size={14} />
					<p className="hidden md:block">Previous</p>
				</button>
				{/* Progress */}
				<div className="min-w-[50%]">
					<input
						type="range"
						min="1"
						max="4"
						value={currStep}
						className="slider"
						readOnly
					/>
				</div>
				<button
					className="text-white bg-black p-3 rounded-full md:multi-[flex;items-center;gap-3;px-5;py-2;font-light;rounded-sm]"
					onClick={async () => {
						const isOkToContinue = await handleNext();
						if (!isOkToContinue) return;
						setCurrStep((prev) => {
							if (prev === 4) return 999;
							return prev + 1;
						});
					}}
				>
					<p className="hidden md:block">
						{currStep === 4 ? "Submit" : "Next"}
					</p>
					{isNextLoading ? (
						<Loader size={14} className="animate-spin" />
					) : (
						<ChevronRight size={14} />
					)}
				</button>
			</div>
		);
	}
);

export default FormControls;
