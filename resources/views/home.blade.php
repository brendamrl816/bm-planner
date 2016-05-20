@extends('shared.master')

@section('title', 'gmPlanner')

@section('content')

    @if (Auth::check())
        
        <div style="width:100%; display:inline-block">
            <div  ng-style="style.homeView()" class="mainBackground"><img class="mainBackground-image" src="/pictures/wood.jpg"></div> 
            
            <div class="navBarInclude" ng-style="style.navbarStyle()" ng-controller="navBarCtrl">
                
                <div class="navButton" ng-click="toggleNavMenu(); $event.stopPropagation()" >
                    <i class="fa fa-bars" aria-hidden="true"></i>
                    <div class="barMenu" ng-style="style.navMenu()" ng-show="navMenu">
                        
                        <div class="navBarDiv borderb"><a navlink class="loggedNav"  name="home" ui-sref="home"><span  class="spanLinks">Home</span></a></div>
                        <div class="navBarDiv borderb"><a navlink class="loggedNav"  name="settings" ui-sref="settings"><span  class="spanLinks">Settings</span></a></div>
                        <div class="navBarDiv borderb"><a navlink class="loggedNav"  name="contactUs" ui-sref="contactUs"><span class="spanLinks">Contact Us</span></a></div>
                        <div class="navBarDiv"><a navlink class="loggedNav"  href="/users/logout"><span class="spanLinks">Logout</span></a></div>
                    
                    </div>
                </div>
                <div class="userName" ng-model="u.user.displayName"><span ng-bind="u.user.displayName"></span></div>
            </div>
            
            <div  class="theMainDiv" ui-view></div>
        </div>
            
        
    @else
      
    <div class="mainBackground"><img class="mainBackground-image" src="/pictures/wood.jpg"></div> 
    
        <div class="mainBody">
            <div class="barDiv">&nbsp</div>
            <div class="mainCircleDisplay"></div>
                <div class="mainCircle">
                    <img class="logo" src="/pictures/logo.png">
                    <div style="font-size:200%">gmPlanner</div>
                    <div class="mainCircleNav">Get organized and get it done!</div>
                    <br>
                    <div class="mainCircleNav">
                        <a class="mainButton" href="/users/login">
                            <span>Login</span>
                        </a>
                        <a style="margin-left:10px" class="mainButton"  href="/users/register">
                            <span>Register</span>
                        </a>
                    </div>
                    
                </div> 
        </div>
         
    
    @endif

@endsection