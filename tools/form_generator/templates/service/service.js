(function() {

    function xp<%- @formalFormName %>Service($log, BaseService) {

        var baseSer = BaseService.generate('');
        return baseSer;
 
    }

    angular.module('<%- @module %>')
        .factory('xp<%- @formalFormName %>Service', xp<%- @formalFormName %>Service);
})();