export const checkUserProfile = async (userProfileContract: any, account: string) => {
  try {
    const profile = await userProfileContract.methods.getProfile(account).call()
    return {
      profile,
      isRegistered: profile.displayName.length > 0
    }
  } catch (error) {
    console.error('Error checking user profile:', error)
    return { profile: null, isRegistered: false }
  }
}

export const loadTweets = async (contract: any, account: string) => {
  try {
    return await contract.methods.getAllTweets(account).call()
  } catch (error) {
    console.error('Error loading tweets:', error)
    return []
  }
}

export const createProfile = async (userProfileContract: any, account: string, displayName: string, bio: string) => {
  try {
    await userProfileContract.methods.setProfile(displayName, bio).send({ from: account })
  } catch (error) {
    console.error('Error creating profile:', error)
  }
}

export const createTweet = async (contract: any, account: string, content: string) => {
  try {
    await contract.methods.createTweet(content).send({ from: account })
  } catch (error) {
    console.error('Error creating tweet:', error)
  }
}

export const likeTweet = async (contract: any, account: string, author: string, tweetId: number) => {
  try {
    await contract.methods.likeTweet(author, tweetId).send({ from: account })
  } catch (error) {
    console.error('Error liking tweet:', error)
  }
}

export const unlikeTweet = async (contract: any, account: string, author: string, tweetId: number) => {
  try {
    await contract.methods.unLikeTweet(author, tweetId).send({ from: account })
  } catch (error) {
    console.error('Error unliking tweet:', error)
  }
}

export const getAllTweets = async (contract: any) => {
  try {
    return await contract.methods.getAllTweetsGlobal().call()
  } catch (error) {
    console.error('Error fetching all tweets:', error)
    return []
  }
}
