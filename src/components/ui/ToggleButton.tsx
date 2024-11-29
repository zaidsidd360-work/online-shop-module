interface ToggleButtonProps {
	state: boolean;
	setter: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleButton = ({ state, setter }: ToggleButtonProps) => {
	return (
		<div
			onClick={() => setter(!state)}
			className="relative flex gap-8 border border-[#00000033] w-max px-5 py-2 rounded-full cursor-pointer"
		>
			<p
				className={`transition-all duration-200 ${
					state ? "text-white" : "text-black"
				}`}
			>
				Yes
			</p>
			<p
				className={`transition-all duration-200 ${
					!state ? "text-white" : "text-black"
				}`}
			>
				No
			</p>
			<span
				className={`absolute bg-black w-1/2 h-[90%] top-1/2 -translate-y-1/2 rounded-full transition-all duration-200 -z-10 ${
					!state
						? "left-1/2 translate-x-[-2px]"
						: "transform  left-[2px]"
				}`}
			/>
		</div>
	);
};

export default ToggleButton;
