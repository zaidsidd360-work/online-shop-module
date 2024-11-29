import { Headset } from "lucide-react";
import ConfettiIcon from "../assets/confetti.png";
import { useContext, useEffect } from "react";
import {
	FormState,
	formStateContext,
} from "../contexts/FormStateContextProvider";

const FinalEstimate = () => {
	const { formState } = useContext(formStateContext);

	const {
		selectedPool,
		// bioShield,
		// intelliChem,
		// selectedTile,
		// installTimeline,
		// builtInSpa,
		// fiberglassKnowledge,
		// sitePlan,
		// financing,
		// comment,
		customerInfo,
		phoneCode,
	} = formState as FormState;

	useEffect(() => {
		const makeApiCall = async () => {
			const options = {
				method: "POST",
				headers: {
					Authorization:
						"Bearer 120d7b8c-a153-4d2f-99a1-6fde5ce680bf",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					assistantId: "4bc93003-f47b-40cb-8682-8ae1c6c68952",
					phoneNumberId: "a185ba6c-aca5-4eae-9320-caf6966d52df",
					assistantOverrides: {
						variableValues: {
							name: customerInfo?.name,
							selectedPool: selectedPool?.name,
						},
					},
					customer: {
						number: `${phoneCode! + customerInfo?.phone}`,
						extension: "",
					},
				}),
			};

			try {
				const response = await fetch(
					"https://api.vapi.ai/call",
					options
				);
				const data = await response.json();
				console.log(data);
			} catch (err) {
				console.error(err);
			}
		};

		makeApiCall();
	}, []);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
			<div className="w-32 h-32 mb-4 bg-gray-300 rounded-full flex items-center justify-center">
				<img
					src={ConfettiIcon}
					alt="Confetti Icon"
					className="w-2/3 h-2/3"
				/>
			</div>

			{/* Heading */}
			<h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800">
				Your Estimated Price Would Be
			</h2>

			{/* Subtext */}
			<p className="mt-2 w-full text-center text-gray-500 px-20">
				Lorem Ipsum Dolor Sit Amet Consectetur. Urna Ut Enim Consequat
				Non Orci Risus Laoreet. Diam Ut Tempus Sed Dictum Dui Proin
				Consequat Sit Netus.
			</p>

			{/* Price */}
			<div className="mt-6 text-center">
				<span className="text-4xl sm:text-6xl font-bold text-black">
					$2,999 - $3,499
				</span>
			</div>

			<div className="w-full h-px bg-gray-300 my-8"></div>

			{/* Footer text */}
			<div className="mt-10 bg-[#0000000A] p-4 rounded-full">
				<p className="flex items-center justify-center text-gray-600">
					{/* Replace with lock icon */}
					<Headset className="mr-2" /> You Will Get A Call Back From
					Us, Soon!
				</p>
			</div>
		</div>
	);
};

export default FinalEstimate;
