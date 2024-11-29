interface CategoryTagProps {
	category: string;
	isActive: boolean;
}

const CategoryTag = ({ category, isActive }: CategoryTagProps) => {
	return (
		<p
			className={`text-[0.75rem] font-[400] py-1 px-2 rounded-full border border-[#00000066] md:multi-[py-1;px-4;text-[1rem]] text-nowrap cursor-pointer transition-all duration-300 ${
				isActive ? "bg-black border-black text-white" : ""
			}`}
		>
			{category}
		</p>
	);
};

export default CategoryTag;

// border: 1px solid #00000066
