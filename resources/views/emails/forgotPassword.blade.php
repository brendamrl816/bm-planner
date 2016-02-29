@extends('shared.master')
@section('name', 'Forgot Password')

@section('content')
    <img style="position:absolute; width:99%; min-width:500px; height:98%; min-height:400px" src="/pictures/background.jpg" alt="">
    
    <div style="position:absolute; background-color:#f4e6d7; width:60%; min-width:300px; height:50%; min-height:300px; margin-top:10%; margin-left:20%; margin-right:20%">
        
        <div style="width:80%; margin-left:15%; display:inline-block; margin-top:50px">
            <div style="float:left; margin-top:15px; font-size:120%; font-weight:bold">CompactDue</div>
            <div style="float:left; margin-left:5px">
                <img id="userPic" style="border-color:#992700" src="/pictures/gasper1.jpg" alt="User">
            </div>
            <div class="mainButton" style="float:left; margin-top:15px; margin-left:5px; font-size:110%"><a class="mainNavbar" href="/">Go Home</a></div>
            <div class="mainButton" style="float:left; margin-top:15px; margin-left:5px; font-size:110%"><a class="mainNavbar" href="/users/login">Login</a></div>
        </div>
        
        <div style="position:relative; width:80%; margin-top:5%; margin-left:20%">
            <form id="emailForm" action="/sendTemp" method="post">
                
                @foreach ($errors->all() as $error)
                    <p ng-style="style.errorStyle()">!{{ $error}}</p>
                @endforeach
                
                @if (session('status'))
                    <div ng-style="style.statusStyle()">
                        <div style="margin:5px">{{ session('status') }}</div>
                        
                    </div>
                    <br>
                @endif
                
                {!! csrf_field() !!}
                
                <div style="margin:3%">
                    Please enter your email to send temporary password
                </div>
                <div style="margin:3%">
                    Email: <input class="mainInput" type="text" id="email" name="email" value="{{ old('email') }}">
                </div>
                <div style="margin:5%">
                    <button class="mainButton mainNavbar" type="submit">Submit</button>
                </div>
            </form>   
        </div>
    </div>
@endsection