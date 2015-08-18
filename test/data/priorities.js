/**
 * Created by Keith Morris on 8/18/15.
 */
module.exports = [
	{
		"self": "https://jira.example.com/rest/api/2/priority/1",
		"statusColor": "#cc0000",
		"description": "Blocks development and/or testing work, production could not run.",
		"iconUrl": "https://jira.example.com/images/icons/priorities/blocker.png",
		"name": "Blocker",
		"id": "1"
	},
	{
		"self": "https://jira.example.com/rest/api/2/priority/2",
		"statusColor": "#ff0000",
		"description": "Crashes, loss of data, severe memory leak.",
		"iconUrl": "https://jira.example.com/images/icons/priorities/critical.png",
		"name": "Critical",
		"id": "2"
	},
	{
		"self": "https://jira.example.com/rest/api/2/priority/3",
		"statusColor": "#ffff00",
		"description": "Major loss of function.",
		"iconUrl": "https://jira.example.com/images/icons/priorities/major.png",
		"name": "Major",
		"id": "3"
	},
	{
		"self": "https://jira.example.com/rest/api/2/priority/6",
		"statusColor": "#00cc00",
		"description": "Standard Work",
		"iconUrl": "http://icons.iconarchive.com/icons/fatcow/farm-fresh/16/bullet-green-icon.png",
		"name": "Normal",
		"id": "6"
	},
	{
		"self": "https://jira.example.com/rest/api/2/priority/4",
		"statusColor": "#006600",
		"description": "Minor loss of function, or other problem where easy workaround is present.",
		"iconUrl": "https://jira.example.com/images/icons/priorities/minor.png",
		"name": "Minor",
		"id": "4"
	},
	{
		"self": "https://jira.example.com/rest/api/2/priority/5",
		"statusColor": "#003300",
		"description": "Cosmetic problem like misspelt words or misaligned text.",
		"iconUrl": "https://jira.example.com/images/icons/priorities/trivial.png",
		"name": "Trivial",
		"id": "5"
	}
];
