@extends('shared.master')

@section('title', 'compactDue')

@section('content')

    @if (Auth::check())
        <div style="margin-top:5px">
            @include('shared.navbar')
        </div>
        <br>
        <div ui-view="home"></div>
        
    @else
        <img style="position:absolute; width:99%; min-width:550px; height:98%; min-height:500px" src="/pictures/background.jpg" alt="">
        
        <div style="position:absolute; background-color:#f4e6d7; width:50%; min-width:400px; height:50%; min-height:350px; margin-top:10%; margin-left:25%; margin-right:20%">
           <div style="width:50%; margin-left:20%; margin-top:5%; margin-right:20%">
               <div>
                    <div style="width:100%; margin-left:20%; display:inline-block; margin-right:20%; margin-top:20px">
                        <div style="float:left; margin-top:10px; font-size:120%; font-weight:bold">CompactDue</div>
                        <div style="float:left; margin-left:5px">
                            <img id="userPic" style="border-color:#992700" src="/pictures/gasper1.jpg" alt="User">
                        </div>
                    </div>
                    <p>Organize, focus and get it done!
                    <br>
                    CompactDue will help you organize your to-dos and your schedule in a way that makes them all manageable.
                    <br>
                    You can set your calendars and lists in different colors according to your own personal style.
                    <br>
                    Don't forget an event again, simply add them to your personalized calendars. 
                    </p>
                </div>
                
                <div style="position:relative; width:100%; min-width:300px; margin-top:10%">
                    <a class="mainButton mainNavbar" style="text-decoration:none; border-radius:10px; position:absolute; width:45%; height:30px; left:0px; top:20%" href="/users/register">
                        <span style="position:absolute; top:15%; left:30%">Register</span>
                    </a>
                    <a class="mainButton mainNavbar" style="text-decoration:none; border-radius:10px; position:absolute; width:45%; height:30px; left:50%; top:20%" href="/users/login">
                        <span  style="position:absolute; top:15%; left:35%">Login</span>
                    </a>

                </div>
            </div>  
        </div>
           
            
    @endif

@endsection