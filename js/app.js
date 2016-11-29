// require('angular-schema-form');
// require('angular-schema-form-bootstrap');
var fs = require('fs');
var forms = require('./js/forms');
var states = require('./js/states');
var ENTITIES = ['class', 'module', 'function', 'constant', 'interface'];

angular.module('pencil', ['schemaForm', 'ui.router', 'ui.bootstrap', 'asf.bs-extra' ])
  .config(['$stateProvider', function ($stateProvider) {
    states.forEach(function (state) {
      return $stateProvider.state(state);
    });
  }])
  .run(['bseDataSource', 'Db', '$rootScope', function( bseDataSource, Db, $rootScope ){
    bseDataSource.addSource('default', function( ref, str ){
      return Db.search( ref.type, str );
    });
    $rootScope.ENTITIES = ENTITIES;
  }])
  .service('Db', function(){
    var model = {};
    var datatypes = new Set([
      'String',
      'Number',
      'Boolean',
      'Promise',
      'Object',
      'Array',
      'function'
    ]);

    typeCollecters = {};

    typeCollecters['function'] = function ( method ){
      method.params.forEach( function( param ){
        param.type && datatypes.add( param.type );
      });
    };

    typeCollecters['class'] = function ( classItem ){
      classItem.returnType  && datatypes.add( classItem.returnType );
      classItem.methods.forEach( typeCollecters['function'] );
    };

    function collectTypeInfo( type, items ){
      if( typeCollecters[type] ){
        items.forEach( typeCollecters[type] );
      }
    }

    function initModel( data ){
      ENTITIES.forEach( function( key ){
        data[key] = data[key] || [];
        collectTypeInfo( key, data[key] );
      });
    }

    try {
      model = JSON.parse( fs.readFileSync('data.json', 'utf-8' ) );
    } catch (e) {
      console.log( 'Failed to load dbFile. Creating new one' );
    }
    initModel( model );



    function flushDb(){
      fs.writeFileSync( 'data.json', angular.toJson( model, null, ' ' ), 'utf-8' );
    }


    function searchDatatypes( str ){
      return Array.from(datatypes).filter( function(v){
        return v.match( new RegExp( str, 'i') );
      });
    }

    this.search = function( type, q ){
      if( type === 'datatype' ){
        return searchDatatypes( q );
      }
      if( model[type] && model[type].length ){
        return model[type].filter( function(v){ return v.id.match( new RegExp( q, 'i' ) ); } );
      }
      return [];
    };

    this.get = function( type, id ){
      var collection = model[type];
      if( collection && collection.length ){
        items = collection.filter(function(v){
          return v.id === id;
        });
        return items[0];
      }
    };

    this.remove = function( type, id ){
      var collection = model[type];
      if( collection && collection.length ){
        for (var i = 0, l = collection.length; i < l; i ++) {
          if( collection[i].id === id ){
            collection.splice(i, 1 );
            break;
          }
        }
      }
      flushDb();
    };

    this.save = function( type, data ){
      var existing = this.get( type, data.id );
      model[type] = model[type] ||[];

      if( !existing ){
        model[type].push( data );
      } else {
        for( var key in data ){
          existing[key] = data[key];
        }
      }

      collectTypeInfo( type, [ data ] );
      flushDb();
    };

  })
  .controller('entityEditCtrl', [ '$scope', 'Db', '$stateParams', '$state', function($scope, Db, $stateParams, $state ) {

    var entity = $stateParams.entity;
    var entityId = $stateParams.entityId;
    $scope.isNew = entityId === '__new__';

    $scope.model = Db.get( entity, entityId ) || {};

    Object.assign( $scope, forms[entity + 'Form']);

    $scope.saveData = function(){
      Db.save( entity, $scope.model );
      if( $scope.isNew ){
        $state.go('entityEdit', { entity: entity, entityId: $scope.model.id });
      }
    };

  }])
  .controller('entityListCtrl', [ '$scope', 'Db', '$stateParams', function($scope, Db, $stateParams ) {

    $scope.entity = $stateParams.entity;
    $scope.items = Db.search( $scope.entity );

  }])
  .controller('homeCtrl', [ '$scope', 'Db', function($scope, Db) {
    ENTITIES.forEach( function(v){
      $scope[v] = Db.search( v ) || [];
    });


  }]);

require('./js/directives');
