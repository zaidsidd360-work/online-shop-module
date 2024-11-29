import React, { useState, useEffect, useRef, ReactNode } from "react";

interface ToggleSwitchProps {
	yesText?: string;
	noText?: string | ReactNode;
	state: boolean;
	setState: (value: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
	yesText = "Yes",
	noText = "No",
	state,
	setState,
}) => {
	const [bgWidth, setBgWidth] = useState(0);
	const [bgLeft, setBgLeft] = useState(0);
	const yesRef = useRef<HTMLSpanElement>(null);
	const noRef = useRef<HTMLSpanElement>(null);

	const handleToggle = () => {
		setState(!state);
	};

	useEffect(() => {
		const selectedRef = state ? yesRef.current : noRef.current;
		if (selectedRef) {
			setBgWidth(selectedRef.offsetWidth);
			setBgLeft(selectedRef.offsetLeft); // Calculate the left position
		}
	}, [state]);

	return (
		<div className="inline-flex items-center">
			<div
				className="relative flex items-center justify-between border border-gray-300 rounded-full cursor-pointer w-max"
				style={{ padding: "2px" }} // change this and
			>
				<div
					className="absolute top-0 bottom-0 bg-black rounded-full transition-all duration-200 ease-in-out"
					style={{
						width: `${bgWidth}px`,
						left: `${bgLeft}px`,
						margin: "2px", // this at the same time always
					}}
				/>
				<div className="relative z-10 flex w-full">
					<span
						ref={yesRef}
						className={`flex-1 text-center text-nowrap px-2 py-[0.2rem] cursor-pointer transition-all duration-200 ease-in-out text-[14px] sm:multi-[text-[16px];px-4;py-[0.5rem]] ${
							state ? "text-white" : "text-black"
						}`}
						onClick={handleToggle}
					>
						{yesText}
					</span>
					<span
						ref={noRef}
						className={`flex-1 text-center text-nowrap px-2 py-[0.2rem] cursor-pointer transition-all duration-200 ease-in-out text-[14px] sm:multi-[text-[16px];px-4;py-[0.5rem]] ${
							!state ? "text-white" : "text-black"
						}`}
						onClick={handleToggle}
					>
						{noText}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ToggleSwitch;
