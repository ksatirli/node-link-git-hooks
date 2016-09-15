# `link-git-hooks`

[![Known Vulnerabilities](https://snyk.io/test/npm/link-git-hooks/badge.svg)](https://snyk.io/test/npm/link-git-hooks)

`link-git-hooks` provides an easy way of linking Git hooks inside of `./hooks` to `.git/hooks`.

This allows you to version your Git hooks, thereby ensuring you and your team all use the same versions, all the time.

## Installation

To install this utility, run the following command in your console:

```
npm install -g link-git-hooks
```

This will make `link-git-hooks` available as a global binary.

Note that you might require `sudo` permissions to install the above utility _globally_.

Alternatively, you can install the utility directly from Git `HEAD` by running the following command:

```
npm install -g https://bitbucket.org/cultivatedops/link-git-hooks/get/HEAD.tar.gz
```

### Usage

In order to run `link-git-hooks`, open a console (`Terminal.app`, `PuTTY`) and change into a Git repository that includes a directory named `./hooks`.

Then, run the following command:

```
link-git-hooks
```

Should the above command fail, verify that `link-git-hooks` is indeed installed by listing all globally installed modules:

```
npm list -g
```
Once executed, `link-git-hooks` will provide you with information regarding the process.

Please note: `link-git-hooks` will _not_ replace any existing hooks, so it is safe to run multiple times.

### Maintainers

This utility is currently maintained by the individuals listed below.

* [Kerim Satirli](mailto:kerim@cultivatedops.com)

# License

`link-git-hooks` is licensed under the _Apache 2.0_ license. A full copy of the license can be found on the [apache.org](http://www.apache.org/licenses/LICENSE-2.0) site.

In short, this license permits you to use this product commercially, distribute this software and make modifications.

The software is provided without warranty and any contributors cannot be held liable for damages. You are also not allowed to use any name, logo or trademark without prior consent.
