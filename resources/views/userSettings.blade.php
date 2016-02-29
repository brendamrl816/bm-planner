@extends('shared.master')

@section('title', 'User Settings')

@section('content')

    
    <div style="margin:20px">
        @include('shared.navbar')
    </div>
    
    <div style="position:relative; width:90%; min-width:600px; min-height:550px; height:100%; margin-left:20px; margin-top:30px; display:inline-block">
        
        <div ng-style="style.addModalStyle()" style="position:absolute; left:10%; height:100%; width:30%">
            
            <div style="font-size:150%; margin-top:5%; margin-left:10%; margin-bottom:10%; font-weight:bold">Account Settings</div>
            
            <div style="margin:10%; margin-left:auto; height:100%; font-size:90%">    
                
                <form   name="userEditForm" method="post" action="/settings">
    
                    @foreach ($errors->all() as $error)
                        <p ng-style="style.errorStyle()">!{{ $error}}</p>
                    @endforeach
    
                    @if (session('status'))
                    <div ng-style="style.statusStyle()">
                        <div style="margin:5px">{{ session('status') }}</div>
                        
                    </div>
                    <br>
                    @endif
    
                    {!! csrf_field() !!}
    
                    
                        <div style="margin:5%">
                            First Name:
                            <br>
                            <input ng-style="style.modalbuttonStyle()" type="text" class="form-control" name="first_name" value="{{ $user->first_name }}">
                        </div>
                        
                       
                        <div style="margin:5%">
                            Last Name:
                            <br>
                            <input ng-style="style.modalbuttonStyle()" type="text" class="form-control" id="name"  name="last_name"
                                       value="{{ $user->last_name }}">
                            
                        </div>
                        
                        <div style="margin:5%">
                            Date of Birth:
                            <br>
                            <input ng-style="style.modalbuttonStyle()" type="date" class="form-control" id="name"  name="dob"
                                       value="{{ $user->dob }}">
                        </div>
    
                        <div style="margin:5%">
                            Email:
                            <br>
                            <input ng-style="style.modalbuttonStyle()" type="email" class="form-control" id="email" placeholder="Email" name="email"
                                       value="{{ $user->email }}">
                        </div>
    
                        <div style="margin:5%">
                            <span style="color:red; font-size:90%">Your password is required to update your account!</span>
                            <br>
                            Current Password:
                            <br>
                            <input ng-style="style.modalbuttonStyle()" type="password" class="form-control" name="old_password" required>
                        </div>
                        
                        
                        <div style="margin:5%">
                            New Password: 
                            <br>
                            <input ng-style="style.modalbuttonStyle()" type="password" class="form-control" name="password">
                        </div>
    
                        <div style="margin:5%">
                            Confirm New Password: 
                            <br>
                            <input ng-style="style.modalbuttonStyle()" type="password" class="form-control" name="password_confirmation">
                        </div>
    
                        <div style="margin:10%">
                            <div>
                                <button ng-style="style.buttonStyle()" type="reset">Cancel</button>
                                <button ng-style="style.buttonStyle()" type="submit">Submit</button>
                            </div>
                        </div>
                
                </form>
            </div>
        </div>
        
    <!--***************************   Theme Settings ******************************************************** -->
        <div  ng-style="style.addModalStyle()" style="position:absolute; left:45%; height:100%; width:60%" ng-controller="editStyleCtrl as editStyle">
            <div style="position:relative; width:90%; height:100%; margin-top:2%; margin-left:5%; font-size:90%; display:table; table-layout:fixed">
                
                <div style="font-size:150%; margin-left:50%; font-weight:bold">Page Settings</div>
                <div style="display:table-row; height:5%; font-weight:bold">
                   Pick Layout Theme: 
                </div>
               
                <div style="display:table-row; height:25%">
                    <div style="position:absolute; margin-left:30%; height:25%; width:50%; display:table-cell">
                        <input type="radio" ng-model="editStyle.chosenTheme" value="default">Default
                        <img ng-style="{'border':'1px solid', 'border-color':style.theStyle.css.buttons_borderColor}" style="position:absolute; left:5px; top:20px; height:80%; width:90%" alt="default theme">
                    </div>
                    
                </div>
                
                
                <div style="display:table-row; width:100%; height:25%">
                    <div style="position:relative; width:30%; display:table-cell">
                        <input type="radio" ng-model="editStyle.chosenTheme" value="theme1">Theme 1
                        <img ng-style="{'border':'1px solid', 'border-color':style.theStyle.css.buttons_borderColor}" style="position:absolute; left:5px; top:25px; height:80%; width:90%" alt="theme 1">
                    </div>
                    <div style="position:relative; width:30%; display:table-cell">
                        <input type="radio" ng-model="editStyle.chosenTheme" value="theme2">Theme 2
                        <img ng-style="{'border':'1px solid', 'border-color':style.theStyle.css.buttons_borderColor}" style="position:absolute; left:5px; top:25px; height:80%; width:90%" alt="theme 2">
                    </div>
                        
                </div>
                
                <div style="display:table-row; width:100%; height:25%">
                    <div style="position:relative; width:30%; display:table-cell">
                        <input type="radio" ng-model="editStyle.chosenTheme" value="theme3">Theme 3
                        <img ng-style="{'border':'1px solid', 'border-color':style.theStyle.css.buttons_borderColor}" style="position:absolute; left:5px; top:25px; height:80%; width:90%" alt="theme 3">
                    </div>
                    <div style="position:relative; width:30%; display:table-cell">
                        <input type="radio" ng-model="editStyle.chosenTheme" value="theme4">Theme 4
                        <img ng-style="{'border':'1px solid', 'border-color':style.theStyle.css.buttons_borderColor}" style="position:absolute; left:5px; top:25px; height:80%; width:90%" alt="theme 4">
                    </div>
                        
                </div>
                
                <button ng-style="style.buttonStyle()" style="display:table-row; margin:5%; height:20px" ng-click="editStyle.saveChanges()">Save Style Changes</button>
        
            </div>
        </div>
    </div>
    

@endsection
