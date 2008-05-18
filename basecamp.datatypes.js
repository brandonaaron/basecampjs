/*!
 * A Basecamp API wrapper in JavaScript (http://code.google.com/p/basecampjs/)
 * 
 * Copyright (c) 2008 Brandon Aaron (brandonaaron.net)
 * Licensed under the MIT license (LICENSE.txt) 
 * 
 * Version: 0.1a
 */

// data types according to http://developer.37signals.com/basecamp/reference.shtml

Basecamp.Comment = function( comment ) {
	comment = comment || {};
	for ( var prop in comment )
		this[prop] = comment[prop];
	return this;
};
Basecamp.Comment.from_xml = function( xml ) {
	var comments = [], nodes = xml.getElementsByTagName('comment');
	for ( var i=0; i<nodes.length; i++ ) {
		var node = nodes[i];
		var comment = {
			id: parseInt( node.getAttribute('id'), 10 ),
			post_id:      Basecamp.nodeValue( 'post_id',      node ),
			creator_name: Basecamp.nodeValue( 'creator_name', node ),
			creator_id:   Basecamp.nodeValue( 'creator_id',   node ),
			body:         Basecamp.nodeValue( 'body',         node ),
			posted_on:    Basecamp.nodeValue( 'posted_on',    node )
		};
		comments.push( new Basecamp.Comment( comments ) );
	}
	return comments;
};


Basecamp.Company = function( company ) {
	company = company || {};
	for ( var prop in company )
		this[prop] = company[prop];
	return this;
};
Basecamp.Company.from_xml = function( xml ) {
	var companies = [], nodes = xml.getElementsByTagName('company');
	for ( var i=0; i<nodes.length; i++ ) {
		var node = nodes[i];
		var company = {
			id:                  Basecamp.nodeValue( 'id',                  node ),
			name:                Basecamp.nodeValue( 'name',                node ),
			address_one:         Basecamp.nodeValue( 'address-one',         node ),
			address_two:         Basecamp.nodeValue( 'address-two',         node ),
			city:                Basecamp.nodeValue( 'city',                node ),
			state:               Basecamp.nodeValue( 'state',               node ),
			zip:                 Basecamp.nodeValue( 'zip',                 node ),
			country:             Basecamp.nodeValue( 'country',             node ),
			web_address:         Basecamp.nodeValue( 'web-address',         node ),
			phone_number_office: Basecamp.nodeValue( 'phone-number-office', node ),
			phone_number_fax:    Basecamp.nodeValue( 'phone-number-fax',    node ),
			time_zone_id:        Basecamp.nodeValue( 'time-zone-id',        node ),
			can_see_private:     Basecamp.nodeValue( 'can-see-private',     node )
		};
		companies.push( new Basecamp.Company( company ) );
	}
	return companies;
};


Basecamp.FileCategory = function( file_category ) {
	file_category = file_category || {};
	for ( var prop in file_category )
		this[prop] = file_category[prop];
	return this;
};
Basecamp.FileCategory.from_xml = function( xml ) {
	var file_categories = [], nodes = xml.getElementsByTagName('attachment-category');
	for ( var i=0; i<nodes.length; i++ ) {
		var node = nodes[i];
		var file_category = {
			id:             Basecamp.nodeValue( 'id',             node ),
			name:           Basecamp.nodeValue( 'name',           node ),
			project_id:     Basecamp.nodeValue( 'project-id',     node ),
			elements_count: Basecamp.nodeValue( 'elements-count', node )
		};
		file_categories.push( new Basecamp.FileCategory( file_category ) );
	}
	return file_categories;
};


Basecamp.MessageCategory = function( message_category ) {
	message_category = message_category || {};
	for ( var prop in message_category )
		this[prop] = message_category[prop];
	return this;
};
Basecamp.MessageCategory.from_xml = function( xml ) {
	var message_categories = [], nodes = xml.getElementsByTagName('post-category');
	for ( var i=0; i<nodes.length; i++ ) {
		var node = nodes[i];
		var message_category = {
			id:             Basecamp.nodeValue( 'id',             node ),
			name:           Basecamp.nodeValue( 'name',           node ),
			project_id:     Basecamp.nodeValue( 'project-id',     node ),
			elements_count: Basecamp.nodeValue( 'elements-count', node )
		};
		message_categories.push( new Basecamp.MessageCategory( message_category ) );
	}
	return message_categories;
};


Basecamp.Milestone = function( milestone ) {
	milestone = milestone || {};
	for ( var prop in milestone )
		this[prop] = milestone[prop];
	return this;
};
Basecamp.Milestone.from_xml = function( xml ) {
	var milestones = [], nodes = xml.getElementsByTagName('milestone');
	for ( var i=0; i<nodes.length; i++ ) {
		var node = nodes[i];
		var milestone = {
			id:                     Basecamp.nodeValue( 'id',                    node ),
			title:                  Basecamp.nodeValue( 'title',                 node ),
			deadline:               Basecamp.nodeValue( 'deadline',              node ),
			completed:              Basecamp.nodeValue( 'completed',             node ),
			project_id:             Basecamp.nodeValue( 'project-id',            node ),
			created_on:             Basecamp.nodeValue( 'created-on',            node ),
			creator_id:             Basecamp.nodeValue( 'creator-id',            node ),
			responsible_party_id:   Basecamp.nodeValue( 'responsible-party-id',  node ),
			responsible_party_type: Basecamp.nodeValue( 'responsible-part-type', node ),
			completed_on:           Basecamp.nodeValue( 'completed-on',          node ),
			completer_id:           Basecamp.nodeValue( 'completer-id',          node )
		};
		milestones.push( new Basecamp.Milestone( milestone ) );
	}
	return milestones;
};


Basecamp.Person = function( person ) {
	person = person || {};
	for ( var prop in person )
		this[prop] = person[prop];
	return this;
};
Basecamp.Person.from_xml = function( xml ) {
	var people = [], nodes = xml.getElementsByTagName('person');
	for ( var i=0; i<nodes.length; i++ ) {
		var node = nodes[i];
		var person = {
			id:                         Basecamp.nodeValue( 'id',                         node ),
			first_name:                 Basecamp.nodeValue( 'first-name',                 node ),
			last_name:                  Basecamp.nodeValue( 'last-name',                  node ),
			title:                      Basecamp.nodeValue( 'title',                      node ),
			email_address:              Basecamp.nodeValue( 'email-adress',               node ),
			im_handle:                  Basecamp.nodeValue( 'im-handle',                  node ),
			im_service:                 Basecamp.nodeValue( 'im-service',                 node ),
			phone_number_office:        Basecamp.nodeValue( 'phone-number-office',        node ),
			phone_number_office_ext:    Basecamp.nodeValue( 'phone-number-office-ext',    node ),
			phone_number_mobile:        Basecamp.nodeValue( 'phone-number-mobile',        node ),
			phone_number_home:          Basecamp.nodeValue( 'phone-number-home',          node ),
			phone_number_fax:           Basecamp.nodeValue( 'phone-number-fax',           node ),
			last_login:                 Basecamp.nodeValue( 'last-login',                 node ),
			client_id:                  Basecamp.nodeValue( 'clien-id',                   node ),
			user_name:                  Basecamp.nodeValue( 'user-name',                  node ),
			password:                   Basecamp.nodeValue( 'password',                   node ),
			token:                      Basecamp.nodeValue( 'token',                      node ),
			administrator:              Basecamp.nodeValue( 'administrator',              node ),
			deleted:                    Basecamp.nodeValue( 'deleted',                    node ),
			has_access_to_new_projects: Basecamp.nodeValue( 'has-access-to-new-projects', node )
		};
		people.push( new Basecamp.Person( person ) );
	}
	return people;
};


Basecamp.Post = function( post ) {
	post = post || {};
	for ( var prop in post )
		this[prop] = post[prop];
	if ( this.use_textile === undefined ) this.use_textile = 1;
	return this;
};
Basecamp.Post.from_xml = function( xml ) {
	var posts = [], nodes = xml.getElementsByTagName('post');
	for ( var i=0; i<nodes.length; i++ ) {
		var node = nodes[i];
		var post = {
			id:                     Basecamp.nodeValue( 'id',                    node ),
			title:                  Basecamp.nodeValue( 'title',                 node ),
			body:                   Basecamp.nodeValue( 'body',                  node ),
			posted_on:              Basecamp.nodeValue( 'posted-on',             node ),
			project_id:             Basecamp.nodeValue( 'project-id',            node ),
			category_id:            Basecamp.nodeValue( 'category-id',           node ),
			author_id:              Basecamp.nodeValue( 'author-id',             node ),
			milestone_id:           Basecamp.nodeValue( 'milestone-id',          node ),
			comments_count:         Basecamp.nodeValue( 'comments-count',        node ),
			attachments_count:      Basecamp.nodeValue( 'attachments-count',     node ),
			use_textile:            Basecamp.nodeValue( 'use-textile',           node ),
			extended_body:          Basecamp.nodeValue( 'extended-body',         node ),
			display_body:           Basecamp.nodeValue( 'display-body',          node ),
			display_exteneded_body: Basecamp.nodeValue( 'display-extended-body', node ),
			private:                Basecamp.nodeValue( 'private',               node )
		};
		posts.push( new Basecamp.Post( post ) );
	}
	return posts;
};


Basecamp.Project = function( project ) {
	project = project || {};
	for ( var prop in project )
		this[prop] = project[prop];
	return this;
};
Basecamp.Project.from_xml = function( xml ) {
	var projects = [], nodes = xml.getElementsByTagName('project');
	for ( var i=0; i<nodes.length; i++ ) {
		var node = nodes[i], company = node.getElementsByTagName('company')[0];
		var project = {
			id:                Basecamp.nodeValue( 'id',                node ),
			name:              Basecamp.nodeValue( 'name',              node ),
			created_on:        Basecamp.nodeValue( 'created-on',        node ),
			status:            Basecamp.nodeValue( 'status',            node ),
			last_changed_on:   Basecamp.nodeValue( 'last-changed-on',   node ),
			company: {
				id:   Basecamp.nodeValue( 'id',   company ),
				name: Basecamp.nodeValue( 'name', company )
			},
			accouncement:      Basecamp.nodeValue( 'accouncement',      node ),
			start_page:        Basecamp.nodeValue( 'start-page',        node ),
			show_writeboards:  Basecamp.nodeValue( 'show-writeboards',  node ),
			show_announcement: Basecamp.nodeValue( 'show-announcement', node )
		};
		projects.push( new Basecamp.Project( project ) );
	}
	return projects;
};


Basecamp.TimeEntry = function( time_entry ) {
	time_entry = time_entry || {};
	for ( var prop in time_entry )
		this[prop] = time_entry[prop];
	return this;
};
Basecamp.TimeEntry.from_xml = function( xml ) {
	var time_entries = [], nodes = xml.getElementsByTagName('time-entry');
	for ( var i=0; i<nodes.length; i++ ) {
		var node = nodes[i];
		var time_entry = {
			id:           Basecamp.nodeValue( 'id',              node ),
			project_id:   Basecamp.nodeValue( 'project-id',      node ),
			person_id:    Basecamp.nodeValue( 'person-id',       node ),
			date:         Basecamp.nodeValue( 'date',            node ),
			house:        Basecamp.nodeValue( 'hours',           node ),
			description:  Basecamp.nodeValue( 'description',     node ),
			todo_item_id: Basecamp.nodeValue( 'todo-item-entry', node )
		};
		time_entries.push( new Basecamp.TimeEntry( time_entry ) );
	}
	return time_entries;
};


Basecamp.TodoItem = function( todo_item ) {
	todo_item = todo_item || {};
	for ( var prop in todo_item )
		this[prop] = todo_item[prop];
	return this;
};
Basecamp.TodoItem.from_xml = function( xml ) {
	var todo_items = [], nodes = xml.getElementsByTagName('todo-item');
	for ( var i=0; i<nodes.length; i++ ) {
		var node = nodes[i];
		var todo_item = {
			id:                     Basecamp.nodeValue( 'id',                    node ),
			content:                Basecamp.nodeValue( 'content',               node ),
			position:               Basecamp.nodeValue( 'position',              node ),
			created_on:             Basecamp.nodeValue( 'created_on',            node ),
			creator_id:             Basecamp.nodeValue( 'creator_id',            node ),
			completed:              Basecamp.nodeValue( 'completed',             node ),
			responsible_party_type: Basecamp.nodeValue( 'responsible-part-type', node ),
			responsible_party_id:   Basecamp.nodeValue( 'responsible-part-id',   node ),
			completed_on:           Basecamp.nodeValue( 'completed-on',          node ),
			completer_id:           Basecamp.nodeValue( 'completer-id',          node )
		};
		todo_items.push( new Basecamp.TodoItem( todo_item ) );
	}
	return todo_item;
};


Basecamp.TodoList = function( todo_list ) {
	todo_list = todo_list || {};
	for ( var prop in todo_list )
		this[prop] = todo_list[prop];
	return this;
};
Basecamp.TodoList.from_xml = function( xml ) {
	var todo_lists = [], nodes = xml.getElementsByTagName('todo-list');
	for ( var i=0; i<nodes.length; i++ ) {
		var node = nodes[i], todo_items = node.getElementsByTagName('todo-items')[0];
		var todo_list = {
			id:           Basecamp.nodeValue( 'id',           node ),
			name:         Basecamp.nodeValue( 'name',         node ),
			description:  Basecamp.nodeValue( 'description',  node ),
			project_id:   Basecamp.nodeValue( 'project-id',   node ),
			milestone_id: Basecamp.nodeValue( 'milestone-id', node ),
			position:     Basecamp.nodeValue( 'position',     node ),
			private:      Basecamp.nodeValue( 'private',      node ),
			todo_items: todo_items && Basecamp.TodoItems.from_xml( todo_items )
		};
		todo_lists.push( new Basecamp.TodoList( todo_list ) );
	}
	return todo_lists;
};


Basecamp.nodeValue = function( tagName, parent, type ) {
	var value = "", tag = parent.getElementsByTagName( tagName )[0];
	if ( tag && tag.firstChild ) {
		value = tag.firstChild.nodeValue;
		
		switch( tag.getAttribute('type') || type ) {
			case "integer":
				value = parseInt( value, 10 );
				break;
			case "boolean":
				value = value == "true" || value == "1" ? true : false;
				break;
		};
	}
	return value;
};