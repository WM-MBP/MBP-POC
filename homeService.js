var services = angular.module('ngdemo.services', ['ngResource']);

services.factory('UserFactory', function ($resource) {
    return $resource('D:/Users/gs/Desktop/app/components/home/demo', {}, {
        query: {
            method: 'GET',
            params: {},
            isArray: false
        }
    })
});