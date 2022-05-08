import { useContext } from "react";
import { CgMenuGridO } from "react-icons/cg";
import logo from "../assets/amazon_logo_full.png";
import Image from "next/image";
import { IoMdSearch } from "react-icons/io";
import { AmazonContext } from "../context/AmazonContext";
import { FaCoins } from "react-icons/fa";
import {
	ModalProvider,
	Modal,
	useModal,
	ModalTransition,
} from "react-simple-hook-modal";
import "react-simple-hook-modal/dist/styles.css";
import BuyModal from "./BuyModal";

const Header = () => {
	const { balance, buyTokens } = useContext(AmazonContext);
	const { openModal, isModalOpen, closeModal } = useModal();
	return (
		<div className="h-[60px] w-full flex items-center gap-5 px-16">
			<div className="flex items-center ml-[20px] cursor-pointer flex-1">
				<Image
					src={logo}
					alt="amazon"
					height={100}
					width={150}
					className="object-cover"
				/>
			</div>
			<div className="p-[25px] mr-[30px] w-[400px] h-[40px] bg-white rounded-full shadow-lg flex items-center border border-black">
				<input
					type="text"
					placeholder="Search Your Assets..."
					className="bg-transparent focus:outline-none border-none flex-1 items-center flex"
				/>
				<IoMdSearch fontSize={20} />
			</div>
			<div className="flex items-center gap-6">
				<div className="flex items-center text-md font-bold cursor-pointer">
					New Releases
				</div>
				<div className="flex items-center text-md font-bold cursor-pointer">
					Featured
				</div>
				{balance ? (
					<div
						className="flex items-center text-md font-bold cursor-pointer"
						onClick={openModal}
					>
						{balance}
						<FaCoins className="ml-[10px]" />
						<Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
							<BuyModal close={closeModal} buyTokens={buyTokens} />
						</Modal>
					</div>
				) : (
					<div
						className="flex items-center text-md font-bold cursor-pointer"
						onClick={openModal}
					>
						0 AC <FaCoins className="ml-[10px]" />
						<Modal isOpen={isModalOpen} transition={ModalTransition.SCALE}>
							<BuyModal close={closeModal} buyTokens={buyTokens} />
						</Modal>
					</div>
				)}
				<CgMenuGridO
					fontSize={30}
					className="flex items-center text-md font-bold cursor-pointer"
				/>
			</div>
		</div>
	);
};

export default Header;
