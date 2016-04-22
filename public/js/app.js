'use strict'


var bmPlanner = angular.module('bmPlannerApp', ['ui.router',  'bmPlannerControllers', 'bmPlannerServices', 'bmDirectives']);

bmPlanner.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home'); //missing to create a page if it fails!!!
    $urlRouterProvider.when('/home', 'home/main');
    
    $stateProvider
    
        .state('home', {
            url: '/home',
            views: {
                '': {
                   templateUrl: '/html/userHomePage.html'
                },
                'listsCalToolsView@home':{
                    templateUrl: '/html/listsCalToolsView.html'
                },
                
                'calendarView@home':{
                    templateUrl: '/html/calendarView.html'
                }
            }
        })
        .state('home.main', {
            url:'/main',
            templateUrl:'/html/monthlyView.html',
            controller:'monthlyViewCtrl as monthctrl'
          
        })
        .state('home.weeklyView', {
            url:'/weeklyView',
            templateUrl:'/html/weeklyView.html',
            controller:'weekViewCtrl'
        })
        .state('settings', {
            url:'/settings',
            
            views: {
                '':{
                    templateUrl: '/html/userSettings.php'
                }
            }
        })
        .state('contactUs', {
            url:'/contactUs',
            
            views: {
                '':{
                    templateUrl: '/html/contactUs.html'
                }
            }
        })
        .state('deleteAccount', {
            url:'/deleteAccount',
            views:{
                '':{
                    templateUrl:'/html/deleteAccount.html'
                }
            }
        });
        
});