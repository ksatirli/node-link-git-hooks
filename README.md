# `link-git-hooks`

> Quickly link your versioned Git hooks

## This project is no longer maintained

`link-git-hooks` is no longer actively maintained and is only made available here for reference. The project itself is still capable of linking Git hooks.

What follows is the original `README.md`:

---

## Table of Contents

- [`link-git-hooks`](#link-git-hooks)
  - [This project is no longer maintained](#this-project-is-no-longer-maintained)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Dependencies](#dependencies)
  - [Usage](#usage)
    - [Usage](#usage-1)
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

This module is maintained by the contributors listed on [GitHub](https://github.com/operatehappy/node-link-git-hooks/graphs/contributors)

Development of this module was sponsored by [Operate Happy](https://github.com/operatehappy).

## License

Licensed under the Apache License, Version 2.0 (the "License").

You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an _"AS IS"_ basis, without WARRANTIES or conditions of any kind, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
