import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
	value: string;
	label: string;
}

interface CustomSelectProps {
	options: Option[];
	placeholder: string;
	selectedOption: string;
	setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
	options,
	placeholder,
	selectedOption,
	setSelectedOption,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	// Toggle dropdown visibility
	const toggleDropdown = () => setIsOpen(!isOpen);

	// Handle option selection
	const handleOptionSelect = (option: Option) => {
		setSelectedOption(option.value);
		setIsOpen(false);
	};

	// Handle outside click to close dropdown
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div
			className="relative w-full max-w-xs"
			ref={selectRef}
			aria-haspopup="listbox"
			aria-expanded={isOpen}
			aria-labelledby="custom-select"
		>
			<div
				className={`flex items-center justify-between w-full py-2 px-4 bg-white border border-gray-300 rounded-full cursor-pointer ${
					isOpen ? "border-gray-500" : "border-gray-300"
				}`}
				onClick={toggleDropdown}
				aria-label="select"
			>
				<span className="text-gray-700">
					{options.find((opt) => opt.value === selectedOption)
						?.label || placeholder}
				</span>
				<ChevronDown
					className={`w-4 h-4 transition-transform duration-200 ${
						isOpen ? "transform rotate-180" : ""
					}`}
				/>
			</div>

			{/* Dropdown menu */}
			{isOpen && (
				<ul
					className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
					role="listbox"
				>
					{options.map((option) => (
						<li
							key={option.value}
							className={`cursor-pointer py-2 px-4 text-gray-700 hover:bg-gray-50 ${
								selectedOption === option.value
									? "bg-gray-100 hover:bg-gray-100"
									: ""
							}`}
							onClick={() => handleOptionSelect(option)}
							role="option"
							aria-selected={selectedOption === option.value}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CustomSelect;
