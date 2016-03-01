'use strict';

var fs = require('fs');
var chalk = require('chalk');
var path = require('path');

var errorMessages = {
  readAccess: '  * allows read access to your current user (' + process.env.USER + ')'
};

/**
 * check if current directory is a Git repository
 *
 * @name checkGitRepositoryStatus
 * @param {Object} payload contains the payload
 */
var checkGitRepositoryStatus = function(payload) {

  var gitHooks = ((payload || {}).directories || {}).gitHooks;

  if (!gitHooks || typeof gitHooks !== 'string') {
    throw new Error('[FATAL] Payload is not as expected');
  }

  console.log();
  console.log(chalk.white('Checking availability of Git Repository.'));

  try {
    // check read access (existance) of directory
    fs.accessSync(payload.directories.gitHooks, fs.R_OK);
  } catch (err) {
    console.error(chalk.red('An error occurred while checking for a Git repository.'));
    console.error();
    console.error(chalk.red('Check if the current directory:'));
    console.error(chalk.red('  * contains a directory at `' + payload.directories.gitHooks + '`'));
    console.error(chalk.red(errorMessages.readAccess));

    throw err;
  }

  console.log(chalk.green('* found local Git repository'));
  console.log(chalk.green('* found local Git Hooks directory'));

  return payload;
};

/**
 * check if current directory contains your hooks
 *
 * @name checkUserHookAvailability
 * @param {Object} payload contains the payload
 * @param {Function} callback Function to execute upon completion
 */
var checkUserHookAvailability = function(payload) {

  var userGitHooks = ((payload || {}).directories || {}).userGitHooks;

  if (!userGitHooks || typeof userGitHooks !== 'string') {
    throw new Error('[FATAL] Payload is not as expected');
  }

  console.log();
  console.log(chalk.white('Checking availability of your Git hooks.'));

  try {
    // check read access (existance) of directory
    fs.accessSync(payload.directories.userGitHooks, fs.R_OK);
  } catch (err) {
    console.error();
    console.error(chalk.red('An error occurred while checking for your Git hooks.'));
    console.error();
    console.error(chalk.red('Check if the current directory:'));
    console.error(chalk.red('  * contains a directory at `' + payload.directories.userGitHooks + '`'));
    console.error(chalk.red(errorMessages.readAccess));
    console.error();

    throw err;
  }

  console.log(chalk.green('* found local Git repository'));
  console.log(chalk.green('* found local Git Hooks directory'));
  console.log();

  return payload;
};

/**
 * list your hooks
 *
 * @name listAvailableHooks
 * @param {Object} payload contains the payload
 * @param {Function} callback Function to execute upon completion
 */
var listAvailableHooks = function(payload, callback) {

  var userGitHooks = ((payload || {}).directories || {}).userGitHooks;

  if (!userGitHooks || typeof userGitHooks !== 'string') {
    throw new Error('[FATAL] Payload is not as expected');
  }

  console.log();
  console.log(chalk.white('Listing your Git hooks.'));

  var files;

  try {
    // check read access (existance) of directory
    files = fs.readdirSync(payload.directories.userGitHooks);
  } catch(err) {
    console.error();
    console.error(chalk.red('An error occurred while listing your Git hooks.'));
    console.error();
    console.error(chalk.red('Check if the `' + payload.directories.userGitHooks + '` directory:'));
    console.error(chalk.red('  * contains Git Hook files '));
    console.error();

    throw err;
  }

  if (!files || files.length === 0) {
    console.error();
    console.error(chalk.red('An error occurred while listing your Git hooks: no files were found.'));
    console.error();
    console.error(chalk.red('Check if the `' + payload.directories.userGitHooks + '` directory:'));
    console.error(chalk.red('  * contains Git Hook files '));
    console.error();
  }

  console.log(chalk.green('* hooks are: '));
  files.forEach(function(item) {
    console.log(chalk.green('  *', payload.directories.userGitHooks + '/' + item));
  });

  // make files in payload
  payload.availableHooks = files;

  return payload;
};

/**
 * link your hooks
 *
 * @name linkAvailableHooks
 * @param {Object} payload contains the payload
 */
var linkAvailableHooks = function(payload, callback) {

  var availableHooks = (payload || {}).availableHooks;

  if (!availableHooks || typeof payload.availableHooks !== 'object') {
    throw new Error('[FATAL] Payload is not as expected');
  }

  console.log();
  console.log(chalk.white('Linking your Git hooks.'));

  payload.availableHooks.forEach(function(item) {
    var source = payload.directories.userGitHooks + '/' + item;
    var target = payload.directories.gitHooks + '/' + item;

    try {
      fs.linkSync(source, target);
    } catch (err) {
      if (err.code === 'EEXIST') {
        console.warn(chalk.yellow('  * sym-link for `' + source + '` already exists, skipping'));
      } else {
        console.error(chalk.red('An error occurred attempting to sym-link your Git hooks'));

        // unhandled errors should terminate flow
        throw err;
      }
    }

    console.log(chalk.green('  * successfully linked ' + target));
  });

  return payload;
};

module.exports = {
  checkGitRepositoryStatus: checkGitRepositoryStatus,
  checkUserHookAvailability: checkUserHookAvailability,
  listAvailableHooks: listAvailableHooks,
  linkAvailableHooks: linkAvailableHooks
};
