@extends('shared.master')

@section('title', 'Delete Account')

@section('content')

<div style="width:100%; min-width:500px">   
   <div ng-style="style.navBar()" style="position:absolute; top:0; left:0; height:100px; width:100%; min-width:500px">
            @include('shared.navbar')
    </div>

    <div style="position:relative; width:100%; min-width:400px; margin-top:140px">   
        
        <form ng-style="style.addModalStyle()" style="width:50%; height:70%; margin-left:30%" method="post" action="/delete">
            {!! csrf_field() !!}
            <br>
            <br>
            <div style="position:absolute; top:10%; left:40%">
                @foreach ($errors->all() as $error)
                    <p class="mainError">!{{ $error}}</p>
                @endforeach
                @if (session('status'))
                <div class="mainError">
                    <div style="margin:5px">{{ session('status') }}</div>
                    
                </div>
                @endif
            </div>
            

            

            <div style="width:70%; height:50%; margin-top:10%; margin-left:20%">
                
                <input ng-style="style.inputStyle()" style="width:70%; height:2%; margin-top:2%" type="email" placeholder="Email" id="email" placeholder="Email" name="email"
                           value="{{ $user->email }}">
            

                <div  style="margin-top:2%">
                    <input ng-style="style.inputStyle()" style="width:70%; height:2%; margin-top:2%" type="password" placeholder="Enter your password" name="password" required>
                </div>
                
                
                <div  style="margin-top:5%; color:red">*Once deleted, all account information will be lost forever</div>
                
                <div  style="width:40%; margin:auto; margin-top:2%">
                    <div>
                        <button ng-style="style.buttonStyle()" type="submit"><i class="fa fa-trash fa-lg"></i> Delete Account</button>
                    </div>
                </div>
            </div>
            
        </form>   
     </div>
</div>

