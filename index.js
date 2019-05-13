/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

var name  = 'pug',
    tools = require('runner-tools'),
    log   = require('runner-logger').wrap(name);


function build ( config, done ) {
    var pug = require('pug'),
        render, data;

    try {
        // prepare function and data
        render = pug.compileFile(config.source, config.options || {});
        data   = render(Object.assign(
            {get buildTimestamp () { return Date.now(); }},
            config.variables)
        );

        // save generated result
        tools.write([{name: config.target, data: data}], log, done);
    } catch ( error ) {
        log.fail(error.toString());
    }
}


function generator ( config, options ) {
    var tasks = {};

    // sanitize and extend defaults
    config = config || {};
    generator.config = config;
    options = Object.assign({}, generator.options, options || {});

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


// defaults
generator.options = {
    prefix: name + ':',
    suffix: ''
};


// export main actions
generator.methods = {
    build: build
};


// public
module.exports = generator;
