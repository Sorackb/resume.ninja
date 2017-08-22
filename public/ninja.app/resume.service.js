(function() {
  'use strict';

  angular
      .module('ninjaApp')
      .factory('resumeService', resumeService);

  resumeService.$inject = ['$http'];

  function resumeService($http) {
    var service = {};

    service.load = _load;

    function _load() {
      return $http.get('./configuration/resource');
    }

    return service;
  }
})();