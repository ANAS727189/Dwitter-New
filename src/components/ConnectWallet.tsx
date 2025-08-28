import React from 'react'

interface ConnectWalletProps {
  account: string
  connectWallet: () => void
  disconnectWallet: () => void
  userProfile: any
  profilePicture: string
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({
  account,
  connectWallet,
  disconnectWallet,
  userProfile,
  profilePicture
}) => {
  if (!account) {
    return (
      <button
        onClick={connectWallet}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
      >
        Connect Wallet
      </button>
    )
  }

  return (
    <div className="relative group">
      <div className="flex items-center gap-3 rounded-full p-3 cursor-pointer transition-colors">
        {profilePicture ? (
          <img 
            src={profilePicture} 
            alt="Profile" 
            className="w-14 h-14 rounded-full bg-gray-700"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">👤</span>
          </div>
        )}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="text-lg font-bold text-white truncate">
            {userProfile?.displayName || 'Anonymous'}
          </div>
          <div className="text-sm text-gray-400 truncate">
            @{account.substring(0, 6)}...{account.substring(account.length - 4)}
          </div>
        </div>
        <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </div>
      
      {/* Dropdown menu */}
      <div className="absolute bottom-full left-0 right-0 mb-2 bg-black border border-gray-800 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            {profilePicture ? (
              <img 
                src={profilePicture} 
                alt="Profile" 
                className="w-10 h-10 rounded-full bg-gray-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">👤</span>
              </div>
            )}
            <div className="flex flex-col">
              <div className="text-sm font-bold text-white">
                {userProfile?.displayName || 'Anonymous'}
              </div>
              <div className="text-xs text-gray-400">
                {account.substring(0, 6)}...{account.substring(account.length - 4)}
              </div>
            </div>
          </div>
          {userProfile?.bio && (
            <p className="text-sm text-gray-300 mt-2">{userProfile.bio}</p>
          )}
        </div>
        
        <div className="py-2">
          <button
            onClick={disconnectWallet}
            className="w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-900 transition-colors flex items-center gap-3"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Disconnect Wallet
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConnectWallet