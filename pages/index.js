import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

export default function Home() {
	return (
		<div className="h-full w-full flex bg-white">
			<Sidebar />
			<Main />
		</div>
	);
}
