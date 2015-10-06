/**
 * Created by Keith Morris on 8/17/15.
 */
"use strict";

var expect = require('chai').expect,
	rewire = require('rewire'),
	JiraFacade = rewire('../index.js'),
	sinon = require('sinon');

describe('Test jira-facade', function () {
	describe('Object instantiation', function () {
		it('Should throw error if parameters are not correct', function () {
			expect(JiraFacade).to.throw(Error);
			expect(JiraFacade.bind(JiraFacade, {
				protocol: 'https',
				host: 'localhost',
				username: 'keith'
			})).to.throw(Error);
			expect(JiraFacade.bind(JiraFacade, {
				protocol: 'https',
				host: 'localhost',
				username: 'keith',
				password: 'password'
			})).to.not.throw(Error);
		});
		it('Should properly set the port if not passed in', function () {
			var optionsHTTPS = {
				protocol: 'https',
				host: 'localhost',
				username: 'keith',
				password: 'password'
			};
			var optionsHTTP = {
				protocol: 'http',
				host: 'localhost',
				username: 'keith',
				password: 'password'
			};
			var jiraFacade;
			jiraFacade = new JiraFacade(optionsHTTPS);
			expect(optionsHTTPS.port).to.equal(443);
			jiraFacade = new JiraFacade(optionsHTTP);
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
	describe('Test utility and handler functions', function () {
		// TODO Add tests for module functions
		it('Should properly return a subset of components from a project object', function () {
			var getComponentsFromProject, project, components;
			getComponentsFromProject = JiraFacade.__get__('getComponentsFromProject');
			project = rewire('./data/project.js');
			components = getComponentsFromProject(['Services', 'ETL'], project);
			expect(components).to.have.length(2);
			expect(components[0].name).to.equal('ETL');
			expect(components[1].name).to.equal('Services');
		});
		it('Should properly return a subset of versions from a project object', function () {
			var getVersionsFromProject, project, versions;
			getVersionsFromProject = JiraFacade.__get__('getVersionsFromProject');
			project = rewire('./data/project.js');
			versions = getVersionsFromProject(['Backlog'], project);
			expect(versions).to.have.length(1);
			expect(versions[0].name).to.equal('Backlog');
		});
		it('Should properly return an IssueType by name from a project object', function () {
			var getIssueTypeFromProject, project, issueType;
			getIssueTypeFromProject = JiraFacade.__get__('getIssueTypeFromProject');
			project = rewire('./data/project.js');
			issueType = getIssueTypeFromProject('Bug', project);
			expect(issueType.name).to.equal('Bug');
			expect(function () {
				// called without parameters
				getIssueTypeFromProject();
			}).to.throw(Error);
		});
		it('Should handleGetPriority properly', function () {
			var payload, next, handleGetPriority;
			payload = {};
			next = function (err, payload) {
				expect(payload.priority).to.be.an('object');
				expect(payload.priority.name).to.equal('Critical');
			};
			handleGetPriority = JiraFacade.__get__('handleGetPriority');
			handleGetPriority(payload, next)(null, rewire('./data/priority.js'));
		});
		it('Should handleGetProject properly', function () {
			var options, project, payload, next, handleGetProject;
			options = rewire('./data/options.js');
			project = rewire('./data/project.js');
			payload = {};
			next = function (err, payload) {
				if (err) {
					expect(err).to.equal('ERROR MESSAGE');
					return;
				}
				expect(payload.project).to.be.an('object');
				expect(payload.issueType).to.be.an('object');
				expect(payload.issueType.name).to.equal('Task');
				expect(payload.fixVersions).to.be.an('Array');
				expect(payload.fixVersions.length).to.equal(1);
				expect(payload.fixVersions[0].name).to.equal('Backlog');
				expect(payload.components).to.be.an('Array');
				expect(payload.components.length).to.equal(2);
				expect(payload.components[0].name).to.equal('ETL');
				expect(payload.components[1].name).to.equal('Site');
			};
			handleGetProject = JiraFacade.__get__('handleGetProject');
			handleGetProject(options, payload, next)(null, project);
			handleGetProject(options, payload, next)('ERROR MESSAGE');
		});
		it('Should filterVersionsByName properly', function () {
			var filterVersionsByName;
			var callback = function (err, version) {
				if (err) {
					expect(err).to.equal('Issue Type "NonExistentVersion" not found.');
					return;
				}
				expect(version).to.be.an('object');
				expect(version.name).to.equal('1.0.0');
			};
			filterVersionsByName = JiraFacade.__get__('filterVersionsByName');
			filterVersionsByName('1.0.0', callback)(null, rewire('./data/versions.js'));
			filterVersionsByName('NonExistentVersion', callback)(null, rewire('./data/versions.js'));
		});
		it('Should filterPrioritiesByName properly', function () {
			var filterPrioritiesByName;
			var callback = function (err, priority) {
				if (err) {
					expect(err).to.equal('No priority called "NonExistentPriority" could be found.');
					return;
				}
				expect(priority).to.be.an('object');
				expect(priority.name).to.equal('Critical');
			};
			filterPrioritiesByName = JiraFacade.__get__('filterPrioritiesByName');
			filterPrioritiesByName('Critical', callback)(null, rewire('./data/priorities.js'));
			filterPrioritiesByName('NonExistentPriority', callback)(null, rewire('./data/priorities.js'));
		});
		it('Should filterPrioritiesById properly', function () {
			var filterPrioritiesById;
			var callback = function (err, priority) {
				if (err) {
					expect(err).to.equal('Priority ID 72 not found.');
					return;
				}
				expect(priority).to.be.an('object');
				expect(priority.name).to.equal('Critical');
			};
			filterPrioritiesById = JiraFacade.__get__('filterPrioritiesById');
			filterPrioritiesById(2, callback)(null, rewire('./data/priorities.js'));
			filterPrioritiesById(72, callback)(null, rewire('./data/priorities.js')); // doesn't exist
		});
		it('Should filterIssueTypesByName properly', function () {
			var filterIssueTypesByName;
			var callback = function (err, priority) {
				if (err) {
					expect(err).to.equal('Issue Type "NonExistentIssueType" not found.');
					return;
				}
				expect(priority).to.be.an('object');
				expect(priority.name).to.equal('Technical task');
			};
			filterIssueTypesByName = JiraFacade.__get__('filterIssueTypesByName');
			filterIssueTypesByName('Technical task', callback)(null, rewire('./data/issueTypes.js'));
			filterIssueTypesByName('NonExistentIssueType', callback)(null, rewire('./data/issueTypes.js')); // doesn't exist
		});
	});
});
