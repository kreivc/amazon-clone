import { useContext } from "react";
import { AmazonContext } from "../context/AmazonContext";
import Cards from "./Cards";
import Featured from "./Featured";
import Header from "./Header";

const Main = () => {
	const { recentTransactions } = useContext(AmazonContext);
	return (
		<div className="h-full w-full flex flex-col mt-[50px] pr-[50px] overflow-hidden">
			<Header />
			<Featured />
			<Cards />
			{recentTransactions.length > 0 && (
				<h1 className="text-2xl font-bold mb-[20px] text-center mt-[40px]">
					Recent Transaction
				</h1>
			)}
			{recentTransactions &&
				recentTransactions.map((transaction, index) => {
					return (
						<div key={index} className="flex flex-col">
							<div className="flex justify-between mb-[20px] p-[30px] bg-[#42667e] text-white rounded-xl shadow-xl font-bold gap-[20px] text-xl">
								<p>From: {transaction.attributes.from_address}</p>
								<p>To: {transaction.attributes.to_address} </p>
								<p>
									Hash:{" "}
									<a
										target="_blank"
										rel="noopener noreferrer"
										href={`https://rinkeby.etherscan.io/tx/${transaction.attributes.hash}`}
									>
										{transaction.attributes.hash.slice(0, 10)}
									</a>
								</p>
								<p>Gas: {transaction.attributes.gas}</p>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default Main;
