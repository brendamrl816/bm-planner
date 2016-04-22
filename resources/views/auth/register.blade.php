@extends('shared.master')
@section('title', 'Register')


@section('content')
<div class="secondCover">
  <div class="secondBody">
    
   <div class="barDiv">
     <div style="display:inline-block; height:100%; vertical-align:middle"></div>
     
          <a class="barDiv-logo" style="text-decoration:none; color:white" href="/">
              <div style="font-size:200%; font-weight:bold; text-shadow: 1px 1px 1px #000000">gmPlanner</div>
              <!--<img class="userPic" style="top:0; position:absolute" src="" alt="logoPic">-->
          </a>
        
        <div  style="font-weight:bold; text-shadow: 1px 1px 1px #000000; display:inline-block">Have an account?</div>
        <div class="barDiv-signUp">
            <a style="text-decoration:none; font-weight:bold; color:blue"  href="/users/login"><div>login</div></a>
        </div>
  
        
    </div>
          
    
    <div class="secondBodyDiv">
        <br>
        <div style="margin-top:-4%">
          @foreach ($errors->all() as $error)
              <p class="mainError">*{{ $error}}</p>
          @endforeach
        </div>
        
        <div style="diplay:inline-block; vertical-align:middle">
            
            <form method="post" action="/users/register"> 
       
                {!! csrf_field() !!}
                
                <div style="margin:15px">
                 <input class="mainInput" type="text" name="first_name" placeholder="First name" value="{{ old('first_name') }}">
                </div>
                
                <div style="margin:15px">
                  <input class="mainInput" type="text" name="last_name" placeholder="Last name" value="{{ old('last_name') }}">
                </div>
                
                <div style="margin:15px">
                  <input class="mainInput" type="text" name="email" placeholder="Email" value="{{ old('email') }}">
                </div>
                
                <div style="margin:15px; display:inline-block">
                  <div class="mainInput" style="background-color:inherit"><div style="float:left">Date of Birth:</div></div>
                  <input class="mainInput" type="date"  name="dob" value="{{ old('dob') }}">
                </div>
                
                <div style="margin:15px">
                  <div class="mainInput" style="background-color:inherit; display:inline-block">
                    <div style="float:left">
                      <input type="radio" name="gender" value="female" <?php if(Input::old('gender')== "female") { echo 'checked="checked"';}?> >Female
                    </div>
                    <div style="float:left; margin-left:10px">
                      <input type="radio" name="gender" value="male" <?php if(Input::old('gender')== "male") { echo 'checked="checked"';}?> >Male
                    </div>
                 </div>
                  
                </div>
                
                <div style="margin:15px">
                  <input class="mainInput" type="password"  placeholder="Password" name="password">
                </div>
                
                <div style="margin:15px">
                  <input class="mainInput" type="password"  placeholder="Confirm password" name="password_confirmation">
                </div>
                
                <div style="margin-top:15px; width:60%; margin-left:auto; margin-right:auto">
                  <button type="submit" class="mainButton">Register</button>
                </div>
            </form>
            
        </div>
          
    </div>
  
  </div>
</div>    
    

@endsection

