import ProductCard from "./ProductCard";

interface ProductGridProps<T> {
	products: Array<T>;
	selectedProduct: T | undefined;
	setSelectedProduct: React.Dispatch<React.SetStateAction<T | undefined>>;
	setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductGrid = <T,>({
	products,
	selectedProduct,
	setSelectedProduct,
	setIsOpen,
}: ProductGridProps<T>) => {
	return (
		<div className="grid grid-cols-2 gap-y-1 gap-x-1 items-start h-full place-content-start overflow-y-auto scrollbar mt-5 pr-1 pb-8 sm:grid-cols-4 md:multi-[grid-cols-4]">
			{products.map((prod) => (
				<div
					key={(prod as { id: number }).id}
					onClick={() =>
						setSelectedProduct(
							selectedProduct === prod ? undefined : prod
						)
					}
					className={`flex flex-col items-center justify-center rounded-2xl sm:self-start transition-all duration-200 p-1 md:p-3 cursor-pointer hover:shadow-lg active:scale-90 w-max  ${
						selectedProduct === prod ? "shadow-lg" : ""
					}`}
				>
					<ProductCard
						product={prod}
						isActive={selectedProduct === prod}
						setIsOpen={setIsOpen}
					/>
				</div>
			))}
		</div>
	);
};

export default ProductGrid;
