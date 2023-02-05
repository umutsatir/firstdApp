const provider = new ethers.providers.Web3Provider(
    window.ethereum,
    "ropsten"
);
const MoodContractAddress =
    "0xA37cFc9181Fe40D0ffCbb91a2e14C7412c074eE8";
let MoodContract;
let signer;
const MoodContractABI = [
    {
        inputs: [],
        name: "getMood",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_mood",
                type: "string",
            },
        ],
        name: "setMood",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(
            MoodContractAddress,
            MoodContractABI,
            signer
        );
    });
});
async function getMood() {
    const getMoodPromise = MoodContract.getMood();
    const Mood = await getMoodPromise;
    document.getElementById("moodget").textContent = "Recent mood is: " + Mood;
}

async function setMood() {
    const mood = document.getElementById("mood").value;
    const setMoodPromise = MoodContract.setMood(mood);
    await setMoodPromise;
}