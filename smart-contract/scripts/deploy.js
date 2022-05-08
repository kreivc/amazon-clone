const hre = require("hardhat");

async function main() {
	const acFactory = await hre.ethers.getContractFactory("AmazonCoin");
	const acContract = await acFactory.deploy();
	await acContract.deployed();
	console.log("AC deployed to:", acContract.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
