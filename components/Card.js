import { useContext } from "react";
import { FaCoins } from "react-icons/fa";
import { AmazonContext } from "../context/AmazonContext";
import Image from "next/image";

const Card = ({ item }) => {
	// const { buyAsset } = useContext(AmazonContext);
	return (
		<div className="flex flex-col">
			<div className="h-[250px] w-[190px] rounded-3xl flex cursor-pointer transition-all duration-300  hover:scale-105 hover:shadow-xl overflow-hidden shadow-xl border-4 border-[#fb9701]">
				<Image
					src={item.src}
					alt="card"
					className="object-cover object-center"
					width={190}
					height={250}
				/>
			</div>
			<div>
				<div className="text-xl font-bold flex text-center w-full flex-1 justify-center mt-[10px]">
					{item.name}
				</div>
				<div className="text-md font-bold flex justify-center">
					{item.price} AC <FaCoins className="ml-[10px]" />
				</div>
			</div>
		</div>
	);
};

export default Card;
