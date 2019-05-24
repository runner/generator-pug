Tasks generator for Pug
=======================

[![build status](https://img.shields.io/travis/runner/generator-pug.svg?style=flat-square)](https://travis-ci.org/runner/generator-pug)
[![npm version](https://img.shields.io/npm/v/runner-generator-pug.svg?style=flat-square)](https://www.npmjs.com/package/runner-generator-pug)
[![dependencies status](https://img.shields.io/david/runner/generator-pug.svg?style=flat-square)](https://david-dm.org/runner/generator-pug)
[![devDependencies status](https://img.shields.io/david/dev/runner/generator-pug.svg?style=flat-square)](https://david-dm.org/runner/generator-pug?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/runner)
[![RunKit](https://img.shields.io/badge/RunKit-try-yellow.svg?style=flat-square)](https://npm.runkit.com/runner-generator-pug)


## Installation ##

```bash
npm install runner-generator-pug
```


## Usage ##

Add to the scope:

```js
const generator = require('runner-generator-pug');
```

Generate tasks according to the given config:

```js
const tasks = generator({
    source: 'src/pug/main.pug',
    target: 'build/develop/index.html',
    variables: {
        develop: true,
        package: require('../package')
    }
});
```

Add generated tasks to the `runner` instance:

```js
const runner = require('runner');

Object.assign(runner.tasks, tasks);
```

The following tasks will become available:

 Task name    | Description
--------------|-------------
 `pug:config` | prints the current configuration used for generated tasks
 `pug:build`  | performs pug compilation 
 `pug:clear`  | removes compiled file

Generator accepts two arguments: base configuration and additional options.


### Base configuration ###

It's an object with the following properties:

 Name      | Description
-----------|-------------
 source    | main entry point passed as `path` to [pug.compileFile](https://pugjs.org/api/reference.html#pugcompilefilepath-options)
 target    | generated HTML file name
 options   | pug compiler [options](https://pugjs.org/api/reference.html#options)
 variables | vars available in pug templates


### Additional options ###

It's an object with the following properties:

 Name   | Description
--------|-------------
 prefix | an affix placed before a task name (default is `pug:`)  
 suffix | a string added at the end of a task name (empty by default)
 
So it's possible to change generated tasks names: 

```js
Object.assign(runner.tasks,
    generator(config, {
        prefix: 'html:',
        suffix: ':develop'
    })
);
```

It will add the following tasks:

* `html:config:develop` 
* `html:build:develop`  
* `html:clear:develop`  
 

## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/runner/generator-pug/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`runner-generator-pug` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
