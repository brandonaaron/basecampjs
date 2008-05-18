/*!
 * A Basecamp API wrapper in JavaScript (http://code.google.com/p/basecampjs/)
 * 
 * Copyright (c) 2008 Brandon Aaron (brandonaaron.net)
 * Licensed under the MIT license (LICENSE.txt) 
 * 
 * Version: 0.1a
 */

// based on the original Ruby wrapper http://developer.37signals.com/basecamp/basecamp.rb

function Basecamp( url, user_name, password ) {
	
	this.request = function( path, callbacks, request_xml ) {
		post( path, callbacks, request_xml );
	};
	
	
	/*** private ***/
	
	/* Creates a new connection
	 * path = "/projects/list"
	 */
	function connect(path) {
		var connection = new XMLHttpRequest();
		connection.open( "POST", url + path, true, user_name, password );
		return connection;
	};
	
	/* Sets headers on given connection.
	 * connection = XMLHttpRequest
	 * headers = {}
	 */
	function set_headers(connection, headers) {
		headers = headers || {};
		headers["Content-Type"] = headers["Content-Type"] || "application/xml";
		headers["Accept"] = headers["Accept"] || "application/xml";
		for ( var header in headers )
			connection.setRequestHeader( header, headers[header] );
	};
	
	/* Sends request to server
	 * path = "/projects/list"
	 * callbacks = { success: fn, error: fn }
	 * body = XML
	 * headers = {}
	 */
	function post(path, callbacks, body, headers) {
		var connection = connect( path );
		set_headers( connection, headers );
		connection.onreadystatechange = function() {
			if ( connection.readyState == 4 )
				if ( connection.status == 200 ) {
					air.Introspector.Console.dump( connection.responseText );
					callbacks["success"]( connection.responseXML );
				} else
					(callbacks["error"] || error)( connection.status, connection.statusText );
		};
		connection.send( body );
	};
	
	/* Callback to report an error */
	function error(code, message) {
		alert('Error ' + code + ': ' + message);
	};
	
	return this;
};

Basecamp.version = "0.1a";

Basecamp.prototype = {
	projects: function( callbacks ) {
		this.request( "/project/list", callbacks );
	},
	
	message_categories: function( project_id, callbacks ) {
		this.request( "/projects/"+project_id+"/post_categories", callbacks );
	},
	
	file_categories: function( project_id, callbacks ) {
		this.request( "/projects/"+project_id+"/attachment_categories", callbacks );
	},
	
	company: function( id ) {
		this.request( "/contacts/company/"+id );
	},
	
	people: function( company_id, project_id, callbacks ) {
		if ( !callbacks && project_id && project_id["success"] )
			callbacks = project_id, project_id = undefined;
		var url = project_id !== undefined ? "/projects/"+project_id : "";
		url += "/contacts/people/"+company_id;
		this.request( url, callbacks );
	},
	
	person: function( id, callbacks ) {
		this.request( "/contacts/person/"+id, callbacks );
	},
	
	message: function( id, callbacks ) {
		id = id.constructor == Array ? id.join[','] : id;
		this.request( "/msg/get/"+id, callbacks );
	},
	
	message_list: function( project_id, category_id, callbacks ) {
		if ( !callbacks && category_id && category_id["success"] )
			callbacks = category_id, category_id = undefined;
			
		var url = "/projects/"+project_id+"/msg";
		if ( category_id !== undefined )
			url += "/cat/"+category_id;
		url += "/archive";
		
		this.request( url, callbacks );
	},
	
	post_message: function( project_id, post, notify, callbacks ) {
		if ( !callbacks && notify && notify["success"] )
			callbacks = notify, notify = undefined;
			
		var request = ["<request>"];
			request.push("<post>");
				request.push("<category-id>" + post.category_id + "</category-id>");
				request.push("<title>" + post.title + "</title>");
				request.push("<body>" + post.body + "</body>");
				request.push("<extended-body>" + (post.extended_body || "") + "</extended-body>");
				post.use_textile && request.push("<use-textile>1</use-textile>");
				request.push("<private>" + post.private + "</private>");
			request.push("</post>");
			for ( var i=0; i<notify.length; i++ )
				request.push("<notify>" + notify[i] + "</notify>");
		request.push("</request>");
		
		this.request( "/projects/"+project_id+"/msg/create", callbacks, request.join('') );
	},
	
	update_message: function( id, post, notify, callbacks ) {
		if ( !callbacks && notify && notify["success"] )
			callbacks = notify, notify = undefined;
		
		var request = ["<request>"];
			request.push("<post>");
				request.push("<category-id>" + post.category_id + "</category-id>");
				request.push("<title>" + post.title + "</title>");
				request.push("<body>" + post.body + "</body>");
				request.push("<extended-body>" + (post.extended_body || "") + "</extended-body>");
				post.use_textile && request.push("<use-textile>1</use-textile>");
				request.push("<private>" + post.private + "</private>");
			request.push("</post>");
			for ( var i=0; i<notify.length; i++ )
				request.push("<notify>" + notify[i] + "</notify>");
		request.push("</request>");
		
		this.request( "/msg/update/" + id, callbacks, request.join('') );
	},
	
	delete_message: function( id, callbacks ) {
		this.request( "/msg/delete/" + id, callbacks );
	},
	
	comments: function( post_id, callbacks ) {
		this.request( "/msg/comments/" + post_id, callbacks );
	},
	
	comment: function( id, callbacks ) {
		this.request( "/msg/comment/" + id, callbacks );
	},
	
	create_comment: function( post_id, comment, callbacks ) {
		var request = ["<request>"];
			request.push("<comment>");
				request.push("<post-id>" + post_id + "</post-id>");
				request.push("<body>" + comment.body + "</body>");
			request.push("</comment>");
		request.push("</request>");
		
		this.request( "/msg/create_comment", callbacks, request.join('') );
	},
	
	update_comment: function( id, comment, callbacks ) {
		var request = ["<request>"];
			request.push("<comment-id>" + id + "</comment-id>");
			request.push("<comment>");
				request.push("<body>" + comment.body + "</body>");
			request.push("</comment>");
		request.push("</request>");
		
		this.request( "/msg/update_comment", callbacks, request.join('') );
	},
	
	delete_comment: function( id, callbacks ) {
		this.request( "/msg/delete_comment/" + id, callbacks );
	},
	
	/******
	 * TODO LISTS AND ITEMS
	 ******/
	complete_item: function( id ) {
		this.request( "/todos/complete_item/" + id );
	},
	
	uncomplete_item: function( id ) {
		this.request( "/todos/uncompelte_item/" + id );
	},
	
	create_item: function( list_id, item, notify, callbacks ) {
		var request = ["<request>"];
			request.push("<content>" + item.content + "</content>");
			request.push("<responsible-party>" + item.responsible_party_id + "</responsible-party>");
			request.push("<notify>" + notify + "</notify>");
		request.push("</request>");
		
		this.request( "/todos/create_item/" + list_id, callbacks, request.join('') );
	},
	
	create_list: function( project_id, list, callbacks ) {
		var request = ["<request>"];
			request.push("<milestone-id>" + list.milestone_id + "</milestone-id>");
			request.push("<private>" + list.private + "</private>");
			request.push("<tracked>" + list.tracked + "</tracked>");
			request.push("<name>" + list.name + "</name>");
			request.push("<description>" + list.description + "</description>");
			request.push("<use-template>" + list.use_template + "</use-template>");
			request.push("<template-id>" + list.template_id + "</template-id>");
		request.push("</request>");
		this.request( "/projects/" + project_id + "/todos/create_list", callbacks, request.join('') );
	},
	
	delete_item: function( id, callbacks ) {
		this.request( "/todos/delete_item/" + id, callbacks );
	},
	
	delete_list: function( id, callbacks ) {
		this.request( "/todos/delete_list/" + id, callbacks );
	},
	
	get_list: function( id, callbacks ) {
		this.request( "/todos/list/" + id, callbacks );
	},
	
	lists: function( project_id, callbacks ) {
		this.request( "/projects/" + project_id + "/todos/lists", callbacks );
	},
	
	completed_lists: function( project_id, callbacks ) {
		var request = ["<request>"];
			request.push("<completed>true</completed>");
		request.push("</request>");
		
		this.request( "/projects/" + project_id + "/todos/lists", callbacks, request.join('') );
	},
	
	move_item: function( id, to, callbacks ) {
		var request = ["<request>"];
			request.push("<to>" + to + "</to>");
		request.push("</request>");
		
		this.request( "/todos/move_item/" + id, callbacks, request.join('') );
	},
	
	move_list: function( id, to, callbacks ) {
		var request = ["<request>"];
			request.push("<to>" + to + "</to>");
		request.push("</request>");
		
		this.request( "/todos/move_list/" + id, callbacks, request.join('') );
	},
	
	update_item: function( id, item, notify, callbacks ) {
		var request = ["<request>"];
			request.push("<item>");
				request.push("<content>" + item.content + "</content>");
			request.push("</item>");
			request.push("<responsible-party>" + item.responsible_party_id + "</responsible-party>");
			request.push("<notify>" + notify + "</notify>");
		this.request( "/todos/update_item/" + id, callbacks, request.join('') );
	},
	
	update_list: function( id, list, callbacks ) {
		var request = ["<request>"];
			request.push("<list>");
				request.push("<name>" + list.name + "</name>");
				request.push("<description>" + list.description + "</description>");
				request.push("<milestone-id>" + list.milestone_id + "</milestone-id>");
				request.push("<private>" + list.private + "</private>");
				request.push("<tracked>" + list.tracked + "</tracked>");
			request.push("</list>");
		request.push("</request>");
		
		this.request( "/todos/update_list/" + id, callbacks, request.join('') );
	},
	
	/******
	 * MILESTONES
	 ******/
	
	complete_milestone: function( id, callbacks ) {
		this.request( "/milestones/complete/" + id, callbacks );
	},
	
	create_milestone: function( project_id, milestone, notify, callbacks ) {
		var request = ["<request>"];
			request.push("<milesone>");
				request.push("<title>" + milestone.title + "</title>");
				request.push("<deadline>" + milestone.deadline + "</deadline>");
				request.push("<responsible-party>" + milestone.responsible_party_id + "</responsible-party>");
				request.push("<notify>" + notify + "</notify>");
			request.push("</milestone>");
		request.push("</request>");
		
		this.request( "/projects/" + project_id + "/milestones/create", callbacks, request.join('') );
	},
	
	delete_milestone: function( id, callbacks ) {
		this.request( "/milestones/delete/" + id, callbacks );
	},
	
	milestones: function( project_id, filter, callbacks ) {
		if ( !callbacks && filter && filter["success"] )
			callbacks = filter, filter = "all";
		
		var request = ["<request>"];
			request.push("<find>" + filter + "</find>");
		request.push("</request>");
		
		this.request( "/projects/" + project_id + "/milestones/list", callbacks, request.join('') );
	},
	
	uncomplete_milestone: function( id, callbacks ) {
		this.request( "/milestones/uncomplete/" + id, callbacks );
	},
	
	update_milestone: function( id, milestone, notify, move_upcoming, move_upcoming_off_weekends, callbacks ) {
		var request = ["<request>"];
			request.push("<milestone>")
				request.push("<title>" + milestone.title + "</title>");
				request.push("<deadline>" + milestone.deadline + "</deadline>");
				request.push("<responsible-party>" + milestone.responsible_party_id + "</responsible-party>");
				request.push("<notify>" + notify + "</notify>");
			request.push("</milestone>");
			request.push("<move-upcoming-milestones>" + ( move_upcoming == true ? true : false ) + "</move-upcoming-milestones>" );
			request.push("<move-upcoming-milestones-off-weekends>" + ( move_upcoming_off_weekends == true ? true : false ) + "</move-upcoming-milestones-off-weekends>" );
		request.push("</request>");
		
		this.request( "/milestones/update/" + id, callbacks, request.join('') );
	}
};