@extends('shared.master')
@section('name', 'Login')

@section('content')

    <div class="mainBody">
        
         <div class="barDiv">
              
            <div style="float:left; position:relative; width:10%; margin-left:15%; margin-top:1px">
                <a style="width:100%; height:100%; text-decoration:none; color:white" href="/">
                      <div class="userPic" style="font-size:300%; margin-top:15px">gmPlanner</div>
                      <!--<img class="userPic" style="top:0; position:absolute" src="" alt="logoPic">-->
                  </a>
                <!--<a style="width:100%; height:100%" href="/">-->
                <!--    <img class="userPic" style="top:0; left:0; position:absolute" src="" alt="logoPic">-->
                <!--</a>-->
            </div>
            
              <div style="float:left; margin-left:30%; font-weight:bold; margin-top:40px">No account?</div>
              
              <a class="mainNavbar" style="float:left; position:relative; width:80px; height:25px; margin-top:35px; margin-left:10px"  href="/users/register">
                  <span  style="position:absolute; top:15%; left:12%">Sign Up</span>
              </a>
          </div>
        
        <div class="mainBodyDiv">

                <div style="margin-left:25%; margin-top:5%">
                    @foreach ($errors->all() as $error)
                        <p class="mainError">!{{ $error}}</p>
                    @endforeach
                </div>
                
                
                <div style="diplay:block; margin-left:25%; margin-top:2%; width:40%">
                    <form method="post" action="/users/login">
                        {!! csrf_field() !!}
                        
                        <div style="margin:10px">
                            <input class="mainInput" type="text" id="email" name="email"  placeholder="Email" value="{{ old('email') }}">
                        </div>
                        
                        <div style="margin:10px">
                            <input class="mainInput" type="password" placeholder="Password" name="password"><br>
                            <input type="checkbox" name="remember">Remember Me?
                        </div>
                        
                        
                        <div style="margin-top:10px; width:50%; margin:auto">
                            <button class="mainButton" type="submit">Login</button>
                        </div>
                    
                    </form>
                </div>
            
            <div style="margin-left:25%; margin-top:2%">
                <a style="text-decoration:none" href="/forgotPassword"><button style="float:left; margin-left:10px; color:blue; background-color:transparent; font-weight:bold"  style="font-size:80%; margin-left:5px">&#9755; Forgot Password?</button></a>
            </div>
            
        </div>
    </div>

@endsection