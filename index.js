/**
 * Created by Keith Morris on 8/17/15.
 */
"use strict";

var async = require('async'),
	JiraApi = require('jira').JiraApi,
	JiraFacade,
	jira;

module.exports = JiraFacade = function (config) {
	if (!config.protocol || !config.host || !config.username || !config.password) {
		throw new Error('protocol, host, username and password are required.');
	}
	if (!config.port) {
		config.port = (config.protocol.toLowerCase() === 'https') ? 443 : 80;
	}
	config.apiVersion = config.apiVersion || 2;
	this.jira = jira = new JiraApi(config.protocol, config.host, config.port, config.username, config.password, config.apiVersion);
};

// ********************************************************************
// Instance Methods
// ********************************************************************
(function () {
	this.createIssue = function (options, callback) {
		var that = this,
			payload = {};
		async.waterfall([
			// get Priority
			function (next) {
				that.getPriorityByName(options.priority, handleGetPriority(payload, next));
			},
			// get project, issueType, versions and components
			function (payload, next) {
				jira.getProject(options.project, handleGetProject(options, payload, next));
			},
			// create Issue
			function (payload, next) {
				var issueOptions = createIssueOptions(payload, options);

				jira.addNewIssue(issueOptions, function (err, issue) {
					if (err) {
						return next(err);
					} else {
						next(null, issue);
					}
				});
			}
		], function (err, payload) {
			callback(err, payload);
		});
	};

	this.getVersionByName = function (project, versionName, callback) {
		jira.getVersions(project, filterVersionsByName(versionName, callback));
	};

	this.getPriorityByName = function (priorityName, callback) {
		jira.listPriorities(filterPrioritiesByName(priorityName, callback));
	};

	this.getPriorityById = function (priorityId, callback) {
		priorityId = parseInt(priorityId);
		// if it is not a number, error
		if (!isNumeric(priorityId)) {
			callback('Priority ID must be numeric.');
			return;
		}

		jira.listPriorities(filterPrioritiesById(priorityId, callback));
	};

	this.getIssueTypeByName = function (issueTypeName, callback) {
		if (!issueTypeName) {
			return callback('Issue Type Name must be a non-zero length string.');
		}
		jira.listIssueTypes(filterIssueTypesByName(issueTypeName, callback));
	};

	this.addWatcher = function (issueKey, username, callback) {

		var options = {
			rejectUnauthorized: this.jira.strictSSL,
			uri: this.jira.makeUri('/issue/' + issueKey + '/watchers'),
			method: 'POST',
			followAllRedirects: true,
			json: true,
			body: JSON.stringify(username)
		};

		this.jira.doRequest(options, function (error, response) {
			if (error) {
				return callback(error);
			}

			if (response.statusCode === 404) {
				return callback('Invalid URL');
			}

			if (response.statusCode !== 204) {
				return callback(response.statusCode + ': Unable to connect to JIRA to add user as watcher.');
			}
			return callback(null, 'Successfully added ' + username + ' as a watcher.');
		});

	};

	this.addWatchersToIssue = this.addWatcher.bind(this);

}.call(JiraFacade.prototype));

// ********************************************************************
// Utility Methods and Handlers
// ********************************************************************
function getComponentsFromProject(componentNames, project) {
	return getItemsFromProject(componentNames, project, 'component');
}

function getVersionsFromProject(versionNames, project) {
	return getItemsFromProject(versionNames, project, 'version');
}

function getItemsFromProject(itemNames, project, itemType, required) {
	if ((typeof itemNames).toLowerCase() === "string") {
		itemNames = [itemNames];
	}
	if (!Array.isArray(itemNames)) {
		throw Error('Item Names argument must be a ' + itemType + ' name string or an array of ' + itemType + ' name strings');
	}
	var returnItems = [];
	itemNames.forEach(function (item, idx, arr) {
		if (!item) {
			throw Error(itemType + ' name must be a non-zero length string.');
		}
	});

	if (!project || (typeof project).toLowerCase() !== 'object' || !project.issueTypes) {
		throw Error('Project parameter must be a valid Jira project object with Issue Types');
	}

	var matches = project[itemType + 's'].filter(function (projectItem) {
		return itemNames
				.map(function (item) {
					return item.toLowerCase();
				})
				.indexOf(projectItem.name.toLowerCase()) !== -1;
		//return obj.name.toLowerCase() === itemNames.toLowerCase();
	});

	if (matches.length) {
		returnItems = returnItems.concat(matches);
	}
	if (!returnItems.length && required) {
		throw new Error('A valid ' + itemType + ' was not found for this project.');
	} else {
		return returnItems;
	}
}

function getIssueTypeFromProject(issueTypeName, project) {
	if (!issueTypeName) {
		throw Error('IssueType name must be a non-zero length string.');
	}

	if (!project || (typeof project).toLowerCase() !== 'object' || !project.issueTypes) {
		throw Error('Project parameter must be a valid Jira project object with Issue Types');
	}
	var matches = project.issueTypes.filter(function (obj) {
		return obj.name.toLowerCase() === issueTypeName.toLowerCase();
	});
	if (matches.length) {
		return matches[0];
	} else {
		throw new Error('IssueType "' + issueTypeName + '" was not found for this project.');
	}
}

function createIssueOptions(payload, options) {
	var issueOptions = {};

	issueOptions.fields = {
		"project": {
			"id": payload.project.id
		},
		"summary": options.summary,
		"description": options.description,
		"issuetype": {
			"id": payload.issueType.id
		},
		"assignee": {
			"name": options.assignee
		},
		"reporter": {
			"name": options.reporter
		},
		"priority": {
			"id": payload.priority.id
		},
		"labels": options.labels || []
	};
	if (payload.fixVersions) {
		issueOptions.fields.fixVersions = [];
		payload.fixVersions.forEach(function (version/*, idx, arr*/) {
			issueOptions.fields.fixVersions.push({id: version.id});
		});
	}
	if (payload.components) {
		issueOptions.fields.components = [];
		payload.components.forEach(function (component/*, idx, arr*/) {
			issueOptions.fields.components.push({id: component.id});
		});
	}
	return issueOptions;
}

function handleGetPriority(payload, next) {
	return function (err, priority) {
		if (err) {
			return next(err);
		}
		payload.priority = priority;
		next(null, payload);
	};
}

function handleGetProject(options, payload, next) {
	return function (err, project) {
		if (err) {
			return next(err);
		}
		payload.project = project;
		try {
			payload.issueType = getIssueTypeFromProject(options.issueType, project);
			if (options.fixVersions) {
				payload.fixVersions = getVersionsFromProject(options.fixVersions, project);
			}
			if (options.components) {
				payload.components = getComponentsFromProject(options.components, project);
			}
		} catch (err) {
			next(err.message);
		}
		next(null, payload);
	};
}

function filterVersionsByName(versionName, callback) {
	var version,
		matches;
	return function (err, versions) {
		if (err) {
			return callback(err);
		}
		matches = versions.filter(function (obj) {
			return obj.name.toLowerCase() === versionName.toLowerCase();
		});
		if (matches.length) {
			version = matches[0];
			callback(err, version);
		} else {
			callback('Issue Type "' + versionName + '" not found.');
		}
	};
}

function filterPrioritiesByName(priorityName, callback) {
	var priority;
	return function (err, priorities) {
		if (err) {
			return callback(err);
		}
		var matches = priorities.filter(function (obj) {
			return obj.name.toLowerCase() === priorityName.toLowerCase();
		});
		if (matches.length) {
			priority = matches[0];
			callback(err, priority);
		} else {
			callback('No priority called "' + priorityName + '" could be found.');
		}
	};
}

function filterPrioritiesById(priorityId, callback) {
	var priority;
	return function (err, priorities) {
		if (err) {
			return callback(err);
		}
		var matches = priorities.filter(function (obj) {
			return parseInt(obj.id) === priorityId;
		});
		if (matches.length) {
			priority = matches[0];
			callback(err, priority);
		} else {
			callback('Priority ID ' + priorityId + ' not found.');
		}
	};
}

function filterIssueTypesByName(issueTypeName, callback) {
	var issueType;
	return function (err, types) {
		if (err) {
			return callback(err);
		}
		var matches = types.filter(function (obj) {
			return obj.name.toLowerCase() === issueTypeName.toLowerCase();
		});
		if (matches.length) {
			issueType = matches[0];
			callback(err, issueType);
		} else {
			callback('Issue Type "' + issueTypeName + '" not found.');
		}
	};
}

function isNumeric(obj) {
	obj = typeof(obj) === "string" ? obj.replace(/,/g, "") : obj;
	return !isNaN(parseFloat(obj)) && isFinite(obj) && Object.prototype.toString.call(obj).toLowerCase() !== "[object array]";
}
