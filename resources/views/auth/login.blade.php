@extends('shared.master')
@section('name', 'Login')

@section('content')
<div class="mainBackground"><img class="mainBackground-image" src="/pictures/wood.jpg"></div>
        <div class="secondBody">
            
             <div class="barDiv">
                <div style="display:inline-block; height:100%; vertical-align:middle"></div>
                <a class="barDiv-logo" style="text-decoration:none; color:white" href="/">
                      <div style="font-weight:bold; text-shadow: 2px 2px 1px #75A8CA">gmPlanner</div>
                      <!--<img class="userPic" style="top:0; position:absolute" src="" alt="logoPic">-->
                </a>
                <div style="font-weight:bold; text-shadow: 1px 1px 1px #000000; display:inline-block">No account?</div>
                
                <div class="barDiv-signUp">
                    <a  style="text-decoration:none; font-weight:bold; color:#75A8CA"  href="/users/register"><div>sign up</div></a>
                </div>
            </div>
            
            <div class="secondBodyDiv">
                
                <!--<img  class="officePic" src="/pictures/office2.png" alt="officeLife">   -->
                   
                    <div style="width:100%">
                         @if (session('status'))
                            <div class="mainStatus">
                                {{ session('status') }}
                            </div>
                        @endif
                        
                        @foreach ($errors->all() as $error)
                            <p class="mainError">*{{ $error}}</p>
                        @endforeach
                    </div>
                    
                
                  
                    <div style="display:inline-block; vertical-align:middle">
                        <form method="post" action="/users/login">
                            {!! csrf_field() !!}
                            
                            <div style="margin-top:15px">
                                <input class="mainInput" type="text" name="email"  placeholder="Email" value="{{ old('email') }}">
                            </div>
                            
                            <div style="margin-top:15px">
                                <input class="mainInput" type="password" placeholder="Password" name="password">
                            </div>
                            
                            <div style="margin-top:5px">
                                <input type="checkbox" name="remember">Remember Me?
                            </div>
                            
                            
                            <div style="margin-top:15px">
                                <button class="mainButton" type="submit">Login</button>
                            </div>
                        
                        </form>
                        
                        <div style="margin-top:35px; width:100%">
                            <a style="text-decoration:none" href="/forgotPassword"><button style="color:blue; background-color:transparent; font-weight:bold">&#9755; Forgot Password?</button></a>
                        </div>
  
                    </div>
                    
                    
                    
            </div>
        
        </div>
@endsection