import { useContext } from "react";
import { AmazonContext } from "../context/AmazonContext";
import Cards from "./Cards";

const Main = () => {
	return (
		<div className="h-full w-full flex flex-col mt-[50px] pr-[50px] overflow-hidden">
			{/* <Header /> */}
			{/* <Featured /> */}
			<Cards />
		</div>
	);
};

export default Main;
