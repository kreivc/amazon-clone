import React, { useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { AmazonContext } from "../context/AmazonContext";
const Transaction = ({ item }) => {
	const { username } = useContext(AmazonContext);

	return (
		<>
			{item.map((asset, index) => {
				return (
					<div
						className="w-[40%] flex flex-col border-[#d6d7d9] border-2 rounded-lg shadow-lg"
						key={index}
					>
						<div className="flex w-full h-[80px] bg-[#f0f1f3] p-[20px] pr-[80px] gap-[80px]">
							<div className="flex w-full gap-[80px]">
								<div className="text lg text-left flex items-center">
									ORDER PLACED <br />
									{moment(asset.purchaseDate).format("MMMM Do YYYY")}
								</div>
								<div className="text lg text-left flex items-center">
									TOTAL <br />
									{asset.price} AC
								</div>
								<div className="text lg text-left flex items-center">
									SHIP TO <br />
									{username}
								</div>
							</div>
						</div>
						<div className="flex flex-col w-full h-[400px] gap-[20px] p-[20px] flex-1">
							<div className="text-xl font-bold">
								Bought on {moment(asset.purchaseDate).format("MMMM Do")}
							</div>
							<div className="flex flex-row gap-[20px] w-full">
								<Image
									className="object-cover"
									src={asset.src}
									alt="item"
									height={100}
									width={100}
								/>
								<div className="flex flex-col justify-end">
									<div className="text-mg font-bold flex ml-[10px]">
										{asset.name}
									</div>
									<div className="flex flex-row items-center justify-center gap-4">
										<div className="bg-[#ffd713] font-bold rounded-full p-[10px] h-[40px] w-[200px] cursor-pointer text-[#3a2802] text-center mb-[5px] mt-[10px]">
											Buy it Again
										</div>
										<Link href={`${asset.etherscanLink}`}>
											<a target="_blank" rel="noopener">
												<div className="font-bold rounded-full h-[40px] w-[150px] cursor-pointer text-[#3a2802] text-center border-2 border-[#ffd713] flex justify-center items-center">
													Etherscan
												</div>
											</a>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default Transaction;
