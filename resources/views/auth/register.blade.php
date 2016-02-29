@extends('shared.master')
@section('name', 'Register')


@section('content')

<img style="position:absolute; width:99%; min-width:800px; height:98%; min-height:600px" src="/pictures/background.jpg" alt="">

<div style="position:absolute; background-color:#f4e6d7; width:50%; min-width:500px; height:60%; min-height:500px; margin-top:5%; margin-left:25%; margin-right:20%">

    <div style="width:60%; margin-left:30%; display:inline-block; margin-top:20px">
        <div style="float:left; margin-top:15px; font-size:120%; font-weight:bold">CompactDue</div>
        <div style="float:left; margin-left:5px">
            <img id="userPic" style="border-color:#992700" src="/pictures/gasper1.jpg" alt="User">
        </div>
        <div class="mainButton" style="float:left; margin-top:15px; margin-left:5px; font-size:120%"><a class="mainNavbar" href="/">Go Home</a></div>
    </div>
    
    <div style="diplay:inline-block">
      <div style="float:left; margin-left:10px">
        @foreach ($errors->all() as $error)
            <p class="mainError">!{{ $error}}</p>
        @endforeach
      </div>
    
      <div style="width:40%; min-width:500px; margin-left:25%; margin-top:0">
        <form method="post"> 
   
            {!! csrf_field() !!}
            
            <div style="margin:5%">
              First Name: <input class="mainInput" type="text" name="first_name" value="{{ old('first_name') }}">
            </div>
            
            <div style="margin:5%">
              Last Name: <input class="mainInput" type="text" name="last_name" value="{{ old('last_name') }}">
            </div>
            
            <div style="margin:5%">
              Email: <input class="mainInput" type="text" name="email" value="{{ old('email') }}">
            </div>
            
            <div style="margin:5%">
              Date of Birth: <input class="mainInput" type="date" name="dob" value="{{ old('dob') }}">
            </div>
            
            <div style="margin:5%">
              Gender: <input type="radio" name="gender" value="male" <?php if(Input::old('gender')== "male") { echo 'checked="checked"';}?> >Male
                    <input type="radio" name="gender" value="female" <?php if(Input::old('gender')== "female") { echo 'checked="checked"';}?> >Female
            </div>
            
            <div style="margin:5%">
              Password: <input class="mainInput" type="password" name="password">
            </div>
            
            <div style="margin:5%">
              Confirm Password: <input class="mainInput" type="password" name="password_confirmation">
            </div>
            
            <div style="margin-top:5%; margin-left:25%">
              <button type="reset" class="mainButton mainNavbar">Cancel</button>
              <button type="submit" class="mainButton mainNavbar">Submit</button>
            </div>
            
        
        </form>
      </div>
    </div>
      

</div>
  
    

@endsection

