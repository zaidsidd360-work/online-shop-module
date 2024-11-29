import { useContext, useMemo, useState } from "react";
import Heading from "../components/Heading";
import CategoryTag from "../components/ui/CategoryTag";
import { categories, Pool, pools } from "../helpers/helper";
import Modal from "../components/ui/Modal";
import FormControls from "../components/FormControls";
import { formStateContext } from "../contexts/FormStateContextProvider";
import ProductGrid from "../components/ui/ProductGrid";
import { toast } from "react-toastify";

const stepOneHeading = {
	title: "Pick Your Perfect Pool",
	description:
		'Please select the pool model or shape of pool that you would like to have. There are 8 Categories to choose from to narrow down the search and direct you to your perfect pool. Once you have decided on a model please press the "Quote This Pool" button to move onto the next step.',
};

const Step1 = () => {
	const { formState, setFormState } = useContext(formStateContext);
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedPool, setSelectedPool] = useState<Pool | undefined>(
		formState?.selectedPool
	);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const filteredPools = useMemo(() => {
		if (selectedCategory === "All") return pools;
		return pools.filter((pool) => pool.type === selectedCategory);
	}, [selectedCategory]);

	const handleSubmit = () => {
		if (!selectedPool) {
			toast.error("Please select a pool to continue");
			return false;
		}
		setFormState((prev) => {
			return {
				...prev,
				selectedPool,
			};
		});
		return true;
	};

	return (
		<>
			<div className="w-full h-screen flex flex-col p-2 md:p-8">
				{/* Modal  */}
				<Modal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					selectedPool={selectedPool!}
				/>

				{/* Heading */}
				<div className="flex-shrink-0">
					<Heading
						title={stepOneHeading.title}
						description={stepOneHeading.description}
					/>
				</div>

				{/* Main (Grid Container) */}
				<div className="flex-grow overflow-hidden">
					<div className="flex items-center overflow-x-auto no-scrollbar gap-1 md:gap-2">
						{categories.map((category) => (
							<div
								key={category}
								onClick={() => setSelectedCategory(category)}
							>
								<CategoryTag
									category={category}
									isActive={category === selectedCategory}
								/>
							</div>
						))}
					</div>
					<ProductGrid
						products={filteredPools}
						selectedProduct={selectedPool}
						setSelectedProduct={setSelectedPool}
						setIsOpen={setIsOpen}
					/>
				</div>
			</div>
			<FormControls handleNext={handleSubmit} />
		</>
	);
};

export default Step1;
