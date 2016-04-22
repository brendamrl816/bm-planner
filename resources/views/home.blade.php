@extends('shared.master')

@section('title', 'gmPlanner')

@section('content')

    @if (Auth::check())
        
        <div style="width:95%; min-width:250px; display:inline-block; padding:1%">
            <div class="navBarInclude">
                @include('shared.navbar')
            </div>
            <div ng-style="style.homeView()"  class="theMainDiv" style="min-height:450px" ui-view></div>
        </div>
            
        
    @else
      
    <div id="mainBackground"><img class="mainBackground-image" src="/pictures/wood.jpg"></div> 
    
        <div class="mainBody">
            <div class="mainCircleDisplay"></div>
                <div class="mainCircle">
                    <img class="logo" src="/pictures/logo.png">
                    <div style="font-size:200%">gmPlanner</div>
                    <div class="mainCircleNav">Get organized and get it done!</div>
                    <br>
                    <div class="mainCircleNav">
                        <a id="login" class="mainCircleLink" href="/users/login">
                            <span>Login</span>
                        </a>
                        <a id="register" style="margin-left:10px" class="mainCircleLink"  href="/users/register">
                            <span>Register</span>
                        </a>
                    </div>
                    
                </div> 
        </div>
         
    
    @endif

@endsection