import { Info } from "lucide-react";

interface ProductCardProps<T> {
	product: T;
	isActive: boolean;
	setIsOpen?: (val: boolean) => void;
}

const ProductCard = <T,>({
	product,
	isActive,
	setIsOpen,
}: ProductCardProps<T>) => {
	const tProduct = product as {
		url: string;
		name: string;
	};
	return (
		<>
			<div className={`rounded-2xl bg-[#e4f1f7] w-max  relative`}>
				<img
					className={`rounded-2xl w-[9rem] h-[9rem] md:w-[15rem] md:h-[15rem] ${
						isActive
							? "shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]"
							: ""
					}`}
					loading="lazy"
					src={tProduct.url}
					alt={tProduct.name}
				/>
				{isActive && setIsOpen && (
					<div
						onClick={(e) => {
							console.log("Hello");
							setIsOpen!(true);
							e.stopPropagation();
						}}
						className="bg-black w-6 h-6 flex place-items-center justify-center rounded-full absolute bottom-1 right-1 cursor-help"
					>
						<Info color="white" size={14} />
					</div>
				)}
			</div>
			<p className="font-normal text-[1rem] text-center mt-2">
				{tProduct?.name}
			</p>
		</>
	);
};

export default ProductCard;
