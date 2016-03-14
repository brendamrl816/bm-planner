@extends('shared.master')

@section('title', 'gmPlanner')

@section('content')

    @if (Auth::check())
        <div ng-style="style.navBar()" style="position:absolute; top:0; left:0; height:100px; width:100%; min-width:1000px">
            @include('shared.navbar')
        </div>
        <div style="margin-top:105px" ui-view="home"></div>
        
    @else

        
        <div class="mainBody">
            
            <div class="barDiv">
                <div style="float:left; position:relative; width:10%; margin-top:1px; margin-left:15%">
                  
                  <a style="width:100%; height:100%; text-decoration:none; color:white" href="/">
                      <div class="userPic" style="font-size:300%; margin-top:15px">gmPlanner</div>
                      <!--<img class="userPic" style="top:0; position:absolute" src="" alt="logoPic">-->
                  </a>
                </div>
                
                <a class="mainNavbar" style="float:left; margin-left:30%; position:relative; width:8%; min-width:100px; height:30px; margin-top:35px" href="/users/register">
                    <span style="position:absolute; top:18%; left:28%">Register</span>
                </a>
                <a class="mainNavbar" style="float:left; position:relative; width:8%; min-width:100px; height:30px; margin-top:35px; margin-left:1%" href="/users/login">
                    <span  style="position:absolute; top:18%; left:35%">Login</span>
                </a>

            </div>
            
            <div class="mainBodyDiv">
               <div style="width:50%; margin-left:30%; margin-top:5%; font-weight:bold">
                   <div>
                        <p>Organize, focus and get it done!
                        <br>
                        gmPlanner will help you organize your to-dos and your schedule in a way that makes them all manageable.
                        <br>
                        You can set your calendars and lists in different colors according to your own personal style.
                        <br>
                        Don't forget an event again, simply add them to your personalized calendars. 
                        </p>
                    </div>
                    
                </div>
                <div style="display:inline-block; margin-top:1%; width:100%">
                    <img style="float:left; margin-top:3%; margin-left:30%; width:15%" src="/pictures/calendar.png" alt="logoPic">
                    <img style="float:left; margin-top:3%; margin-left:2%; width:20%" src="/pictures/todolists.png" alt="logoPic">
                </div>
                    
            </div>
        
            <img style="position:absolute; top:20%;   left:5%; height:45%; width:20%" src="/pictures/addcal.png" alt="logoPic">
            
        </div>
             

    @endif

@endsection