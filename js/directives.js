
angular.module('pencil')
.directive('entityList', function() {
  return {
    restrict: 'E',
    // transclude:true,
    scope: {
      type: '@type',
      items: '=items'
    },
    controller:[ 'Db', '$scope', function( Db, $scope ){
      $scope.remove = function( type, id ){
        if( confirm('Are you sure?') ){
          Db.remove( type, id );
          $scope.items = Db.search(type);
        }
      };
    }],
    templateUrl: 'partials/entity-list-panel.html'
  };
});
