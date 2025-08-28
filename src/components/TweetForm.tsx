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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full p-4 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            rows={4}
            disabled={isPosting}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
            {charactersLeft} characters remaining
          </div>
          
          <button
            type="submit"
            disabled={!content.trim() || isOverLimit || isPosting}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            {isPosting ? 'Posting...' : 'Tweet'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TweetForm