import React, { useState, useEffect } from 'react'
import { checkUserProfile } from '../utils/contractActions'

interface Tweet {
  id: bigint | number
  author: string
  content: string
  timestamp: bigint | number
  likes: bigint | number
}

interface TweetContainerProps {
  tweets: Tweet[]
  onLikeTweet: (author: string, tweetId: number) => Promise<void>
  onUnlikeTweet: (author: string, tweetId: number) => Promise<void>
  currentAccount: string
  profilePicture: string
  userProfile: any
  userProfileContract: any
}

const TweetContainer: React.FC<TweetContainerProps> = ({
  tweets,
  onLikeTweet,
  onUnlikeTweet,
  currentAccount,
  profilePicture,
  userProfile,
  userProfileContract
}) => {
  const [authorProfiles, setAuthorProfiles] = useState<{[address: string]: any}>({})

  useEffect(() => {
    const fetchAuthorProfiles = async () => {
      if (!userProfileContract) return
      
      const profiles: {[address: string]: any} = {}
      const uniqueAuthors = [...new Set(tweets.map(tweet => tweet.author))]
      
      for (const author of uniqueAuthors) {
        try {
          const { profile } = await checkUserProfile(userProfileContract, author)
          profiles[author] = profile
        } catch (error) {
          console.error(`Error fetching profile for ${author}:`, error)
          profiles[author] = null
        }
      }
      
      setAuthorProfiles(profiles)
    }

    fetchAuthorProfiles()
  }, [tweets, userProfileContract])

  const formatTimestamp = (timestamp: bigint | number) => {
    const timestampNumber = typeof timestamp === 'bigint' ? Number(timestamp) : timestamp
    const date = new Date(timestampNumber * 1000)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes}m`
    } else if (diffInHours < 24) {
      return `${diffInHours}h`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  if (tweets.length === 0) {
    return (
      <div className="border-b border-gray-800 p-8 text-center">
        <p className="text-gray-400">No tweets yet. Be the first to tweet!</p>
      </div>
    )
  }

  return (
    <div>
      {tweets.slice().reverse().map((tweet, index) => {
        const isCurrentUserTweet = tweet.author.toLowerCase() === currentAccount.toLowerCase()
        const authorProfile = authorProfiles[tweet.author]
        
        return (
          <div key={`${tweet.author}-${tweet.id}-${index}`} 
               className="border-b border-gray-800 p-4 hover:bg-gray-950 transition-colors cursor-pointer">
            <div className="flex space-x-3">
              {isCurrentUserTweet && profilePicture ? (
                <img 
                  src={profilePicture} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full bg-gray-700"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">👤</span>
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-bold text-white hover:underline cursor-pointer">
                    {isCurrentUserTweet && userProfile?.displayName 
                      ? userProfile.displayName 
                      : authorProfile?.displayName || 'Anonymous'
                    }
                  </h3>
                  <span className="text-gray-500 text-sm">
                    @{tweet.author.substring(0, 6)}...{tweet.author.substring(tweet.author.length - 4)}
                  </span>
                  <span className="text-gray-500 text-sm">·</span>
                  <span className="text-gray-500 text-sm hover:underline cursor-pointer">
                    {formatTimestamp(tweet.timestamp)}
                  </span>
                </div>
                
                <p className="text-white mb-3 whitespace-pre-wrap break-words">
                  {tweet.content}
                </p>
                
                <div className="flex items-center justify-between max-w-md">
                  {/* Reply */}
                  <button className="group flex items-center space-x-2 text-gray-500 hover:text-blue-400 transition-colors">
                    <div className="p-2 rounded-full hover:bg-blue-400 hover:text-white group-hover:bg-opacity-10 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                    </div>
                    <span className="text-sm">0</span>
                  </button>

                  {/* Retweet */}
                  <button className="group flex items-center space-x-2 text-gray-500 hover:text-green-400 transition-colors">
                    <div className="p-2 rounded-full hover:bg-green-400 hover:text-white group-hover:bg-opacity-10 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <span className="text-sm">0</span>
                  </button>

                  {/* Like */}
                  <button
                    onClick={() => onLikeTweet(tweet.author, typeof tweet.id === 'bigint' ? Number(tweet.id) : tweet.id)}
                    className="group flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <div className="p-2 rounded-full hover:bg-red-500 hover:text-white group-hover:bg-opacity-10 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm">{typeof tweet.likes === 'bigint' ? Number(tweet.likes) : tweet.likes}</span>
                  </button>

                  {/* Share */}
                  <button className="group flex items-center space-x-2 text-gray-500 hover:text-blue-400 transition-colors">
                    <div className="p-2 rounded-full hover:bg-blue-400 hover:text-white group-hover:bg-opacity-10 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Unlike button */}
                {(typeof tweet.likes === 'bigint' ? Number(tweet.likes) : tweet.likes) > 0 && (
                  <div className="mt-2">
                    <button
                      onClick={() => onUnlikeTweet(tweet.author, typeof tweet.id === 'bigint' ? Number(tweet.id) : tweet.id)}
                      className="text-sm text-gray-500 hover:text-red-400 transition-colors underline"
                    >
                      Unlike
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TweetContainer