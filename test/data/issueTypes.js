/**
 * Created by Keith Morris on 8/18/15.
 */

module.exports = [
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
];
