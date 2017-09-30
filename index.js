'use strict';

var chalk = require('chalk');
var hooks = require('./lib/hooks');

var payload = {
  argv: process.argv.slice(2),

  directories: {
    gitHooks: '.git/hooks',
    userGitHooks: './hooks'
  }
};

try {
  hooks.checkGitRepositoryStatus(payload);
  hooks.checkUserHookAvailability(payload);
  hooks.listAvailableHooks(payload);
  hooks.linkAvailableHooks(payload);
} catch (err) {
  console.error();
  console.error(chalk.red('Linking could not be completed successfully.'));
}
