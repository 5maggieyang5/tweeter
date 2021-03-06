"use strict";

// Simulates the kind of delay we see with network or filesystem operations
/*const simulateDelay = require("./util/simulate-delay");*/

// Defines helper functions for saving and getting tweets, using the database `db`
const Mongo = require("mongodb");

module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, function (err, res){
        if (err) {
          console.log("in saving newTweet error");
          return callback(err);
        }
        callback(null, true);
      });
    },

    // Get all tweets in mongto-db
    getTweets: function (callback) {
      const sortNewestFirst = (a, b) => b.created_at - a.created_at;
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          console.log("in getting tweets error");
          return callback(err);
        }
        callback(null, tweets.sort(sortNewestFirst));
      });
    }
  }
}



