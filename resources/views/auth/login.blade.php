@extends('shared.master')
@section('name', 'Login')

@section('content')
    <img style="position:absolute; width:99%; min-width:500px; height:98%; min-height:600px" src="/pictures/background.jpg" alt="">
    
    <div style="position:absolute; background-color:#f4e6d7; width:45%; min-width:300px; height:50%; min-height:500px; margin-top:10%; margin-left:25%; margin-right:20%">
        
        <div style="width:60%; margin-left:30%; display:inline-block; margin-top:50px">
            <div style="float:left; margin-top:15px; font-size:120%; font-weight:bold">CompactDue</div>
            <div style="float:left; margin-left:5px">
                <img id="userPic" style="border-color:#992700" src="/pictures/gasper1.jpg" alt="User">
            </div>
            <div class="mainButton" style="float:left; margin-top:15px; margin-left:5px; font-size:120%"><a class="mainNavbar" href="/">Go Home</a></div>
        </div>
        
        <div style="width:60%; margin-left:15%; margin-right:15%; margin-top:5%">
            <form method="post">
                @foreach ($errors->all() as $error)
                    <p class="mainError">{{ $error}}</p>
                @endforeach
                
                {!! csrf_field() !!}
                
                <div style="margin:5%">
                    Email: <input class="mainInput" type="text" id="email" name="email" value="{{ old('email') }}">
                </div>
                
                <div style="margin:5%">
                    Password: <input class="mainInput" type="password" name="password"><br>
                    <input type="checkbox" name="remember">Remember Me?
                </div>
                
                
                <div style="margin:5%">
                    <button class="mainButton mainNavbar" type="submit">Login</button>
                </div>
             
             
            </form>
        </div>
        
        <div style="width:60%; margin-left:15%; margin-right:15%; margin-top:5%">
            <div style="float:left; margin-top:15px; margin-left:5px; font-size:90%"><a class="mainNavbar" href="/forgotPassword">&#9755; Forgot Password</a></div>
        </div>
    </div>
@endsection