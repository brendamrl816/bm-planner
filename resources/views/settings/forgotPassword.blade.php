@extends('shared.master')
@section('name', 'Forgot Password')

@section('content')

    <div class="mainBody">
        
        <div class="barDiv">
            <div style="float:left; position:relative; width:10%; margin-top:1px; margin-left:20%">
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
           <div style="width:50%; margin:auto">
               <form id="emailForm" style="margin-top:12%" action="/sendTemp" method="post">
                
                    @foreach ($errors->all() as $error)
                        <div class="mainError">!{{ $error}}</div>
                    @endforeach
                    
                    @if (session('status'))
                        <div class="mainError">
                            <div style="margin:5px">{{ session('status') }}</div>
                        </div>
                    @endif
                    
                    {!! csrf_field() !!}
                    
                  
                        <p style="width:45%; min-width:150px; margin:auto">Forgot your password?</p>
                        <div style="width:65%; min-width:400px; margin:auto; margin-top:1.5%">Do not worry, enter your email to receive instructions</div>
                 
                    <br>
                    
                     <input class="mainInput" style="margin-left:10%; margin-top:2%; margin-bottom:2%" type="email" id="email" name="email"  placeholder="Email"  value="{{ old('email') }}">
                    <br>
                    <br>
                    <div style="width:40%; margin:auto">
                        <button class="mainButton" type="submit">Submit</button>
                    </div>
                
                </form>
                
            </div>  
        </div>
    </div>
   
   
@endsection