<html>
<head>
    <title> @yield('title') </title>
    <script src="/bower_components/angular/angular.js"></script>
    <script src="/bower_components/angular-ui-router/angular-ui-router.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
</head>
<body>
    
@include('shared.navbar')

@yield('content')

</body>
</html>