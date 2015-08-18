/**
 * Created by Keith Morris on 8/17/15.
 */
var expect = require('chai').expect,
	rewire = require('rewire'),
	JiraFacade = rewire('../index.js'),
	sinon = require('sinon');

describe('Test jira-facade', function () {
	describe('Test initialization', function () {

		it('Should throw error if parameters are not correct', function () {
			expect(JiraFacade).to.throw(Error);
			expect(JiraFacade.bind(JiraFacade, {
				protocol: 'https',
				host: 'localhost',
				user: {
					username: 'keith'
				}
			})).to.throw(Error);
			expect(JiraFacade.bind(JiraFacade, {
				protocol: 'https',
				host: 'localhost',
				user: {
					username: 'keith',
					password: 'password'
				}
			})).to.not.throw(Error);
		});

		it('Should properly set the port if not passed in', function () {
			var optionsHTTPS = {
				protocol: 'https',
				host: 'localhost',
				user: {
					username: 'keith',
					password: 'password'
				}
			};
			var optionsHTTP = {
				protocol: 'http',
				host: 'localhost',
				user: {
					username: 'keith',
					password: 'password'
				}
			};
			new JiraFacade(optionsHTTPS);
			expect(optionsHTTPS.port).to.equal(443);
			new JiraFacade(optionsHTTP);
			expect(optionsHTTP.port).to.equal(80);
		});

	});

	describe('Test internal utility functions', function () {
		it('createIssueOptions should properly populate the post fields', function () {
			var payload = require('./data/payload'),
				options = require('./data/options'),
				createIssueOptions,
				issueOptions,
				fields;

			createIssueOptions = JiraFacade.__get__('createIssueOptions');
			issueOptions = createIssueOptions(payload, options);
			fields = issueOptions.fields;
			expect(fields.project.id).to.equal(payload.project.id);
			expect(fields.summary).to.equal(options.summary);
			expect(fields.description).to.equal(options.description);
			expect(fields.issuetype.id).to.equal(payload.issueType.id);
			expect(fields.reporter.name).to.equal(options.reporter);
			expect(fields.priority.id).to.equal(payload.priority.id);
			expect(fields.labels).to.equal(options.labels);
			expect(fields.fixVersions[0].id).to.equal(payload.fixVersions[0].id);
			expect(fields.components[0].id).to.equal(payload.components[0].id);
		});
	});
	describe('Test function calls', function () {
		// TODO Add tests for module functions
		var jiraFacade;
		before(function () {
			var options = {
				protocol: 'https',
				host: 'localhost',
				user: {
					username: 'keith',
					password: 'password'
				}
			};
			jiraFacade = new JiraFacade(options);
			sinon.stub(jiraFacade.jira, 'getProject');
			sinon.stub(jiraFacade.jira, 'addNewIssue');
			sinon.stub(jiraFacade.jira, 'getVersions');
			sinon.stub(jiraFacade.jira, 'listPriorities');
			sinon.stub(jiraFacade.jira, 'listIssueTypes');
		});
	});
});
