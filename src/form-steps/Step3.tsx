import { useContext, useEffect, useState } from "react";
import FormControls from "../components/FormControls";
import Heading from "../components/Heading";
import ToggleSwitch from "../components/ui/ToggleSwitch";
import { Tile, tiles } from "../helpers/helper";
import ProductGrid from "../components/ui/ProductGrid";
import { ArrowRight } from "lucide-react";
import { formStateContext } from "../contexts/FormStateContextProvider";

const stepThreeHeading = {
	title: "Choose Your tiles",
	description:
		"In this step you can choose to add waterline tile or have none. Waterline tile will add an attractive elegance to the finished look of the pool having no tile is perfectly fine also.",
};

const Step3 = () => {
	const { setCurrStep, setFormState, formState } =
		useContext(formStateContext);

	const [tilesReqd, setTilesReqd] = useState(true);
	const [selectedTile, setSelectedTile] = useState<Tile | undefined>(
		formState?.selectedTile
	);

	useEffect(() => {
		let tout: NodeJS.Timeout;
		if (!tilesReqd) {
			tout = setTimeout(() => {
				setCurrStep((prev) => prev + 1);
			}, 200);
		}
		return () => {
			clearTimeout(tout);
		};
	}, [tilesReqd]);
	const handleSubmit = () => {
		setFormState((prev) => {
			return {
				...prev,
				selectedTile: selectedTile,
			};
		});
		return true;
	};

	const handlePrev = () => {
		setFormState((prev) => {
			return {
				...prev,
				selectedTile: selectedTile,
			};
		});
	};

	return (
		<>
			<div className="w-full h-screen flex flex-col p-2 md:p-8">
				{/* Heading */}
				<div className="flex-shrink-0">
					<Heading
						title={stepThreeHeading.title}
						description={stepThreeHeading.description}
					/>
				</div>
				<div>
					<ToggleSwitch
						state={tilesReqd}
						setState={setTilesReqd}
						yesText="Yes, I want tiles"
						noText={
							<span className="flex items-center gap-2">
								No, skip this question <ArrowRight />
							</span>
						}
					/>
				</div>
				<ProductGrid
					products={tiles}
					selectedProduct={selectedTile}
					setSelectedProduct={setSelectedTile}
				/>
			</div>
			<FormControls handleNext={handleSubmit} handlePrev={handlePrev} />
		</>
	);
};

export default Step3;
