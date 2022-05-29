// Compile, deploy, then execute

const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();

    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract  deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWave();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWave();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWave();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit node process while indicating 'Uncaught Fatal Exception' error
    }
};

runMain();