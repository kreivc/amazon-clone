import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { AmazonContext } from "../context/AmazonContext";

import Transaction from "../components/Transaction";

const History = () => {
	const { ownedItems } = useContext(AmazonContext);

	return (
		<div className="h-full w-full flex bg-[#fff]">
			<Sidebar />

			<div className="w-full h-full flex flex-col mt-[50px]">
				<Header />
				<div className="w-full h-full flex flex-col p-[100px] justify-center">
					{ownedItems ? (
						<div className="text-2xl font-bold text-left mt-[50px] mb-[30px]">
							Purchase History
						</div>
					) : (
						<div className="text-2xl font-bold text-left mt-[50px] mb-[30px]">
							No Purchase History
						</div>
					)}
					<div className="flex gap-[50px] flex-row flex-wrap">
						{ownedItems &&
							ownedItems.map((item, index) => (
								<Transaction key={index} item={item} index={index} />
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default History;
