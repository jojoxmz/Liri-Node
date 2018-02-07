var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

console.log(keys);

var myTweets= function(newTweet){

	var client = new Twitter(keys.twitter);
	var params = {screen_name: 'codemasterjz'};

	if(newTweet){
		//do this if user provides new tweet
		// console.log("You want to Tweet out: " + newTweet);

		client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
			if(error) throw error;
			console.log(tweet);  // Tweet body. 
			console.log(response);  // Raw response object. 
		});

	} else{
		//else print out 20 latest tweets

		client.get('statuses/user_timeline', params, function(error, tweets, response) {
		  	if (!error) {
				var tweetCount = (tweets.length >= 20) ? 20 : tweets.length;

		    // console.log(tweets);
			    for (var i=0; i < tweetCount; i++){
			    	console.log("");
			    	console.log("My tweet: " + tweets[i].text);
			    	console.log("Time created: " + tweets[i].created_at);
			    	console.log("");
			    	console.log("=============");
			    }
		    }
		});
	}
}

var mySong= function(newSong){

	var spotify = new Spotify({
		id: "1b802a33121742198bf4b01759183645",
		secret: "05fe078860a34d4fb103b4d1f3b10d8c"
	});

	if(!newSong){
		newSong= "The Sign Ace of Base";
	};

	spotify.search({ type: 'track', query: newSong }, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}

		console.log("=============");
 		console.log("");
 		console.log("Song name: " + data.tracks.items[0].name);
		console.log("Artist name: " + data.tracks.items[0].album.artists[0].name);
		console.log("Album name: " + data.tracks.items[0].album.name);
		console.log("Preview link: " + data.tracks.items[0].preview_url);
		console.log("");
    	console.log("=============");
 	});

};

var myMovie= function(newMovie){

	if(!newMovie){
		newMovie= "Mr.Nobody"
	};

	var queryUrl = "http://www.omdbapi.com/?t=" + newMovie + "&y=&plot=short&apikey=trilogy";

	request(queryUrl, function(error, response, body) {

		// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode === 200) {

		console.log("=============");
 		console.log("");
		console.log("Title: " + JSON.parse(body).Title);
		console.log("Year: " + JSON.parse(body).Year);
		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		console.log("Country Produced: " + JSON.parse(body).Country);
		console.log("Language of Movie: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Actors: " + JSON.parse(body).Actors);

			if (!JSON.parse(body).Ratings[1]){
				console.log("No Rotten Tomatoe Review Found!");
			}else{
				console.log("Rotten Tomatoe Rating: " + JSON.parse(body).Ratings[1].Value);
			};

		console.log("");
    	console.log("=============");

		}
	});
};

var myRequest= function(){
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
		return console.log(error);
		}

		// We will then print the contents of data
		console.log(data);

		// Then split it by commas (to make it more readable)
		var dataArr = data.split(",");

		// We will then re-display the content as an array for later use.
		liriMagic(dataArr[0], dataArr[1]);
	});
};

//Main Process
//Be sure to google 'javascript switch case' to learn more!
var liriMagic = function(mediaType, content){
  switch(mediaType){
    case "my-tweets":
    	myTweets(content);
    	break;

    case "spotify-this-song":
    	mySong(content);
  		break;

    case "movie-this":
    	myMovie(content);
		break;

    case "do-what-it-says":
		myRequest(content);
    	break;

    default:
    	console.log("NO! WRONG!")
  };

  	var fromTerminal= 

	fs.appendFile(log, "fromTerminal", function(err) {

	// If an error was experienced we say it.
	if (err) {
	console.log(err);
	}

	// If no error is experienced, we'll log the phrase "Content Added" to our node console.
	else {
	console.log("Content Added!");
	}

	});
};

liriMagic(process.argv[2], process.argv[3]);