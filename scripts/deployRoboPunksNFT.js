const hre = require("hardhat");

async function main() {
  const RoboPunksNFT = await ethers.getContractFactory("JosephRoboPunksNFT");
  const roboPunksNFT = await RoboPunksNFT.deploy(); // Deploy RoboPunksNFT contract
  
  console.log("JosephRoboPunksNFT deployed to:", roboPunksNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
