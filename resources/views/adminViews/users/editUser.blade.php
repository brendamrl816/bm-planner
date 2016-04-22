@extends('shared.master')
@section('name', 'Edit a user')

@section('content')

<div class="secondCover">
        <div class="secondBody">
            
            <div class="barDiv">
                <div style="display:inline-block; height:100%; vertical-align:middle"></div>
                
                <a class="barDiv-logo" style="text-decoration:none; color:white" href="/">
                  <div style="font-size:150%; font-weight:bold; text-shadow: 1px 1px 1px #000000">gmPlanner</div>
                </a>
                
                <div style="display:inline-block">
                    <a class="adminLink" href="/admin">
                        <span>Admin Home</span>
                    </a>
                </div>
                
                <div style="display:inline-block; margin-left:10px">
                    <a class="adminLink" href="/admin/users">
                        <span>All Users</span>
                    </a>
                </div>
            </div>
            
            <div class="secondBodyDiv">
                
                <h2>Edit User</h2>
            
                 @if (session('status'))
                    <div>
                        {{session('status') }}
                    </div>
                @endif
                
                @foreach ($errors->all() as $error)
                    <p>{{ $error }}</p>
                @endforeach
                
            
               
                <form method="post" action="?/edit">
                  <!--action="/somePage.html?param1=foo&param2=foo">  -->
                    
                    {!! csrf_field() !!}
    
                    <input class="mainInput" style="margin-top:5px; margin-bottom:15px" type="text"  name="first_name"  placeholder="First Name"  value="{{ $user->first_name }}" >
                    <br>
                    <input class="mainInput" style="margin-top:5px; margin-bottom:15px" type="text"  name="last_name"  placeholder="Last Name"  value="{{ $user->last_name }}" >
                    <br>
                    <input class="mainInput" style="margin-top:15px; margin-bottom:15px" type="email" id="email" placeholder="Email" name="email"
                                       value="{{ $user->email }}" >  
                            
                    <br>
                    <select class="mainInput" style="margin-top:5px; margin-bottom:15px" id="role" name="role[]">
                        @foreach($roles as $role)
                            <option value="{!! $role->id !!}"  @if(in_array($role->id, $selectedRoles)) selected="selected" @endif >{!! $role->display_name !!}</option>
                        @endforeach
                    </select>
                     <br>
                    <input type="password"  class="mainInput" style="margin-top:5px; margin-bottom:15px" placeholder="Password" name="password">
                    <br>
                    <input type="password"  class="mainInput" style="margin-top:2px; margin-bottom:15px" placeholder="Confirm Password" name="password_confirmation">   
                    <br>
                    <div style="margin-top:20px">
                        <button class="mainButton" type="reset">Cancel</button>
                        <button class="mainButton" type="submit">Submit</button>
                    </div>
    
                       
                </form>
           
            </div>
        </div>
   </div>
   
   

@endsection