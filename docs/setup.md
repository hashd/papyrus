Here is how you can set yourself up with the development environment for Papyrus.

## Prerequisites
You will need the following to setup development environment

- node
- npm
- gulp v4

Also install the following global node packages

- typescript
- jspm@0.16.39
- gulp-cli
- concurrently
- lite-server
- tslint

``` bash
npm install -g typescript jspm@0.16.39 tslint gulp-cli concurrently lite-server
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

- Execute `gulp build`
``` bash
gulp build
```

You're all set, now move on and start the application.

### Running the application
After you have installed prerequisites and have finished setting up, run the following command to start the application.

``` bash
npm run start
```

Note: Build process is WIP and can act cranky
