/**
 * Created by Keith Morris on 8/18/15.
 */

module.exports = {
	"expand": "description,lead,url,projectKeys",
	"self": "https://jira.example.com/rest/api/2/project/14100",
	"id": "14100",
	"key": "EXAMPLEKEY",
	"description": "Example project description.",
	"lead": {
		"self": "https://jira.example.com/rest/api/2/user?username=Bprice",
		"key": "bprice",
		"name": "Bprice",
		"avatarUrls": {
			"16x16": "https://secure.gravatar.com/avatar/****REDACTED***?d=mm&s=16",
			"24x24": "https://secure.gravatar.com/avatar/****REDACTED***?d=mm&s=24",
			"32x32": "https://secure.gravatar.com/avatar/****REDACTED***?d=mm&s=32",
			"48x48": "https://secure.gravatar.com/avatar/****REDACTED***?d=mm&s=48"
		},
		"displayName": "Brent Price",
		"active": true
	},
	"components": [
		{
			"self": "https://jira.example.com/rest/api/2/component/14410",
			"id": "14410",
			"name": "Campaign",
			"isAssigneeTypeValid": false
		},
		{
			"self": "https://jira.example.com/rest/api/2/component/14408",
			"id": "14408",
			"name": "ETL",
			"isAssigneeTypeValid": false
		},
		{
			"self": "https://jira.example.com/rest/api/2/component/14411",
			"id": "14411",
			"name": "Services",
			"isAssigneeTypeValid": false
		},
		{
			"self": "https://jira.example.com/rest/api/2/component/14409",
			"id": "14409",
			"name": "Site",
			"isAssigneeTypeValid": false
		}
	],
	"issueTypes": [
		{
			"self": "https://jira.example.com/rest/api/2/issuetype/1",
			"id": "1",
			"description": "A problem which impairs or prevents the functions of the product.",
			"iconUrl": "https://jira.example.com/images/icons/issuetypes/bug.png",
			"name": "Bug",
			"subtask": false
		},
		{
			"self": "https://jira.example.com/rest/api/2/issuetype/2",
			"id": "2",
			"description": "A new feature of the product, which has yet to be developed.",
			"iconUrl": "https://jira.example.com/images/icons/issuetypes/newfeature.png",
			"name": "New Feature",
			"subtask": false
		},
		{
			"self": "https://jira.example.com/rest/api/2/issuetype/5",
			"id": "5",
			"description": "The sub-task of the issue",
			"iconUrl": "https://jira.example.com/images/icons/issuetypes/subtask_alternate.png",
			"name": "Sub-task",
			"subtask": true
		},
		{
			"self": "https://jira.example.com/rest/api/2/issuetype/7",
			"id": "7",
			"description": "Created by GreenHopper - do not edit or delete. Issue type for a user story.",
			"iconUrl": "https://jira.example.com/images/icons/issuetypes/story.png",
			"name": "Story",
			"subtask": false
		},
		{
			"self": "https://jira.example.com/rest/api/2/issuetype/4",
			"id": "4",
			"description": "An improvement or enhancement to an existing feature or task.",
			"iconUrl": "https://jira.example.com/images/icons/issuetypes/improvement.png",
			"name": "Improvement",
			"subtask": false
		},
		{
			"self": "https://jira.example.com/rest/api/2/issuetype/8",
			"id": "8",
			"description": "Created by GreenHopper - do not edit or delete. Issue type for a technical task.",
			"iconUrl": "https://jira.example.com/images/icons/issuetypes/task_agile.png",
			"name": "Technical task",
			"subtask": true
		},
		{
			"self": "https://jira.example.com/rest/api/2/issuetype/16",
			"id": "16",
			"description": "A defect raised against a Development request",
			"iconUrl": "https://jira.example.com/images/icons/issuetypes/bug.png",
			"name": "Bug Sub-Task",
			"subtask": true
		},
		{
			"self": "https://jira.example.com/rest/api/2/issuetype/3",
			"id": "3",
			"description": "A task that needs to be done.",
			"iconUrl": "https://jira.example.com/images/icons/issuetypes/task.png",
			"name": "Task",
			"subtask": false
		},
		{
			"self": "https://jira.example.com/rest/api/2/issuetype/6",
			"id": "6",
			"description": "Created by GreenHopper - do not edit or delete. Issue type for a big user story that needs to be broken down.",
			"iconUrl": "https://jira.example.com/images/icons/issuetypes/epic.png",
			"name": "Epic",
			"subtask": false
		}
	],
	"assigneeType": "UNASSIGNED",
	"versions": [
		{
			"self": "https://jira.example.com/rest/api/2/version/17104",
			"id": "17104",
			"name": "Backlog",
			"archived": false,
			"released": false,
			"projectId": 14100
		},
		{
			"self": "https://jira.example.com/rest/api/2/version/17155",
			"id": "17155",
			"name": "1.0.0",
			"archived": false,
			"released": false,
			"projectId": 14100
		}
	],
	"name": "Example Jira Project Name",
	"roles": {
		"Read-Only": "https://jira.example.com/rest/api/2/project/14100/role/10302",
		"Technology Approvers": "https://jira.example.com/rest/api/2/project/14100/role/10103",
		"Project Team": "https://jira.example.com/rest/api/2/project/14100/role/10303",
		"Developers": "https://jira.example.com/rest/api/2/project/14100/role/10001",
		"Account Approvers": "https://jira.example.com/rest/api/2/project/14100/role/10104",
		"Hosting Analysts": "https://jira.example.com/rest/api/2/project/14100/role/10105",
		"Project SME": "https://jira.example.com/rest/api/2/project/14100/role/10304",
		"Administrators": "https://jira.example.com/rest/api/2/project/14100/role/10002",
		"QA Analysts": "https://jira.example.com/rest/api/2/project/14100/role/10100",
		"Users": "https://jira.example.com/rest/api/2/project/14100/role/10000",
		"Clients": "https://jira.example.com/rest/api/2/project/14100/role/10400"
	},
	"avatarUrls": {
		"48x48": "https://jira.example.com/secure/projectavatar?pid=14100&avatarId=10710",
		"24x24": "https://jira.example.com/secure/projectavatar?size=small&pid=14100&avatarId=10710",
		"16x16": "https://jira.example.com/secure/projectavatar?size=xsmall&pid=14100&avatarId=10710",
		"32x32": "https://jira.example.com/secure/projectavatar?size=medium&pid=14100&avatarId=10710"
	},
	"projectCategory": {
		"self": "https://jira.example.com/rest/api/2/projectCategory/10000",
		"id": "10000",
		"name": "Example Category",
		"description": "Example category description."
	}
};
