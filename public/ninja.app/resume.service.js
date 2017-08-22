(function() {
  'use strict';

  angular
      .module('ninjaApp')
      .factory('resumeService', resumeService);

  resumeService.$inject = ['$http', '$location'];

  function resumeService($http, $location) {
    var service = {};

    service.load = _load;

    function _load() {
      return $http.get('./configuration/' + $location.host() + '.json');
    }

    return service;
  }
})();