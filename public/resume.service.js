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
      console.log($location.host());
      return $http.get('./configuration/example.json');
    }

    return service;
  }
})();