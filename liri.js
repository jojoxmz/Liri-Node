// require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');


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
			    	console.log(tweets[i].text);
			    	console.log("");
			    	console.log("=============");
			    }
		    }
		});
	}
}

var mySong= function(){
	console.log("Bruno, the dog?");
}

var myMovie= function(){
	console.log("Groundhod Day!");
}

var myRequest= function(){
	console.log("No! WRONG!");

}


//Main Process
//Be sure to google 'javascript switch case' to learn more!
var liriMagic = function(mediaType, content){
  switch(mediaType){
    case "my-tweets":

    	myTweets(content);
    	break;

    case "spotify-this-song":
    	mySong();
		break;

    case "movie-this":
    	myMovie();
		break;

    case "do-what-it-says":
		myRequest();
    	break;

    default:
    	console.log("NO! WRONG!")
  };
};

liriMagic(process.argv[2], process.argv[3]);