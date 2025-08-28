import { useState, useEffect } from 'react'
import {
  ConnectWallet,
  ProfileForm,
  TweetForm,
  TweetContainer
} from './components'
import { web3ProfilePics } from "./utils/web3profilePics.ts"
import { useBlockchain } from './hooks/useBlockchain'
import { 
  checkUserProfile, createProfile, 
  createTweet, likeTweet, unlikeTweet, getAllTweets
} from './utils/contractActions'

function App() {
  const { account, contract, userProfileContract, connectWallet, disconnectWallet } = useBlockchain()
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [tweets, setTweets] = useState<any[]>([])
  const [profilePicture, setProfilePicture] = useState<string>('')

  useEffect(() => {
    if (account) {
      setProfilePicture(prev => prev || web3ProfilePics[Math.floor(Math.random() * web3ProfilePics.length)]);
      (async () => {
        if (userProfileContract) {
          const { profile, isRegistered } = await checkUserProfile(userProfileContract, account)
          setUserProfile(profile)
          setIsRegistered(isRegistered)
        }

        if (contract) {
          const userTweets = await getAllTweets(contract)
          setTweets(userTweets)
        }
      })()
    }
  }, [account, contract, userProfileContract])

  const handleCreateProfile = async (displayName: string, bio: string) => {
    if (userProfileContract && account) {
      await createProfile(userProfileContract, account, displayName, bio)
      const { profile, isRegistered } = await checkUserProfile(userProfileContract, account)
      setUserProfile(profile)
      setIsRegistered(isRegistered)
    }
  }

  const handleCreateTweet = async (content: string) => {
    if (contract && account && isRegistered) {
      await createTweet(contract, account, content)
      setTweets(await getAllTweets(contract))
    }
  }

  const handleLikeTweet = async (author: string, tweetId: number) => {
    if (contract && account && isRegistered) {
      await likeTweet(contract, account, author, tweetId)
      setTweets(await getAllTweets(contract))
    }
  }

  const handleUnlikeTweet = async (author: string, tweetId: number) => {
    if (contract && account && isRegistered) {
      await unlikeTweet(contract, account, author, tweetId)
      setTweets(await getAllTweets(contract))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Dwitter</h1>
          <ConnectWallet 
            account={account}
            connectWallet={connectWallet}
            disconnectWallet={disconnectWallet}
            userProfile={userProfile}
            profilePicture={profilePicture}
          />
        </div>

        {account && !isRegistered && (
          <ProfileForm onCreateProfile={handleCreateProfile} />
        )}

        {account && isRegistered && (
          <>
            <TweetForm onCreateTweet={handleCreateTweet} />
            <TweetContainer 
              tweets={tweets}
              onLikeTweet={handleLikeTweet}
              onUnlikeTweet={handleUnlikeTweet}
              currentAccount={account}
              profilePicture={profilePicture}
              userProfile={userProfile}
              userProfileContract={userProfileContract}
            />
          </>
        )}

        {!account && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Connect your wallet to start tweeting!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
