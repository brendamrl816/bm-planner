@extends('shared.master')
@section('title', 'Register')


@section('content')

<div class="mainBody" style="min-height:550px">
  
 <div class="barDiv">
    <div style="float:left; position:relative; width:10%; margin-left:15%; margin-top:1px">
        <a style="height:100%; text-decoration:none; color:white" href="/">
            <div class="userPic" style="font-size:300%; margin-top:15px">gmPlanner</div>
            <!--<img class="userPic" style="top:0; position:absolute" src="" alt="logoPic">-->
        </a>
        <!--<a style="width:100%; height:100%" href="/">-->
        <!--    <img class="userPic" style="top:0; left:0; position:absolute" src="" alt="logoPic">-->
        <!--</a>-->
    </div>
    
      <div style="float:left; margin-left:30%; font-weight:bold; margin-top:40px">Have an account?</div>
      
      <a class="mainNavbar" style="float:left; position:relative; width:80px; height:25px; margin-top:35px; margin-left:10px"  href="/users/login">
          <span  style="position:absolute; top:15%; left:20%">Login</span>
      </a>
  </div>
        
  
  <div class="mainBodyDiv">
      
      <div style="position:absolute; right:76%; top:5%">
        @foreach ($errors->all() as $error)
            <p class="mainError">!{{ $error}}</p>
        @endforeach
      </div>
      
      <div style="diplay:block; margin-left:25%; margin-top:5%; width:50%">
          
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
              
              <div style="margin:15px">
                Date of Birth:<br>
                <input class="mainInput" type="date"  name="dob" value="{{ old('dob') }}">
              </div>
              
              <div style="margin:15px">
                <input type="radio" name="gender" value="male" <?php if(Input::old('gender')== "male") { echo 'checked="checked"';}?> >Male
                <input type="radio" name="gender" value="female" <?php if(Input::old('gender')== "female") { echo 'checked="checked"';}?> >Female
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
    
    

@endsection

