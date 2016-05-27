@extends('shared.master')

@section('title', 'Create A New Role')

@section('content')
   
<div class="mainBackground"><img class="mainBackground-image" src="/pictures/wood.jpg"></div>
        <div class="secondBody">
            
            <div class="barDiv">
                <div style="display:inline-block; height:100%; vertical-align:middle"></div>
                
                <a class="barDiv-logo" style="text-decoration:none; color:white" href="/">
                  <div style="font-size:150%; font-weight:bolder; text-shadow: 1px 1px 1px #000000">gmPlanner</div>
                </a>
                
                <div style="display:inline-block">
                    <a class="adminLink" href="/admin">
                        <span>Admin Home</span>
                    </a>
                </div>
                
                <div style="display:inline-block; margin-left:10px">
                    <a class="adminLink" href="/admin/roles">
                        <span>All Rolls</span>
                    </a>
                </div>
            </div>
            
            <div class="secondBodyDiv">
                
                <h2>Create a Role</h2>
            
                 @if (session('status'))
                    <div>
                        {{session('status') }}
                    </div>
                @endif
                
                @foreach ($errors->all() as $error)
                    <p>{{ $error }}</p>
                @endforeach
                
                
                <form method="post" action="/admin/roles/create">

                    <input type="hidden" name="_token" value="{!! csrf_token() !!}">
    
                    <input class="mainInput" style="margin-top:5px; margin-bottom:15px" type="text"  name="name"  placeholder="Name">
                    <br>
                    
                    <input type="text"  class="mainInput" style="margin-top:5px; margin-bottom:15px" placeholder="Display Name" name="display_name">
                    <br>
                    <input type="textarea" class="mainInput" style="margin-top:5px; margin-bottom:15px" placeholder="Description" name="description"/>
                    <br>
                    
                    <div style="margin-top:20px">
                        <button class="mainButton" type="reset">Cancel</button>
                        <button class="mainButton" type="submit">Submit</button>
                    </div>
    
                       
                </form>
        
            </div>
        </div>

@endsection

