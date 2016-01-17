'use strict'


var bmPlanner = angular.module('bmPlannerApp', ['ui.router', 'bmPlannerControllers', 'bmPlannerServices', 'bmDirectives']);

bmPlanner.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/'); //missing to create a page if it fails!!!
    
    $stateProvider
    
        .state('userHome', {
            url: '/',
            
            views: {
                '': {
                   templateUrl: '/html/userHomePage.html'
                },
                'listsCalToolsView@userHome':{
                    templateUrl: '/html/listsCalToolsView.html'
                },
                
                'calendarView@userHome':{
                    templateUrl: '/html/calendarView.html'
                }
            }
        })
        
        .state('editEvent', {
            url:'/editEvent',
            templateUrl:'/html/editEvent.html',
            controller: 'editEventCtrl as edit'
            
        })
        .state('logout', {
            
        })
        
        
        .state('account', {
            
        });
        
});