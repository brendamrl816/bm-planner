<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title> @yield('title') </title>
        <script src="/bower_components/angular/angular.js"></script>
        <script src="/bower_components/angular-animate/angular-animate.js"></script>
        <script src="/bower_components/angular-ui-router/angular-ui-router.js"></script>
        <script src="/bower_components/jquery/jquery.js"></script>
        <script src="/bower_components/moment/moment.js"></script>
        <script src="/bower_components/moment/min/moment-with-locales.js"></script>
        <link rel="stylesheet" href="/bower_components/font-awesome/css/font-awesome.min.css">
        
        <script src="/js/app.js"></script>
        <script src="/js/controllers.js"></script>
        <script src="/js/services.js"></script>
        <script src="/js/directives.js"></script>
        <script src="/js/animations.js"></script>
        <link rel="stylesheet" type="text/css" href="/css/myStyle.css">
        <link rel="stylesheet" type="text/css" href="/css/myQueries.css">
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="/js/jqueryfunctions.js"></script>
    </head>


    <body ng-app="bmPlannerApp" style=" font-family:'Arial Narrow', Arial, sans-serif; margin:0" ng-controller="userCtrl as u">
        <div ng-style="style.bodyStyle()" ng-controller="styleCtrl as style">
            @yield('content')
        </div>
    </body>

</html>