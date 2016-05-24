<div style=" display:inline-block; width:5%; height:70%"></div>

<div style="display:inline-block; width:90%">
<!--***************************   Theme Settings ******************************************************** -->
    <div class="userSettingsDivLeft" ng-controller="editStyleCtrl as editStyle">
        
        <div style="margin-bottom:10px; margin-top:20px; font-weight:bold;">
            <div style="font-size:110%; width:100%; text-align:center">Page Settings</div>
        </div>
            
        <div class="themeHolder" style="font-weight:bold">Pick Layout Theme:</div>
        
        <div class="themeHolder">
            <div class="themePics">
                <input type="radio" ng-model="editStyle.chosenTheme" value="default">Default
                <img  style=" width:90%; height:90%; border-radius:2px" src="/pictures/default.png" alt="default theme">
            </div>
        
            <div class="themePics">
                <input type="radio" ng-model="editStyle.chosenTheme" value="theme1">Theme 1
                <img  style="width:90%; height:90%;  border-radius:2px" src="/pictures/theme1.png" alt="theme 1">
            </div>
            <div class="themePics">
                <input type="radio" ng-model="editStyle.chosenTheme" value="theme2">Theme 2
            
                <img  style="width:90%; height:90%; border-radius:2px" src="/pictures/theme2.png" alt="theme 2">
            </div>

            <div class="themePics">
                <input type="radio" ng-model="editStyle.chosenTheme" value="theme3">Theme 3
                <img  style="width:90%; height:90%; border-radius:2px" src="/pictures/theme3.png" alt="theme 3">
            </div>
            <div class="themePics">
                <input type="radio" ng-model="editStyle.chosenTheme" value="theme4">Theme 4
                <img  style="width:90%; height:90%;  border-radius:2px" src="/pictures/theme4.png" alt="theme 4">
            </div>
            
        </div>    
            

        <div style="width:100%; margin-top:30px; margin-bottom:20px; display:inline-block; text-align:center">
            <button ng-style="style.buttonStyle()"  ng-click="editStyle.saveChanges()">Save Style Changes</button>
        </div>
        
   </div>
    
    <!--**********************************************Account Settings*************************************************-->
    <div class="userSettingsDivRight" >
        
        <div style="font-size:110%; margin-top:20px; font-weight:bold; width:100%; text-align:center">Account Settings</div>
        
        <div style="margin-top:10px; margin-left:auto">    
            
            <form  name="userEditForm" style="text-align:center">
                    <div ng-style="style.statusStyle()" ng-show="u.successMessage">Your account settings have been updated!</div>
                    <div ng-style="style.errorStyle()" ng-repeat="error in u.errors">{{error}}</div>
                    
                    <div style="margin:10px">
                        <span ng-show="userEditForm.first_name.$error.required" style="color:red; font-size:90%; margin-bottom:5px">*required</span>
                        <input class="uSetInput" ng-style="style.inputStyle()" type="text"   name="first_name" ng-model="u.user.info.first_name" required>
                    </div>
                    
                   
                    <div style="margin:10px">
                        <span ng-show="userEditForm.last_name.$error.required" style="color:red; font-size:90%; margin-bottom:5px">*required</span>
                        <input class="uSetInput" ng-style="style.inputStyle()" type="text"  placeholder="Last Name" id="name"  name="last_name" ng-model="u.user.info.last_name" required>
                        
                    </div>
                    
                   <div style="margin:10px; display:inline-block">
                        <div class="uSetInput" style="background-color:inherit; height:20px"><div style="float:left">Date of Birth:</div></div>
                        <span ng-show="userEditForm.dob.$error.required" style="color:red; font-size:90%; margin-bottom:5px">*required</span>
                        <div class="uSetInput">
                            <minicalendars selected="u.user.info.dob">
                               <input startdate type="text" class="usetInputFollow" ng-style="style.inputStyle()" ng-model="u.user.info.dob" ng-model-options="{ updateOn: 'blur'}">
                            </minicalendars>
                        </div>
                    </div>


                    <div style="margin:10px">
                        <span ng-show="userEditForm.email.$error.email" style="display:inline-block; color:red; font-size:90%; margin-bottom:5px">*Email form is invalid</span>
                        <span ng-show="userEditForm.email.$error.required" style="display:inline-block; color:red; font-size:90%; margin-bottom:5px">*required</span>
                        <input class="uSetInput" ng-style="style.inputStyle()" type="email" placeholder="Email" id="email" placeholder="Email" name="email"
                                ng-model="u.user.info.email" required>
                               
                    </div>      

                    <div style="margin:10px">
                        <input password class="uSetInput" ng-style="style.inputStyle()" type="text" placeholder="New Password" name="password" ng-model="u.newpass">
                    </div>

                    <div style="margin:10px">
                        <input password class="uSetInput" ng-style="style.inputStyle()" type="text" autocomplete="off" placeholder="Confirm New Password" name="password_confirmation" ng-model="u.newpassconfirm">
                    </div>
                    

                   
                    
                   
                    <div style="margin:10px; margin-top:15px; display:inline-block">
                        <div ng-style="style.errorStyle()" ng-show="u.wrongPass">The input password is incorrect!</div>
                        <div class="uSetInput" style="height:20px">
                            <div style="float:left"><span ng-show="userEditForm.old_pass.$invalid" ng-style="style.errorStyle()">*</span> Enter your current password:</div>
                        </div>
                        
                        <input password class="uSetInput" ng-style="style.inputStyle()" type="text" autocomplete="off" placeholder="Current Password" name="old_pass" ng-model="u.oldpass" required>
                        
                    </div>
                    
                    
                    <div style="margin-top:15px; margin-bottom:20px; width:100%; text-align:center">
                        <div>
                            <button ng-style="style.buttonStyle()"  ng-disabled="userEditForm.$invalid" ng-click="u.submit()">Submit Account Changes</button>
                        </div>
                    </div>
            
            </form>
        
            <div style="text-align:center; width:100%; display:inline-block">
                <div style="margin-left:10px; display:inline-block">
                   <a  class="uSetInput" style="margin-left:10px; text-decoration:none; display:inline-block; height:30px" ui-sref="deleteAccount"><button ng-style="style.modalInputStyle()" style="float:left; width:150px; height:100%" ><i class="fa fa-trash fa-lg"></i>&nbsp Delete Account </button></a>  
                </div>
               
            </div>
            
        </div>
    </div>
</div>

