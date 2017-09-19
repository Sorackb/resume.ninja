(function() {
  'use strict';

  angular
      .module('ninjaApp')
      .controller('ResumeController', ResumeController);

  ResumeController.$inject = ['resumeService'];

  function ResumeController(resumeService) {
    var vm = this;

    vm.resume = {};
    vm.treatDescription = _treatDescription;

    _init();

    function _init() {
      resumeService.load().then(function load(configuration) {
        vm.title = vm.resume.name + ' - ' + vm.resume.title;
        vm.resume = configuration.data;
      });
    }

    function _treatDescription(description, size) {
      var position;

      if (description.length <= size) {
        return description;
      }

      description = description.substring(0, size);

      position = description.lastIndexOf('.');
      position = position === -1 ? size : position;

      description = description.substring(0, position);
      description = description + '...';

      return description;
    }
  }
})();