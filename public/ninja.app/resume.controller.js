(function() {
  'use strict';

  angular
      .module('ninjaApp')
      .controller('ResumeController', ResumeController);

  ResumeController.$inject = ['resumeService'];

  function ResumeController(resumeService) {
    var vm = this;
    vm.resume = {};

    _init();

    function _init() {
      resumeService.load().then(function load(configuration) {
        vm.resume = configuration.data;
      });
    }
  }
})();