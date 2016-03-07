(function() {

// @@message
// Created at @@date
// git revision @@git_revision
var AppConfig = {
    environment: '@@env', //automatically filled by Gruntfile
    api_server: '@@api',
    version: '@@version',
    created_date: '@@date',
    git_revision: '@@git_revision',
    git_lastPullDate : '@@lastPullDate',
    customer_id: 1,
};

angular.module('palaverPlace').constant('AppConfig', AppConfig);

})();
