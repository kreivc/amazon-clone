import { createContext, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

export const AmazonContext = createContext();

export const AmazonProvider = ({ children }) => {
	const [username, setUsername] = useState("");
	const [nickname, setNickname] = useState("");

	const {
		authenticate,
		isAuthenticated,
		enableWeb3,
		Moralis,
		user,
		isWeb3Enabled,
	} = useMoralis();

	useEffect(() => {
		(async () => {
			if (isAuthenticated) {
				const currentUser = await user?.get("nickname");
				setUsername(currentUser);
			}
		})();
	}, [isAuthenticated, user, username]);

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
			}}
		>
			{children}
		</AmazonContext.Provider>
	);
};
