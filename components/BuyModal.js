/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { AmazonContext } from "../context/AmazonContext";
import { HashLoader } from "react-spinners";
import Link from "next/link";

const BuyModal = ({ close, buyTokens }) => {
	const {
		amountDue,
		setAmountDue,
		tokenAmount,
		setTokenAmount,
		isLoading,
		setIsLoading,
		etherscanLink,
		setEtherscanLink,
	} = useContext(AmazonContext);

	const calculatePrice = () => {
		const price = parseFloat(tokenAmount * 0.0001);
		price = price.toFixed(4);
		setAmountDue(price);
	};

	useEffect(() => {
		calculatePrice();
	}, [tokenAmount]);

	return (
		<div className="h-full w-full flex flex-col">
			{isLoading ? (
				<>
					<div className="w-full h-[500px] flex items-center justify-center">
						<HashLoader size={80} />
					</div>
				</>
			) : (
				<>
					<div className="w-full h-[50px] flex items-center justify-end mb-[20px]">
						<IoIosClose
							onClick={() => {
								close();
								setAmountDue("");
								setTokenAmount("");
								setEtherscanLink("");
							}}
							fontSize={50}
							className="cursor-pointer"
						/>
					</div>
					<div className="text-3xl font-bold flex flex-1 items-center mt-[20px] justify-center mb-[40px]">
						Buy More Amazon Coins Here!
					</div>
					<div className="flex w-full mb-[30px] text-xl justify-center">
						Select how many tokens you would like to buy.
					</div>
					<div className="w-[50%] h-[50px] bg-[#f7f6f2] rounded-lg p-[10px] flex mx-auto">
						<input
							type="text"
							placeholder="Amount..."
							className="w-full h-full flex items-center justify-center bg-[#f7f6f2] focus:outline-none"
							onChange={(e) => setTokenAmount(e.target.value)}
							value={tokenAmount}
						/>
					</div>
					<div className="w-full h-full flex justify-center items-center mt-[20px] font-bold text-3xl">
						Total Due:{" "}
						{tokenAmount && tokenAmount > 0 ? amountDue + "ETH" : "0 ETH"}
					</div>
					<button
						className="w-[20%] h-[50px] bg-[#000] mt-[40px] rounded-lg p-[10px] flex mx-auto text-white justify-center items-center cursor-pointer"
						disabled={!tokenAmount || tokenAmount < 0}
						onClick={() => {
							setIsLoading(true);
							buyTokens();
						}}
					>
						Buy
					</button>
					{etherscanLink && (
						<>
							<div className="w-full h-full flex items-center justify-center text-xl mt-[20px] font-bolder">
								Transaction Sucessful! Check out your receipt for your
								transaction below!
							</div>
							<Link
								href={`${etherscanLink}`}
								className="w-full h-full flex items-center justify-center text-green-500 text-2xl mt-[20px] font-bold cursor-pointer"
							>
								<a
									className="w-full h-full flex items-center justify-center text-green-500 text-2xl mt-[20px] font-bold cursor-pointer"
									target="_blank"
								>
									Transaction Receipt
								</a>
							</Link>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default BuyModal;
