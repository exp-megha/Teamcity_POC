//  To avoid polluting the global namespace, wrap all of your functions in an IIFE. 
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {
    
    // All Services are singletons, using .service() or .factory() differs the way Objects are created.

    // This file gives an example of using a .factory().
    // Factories are for business logic or provider modules, return an Object or a closure.

    function logService(githubService, $window, $log, AppConfig, _, localStorageService, modalService, gettext) {
        var git = githubService.gitHub();

        var issues = git.getIssues(AppConfig.git_username, AppConfig.git_repo);

        var containsSomeWhere = function(arObject, value) {
            if (arObject) {
                var found = _.find(arObject, function(entry){
                    return value.indexOf(entry) !== -1;
                });

                return angular.isDefined(found);
            }

            return false;
        };

        var canLog = function () {
            if (AppConfig.git_create_issue) {
                return !containsSomeWhere(AppConfig.log_ignore, $window.location.href);
            }

            return false;
        };

        var isAlreadyLogged = function(firstLine) {
            var logged = false;
            if (AppConfig.log_localStorage) {
                var values = localStorageService.get('exception___log');
                if (!values) {
                    values =[];
                }

                if (containsSomeWhere(values, firstLine)) {
                    $log.log('Already logged', firstLine);
                    logged = true;
                }
                else {
                    values.push(firstLine);
                    localStorageService.set('exception___log', values);
                    $log.log('Created a new entry in local storage', firstLine);
                }
            }

            return logged;
        };

        var getFirstStack = function(traces) {
            if (traces && traces.length > 0)  {
                return traces[0];
            }
            return '';
        };

        var showError = function (ticket, firstLine) {
            if (canLog() && !isAlreadyLogged(firstLine)) {
                var modalOptions1 = {
                    actionButtonText: gettext("Don't Send"),
                    closeButtonText: gettext('Send Error Report'),
                    headerText:  gettext("Sorry, the system has experienced an internal error."),
                    subtitle: gettext('Please tell Experion Technologies this problem.'),
                    bodyText: ticket.body
                };

                modalService.showModal({}, modalOptions1).then(function (result) {
                    $log.log('Result', result);
                    if (result === 'cancel') { // canecl means, you can send the report
                        issues.createNew(ticket, function(err,res){
                            $log.log('Response from github', err, res);
                        });
                    }
                });                
            }
            else {
                var modalOptions2 = {
                    actionButtonText: gettext("Close"),
                    headerText:  gettext("Sorry, the system has experienced an internal error."),
                    bodyText: ticket.body
                };

                modalService.showModalError({}, modalOptions2).then(function (result) {
                    $log.log('Result', result);
                });                
            }
        };

        var log = function(exception, cause, title) {
            try {
                var url = $window.location.href;
                var stack = window.printStackTrace({e:exception});
                var firstLine = getFirstStack(stack) + ' ' + url;
                title = title || exception.toString();

                var ticket = {
                    "title": title,
                    "body": stack.join("\n") + '\n\nScreen URL is : ' + url,
                    "labels": [
                        "dev-test",
                        "auto-bug"
                    ]
                };

                showError(ticket, firstLine);
            }         
            catch(err) {
                console.error(err);
            }
        };

        return {
            log: log,
        };
    }

    // Pass functions into module methods rather than assigning a callback.
    // This helps aid with readability and helps reduced the amount of code "wrapped"
    // inside Angular.
    angular.module('common')
    .factory('logService', logService);
    
})();