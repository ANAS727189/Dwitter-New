# 🐦 Dwitter - Decentralized Twitter

<div align="center">

**A blockchain-powered social media platform built for the decentralized web**

<p align="center">
  <a href="https://reactjs.org/">
    <img src="https://img.shields.io/badge/Built%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  </a>
  <a href="https://soliditylang.org/">
    <img src="https://img.shields.io/badge/Smart%20Contracts-Solidity-363636?style=for-the-badge&logo=solidity&logoColor=white" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  </a>
  <a href="https://ethereum.org/">
    <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white" />
  </a>
</p>

[🌐 Live Demo](#deployment) | [📖 Documentation](#documentation) | [🚀 Get Started](#quick-start)

</div>


---

## 🌟 Overview

Dwitter is a fully decentralized social media platform that reimagines Twitter for the Web3 era. Built on Ethereum blockchain technology, it empowers users with true ownership of their data, censorship resistance, and complete control over their social interactions.

### ✨ Key Features

- 🔐 **Wallet-Based Authentication** - Connect with MetaMask or compatible wallets
- 📝 **Decentralized Tweeting** - Post tweets stored immutably on-chain
- 👤 **Custom User Profiles** - Create personalized profiles with display names and bios
- ❤️ **Interactive Engagement** - Like and unlike tweets with real-time updates
- 🎨 **Twitter-like UI/UX** - Familiar interface with modern design
- 📱 **Responsive Design** - Seamless experience across desktop and mobile
- 🌐 **Web3 Integration** - Full blockchain integration with smart contracts
- 🔄 **Real-time Updates** - Live feed updates without page refreshes

---

## 🏗️ Architecture

### 🔗 Blockchain Layer

The application is built on two main smart contracts:

#### 📄 Twitter Contract (`Twitter.sol`)
- **Tweet Management**: Create, store, and retrieve tweets
- **Like System**: Like/unlike functionality with event emissions
- **Access Control**: Only registered users can interact
- **Ownership**: OpenZeppelin's Ownable for admin functions
- **Global Feed**: Aggregated tweets from all users

#### 👤 Profile Contract (`UserProfile.sol`)
- **User Registration**: Store display names and bios
- **Profile Management**: Update and retrieve user profiles
- **Identity Verification**: Link Ethereum addresses to user profiles

### 🖥️ Frontend Layer

#### Core Technologies
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Web3.js** - Blockchain interaction
- **Ethers.js** - Ethereum wallet integration

#### Component Architecture
```
src/
├── components/           # Reusable UI components
│   ├── ConnectWallet.tsx # Wallet connection & user profile
│   ├── TweetForm.tsx     # Tweet composition interface
│   ├── TweetContainer.tsx# Tweet feed display
│   ├── ProfileForm.tsx   # User profile creation
│   └── ui/              # Base UI components
├── hooks/               # Custom React hooks
│   └── useBlockchain.ts # Blockchain state management
├── utils/               # Utility functions
│   ├── contractActions.ts # Smart contract interactions
│   └── web3profilePics.ts # Avatar generation
└── types/               # TypeScript definitions
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MetaMask** or compatible Web3 wallet
- **Ethereum testnet** ETH for transactions

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ANAS727189/Solidity_Learning.git
   cd Solidity_Learning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_CONTRACT_ADDRESS=your_twitter_contract_address
   VITE_USER_PROFILE_CONTRACT_ADDRESS=your_profile_contract_address
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### 🔗 Smart Contract Deployment

#### Deploy Profile Contract
```solidity
// Deploy UserProfile.sol first
// Copy the deployed address for Twitter contract constructor
```

#### Deploy Twitter Contract
```solidity
// Deploy Twitter.sol with Profile contract address
constructor(address _profileContract) Ownable(msg.sender) {
    profileContract = IProfile(_profileContract);
}
```

---

## 💻 Usage Guide

### 🔌 Connecting Your Wallet

1. Click **"Connect Wallet"** button
2. Approve MetaMask connection request
3. Select your Ethereum account
4. Ensure you're on the correct network

### 👤 Creating Your Profile

1. After wallet connection, you'll see the profile creation form
2. Enter your **Display Name** (required, max 50 characters)
3. Add an optional **Bio** (max 160 characters)
4. Click **"Create Profile"** and confirm the transaction

### 📝 Posting Tweets

1. Once registered, access the tweet composition box
2. Write your tweet (max 280 characters)
3. Watch the character count indicator
4. Click **"Post"** and confirm the blockchain transaction
5. Your tweet appears in the global feed immediately

### ❤️ Engaging with Content

- **Like tweets**: Click the heart icon on any tweet
- **Unlike tweets**: Click the "Unlike" link below liked tweets
- **View profiles**: Click on user display names or avatars
- **Real-time updates**: Feed updates automatically as new tweets are posted

---

## 🔧 Technical Details

### 📋 Smart Contract Functions

#### Twitter Contract API
```solidity
// Tweet Management
function createTweet(string memory _tweet) public onlyRegistered
function getTweet(address _owner, uint _i) public view returns (Tweet memory)
function getAllTweetsGlobal() public view returns (Tweet[] memory)

// Like System
function likeTweet(address author, uint256 id) external onlyRegistered
function unLikeTweet(address author, uint256 id) external onlyRegistered
function getTotalLikes(address _author) external view returns (uint256)

// Admin Functions
function changeTweetLength(uint16 newTweetLength) public onlyOwner
```

#### Profile Contract API
```solidity
function setProfile(string memory _displayName, string memory _bio) public
function getProfile(address _user) public view returns (UserProfile memory)
```

### 🔄 State Management

The application uses React hooks for state management:
- **useBlockchain**: Manages Web3 connection and contract instances
- **useState**: Local component state for UI interactions
- **useEffect**: Handles side effects and data fetching

### 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Theme**: Sleek Twitter-like dark interface
- **Loading States**: Visual feedback during blockchain transactions
- **Error Handling**: User-friendly error messages
- **Character Counter**: Real-time tweet length validation with visual indicators
- **Profile Pictures**: Auto-generated Web3-themed avatars

---

## 🗂️ Project Structure

```
dwitter/
├── 📁 public/                    # Static assets
│   ├── dwitter-logo.png         # Application logo
│   └── vite.svg                 # Vite logo
├── 📁 src/                       # Source code
│   ├── 📁 components/           # React components
│   │   ├── ConnectWallet.tsx    # Wallet connection UI
│   │   ├── TweetForm.tsx        # Tweet creation form
│   │   ├── TweetContainer.tsx   # Tweet feed display
│   │   ├── ProfileForm.tsx      # Profile creation form
│   │   ├── index.ts            # Component exports
│   │   └── 📁 ui/              # Base UI components
│   ├── 📁 hooks/               # Custom hooks
│   │   └── useBlockchain.ts    # Blockchain integration
│   ├── 📁 utils/               # Utilities
│   │   ├── contractActions.ts  # Smart contract calls
│   │   └── web3profilePics.ts  # Avatar URLs
│   ├── 📁 types/               # TypeScript types
│   │   └── global.d.ts         # Global type definitions
│   ├── 📁 lib/                 # Libraries
│   │   └── utils.ts            # Utility functions
│   ├── 📁 assets/              # Static assets
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   ├── index.css              # Global styles
│   ├── abi.json              # Twitter contract ABI
│   └── userProfileabi.json    # Profile contract ABI
├── 📁 contract/                # Smart contracts
│   ├── Twitter.sol            # Main Twitter contract
│   └── UserProfile.sol        # User profile contract
├── package.json              # Dependencies
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
├── tsconfig.json           # TypeScript config
└── README.md              # This file
```

---

## 🌐 Deployment

### 📦 Build for Production

```bash
npm run build
```

### 🚀 Deployment Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Drag and drop the `dist` folder to Netlify
```

#### IPFS (Fully Decentralized)
```bash
npm run build
# Upload the `dist` folder to IPFS
```

### ⚙️ Environment Variables

Ensure these environment variables are set in your deployment:
- `VITE_CONTRACT_ADDRESS`: Deployed Twitter contract address
- `VITE_USER_PROFILE_CONTRACT_ADDRESS`: Deployed Profile contract address

---

## 🛠️ Development

### 🏃‍♂️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### 🧪 Testing Contracts

```bash
# Install Hardhat for testing
npm install --save-dev hardhat

# Run contract tests
npx hardhat test
```

### 🔄 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 🔐 Security

### 🛡️ Smart Contract Security

- **OpenZeppelin**: Uses battle-tested security patterns
- **Access Control**: Only registered users can interact
- **Input Validation**: Length limits and content validation
- **Event Logging**: All actions emit events for transparency

### 🔒 Frontend Security

- **Type Safety**: Full TypeScript implementation
- **Input Sanitization**: Protected against XSS attacks
- **Wallet Security**: Never stores private keys
- **HTTPS Only**: Secure communication protocols

---

## 📊 Technical Specifications

### ⚡ Performance

- **Build Time**: ~15 seconds
- **Bundle Size**: ~2MB (gzipped)
- **First Load**: <3 seconds
- **Transaction Time**: 15-30 seconds (depends on network)

### 🌍 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers with Web3 wallet support

### 🔗 Network Compatibility

- **Ethereum Mainnet**
- **Sepolia Testnet**
- **Polygon**
- **BSC** (Binance Smart Chain)
- **Avalanche**
- Any EVM-compatible network

---

## 🚨 Troubleshooting

### Common Issues

#### 🔴 "MetaMask not detected"
- Install MetaMask browser extension
- Refresh the page
- Enable the extension

#### 🔴 "Transaction failed"
- Check you have sufficient ETH for gas
- Increase gas limit manually
- Verify you're on the correct network

#### 🔴 "Contract not deployed"
- Verify contract addresses in `.env`
- Ensure contracts are deployed on current network
- Check ABI files are up to date

#### 🔴 "Profile not found"
- Create a profile before tweeting
- Wait for profile transaction to confirm
- Refresh the page


### 🌟 Show Your Support

If this project helped you, please consider:
- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs
- 💡 **Suggesting** new features
- 🤝 **Contributing** code improvements

