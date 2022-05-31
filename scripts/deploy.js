const { ethers, run, network } = require('hardhat');

async function main() {
    const simpleStorageContract = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await simpleStorageContract.deploy();
    await simpleStorage.deployed();
    console.log(`SimpleStorage contract deployed to: ${simpleStorage.address}`);

    if (network.config.chainId === 3 && process.env.ETHER_SCAN_KEY) {
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current value is ${currentValue}`);

    // Update current value
    const transaction = await simpleStorage.store(9);
    await transaction.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated value is ${updatedValue}`);

};

async function verify(contractAddress, args) {
    console.log("Verifying contract");
    try {
        run("verify:verify", {
            address: contractAddress,
            constructorArguments: args
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verfified");
        }
        else {
            console.log(e.message);
        }
    }
};

main().then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1)
    });