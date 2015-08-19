# jira-facade

[![Build Status](https://travis-ci.org/MoxieUSA/node-jira-facade.svg?branch=master)](https://travis-ci.org/MoxieUSA/node-jira-facade)

The goal of jira-facade is to be a simple facade to the [jira][jira] wrapper module that simplifies some of the more tedious processes such as getting IDs for versions, priorities, components, etc.

**NOTE:** Better documentation is coming.

## Installation

`npm install -S jira-facade`

```javascript
var JiraFacade = require('jira-facade');
```

## Methods

### new JiraFacade(options) (Constructor)

This is basically a pass through to the [jira][jira]

```javascript
var jiraFacade = new JiraFacade({
	protocol: 'https',
	host: 'jira.example.com',
	port: 443,
	username: 'splunk-user',
	password: 'splunk-password',
	apiVersion: '2',
})
```
### jira

This is an instance of the [jira][jira] module and has full access to all of its methods. See the [jira][jira] module page for detailed documentation.

```javascript
jiraFacade.jira.getProject('EXAMPLEKEY', function(err, project){
	console.log(project);
});
```

### createIssue(options, callback)
Creates a JIRA issue and returns the issue object from the JIRA api.

```javascript
jiraFacade.createIssue({
	project: 'EXAMPLEKEY',
	issueType: 'Task',
	summary: 'Issue Summary/Subject',	
	description: 'Issue Description',
	fixVersions: ['Backlog'],
	components: ['Services', 'Site'],
	assignee: 'joe.developer',
	reporter: 'sally.manager',
	priority: 'Critical',
	labels: ['services', 'website']
}, function(err, issue){
	console.log(issue.id);
});
```

**Options**

* `project` (string) JIRA Project Key  
* `issueType` (string) The issueType name (e.g. Bug)
* `summary` (string) The summary or subject of the issue to be created
* `description` (string) The issue description
* `fixVersions` (Array) Array of version names this issue will be in
* `components` (Array) Array of Component names this isssue is associated with
* `assignee` (string) JIRA username of the assignee
* `reporter` (string) JIRA username of hte reporter
* `priority` (string) Severity name (e.g. Critical)
* `labels` (Array) Array of string labels to apply to the issue

### getVersionByName(project, versionName, callback)

Returns a JIRA `version` object from a specific project based on the name of that version.

```javascript
jiraFacade.getVersionByName('EXAMPLEKEY', '1.0.0', function(err, version){
	console.log(version);
});
```

### getPriorityByName(priorityName, callback)

Returns a JIRA global `priority` object based on the name of that priority.

```javascript
jiraFacade.getPriorityByName('Critical', function(err, priority){
	console.log(priority);
});
```

### getPriorityById(priorityId, callback)

Returns a JIRA global `priority` object based on the id of that priority.

```javascript
jiraFacade.getPriorityById(2, function(err, priority){
	console.log(priority);
});
```

### getIssueTypeByName(priorityName, callback)

Returns a JIRA global `issueType` object based on the name of that issueType.

```javascript
jiraFacade.getIssueTypeByName('Bug', function(err, issueType){
	console.log(priority);
});
```




















[jira]: https://www.npmjs.com/package/jira