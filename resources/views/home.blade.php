<html>
    <head>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-ui-router/angular-ui-router.js"></script>
    <script src="bower_components/jquery/jquery.js"></script>
    <script src="bower_components/moment/moment.js"></script>
    <script src="bower_components/moment/min/moment-with-locales.js"></script>
    
    <script src="/js/app.js"></script>
    <script src="/js/controllers.js"></script>
    <script src="/js/services.js"></script>
    <script src="/js/directives.js"></script>
    <link rel="stylesheet" type="text/css" href="/css/myStyle.css">
</head>

<body ng-app="bmPlannerApp">
    
    
    <div>
        
        @if (Auth::check())
            <div ui-view></div>
        @else
            <ul>
                <li><a href="/users/register">Register</a></li>
                <li><a href="/users/login">Login</a></li>
            </ul>
            <div>
                <h1>Best Management Planner</h1>
                <p>BMPlanner is a great way to get organized and get synced wherever you are.
                Plan for anything and set your own reminders, make it personal!.
                </p>
            </div>
        @endif
    </div>


</body>

</html>


