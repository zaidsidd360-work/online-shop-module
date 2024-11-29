import { memo } from "react";

interface HeadingProps {
	title: string;
	description: string;
}

const Heading = memo(({ title, description }: HeadingProps) => {
	return (
		<div className="flex-shrink-0 mb-2 md:mb-5">
			<h1 className="font-semibold md:font-bold text-[2rem] mb-5">
				{title}
			</h1>
			<p className="hidden font-normal text-[1rem] text-[#00000099] md:block">
				{description}
			</p>
		</div>
	);
});

export default Heading;
