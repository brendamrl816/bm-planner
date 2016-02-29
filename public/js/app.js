'use strict'


var bmPlanner = angular.module('bmPlannerApp', ['ui.router', 'bmPlannerAnimations', 'bmPlannerControllers', 'bmPlannerServices', 'bmDirectives']);

bmPlanner.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/'); //missing to create a page if it fails!!!
    
    $stateProvider
    
        .state('home', {
            url: '/',
            
            views: {
                'home': {
                   templateUrl: '/html/userHomePage.html'
                },
                'listsCalToolsView@home':{
                    templateUrl: '/html/listsCalToolsView.html'
                },
                
                'calendarView@home':{
                    templateUrl: '/html/calendarView.html'
                }
            }
        });
});