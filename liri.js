// require("dotenv").config();

var keys = require("./keys.js");

console.log(keys);

var myTweets= function(){
	console.log("tweet tweet");
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
    	myTweets();
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