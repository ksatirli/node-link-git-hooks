# `link-git-hooks`

> Quickly link your versioned Git hooks

## This project is no longer maintained

`link-git-hooks` is no longer actively maintained and is only made available here for reference. The project itself is still capable of linking Git hooks.

What follows is the original `README.md`:

---

## Table of Contents

- [Requirements](#requirements)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Author Information](#author-information)
- [License](#license)

## Requirements

Node.js 6.x or later.

## Dependencies

This script has no external dependencies.

## Usage

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

In order to run `link-git-hooks`, open a console (`Terminal.app`, `PuTTY`, etc.) and change into a directory that is both a Git repository _and_ includes a sub-directory named `hooks`.

Then, run the `link-git-hooks` command.

Should the command fail, verify that `link-git-hooks` is indeed installed by listing all globally installed modules:

```
npm list -g
```

Once executed, `link-git-hooks` will provide you with information regarding the process.

Please note: `link-git-hooks` will _not_ replace any (pre-)existing hooks, so it is safe to run multiple times.

## Author Information

`link-git-hooks` was maintained by the individuals listed below.

- [Kerim Satirli](https://github.com/ksatirli)
- [Yury Liavitski](https://github.com/heliocentrist)

## License

Copyright 2016-2017 [Kerim Satirli](https://github.com/ksatirli) and [Yury Liavitski](https://github.com/heliocentrist).

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an _"AS IS"_ basis, without WARRANTIES or conditions of any kind, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
