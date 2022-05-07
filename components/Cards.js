import { useContext } from "react";
import Card from "./Card";
import { AmazonContext } from "../context/AmazonContext";

const Cards = () => {
	const { assets } = useContext(AmazonContext);

	return (
		<div className="h-full w-full flex flex-col ml-[20px] -mt-[50px]">
			<div className="text-xl font-bolder mb-[20px] mt-[30px] ml-[30px]">
				New Release
			</div>
			<div className="flex items-center flex-wrap gap-[80px]">
				{assets.map((item) => (
					<Card key={item.id} item={item.attributes} />
				))}
			</div>
		</div>
	);
};

export default Cards;
