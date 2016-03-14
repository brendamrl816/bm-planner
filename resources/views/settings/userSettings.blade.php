@extends('shared.master')

@section('title', 'User Settings')

@section('content')

       
    
    <div style="margin:0; width:100%; min-width:620px; min-height:550px">
        
         <div ng-style="style.navBar()" style="position:absolute; top:0; left:0; height:100px; width:100%; min-width:630px">
            @include('shared.navbar')
        </div>
        
        <div style="position:relative; width:100%; display:inline-block; margin-top:120px">
            
            <div ng-style="style.addModalStyle()" style="float:left; height:100%; min-height:600px; margin-left:5%; width:30%">
                
                <div style="font-size:150%; margin-top:2%; margin-left:10%; font-weight:bold">Account Settings</div>
                
                <div style="margin-top:2%; margin-left:auto; font-size:90%">    
                    
                    <form   name="userEditForm" method="post" action="/settings">
        
                        @foreach ($errors->all() as $error)
                            <p class="mainError">!{{ $error}}</p>
                        @endforeach
        
                        @if (session('status'))
                        <div ng-style="style.statusStyle()">
                            <div style="margin:5px">{{ session('status') }}</div>
                            
                        </div>
                        <br>
                        @endif
        
                        {!! csrf_field() !!}
        
                        
                            <div style="margin:5%">
                                <input ng-style="style.inputStyle()" type="text" placeholder="First Name"  name="first_name" value="{{ $user->first_name }}">
                            </div>
                            
                           
                            <div style="margin:5%">
                                <input ng-style="style.inputStyle()" type="text"  placeholder="Last Name" id="name"  name="last_name"
                                           value="{{ $user->last_name }}">
                                
                            </div>
                            
                            <div style="margin:5%">
                                Date of Birth:
                                <br>
                                <input ng-style="style.inputStyle()" type="date"  id="name"  name="dob"
                                           value="{{ $user->dob }}">
                            </div>
        
                            <div style="margin:5%">
                                <input ng-style="style.inputStyle()" type="email" placeholder="Email" id="email" placeholder="Email" name="email"
                                           value="{{ $user->email }}">
                            </div>
 
                            <div style="margin:5%">
                                <input ng-style="style.inputStyle()" type="password" placeholder="New Password" name="password">
                            </div>
        
                            <div style="margin:5%">
                                <input ng-style="style.inputStyle()" type="password" placeholder="Confirm New Password" name="password_confirmation">
                            </div>
                            
                            <br>
                            
                            <div style="margin:5%">
                                <span style="color:gray; font-size:90%; margin-bottom:5px">Your current password is required to save any account changes</span>
                                
                                <input ng-style="style.inputStyle()" type="password" placeholder="Current Password" name="old_password" required>
                            </div>
                            
                            <div style="margin-top:1%; margin-bottom:10%; margin-left:5%">
                                <div>
                                    <button ng-style="style.buttonStyle()" style="margin-right:10px" type="reset">Cancel Changes</button>
                                    <button ng-style="style.buttonStyle()" type="submit">Submit Changes</button>
                                </div>
                            </div>
                    
                    </form>
                    <br>
                    <a style="font-size:14px; margin-left:5%; text-decoration:none; color:black" href="/deleteAccount"><button ng-style="style.modalbuttonStyle()" style="width:180px; height:3%" ><i class="fa fa-trash fa-lg"></i>&nbsp Delete Account </button></a>
                </div>
            </div>
            
        <!--***************************   Theme Settings ******************************************************** -->
            <div  ng-style="style.addModalStyle()" style=" float:left; margin-left:5%; height:100%; min-height:600px; width:60%">
                
                <div style="height:8%; margin-top:1%; margin-bottom:5px">
                    <div style="font-size:150%; margin-left:30%; font-weight:bold">Page Settings</div>
                    <div style="font-weight:bold; width:50%; margin-left:5%; margin-top:1%">Pick Layout Theme: </div>
                </div>
                    
                <div style="position:relative; width:90%; height:85%; margin-left:5%; font-size:90%" ng-controller="editStyleCtrl as editStyle">   
                    
                    <div style="display:table-row">
                        <div style="position:absolute; left:30%; top:0; height:29%; width:50%; display:table-cell">
                            <input type="radio" ng-model="editStyle.chosenTheme" value="default">Default
                            <img style="height:85%; width:90%; border: 5px solid white; border-radius:5px" src="/pictures/default.png" alt="default theme">
                        </div>
                    </div>
                    
                    
                    <div style="display:table-row; width:100%">
                        <div style="position:absolute; width:50%; top:31%; left:0;  height:29%; display:table-cell">
                            <input type="radio" ng-model="editStyle.chosenTheme" value="theme1">Theme 1
                            <img  style="height:85%; width:90%;  border: 5px solid white; border-radius:5px" src="/pictures/theme1.png" alt="theme 1">
                        </div>
                        <div style="position:absolute; width:50%;  left:52%; top:31%; height:29%; display:table-cell">
                            <input type="radio" ng-model="editStyle.chosenTheme" value="theme2">Theme 2
                            <img  style="height:85%; width:90%;  border: 5px solid white; border-radius:5px" src="/pictures/theme2.png" alt="theme 2">
                        </div>
                            
                    </div>
                    
                    <div style="display:table-row; width:100%">
                        <div style="position:absolute; width:50%; top:61%; left:0;  height:29%; display:table-cell">
                            <input type="radio" ng-model="editStyle.chosenTheme" value="theme3">Theme 3
                            <img  style="height:85%; width:90%;  border: 5px solid white; border-radius:5px" src="/pictures/theme3.png" alt="theme 3">
                        </div>
                        <div style="position:absolute; width:50%;  left:52%; top:61%; height:29%; display:table-cell">
                            <input type="radio" ng-model="editStyle.chosenTheme" value="theme4">Theme 4
                            <img  style="height:85%; width:90%;  border: 5px solid white; border-radius:5px" src="/pictures/theme4.png" alt="theme 4">
                        </div>
                            
                    </div>
                    
                    <button ng-style="style.buttonStyle()" style="position:absolute; top:94%; min-height:20px; min-width:150px" ng-click="editStyle.saveChanges()">Save Style Changes</button>
                </div>
                
            </div> 
        </div>
        
            
    </div>
    

@endsection
