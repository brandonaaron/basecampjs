# basecampjs

This is a JavaScript wrapper for the Basecamp API. It covers everything in the API except file attachments for comments and messages. For the API to work it has to be used in an environment like AIR where cross-domain XMLHttpRequest calls are allowed.

Here is an example of getting back an Array of projects from Basecamp.

    var basecamp = new Basecamp("your.basecamp.url", "user_name", "password");
    basecamp.projects({
    	success: function( projects_xml ) {
    		var projects = Basecamp.Project.from_xml( projects_xml );
    		alert( projects.length );
    	}
    };

Here is an example of how to create a new message assuming you've already used the API to retrieve the desired project_id, message_category_id and person_id.

    var message = new Basecamp.Message({
    	title: "Testing from API",
    	body: "This is a test from the JavaScript API wrapper.",
    	category_id: message_category_id
    });
    basecamp.post_message( project_id, message, [person_id], {
    	success: function( message_xml ) {
    		var message = Basecamp.Message.from_xml( message_xml )[0];
    		alert( message.id );
    	}
    });


## Why?

I finally found some time to explore Adobe AIR and thought ... "Hey, why don't I write an AIR app for Basecamp." The first step was to write this API wrapper/adapter so that I could easily communicate with Basecamp.


## Roadmap

If I continue to find time (and have a Basecamp account to play with) this API will surely evolve as I begin to use the different parts while building the AIR app. Beware that as it stands right now this API wrapper is mostly untested.

I'm particularly anxious to add the file uploading for messages and comments.


## Documentation

First place to look is the actual [Basecamp API documentation](http://developer.37signals.com/basecamp/index.shtml). Currently this API follows their [Ruby wrapper](http://developer.37signals.com/basecamp/basecamp.rb) very closely. Other than that ... its all code for now. :)


## License

Licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) license.

Copyright (c) 2008 [Brandon Aaron](http://brandonaaron.net)