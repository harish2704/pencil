
var path = require('path');
var Generator = require('../libs/generator');
var data = require('../data');
Generator.generate( path.join( process.env.PWD, 'generated'), data );
