@extends('shared.master')
@section('name', 'Forgot Password')

@section('content')
<div class="mainBackground"><img class="mainBackground-image" src="/pictures/wood.jpg"></div>
        <div class="secondBody">
            
            <div class="barDiv">
                <div style="display:inline-block; height:100%; vertical-align:middle"></div>
                
                <a class="barDiv-logo" style="text-decoration:none; color:white" href="/">
                  <div style="font-weight:bold; text-shadow: 2px 2px 1px #9E552E">gmPlanner</div>
                </a>
                <div class="barDiv-logIn">
                    <a class="mainNavbar" href="/users/login">
                        <span>Login</span>
                    </a>
                </div>
                
                <div class="barDiv-signUp">
                    <a class="mainNavbar"  href="/users/register"><span>Sign Up</span></a>
                </div>   
            </div>
            
            <div class="secondBodyDiv">
               
               <div style="width:100%">
                   @if (session('status'))
                        <div class="mainStatus">
                            {{ session('status') }}
                        </div>
                    @endif
                    @foreach ($errors->all() as $error)
                        <p class="mainError">*{{$error}}</p>
                    @endforeach
                </div>
               
               
               <div style="display:inline-block; vertical-align:middle">
                   
                   <form  method="post" action="/forgotPassword">
                        {!! csrf_field() !!}
                        
                      
                            <p>Forgot your password?</p>
                            <div>Do not worry, enter your email to receive instructions</div>
                     
                        <br>
                        
                         <input class="mainInput" style="margin-top:15px; margin-bottom:15px" type="email" id="email" name="email"  placeholder="Email"  value="{{ old('email') }}" required>
                        <br>
                        
                        <div style="width:100%; text-align:center">
                            <button class="mainButton" type="submit">Submit</button>
                        </div>
                    
                    </form>
                    
                </div>  
            </div>
        </div>
 
@endsection