/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { amazonAbi, amazonCoinAddress } from "../lib/constants";
import { ethers } from "ethers";

export const AmazonContext = createContext();

export const AmazonProvider = ({ children }) => {
	const [username, setUsername] = useState("");
	const [nickname, setNickname] = useState("");
	const [assets, setAssets] = useState([]);
	const [currentAccount, setCurrentAccount] = useState("");
	const [tokenAmount, setTokenAmount] = useState("");
	const [amountDue, setAmountDue] = useState("");
	const [etherscanLink, setEtherscanLink] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [balance, setBalance] = useState("");
	const [recentTransactions, setRecentTransactions] = useState([]);
	const [ownedItems, setOwnedItems] = useState([]);

	const {
		authenticate,
		isAuthenticated,
		enableWeb3,
		Moralis,
		user,
		isWeb3Enabled,
	} = useMoralis();

	const {
		data: assetsData,
		error: assetsDataError,
		isLoading: assetsDataisLoading,
	} = useMoralisQuery("assets");

	const {
		data: userData,
		error: userDataError,
		isLoading: userDataisLoading,
	} = useMoralisQuery("_User");

	const getBalance = async () => {
		try {
			if (!isAuthenticated || !currentAccount) return;
			const options = {
				contractAddress: amazonCoinAddress,
				functionName: "balanceOf",
				abi: amazonAbi,
				params: {
					account: currentAccount,
				},
			};

			if (isWeb3Enabled) {
				const response = await Moralis.executeFunction(options);
				setBalance(response.toString());
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSetUsername = () => {
		if (user) {
			if (nickname) {
				user.set("nickname", nickname);
				user.save();
			} else {
				console.log("Can not set username to empty string");
			}
		} else {
			console.log("No user");
		}
	};

	const buyAsset = async (price, asset) => {
		try {
			if (!isAuthenticated || !currentAccount) return;

			const options = {
				type: "erc20",
				amount: price,
				receiver: amazonCoinAddress,
				contractAddress: amazonCoinAddress,
			};

			let transaction = await Moralis.transfer(options);
			const receipt = await transaction.wait();

			if (receipt) {
				const res = userData[0].add("ownedAssets", {
					...asset,
					purchaseDate: Date.now(),
					etherscanLink: `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
				});
				await res.save().then(() => alert("Asset purchased successfully!"));
				setOwnedItems([...ownedItems, asset]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const buyTokens = async () => {
		if (!isAuthenticated) {
			await authenticate();
		}

		const amount = ethers.BigNumber.from(tokenAmount);
		const price = ethers.BigNumber.from("100000000000000");
		const calcPrice = amount.mul(price);

		let options = {
			contractAddress: amazonCoinAddress,
			functionName: "mint",
			abi: amazonAbi,
			msgValue: calcPrice,
			params: {
				amount,
			},
		};

		const transaction = await Moralis.executeFunction(options);
		const receipt = await transaction.wait(4);
		setIsLoading(false);
		setEtherscanLink(
			`https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`
		);
	};

	const listenToUpdate = async () => {
		let query = new Moralis.Query("EthTransactions");
		let subscription = await query.subscribe();
		subscription.on("update", async (object) => {
			setRecentTransactions([object]);
		});
	};

	const getAssets = async () => {
		try {
			setAssets(assetsData);
		} catch (error) {
			console.log(error);
		}
	};

	const getOwnedAssets = async () => {
		try {
			if (userData[0]) {
				setOwnedItems([...userData[0]?.attributes?.ownedAssets]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		(async () => {
			await enableWeb3();
			await getAssets();
			await getOwnedAssets();
		})();
	}, [
		isAuthenticated,
		userData,
		assetsData,
		assetsDataisLoading,
		userDataisLoading,
	]);

	useEffect(() => {
		(async () => {
			if (!isWeb3Enabled) {
				await enableWeb3();
			}

			await listenToUpdate();

			if (isAuthenticated) {
				await getBalance();
				const currentUser = await user?.get("nickname");
				setUsername(currentUser);
				const account = await user?.get("ethAddress");
				setCurrentAccount(account);
			} else {
				setBalance("");
				setUsername("");
				setCurrentAccount("");
			}
		})();
	}, [
		isAuthenticated,
		user,
		username,
		currentAccount,
		getBalance,
		listenToUpdate,
	]);

	return (
		<AmazonContext.Provider
			value={{
				isAuthenticated,
				nickname,
				setNickname,
				username,
				handleSetUsername,
				assets,
				balance,
				setTokenAmount,
				tokenAmount,
				amountDue,
				setAmountDue,
				isLoading,
				setIsLoading,
				setEtherscanLink,
				etherscanLink,
				currentAccount,
				buyTokens,
				buyAsset,
				recentTransactions,
				ownedItems,
			}}
		>
			{children}
		</AmazonContext.Provider>
	);
};
