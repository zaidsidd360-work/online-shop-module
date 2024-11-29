import { useContext } from "react";
import Step1 from "../form-steps/Step1";
import Step2 from "../form-steps/Step2";
import Step3 from "../form-steps/Step3";
import Step4 from "../form-steps/Step4";
import { formStateContext } from "../contexts/FormStateContextProvider";
import FinalEstimate from "../form-steps/FinalEstimate";

const CurrStepForm = () => {
	const { currStep } = useContext(formStateContext);

	switch (currStep) {
		case 1:
			return <Step1 />;
		case 2:
			return <Step2 />;
		case 3:
			return <Step3 />;
		case 4:
			return <Step4 />;
		case 999:
			return <FinalEstimate />;
	}
};

export default CurrStepForm;
