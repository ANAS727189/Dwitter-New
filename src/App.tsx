import { useState, useEffect } from 'react'
import {
  ConnectWallet,
  ProfileForm,
  TweetForm,
  TweetContainer
} from './components/index.ts'
import { web3ProfilePics } from "./utils/web3profilePics.ts"
import { useBlockchain } from './hooks/useBlockchain.ts'
import { 
  checkUserProfile, createProfile, 
  createTweet, likeTweet, unlikeTweet, getAllTweets
} from './utils/contractActions.ts'

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
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex">
        {/* Left Sidebar */}
        <div className="w-64 xl:w-80 hidden sm:flex flex-col h-screen sticky top-0 p-6 border-r border-gray-800">
          <div className="mb-2">
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-8">
              <img src='/dwitter-logo.png' className='w-18 h-20' />
            </h1>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            <div className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-900 transition-colors cursor-pointer">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.4.677.4.12 0 .243-.03.356-.09l.815-.44L4.7 19.963c.214 1.215 1.308 2.062 2.658 2.062h9.282c1.35 0 2.444-.847 2.658-2.063L20.91 8.458l.815.44c.356.193.81.06 1.017-.304.196-.365.06-.818-.304-1.016zM14 18v-4h-4v4H8v-7.06l4-2.15 4 2.15V18h-2z"/>
              </svg>
              <span className="text-xl xl:block hidden">Home</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-900 transition-colors cursor-pointer">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 6h-2l-1.27-1.27c-.39-.39-.9-.73-1.47-.73H7.73c-.57 0-1.08.34-1.46.73L5 6H3c-.55 0-1 .45-1 1s.45 1 1 1h1v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h1c.55 0 1-.45 1-1s-.45-1-1-1zM8 18c0 .55-.45 1-1 1s-1-.45-1-1v-8c0-.55.45-1 1-1s1 .45 1 1v8zm4 0c0 .55-.45 1-1 1s-1-.45-1-1v-8c0-.55.45-1 1-1s1 .45 1 1v8zm4 0c0 .55-.45 1-1 1s-1-.45-1-1v-8c0-.55.45-1 1-1s1 .45 1 1v8z"/>
              </svg>
              <span className="text-xl xl:block hidden">Explore</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-900 transition-colors cursor-pointer">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span className="text-xl xl:block hidden">Profile</span>
            </div>
          </nav>

          {/* Connect Wallet - Bottom of sidebar */}
          <div className="mt-auto">
            <ConnectWallet 
              account={account}
              connectWallet={connectWallet}
              disconnectWallet={disconnectWallet}
              userProfile={userProfile}
              profilePicture={profilePicture}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 border-x border-gray-800 min-h-screen">
          {/* Header */}
          <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md p-4 border-b border-gray-800 z-10">
            <h2 className="text-xl md:text-4xl font-bold">Home</h2>
          </div>

          <div className="w-full">
            {/* Mobile Connect Wallet */}
            <div className="sm:hidden p-4 border-b border-gray-800">
              <ConnectWallet 
                account={account}
                connectWallet={connectWallet}
                disconnectWallet={disconnectWallet}
                userProfile={userProfile}
                profilePicture={profilePicture}
              />
            </div>

            {account && !isRegistered && (
              <div className="p-4">
                <ProfileForm onCreateProfile={handleCreateProfile} />
              </div>
            )}

            {account && isRegistered && (
              <div className="border-b border-gray-800">
                <TweetForm onCreateTweet={handleCreateTweet} />
              </div>
            )}

            {!account && (
              <div className="text-center py-12 px-4">
                <div className="mb-8">
                  <h2 className="text-4xl font-bold mb-4">Happening now</h2>
                  <h3 className="text-2xl font-bold mb-8">Join Dwitter today.</h3>
                </div>
                <p className="text-gray-400 mb-4">Connect your wallet to start tweeting!</p>
              </div>
            )}

            {account && isRegistered && (
              <TweetContainer 
                tweets={tweets}
                onLikeTweet={handleLikeTweet}
                onUnlikeTweet={handleUnlikeTweet}
                currentAccount={account}
                profilePicture={profilePicture}
                userProfile={userProfile}
                userProfileContract={userProfileContract}
              />
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 hidden lg:block sticky top-0 h-screen overflow-y-auto p-4 space-y-4">
          {/* Search */}
          <div className="rounded-2xl p-3">
            <div className="flex items-center space-x-3 bg-gray-800 rounded-full px-4 py-2">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input 
                type="text" 
                placeholder="Search Dwitter" 
                className="bg-transparent outline-none flex-1 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Trending */}
          <div className="rounded-2xl p-4">
            <h2 className="text-xl font-bold mb-4">What's happening</h2>
            <div className="space-y-3">
              <div className="cursor-pointer hover:bg-gray-800 p-3 rounded-lg transition-colors">
                <p className="text-gray-400 text-sm">Trending in Technology</p>
                <p className="font-bold">Web3</p>
                <p className="text-gray-400 text-sm">15.2K Tweets</p>
              </div>
              
              <div className="cursor-pointer p-3 rounded-lg transition-colors">
                <p className="text-gray-400 text-sm">Trending in Crypto</p>
                <p className="font-bold">Blockchain</p>
                <p className="text-gray-400 text-sm">8,847 Tweets</p>
              </div>
              
              <div className="cursor-pointer p-3 rounded-lg transition-colors">
                <p className="text-gray-400 text-sm">Trending</p>
                <p className="font-bold">Decentralization</p>
                <p className="text-gray-400 text-sm">5,234 Tweets</p>
              </div>
            </div>
          </div>

          {/* Who to follow */}
          <div className="rounded-2xl p-4">
            <h2 className="text-xl font-bold mb-4">Who to follow</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-sm font-bold">VB</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">Vitalik.eth</p>
                    <p className="text-gray-400 text-sm truncate">@VitalikButerin</p>
                  </div>
                </div>
                <button className="bg-white text-black px-4 py-1 rounded-full font-bold hover:bg-gray-200 transition-colors text-sm">
                  Follow
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                    <span className="text-sm font-bold">SC</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">Satoshi</p>
                    <p className="text-gray-400 text-sm truncate">@satoshi</p>
                  </div>
                </div>
                <button className="bg-white text-black px-4 py-1 rounded-full font-bold hover:bg-gray-200 transition-colors text-sm">
                  Follow
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 sm:hidden">
        <div className="flex justify-around py-2">
          <div className="flex flex-col items-center p-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.4.677.4.12 0 .243-.03.356-.09l.815-.44L4.7 19.963c.214 1.215 1.308 2.062 2.658 2.062h9.282c1.35 0 2.444-.847 2.658-2.063L20.91 8.458l.815.44c.356.193.81.06 1.017-.304.196-.365.06-.818-.304-1.016zM14 18v-4h-4v4H8v-7.06l4-2.15 4 2.15V18h-2z"/>
            </svg>
          </div>
          <div className="flex flex-col items-center p-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 6h-2l-1.27-1.27c-.39-.39-.9-.73-1.47-.73H7.73c-.57 0-1.08.34-1.46.73L5 6H3c-.55 0-1 .45-1 1s.45 1 1 1h1v11c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8h1c.55 0 1-.45 1-1s-.45-1-1-1zM8 18c0 .55-.45 1-1 1s-1-.45-1-1v-8c0-.55.45-1 1-1s1 .45 1 1v8zm4 0c0 .55-.45 1-1 1s-1-.45-1-1v-8c0-.55.45-1 1-1s1 .45 1 1v8zm4 0c0 .55-.45 1-1 1s-1-.45-1-1v-8c0-.55.45-1 1-1s1 .45 1 1v8z"/>
            </svg>
          </div>
          <div className="flex flex-col items-center p-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App