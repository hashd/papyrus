Here is how you can set yourself up with the development environment for Papyrus.

## Prerequisites
You will need the following to setup development environment

- node
- npm
- gulp v4

Also install the following global node packages

- typescript@next
- jspm@0.16.39
- gulp-cli
- concurrently
- lite-server
- tslint@next

``` bash
npm install -g typescript@next jspm@0.16.39 tslint@next gulp-cli concurrently lite-server
```

### Setup
- Clone this repo
- Install NPM packages
``` bash
npm install
```

- Install JSPM packages
``` bash
jspm install
```

- Execute `gulp build` to check if you're able to bundle the app sources
``` bash
gulp build
```

You're all set, now move on and start the application.

### Running the application
After you have installed prerequisites and have finished setting up, run the following command to start the application.

``` bash
npm run start
```

### Installing git hooks
We've configured some git hooks which need to be followed if you want to contribute as a developer.

Install the git hooks by executing the following command from this git repo's home in your local machine.
``` bash
./install_hooks.sh
```

This sets up hooks like pre-commit to ensure code is properly linted before being committed.
