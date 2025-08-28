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
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  if (tweets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No tweets yet. Be the first to tweet!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tweets.slice().reverse().map((tweet, index) => {
        const isCurrentUserTweet = tweet.author.toLowerCase() === currentAccount.toLowerCase()
        const authorProfile = authorProfiles[tweet.author]
        
        return (
          <div key={`${tweet.author}-${tweet.id}-${index}`} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start space-x-3">
              {isCurrentUserTweet && profilePicture ? (
                <img 
                  src={profilePicture} 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full bg-gray-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">👤</span>
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {isCurrentUserTweet && userProfile?.displayName 
                      ? userProfile.displayName 
                      : authorProfile?.displayName || 'Anonymous'
                    }
                  </h3>
                  <span className="text-sm text-gray-500">
                    {tweet.author.substring(0, 6)}...{tweet.author.substring(tweet.author.length - 4)}
                  </span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">
                    {formatTimestamp(tweet.timestamp)}
                  </span>
                </div>
                
                <p className="text-gray-800 mb-3 whitespace-pre-wrap">
                  {tweet.content}
                </p>
                
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => onLikeTweet(tweet.author, typeof tweet.id === 'bigint' ? Number(tweet.id) : tweet.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span>{typeof tweet.likes === 'bigint' ? Number(tweet.likes) : tweet.likes}</span>
                  </button>
                  
                  {(typeof tweet.likes === 'bigint' ? Number(tweet.likes) : tweet.likes) > 0 && (
                    <button
                      onClick={() => onUnlikeTweet(tweet.author, typeof tweet.id === 'bigint' ? Number(tweet.id) : tweet.id)}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Unlike
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TweetContainer