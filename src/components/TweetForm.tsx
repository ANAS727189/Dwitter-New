import React, { useState } from 'react'

interface TweetFormProps {
  onCreateTweet: (content: string) => Promise<void>
}

const TweetForm: React.FC<TweetFormProps> = ({ onCreateTweet }) => {
  const [content, setContent] = useState('')
  const [isPosting, setIsPosting] = useState(false)

  const MAX_TWEET_LENGTH = 280

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || content.length > MAX_TWEET_LENGTH) return

    setIsPosting(true)
    try {
      await onCreateTweet(content.trim())
      setContent('')
    } catch (error) {
      console.error('Error creating tweet:', error)
    } finally {
      setIsPosting(false)
    }
  }

  const charactersLeft = MAX_TWEET_LENGTH - content.length
  const isOverLimit = charactersLeft < 0

  // Calculate progress circle
  const circumference = 2 * Math.PI * 10
  const strokeDasharray = `${((MAX_TWEET_LENGTH - content.length) / MAX_TWEET_LENGTH) * circumference} ${circumference}`

  return (
    <div className="border-b border-gray-800 p-4">
      <div className="flex space-x-3">
        {/* Profile Picture */}
        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
          <span className="text-gray-400 text-lg">👤</span>
        </div>
        
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What is happening?!"
                className="w-full bg-transparent text-xl placeholder-gray-500 border-none outline-none resize-none text-white"
                rows={3}
                disabled={isPosting}
                style={{ minHeight: '60px' }}
              />
            </div>

            {/* Tweet Options */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-800">
              <div className="flex items-center space-x-4">
                {/* Media Button */}
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors text-blue-400"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* GIF Button */}
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors text-blue-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4h10m-5 0V4m0 4v10m-7-4h3m11 0h-3" />
                  </svg>
                </button>

                {/* Poll Button */}
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors text-blue-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </button>

                {/* Emoji Button */}
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors text-blue-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>

                {/* Schedule Button */}
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors text-blue-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                {/* Character count circle */}
                {content.length > 0 && (
                  <div className="relative">
                    <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`${
                          isOverLimit 
                            ? 'text-red-500' 
                            : charactersLeft <= 20 
                            ? 'text-yellow-500' 
                            : 'text-gray-600'
                        }`}
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                        strokeWidth="2"
                        strokeDasharray={strokeDasharray}
                        strokeLinecap="round"
                        className={`${
                          isOverLimit 
                            ? 'stroke-red-500' 
                            : charactersLeft <= 20 
                            ? 'stroke-yellow-500' 
                            : 'stroke-blue-500'
                        }`}
                      />
                    </svg>
                    {charactersLeft <= 20 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xs font-bold ${isOverLimit ? 'text-red-500' : 'text-gray-400'}`}>
                          {charactersLeft < 0 ? Math.abs(charactersLeft) : charactersLeft <= 10 ? charactersLeft : ''}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Tweet Button */}
                <button
                  type="submit"
                  disabled={!content.trim() || isOverLimit || isPosting}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                  {isPosting ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TweetForm