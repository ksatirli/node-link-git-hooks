'use strict';

var errorMessages = {
  readAccess: '  * allows read access to your current user (' + process.env.USER + ')'
};

/**
 * check if current directory is a Git repository
 *
 * @name checkGitRepositoryStatus
 * @param {Object} payload contains the payload
 * @param {Function} callback Function to execute upon completion
 */
var checkGitRepositoryStatus = function(payload, callback) {
  if (typeof payload === 'object' &&
      typeof payload.directories === 'object' &&
      typeof payload.directories.gitHooks === 'string') {

    var fs = require('fs');
    var chalk = require('chalk');

    console.log();
    console.log(chalk.white('Checking availability of Git Repository.'));

    // check read access (existance) of directory
    fs.access(payload.directories.gitHooks, fs.R_OK, function(err) {
      if (err) {
        console.error(chalk.red('An error occurred while checking for a Git repository.'));
        console.error();
        console.error(chalk.red('Check if the current directory:'));
        console.error(chalk.red('  * contains a directory at `' + payload.directories.gitHooks + '`'));
        console.error(chalk.red(errorMessages.readAccess));
        callback(err, payload);
      } else {
        console.log(chalk.green('* found local Git repository'));
        console.log(chalk.green('* found local Git Hooks directory'));

        callback(null, payload);
      }
    });
  } else {
    callback('[FATAL] Payload is not as expected');
  }
};

/**
 * check if current directory contains your hooks
 *
 * @name checkUserHookAvailability
 * @param {Object} payload contains the payload
 * @param {Function} callback Function to execute upon completion
 */
var checkUserHookAvailability = function(payload, callback) {
  if (typeof payload === 'object' &&
      typeof payload.directories === 'object' &&
      typeof payload.directories.userGitHooks === 'string') {

    var fs = require('fs');
    var chalk = require('chalk');

    console.log();
    console.log(chalk.white('Checking availability of your Git hooks.'));

    // check read access (existance) of directory
    fs.access(payload.directories.userGitHooks, fs.R_OK, function(err) {
      if (err) {
        console.error();
        console.error(chalk.red('An error occurred while checking for your Git hooks.'));
        console.error();
        console.error(chalk.red('Check if the current directory:'));
        console.error(chalk.red('  * contains a directory at `' + payload.directories.userGitHooks + '`'));
        console.error(chalk.red(errorMessages.readAccess));
        console.error();

        callback(err, payload);
      } else {
        console.log(chalk.green('* found local Git repository'));
        console.log(chalk.green('* found local Git Hooks directory'));
        console.log();

        callback(null, payload);
      }
    });
  } else {
    callback('[FATAL] Payload is not as expected');
  }
};

/**
 * list your hooks
 *
 * @name listAvailableHooks
 * @param {Object} payload contains the payload
 * @param {Function} callback Function to execute upon completion
 */
var listAvailableHooks = function(payload, callback) {
  if (typeof payload === 'object' &&
      typeof payload.directories === 'object' &&
      typeof payload.directories.userGitHooks === 'string') {

    var fs = require('fs');
    var chalk = require('chalk');

    console.log();
    console.log(chalk.white('Listing your Git hooks.'));

    // check read access (existance) of directory
    fs.readdir(payload.directories.userGitHooks, function(err, files) {
      if (err || files.length === 0) {
        console.error();
        console.error(chalk.red('An error occurred while listing your Git hooks.'));
        console.error();
        console.error(chalk.red('Check if the `' + payload.directories.userGitHooks + '` directory:'));
        console.error(chalk.red('  * contains Git Hook files '));
        console.error();

        callback(err, payload);
      } else {
        console.log(chalk.green('* hooks are: '));
        files.forEach(function(item) {
          console.log(chalk.green('  *', payload.directories.userGitHooks + '/' + item));
        });

        // make files in payload
        payload.availableHooks = files;

        callback(null, payload);
      }
    });
  } else {
    callback('[FATAL] Payload is not as expected');
  }
};

/**
 * link your hooks
 *
 * @name linkAvailableHooks
 * @param {Object} payload contains the payload
 * @param {Function} callback Function to execute upon completion
 */
var linkAvailableHooks = function(payload, callback) {
  if (typeof payload === 'object' && typeof payload.availableHooks === 'object') {

    var fs = require('fs');
    var chalk = require('chalk');

    console.log();
    console.log(chalk.white('Linking your Git hooks.'));

    var async = require('async');

    async.each(payload.availableHooks, function(item, callback) {
      var source = payload.directories.userGitHooks + '/' + item;
      var target = payload.directories.gitHooks + '/' + item;

      fs.link(source, target, function(err) {
        if (err) {
          if (err.code === 'EEXIST') {
            console.warn(chalk.yellow('  * sym-link for `' + source + '` already exists, skipping'));
            callback(null, payload);
          } else {
            console.error(chalk.red('An error occurred attempting to sym-link your Git hooks'));

            // unhandled errors should terminate flow
            callback(err, payload);
          }
        } else {
          console.log(chalk.green('  * successfully linked ' + target));
          callback(null, payload);
        }
      });
    }, function(err) {
      // if any of the file processing produced an error, err would equal that error
      if (err) {
        console.error(chalk.red('An error occurred attempting to sym-link your Git hooks'));

        callback(err, payload);
      } else {
        callback(null, payload);
      }
    });
  } else {
    callback('[FATAL] Payload is not as expected');
  }
};

module.exports = {
  checkGitRepositoryStatus: checkGitRepositoryStatus,
  checkUserHookAvailability: checkUserHookAvailability,
  listAvailableHooks: listAvailableHooks,
  linkAvailableHooks: linkAvailableHooks
};
