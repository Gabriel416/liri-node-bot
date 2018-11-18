console.log("load successful");
//dependencies
var fs = require("fs");
var inquirer = require("inquirer");
var request = require("request");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");

//twitter api keys
var client = new Twitter({
  consumer_key: "your_key",
  consumer_secret: "your_secret",
  access_token_key: "your_token",
  access_token_secret: "your_secret"
});

inquirer
  .prompt([
    //Giving user choice of viewing tweets.
    {
      type: "confirm",
      message: "Would you like to view gabriel's latest tweets?",
      name: "confirm",
      default: true
    }
  ])
  .then(function(user) {
    // if user says yes, show latest tweets.
    if (user.confirm) {
      var params = { screen_name: "gferguson416" };
      client.get("statuses/user_timeline/", params, function(
        error,
        tweets,
        response
      ) {
        if (!error) {
          for (var i = 0; i < tweets.length; i++) {
            console.log(
              "====================================" +
                "\nLatest Tweets -> " +
                tweets[i].text +
                "\n===================================="
            );
          }
        }
        //after 5 seconds ask spotify question
        var timer = setTimeout(spotApi, 5000);
      });
    }
    // show following message if user says no.
    else {
      console.log("You will be taken to the next question.");
      //after 3 seconds ask spotify question
      var timer = setTimeout(spotApi, 3000);
    }
  });

//Ask which song the user would like to know more about?
function spotApi() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "song",
        message: "What song would you like info on?"
      }
      //User the user's answer to plug into npm parameter.
    ])
    .then(function(answer) {
      spotify.search({ type: "track", query: answer.song }, function(
        err,
        data
      ) {
        if (err) {
          console.log("Error occurred: " + err);
          return;
        }
        //display song name, album name, and preview url.
        for (var i = 0; i < 1; i++) {
          console.log("");
          console.log("=====================");
          console.log("Track name: " + data.tracks.items[i].name);
          console.log("Album: " + data.tracks.items[i].album.name);
          console.log("Preview Link: " + data.tracks.items[i].preview_url);
        }
        //display artist name.
        for (var j = 0; j < 1; j++) {
          console.log("Artist: " + data.tracks.items[i].artists[j].name);
          console.log("=====================");
          console.log("");
        }
      });
    });
  var timer2 = setTimeout(omdbApi, 9000);
}

//Ask a movie question.
function omdbApi() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "movie",
        message: "What movie would you like to know more about?"
      }
      //use the user's answer for queryUrl.
    ])
    .then(function(answer) {
      var queryUrl =
        "http://www.omdbapi.com/?t=" + answer.movie + "&y=&plot=short&r=json";
      request(queryUrl, function(error, response, body) {
        // If the request is successful, log movie info
        if (!error) {
          console.log("Title: " + JSON.parse(body).Title);
          console.log("Year: " + JSON.parse(body).Year);
          console.log("Actors: " + JSON.parse(body).Actors);
          console.log("Language: " + JSON.parse(body).Language);
          console.log("Rating: " + JSON.parse(body).imdbRating);
          console.log("");
          console.log("Plot: " + JSON.parse(body).Plot);
        } else if (error) {
          console.log("An error has occured.");
          return;
        }
      });
    });
  var timer3 = setTimeout(goodBye, 12000);
}

function goodBye() {
  console.log("");
  console.log(
    "------------------" +
      "\n Thank you for checking out my node terminal app!" +
      "\n ------------------"
  );
}
