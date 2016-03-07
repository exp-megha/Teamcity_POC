//  To avoid polluting the global namespace, wrap all of your functions in an IIFE. 
//  It is advised to have this happen at compilation/concatenation but including it here as an example.
(function() {
    
    // All Services are singletons, using .service() or .factory() differs the way Objects are created.

    // This file gives an example of using a .factory().
    // Factories are for business logic or provider modules, return an Object or a closure.

    function BaseService($log, $q, Restangular, _, caseConverter, $upload, AppConfig, blockUI) {
        var serviceObject = {};

        serviceObject.generate = function(url) {
            if (url) {
                var splits = url.split('/');
                splits = _.compact(splits);
                if (splits.length % 2 !== 0) {
                    $log.error('Given url is not proper', url, splits);
                    return;
                }

                var subString = function(element) {
                    var startIndex = 0;
                    var endIndex = element.length;
                    var substring = '';
                    startIndex = element.indexOf(':');
                    if (startIndex === -1) {
                        startIndex = element.indexOf('{');
                        if (startIndex === -1) {
                            $log.error('Given string is not in proper format' , element);
                            return substring;
                        }
                        else if (startIndex === 0) {
                            endIndex = element.indexOf('}');
                            if (endIndex === -1 || endIndex !== element.length - 1) {
                                $log.error('} should be the last char' , element);
                                return substring;
                            }
                            else {
                                substring = element.substring(startIndex, endIndex);
                                return substring;
                            }
                        }
                        else {
                            $log.error('{ should be the first char' , element);
                            return substring;
                        }
                    }
                    else if (startIndex === 0) {
                        substring = element.substring(1);
                        return substring;
                    }
                    else{
                        $log.error(': should be the first char' , element);
                        return substring;
                    }
                };

                var getValue = function(data, key) {
                    if(data && data.hasOwnProperty(key)) {
                        return data[key];
                    }
                    else {
                        $log.error('No property available', key, data);
                    }
                };

                var getRestObject = function(splits, params, isGetAllOrPost) {
                    var rest = Restangular;
                    var i = 0;

                    for(; i < splits.length - 2; i+=2) {
                        var key = splits[i];
                        var value = splits[i + 1];

                        value = subString(value);    
                        rest = rest.one(key, getValue(params, value));
                    }

                    var key1 = splits[i];
                    var value1 = splits[i + 1];
                    if (isGetAllOrPost) {                        
                        rest = rest.one(key1);
                    }
                    else {
                        value1 = subString(value1);
                        rest = rest.one(key1, getValue(params, value1));
                    }

                    return rest;
                };

                var preProcess = function (data) {
                    if (data) {
                        return caseConverter.convertToSnakeCase(data);
                    }

                    return data;
                };

                var postProcess = function (data) {
                    if (data) {
                        return caseConverter.convertToCamelCase(data);
                    }

                    return data;
                };

                var createUrl = function(URL, urlParams, isPost) {
                    if (URL && urlParams) {
                        _.each(_.keys(urlParams), function(key) {
                            if (urlParams.hasOwnProperty(key)) {
                                var newKey = ':' + key;
                                URL = URL.replace(newKey, urlParams[key]);
                                var newKey1 = '{' + key + '}';
                                URL = URL.replace(newKey1, urlParams[key]);
                            }
                        });
                    }

                    if (URL && isPost) {
                        var index = URL.lastIndexOf('/');
                        if (index !== -1) {
                            URL = URL.substring(0, index);
                        }
                    }
                    return URL;
                };

                var createQueryString = function(queryString) {
                    var qString = '';
                    if (queryString) {
                        var found = false;
                        _.each(_.keys(queryString), function(key) {
                            if (queryString.hasOwnProperty(key)) {
                                var value = queryString[key];
                                key = window.encodeURIComponent(key);
                                value = window.encodeURIComponent(key);
                                qString += key + '=' + value + '&';
                                found = true;
                            }
                        });  

                        if (found) {
                            qString = '?' + qString;
                        }                     
                    }
                    return qString;
                };

                
                    var findAll = function(urlParams, queryString, headers) {
                        blockUI.start();
                        var rest = getRestObject(splits, urlParams, true);
                        console.time('time taken for preprocess');
                        return rest.get(queryString, headers).then(function(data){
                            console.timeEnd('time taken for preprocess');
                            blockUI.stop();
                            return postProcess(data);
                        }, function(reason){
                            blockUI.stop();
                            return $q.reject(postProcess(reason));
                        });
                    };

                    var findOne = function(urlParams, queryString, headers) {
                        blockUI.start();
                        var rest = getRestObject(splits, urlParams, false);
                        console.time('time taken for preprocess');
                        return rest.get(queryString, headers).then(function(data){
                            console.timeEnd('time taken for preprocess ');
                            blockUI.stop();
                            return postProcess(data);
                        }, function(reason){
                            blockUI.stop();
                            return $q.reject(reason);
                        });
                    };

                    var save = function(urlParams, queryString, data, headers) {
                        blockUI.start();
                        console.time('time taken for preprocess');
                        data = preProcess(data);
                        console.timeEnd('time taken for preprocess');
                        var rest = getRestObject(splits, urlParams, false);
                        angular.extend(rest, data);
                        console.time('Time taken for Put');
                        return rest.put(queryString, headers).then(function(data){
                            console.timeEnd('Time taken for Put');
                            console.time('Time taken for PostProcess');
                            var p = postProcess(data);
                            console.timeEnd('Time taken for PostProcess');
                            blockUI.stop();
                            return p;
                        }, function(reason){
                            console.timeEnd('Time taken for Put');
                            blockUI.stop();
                            return $q.reject(reason);
                        });
                    };

                    var create = function(urlParams, queryString, data, headers) {

                        blockUI.start();
                        console.time('time taken for preprocess');
                        data = preProcess(data);
                        //console.log('data', data);
                        console.timeEnd('time taken for preprocess');
                        var rest = getRestObject(splits, urlParams, true);
                        console.time('Time taken for Post');

                        return rest.post(null, data, queryString, headers).then(function(data){
                            console.timeEnd('Time taken for Post');
                            console.time('Time taken for PostProcess');
                            var p = postProcess(data);
                            console.timeEnd('Time taken for PostProcess');
                            blockUI.stop();
                            return p;
                        }, function(reason){
                            console.timeEnd('Time taken for Post');
                            blockUI.stop();
                            return $q.reject(reason);
                        });
                    };

                    var remove = function(urlParams, queryString, headers) {
                        blockUI.start();
                        var rest = getRestObject(splits, urlParams, false);
                        return rest.remove(queryString, headers).then(function(data){
                            blockUI.stop();
                            return postProcess(data);
                        }, function(reason){
                            blockUI.stop();
                            return $q.reject(reason);
                        });
                    };

                    var multipartCreate = function (urlParams, queryString, data, headers, files) {
                        blockUI.start();
                        var newUrl = AppConfig.api_server+createUrl(url, urlParams, true);
                        var qString = createQueryString(queryString);
                        newUrl = newUrl + qString;

                        data = preProcess(data);
                        return $upload.upload({
                            url: newUrl,
                            method: 'POST',
                            headers: headers,
                            data: {data: data},
                            file: files
                        }). then(function(data){
                            blockUI.stop();
                            return postProcess(data.data);
                        }, function(reason){
                            blockUI.stop();
                            return $q.reject(reason.data);
                        }, function(evtProgress){
                            return evtProgress;
                        });
                    };

                    var multipartSave = function (urlParams, queryString, data, headers, files) {
                        blockUI.start();
                        var newUrl = AppConfig.api_server+createUrl(url, urlParams, false);
                        var qString = createQueryString(queryString);
                        newUrl = newUrl + qString;

                        data = preProcess(data);
                        return $upload.upload({
                            url: newUrl,
                            method: 'put',
                            headers: headers,
                            data: {data: data},
                            file: files
                        }). then(function(data){
                            blockUI.stop();
                            return postProcess(data);
                        }, function(reason){
                            blockUI.stop();
                            return $q.reject(reason);
                        }, function(evtProgress){
                            return evtProgress;
                        });
                    };

                return {
                    findAll: findAll,
                    findOne: findOne,
                    save: save,
                    create: create,
                    remove: remove,
                    multipartCreate: multipartCreate,
                    multipartSave: multipartSave
                };
            }
        };

        // Always return a host Object instead of the revealing module pattern.
        // This is due to the way Object references are bound and updated.
        // Primitive values cannot update alone using the revealing module pattern.
        return serviceObject;
    }

    // Pass functions into module methods rather than assigning a callback.
    // This helps aid with readability and helps reduced the amount of code "wrapped"
    // inside Angular.
    angular.module('common')
    .factory('BaseService', BaseService);
    
})();