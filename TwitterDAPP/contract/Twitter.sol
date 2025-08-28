// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/access/Ownable.sol";


interface IProfile {
    struct UserProfile {
        string displayName;
        string bio;
    }
    function getProfile(address _user)  external view returns (UserProfile memory);
}

contract Twitter is Ownable {

    uint16 public MAX_TWEET_LENGTH = 280;

    struct Tweet {
        uint256 id;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
    }

    mapping(address => Tweet[]) public tweets;
    IProfile profileContract;
    Tweet[] public allTweets;

    constructor(address _profileContract) Ownable(msg.sender) {
        profileContract = IProfile(_profileContract);
    }

    modifier onlyRegistered() {
        IProfile.UserProfile memory userProfileTemp = profileContract.getProfile(msg.sender);
        require(bytes(userProfileTemp.displayName).length > 0, "User must be registered to perform this action.");
        _;
    }


    event NewTweetCreated(uint256 id, address author, string content, uint256 timestamp);
    event NewTweetLiked(address liker, address tweetAuthor, uint256 tweetId, uint256 newLikeCount);
    event NewTweetUnliked(address unliker, address tweetAuthor, uint256 tweetId, uint256 newLikeCount);


    /**
     * Updates the maximum allowed tweet length.
     *
     * @param newTweetLength The new maximum length (in characters) allowed for tweets.
     */
    function changeTweetLength(uint16 newTweetLength) public onlyOwner {
        MAX_TWEET_LENGTH = newTweetLength;
    }

    /**
     * Creates a new tweet for the caller.
     *
     * Requirements:
     * - Tweet content length must not exceed MAX_TWEET_LENGTH.
     *
     * @param _tweet The content of the tweet to be created.
     */
    function createTweet(string memory _tweet) public onlyRegistered {
        require(bytes(_tweet).length <= MAX_TWEET_LENGTH, "Tweet character length shouldn't be greater than 280 characters...");

        uint256 tweetId = tweets[msg.sender].length;
        Tweet memory newTweet = Tweet({
            id: tweetId,
            author: msg.sender,
            content: _tweet,
            timestamp: block.timestamp,
            likes: 0
        });

        tweets[msg.sender].push(newTweet);
        allTweets.push(newTweet);

        emit NewTweetCreated(newTweet.id, newTweet.author, newTweet.content, newTweet.timestamp);
    }

    /**
     * Adds a like to a specific tweet.
     *
     * Requirements:
     * - The tweet must exist.
     *
     * @param author The address of the tweet's author.
     * @param id The ID of the tweet to like.
     */
    function likeTweet(address author, uint256 id) external onlyRegistered {
        require(tweets[author][id].id == id, "Tweet does not exist");
        tweets[author][id].likes++;
        emit NewTweetLiked(msg.sender, author, id, tweets[author][id].likes);
    }

    /**
     * Returns the total number of likes across all tweets created by a specific author.
     *
     * @param _author The address of the tweet author.
     * @return totalLikes The sum of likes across all tweets of the given author.
     */
    function getTotalLikes(address _author) external view returns (uint256) {
        uint256 totalLikes;
        uint256 len = tweets[_author].length;
        for (uint256 i = 0; i < len; i++) {
            totalLikes += tweets[_author][i].likes;
        }
        return totalLikes;
    }

    /**
     * Removes a like from a specific tweet.
     *
     * Requirements:
     * - The tweet must exist.
     * - The tweet must have at least one like.
     *
     * @param author The address of the tweet's author.
     * @param id The ID of the tweet to unlike.
     */
    function unLikeTweet(address author, uint256 id) external onlyRegistered{
        require(tweets[author][id].id == id, "Tweet does not exist");
        require(tweets[author][id].likes > 0, "Tweet has already no likes");
        tweets[author][id].likes--;
        emit NewTweetUnliked(msg.sender, author, id, tweets[author][id].likes);
    }

    /**
     * Returns a specific tweet from a user by index.
     *
     * @param _owner The address of the tweet owner.
     * @param _i The index of the tweet to fetch.
     * @return The Tweet struct containing details of the tweet.
     */
    function getTweet(address _owner, uint _i) public view returns (Tweet memory) {
        return tweets[_owner][_i];
    }

    /**
     * Returns all tweets created by a specific user.
     *
     * @param _owner The address of the tweet owner.
     * @return An array of Tweet structs representing all tweets of the given owner.
     */
    function getAllTweets(address _owner) public view returns (Tweet[] memory) {
        return tweets[_owner];
    }

    /**
     *
     * Returns all tweets created by all users.
     * @return An array of Tweet structs representing all tweets of all the users.
     */
    function getAllTweetsGlobal() public view returns (Tweet[] memory) {
        return allTweets;
    }
}
