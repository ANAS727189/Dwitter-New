import web3 from "web3"
import contractAbi from "../../abi.json";

const contractAddress = import.meta.VITE_CONTRACT_ADDRESS;

const web3 = new web3(web3.givenProvider || "ws://localhost:8545");
const contract = new web3.eth.Contract(contractAbi, contractAddress);



async function displayTweets(userAddress) {
    const tweets = await contract.methods.getAllTweets(userAddress).call();
    // tweets.forEach(tweet => {
    //     console.log(`Tweet ID: ${tweet.id}, Content: ${tweet.content}`);
    // });
}

function setConnected(address) {
    displayTweets(address);
}

async function createTweet(content) {
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.createTweet(content).send({ from: accounts[0] });
        displayTweets(accounts[0]);
    } catch (error) {
        console.error("Error creating tweet:", error);
    }
}


async function likeTweet(author, id) {
    const accounts = await web3.eth.getAccounts();
    try {
        await contract.methods.likeTweet(author, id).send({ from: accounts[0] });
        displayTweets(author);
    }catch(err) {
        console.error("Error liking tweet:", err);
    }
}