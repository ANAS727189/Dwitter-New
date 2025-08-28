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
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
      >
        Connect Wallet
      </button>
    )
  }

  return (
    <div className="flex items-center gap-3 bg-white shadow-md rounded-lg p-3">
      {profilePicture ? (
        <img 
          src={profilePicture} 
          alt="Profile" 
          className="w-10 h-10 rounded-full bg-gray-200"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600">👤</span>
        </div>
      )}
      <div className="flex flex-col">
        <div className="text-sm font-medium text-gray-800">
          {userProfile?.displayName || 'Anonymous'}
        </div>
        <div className="text-xs text-gray-500">
          {account.substring(0, 6)}...{account.substring(account.length - 4)}
        </div>
      </div>
      <button
        onClick={disconnectWallet}
        className="ml-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded transition-colors"
      >
        Disconnect
      </button>
    </div>
  )
}

export default ConnectWallet