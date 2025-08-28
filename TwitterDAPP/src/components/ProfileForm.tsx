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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Create Your Profile</h2>
      <p className="text-gray-600 mb-4">You need to create a profile before you can start tweeting!</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
            Display Name *
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter your display name"
            maxLength={50}
            required
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            placeholder="Tell us about yourself (optional)"
            maxLength={160}
          />
        </div>

        <button
          type="submit"
          disabled={!displayName.trim() || isCreating}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors"
        >
          {isCreating ? 'Creating Profile...' : 'Create Profile'}
        </button>
      </form>
    </div>
  )
}

export default ProfileForm