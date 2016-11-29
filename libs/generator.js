
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs-extra'));
var _ = require('lodash');
var ejs = require('ejs');
var path = require('path');

function readTmpl( fname ){
  var str = fs.readFileSync( fname, 'utf-8');
  return str.replace( /^[ \t]*<% (.*) %>[ \t]*\n/gm, function( match, content ){
    return '<% '+ content +' %>';
  });
}

var classTmpl = readTmpl( './entity-templates/class.ejs' );
var moduleTmpl = readTmpl('./entity-templates/module.ejs' );


function SourceGenerator( rootDir, moduleData, classList, functionList, interfaceList ){
  this.rootDir = path.join( rootDir, moduleData.id );
  this.moduleData = moduleData;
  this.classList = _.filter( classList, { module: moduleData.id } );
  this.functionList = _.filter( functionList, { module: moduleData.id } );
  this.interfaceList = _.filter( interfaceList, { module: moduleData.id } );
}

SourceGenerator.prototype.path = function( noExtFname ){
  return path.join( this.rootDir, noExtFname + '.js' );
};

SourceGenerator.prototype.writeClass = function( data ){
  var fname = this.path( data.id );
  var content = ejs.render( classTmpl, { data: data, moduleData: this.moduleData } );
  fs.writeFileSync( fname, content, 'utf-8' );
};

SourceGenerator.prototype.writeModuleIndex = function(){
  var fname = this.path( 'index' );
  var data = _.pick( this, 'moduleData', 'classList', 'functionList', 'interfaceList' );
  var content = ejs.render( moduleTmpl,  data );
  fs.writeFileSync( fname, content, 'utf-8' );
};


SourceGenerator.prototype.generate = function(){
  fs.mkdirpSync(this.rootDir);
  this.classList.forEach( this.writeClass.bind(this) );
  this.writeModuleIndex();
};

SourceGenerator.generate = function( destPath, data ){
  data.module.forEach( function( mod ){
    var sg = new SourceGenerator( destPath, mod, data.class, data.function, data.interface );
    sg.generate();
  });
};

module.exports = SourceGenerator;
