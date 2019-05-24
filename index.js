/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

const
    name  = 'pug',
    tools = require('runner-tools'),
    log   = require('runner-logger').wrap(name);


function build ( config, done ) {
    const pug = require('pug');

    try {
        let render, data;

        // prepare function and data
        render = pug.compileFile(config.source, config.options || {});
        data   = render(config.variables || {});

        // save generated result
        tools.write([{name: config.target, data: data}], log, done);
    } catch ( error ) {
        log.fail(error.toString());
    }
}


function generator ( config = {}, options = {} ) {
    const tasks = {};

    // sanitize and extend defaults
    options = Object.assign({}, {
        prefix: name + ':',
        suffix: ''
    }, options);

    tasks[options.prefix + 'config' + options.suffix] = function () {
        log.inspect(config, log);
    };

    tasks[options.prefix + 'build' + options.suffix] = function ( done ) {
        build(config, done);
    };

    tasks[options.prefix + 'clear' + options.suffix] = function ( done ) {
        tools.unlink([config.target], log, done);
    };

    return tasks;
}


// export main actions
generator.methods = {
    build: build
};


// public
module.exports = generator;
