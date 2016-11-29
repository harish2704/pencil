
var home = {
  name: 'home',
  url: '/',
  templateUrl: 'partials/home.html',
  controller: 'homeCtrl'
};

function capitalize(s){
      return s[0].toUpperCase() + s.slice(1);
}

/* function getState( entity, type ){
  var typeCaps = capitalize(entity);
  return {
    name: entity + typeCaps,
    url: '/'+entity+'/:'+entity+'Id',
    template: entity + '-'+type+'.html',
    controller: entity + typeCaps + 'Ctrl'
  };
} */

var entityList = {
  name: 'entityList',
  url: '/:entity',
  templateUrl: function ($stateParams){
    return 'partials/list.html';
  },
  controller: 'entityListCtrl'
};

var entityEdit = {
  name: 'entityEdit',
  url: '/:entity/:entityId',
  templateUrl: function ($stateParams){
    return 'partials/edit.html';
  },
  controller: 'entityEditCtrl'
};


module.exports = [
  home,
  entityList,
  entityEdit,
];
