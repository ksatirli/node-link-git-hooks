'use strict';

var async = require('async');
var chalk = require('chalk');
var hooks = require('./lib/hooks');

// handle config
async.waterfall(
[
  function(callback) {
    // add goodness to payload
    var payload = {
      argv: process.argv.slice(2),

      directories: {
        gitHooks: '.git/hooks',
        userGitHooks: './hooks'
      }
    };

    callback(null, payload);
  },

  hooks.checkGitRepositoryStatus,

  hooks.checkUserHookAvailability,

  hooks.listAvailableHooks,

  hooks.linkAvailableHooks

], function(err) {
  if (err) {
    console.error();
    console.error(chalk.red('Linking could not be completed successfully.'));
  } else {
    console.log();
    console.log(chalk.green('All done.'));
  }
});
