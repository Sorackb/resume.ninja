(function() {
  'use strict';

  angular
      .module('ninjaApp')
      .controller('ResumeController', ResumeController);

  ResumeController.$inject = [];

  function ResumeController() {
    var vm = this;
    vm.resume = {};

    _init();

    function _init() {
      vm.resume.name = 'Lucas Bernardo de Souza Santos';
      vm.resume.email = 'sorackb@gmail.com';
      vm.resume.website = 'www.lucassouza.ninja';
      vm.resume.skype = 'sorackb';
      vm.resume.phone = '+55 (42) 99949-3924';
      vm.resume.place = 'R. Bento do Amaral, 55 - Uvaranas, Ponta Grossa / PR - Brasil';
      vm.resume.title = 'Desenvolvedor Full Stack Sênior';

      vm.resume.links = {};
      vm.resume.links.facebook = 'https://www.facebook.com/lucasbss';
      vm.resume.links.twitter = 'https://twitter.com/sorackb';
      vm.resume.links.google_plus = 'https://plus.google.com/105353010340963385077?hl=pt_BR';
      vm.resume.links.linkedin = 'https://www.linkedin.com/in/lucas-bernardo-de-souza-santos/';
      vm.resume.links.github = 'https://github.com/Sorackb';
      vm.resume.links.stack_overflow = 'https://pt.stackoverflow.com/users/59479/sorack';
    }
  }
})();