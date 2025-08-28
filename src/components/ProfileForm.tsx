import React, { useState } from 'react'

interface ProfileFormProps {
  onCreateProfile: (displayName: string, bio: string) => Promise<void>
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onCreateProfile }) => {
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!displayName.trim()) return

    setIsCreating(true)
    try {
      await onCreateProfile(displayName.trim(), bio.trim())
    } catch (error) {
      console.error('Error creating profile:', error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="border-b border-gray-800 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to Dwitter</h2>
          <p className="text-gray-400">Create your profile to start tweeting and connecting with the decentralized community!</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2">
              Display Name
            </label>
            <input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-gray-500 transition-colors"
              placeholder="Enter your display name"
              maxLength={50}
              required
            />
            <div className="text-right mt-1">
              <span className={`text-sm ${displayName.length > 40 ? 'text-yellow-500' : 'text-gray-500'}`}>
                {displayName.length}/50
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-white placeholder-gray-500 transition-colors"
              placeholder="Tell the world about yourself..."
              maxLength={160}
            />
            <div className="text-right mt-1">
              <span className={`text-sm ${bio.length > 140 ? 'text-yellow-500' : 'text-gray-500'}`}>
                {bio.length}/160
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!displayName.trim() || isCreating}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-full transition-colors"
          >
            {isCreating ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Profile...
              </div>
            ) : (
              'Create Profile'
            )}
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              By creating a profile, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm