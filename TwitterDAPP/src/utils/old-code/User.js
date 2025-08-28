import web3 from "web3"
import contractAbi from "../../abi.json";

const userProfileContractAddress = import.meta.VITE_USER_PROFILE_CONTRACT_ADDRESS;

const web3 = new web3(web3.givenProvider || "ws://localhost:8545");
const userProfileContract = new web3.eth.Contract(contractAbi, userProfileContractAddress);

