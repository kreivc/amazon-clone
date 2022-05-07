/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";

export const AmazonContext = createContext();

export const AmazonProvider = ({ children }) => {
	const [username, setUsername] = useState("");
	const [nickname, setNickname] = useState("");
	const [assets, setAssets] = useState([]);

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

	useEffect(() => {
		(async () => {
			if (isAuthenticated) {
				const currentUser = await user?.get("nickname");
				setUsername(currentUser);
			}
		})();
	}, [isAuthenticated, user, username]);

	const getAssets = async () => {
		try {
			await enableWeb3();
			setAssets(assetsData);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		(async () => {
			if (isWeb3Enabled) {
				await getAssets();
			}
		})();
	}, [getAssets, isWeb3Enabled, assetsDataisLoading]);

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

	return (
		<AmazonContext.Provider
			value={{
				isAuthenticated,
				nickname,
				setNickname,
				username,
				handleSetUsername,
				assets,
			}}
		>
			{children}
		</AmazonContext.Provider>
	);
};
