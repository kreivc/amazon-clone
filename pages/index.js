import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Amazone Clone</title>
			</Head>
			<div className="h-full w-full flex bg-white">
				<Sidebar />
				<Main />
			</div>
		</>
	);
}
