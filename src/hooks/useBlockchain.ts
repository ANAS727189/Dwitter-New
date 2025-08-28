import { useState } from 'react'
import Web3 from 'web3'
import contractAbi from '../abi.json'
import userProfileAbi from '../userProfileabi.json'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
const userProfileContractAddress = import.meta.env.VITE_USER_PROFILE_CONTRACT_ADDRESS

export function useBlockchain() {
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const [account, setAccount] = useState<string>('')
  const [contract, setContract] = useState<any>(null)
  const [userProfileContract, setUserProfileContract] = useState<any>(null)

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const _web3 = new Web3(window.ethereum)
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const accounts = await _web3.eth.getAccounts()
        const twitterContract = new _web3.eth.Contract(contractAbi, contractAddress)
        const profileContract = new _web3.eth.Contract(userProfileAbi, userProfileContractAddress)

        setWeb3(_web3)
        setAccount(accounts[0])
        setContract(twitterContract)
        setUserProfileContract(profileContract)
      } else {
        alert('Please install MetaMask!')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
  }

  const disconnectWallet = () => {
    setWeb3(null)
    setAccount('')
    setContract(null)
    setUserProfileContract(null)
  }

  return { web3, account, contract, userProfileContract, connectWallet, disconnectWallet }
}
