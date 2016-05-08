
<!--***************************   Theme Settings ******************************************************** -->
                <div class="userSettingsDivLeft" ng-controller="editStyleCtrl as editStyle">
                    
                    <div style="margin-bottom:5px; font-weight:bold;">
                        <div style="font-size:110%; width:100%; text-align:center">Page Settings</div>
                        <div style="margin-left:5%; margin-top:10px">Pick Layout Theme: </div>
                    </div>
                        
                    
                    <div class="themeHolder">
                        <div class="themePics">
                            <input type="radio" ng-model="editStyle.chosenTheme" value="default">Default
                            <img  style=" width:90%; height:90%; border: 5px solid white; border-radius:5px" src="/pictures/default.png" alt="default theme">
                        </div>
                    
                        <div class="themePics">
                            <input type="radio" ng-model="editStyle.chosenTheme" value="theme1">Theme 1
                            <img  style="width:90%; height:90%; border: 5px solid white; border-radius:5px" src="/pictures/theme1.png" alt="theme 1">
                        </div>
                        <div class="themePics">
                            <input type="radio" ng-model="editStyle.chosenTheme" value="theme2">Theme 2
                        
                            <img  style="width:90%; height:90%; border: 5px solid white; border-radius:5px" src="/pictures/theme2.png" alt="theme 2">
                        </div>
    
                        <div class="themePics">
                            <input type="radio" ng-model="editStyle.chosenTheme" value="theme3">Theme 3
                            <img  style="width:90%; height:90%;  border: 5px solid white; border-radius:5px" src="/pictures/theme3.png" alt="theme 3">
                        </div>
                        <div class="themePics">
                            <input type="radio" ng-model="editStyle.chosenTheme" value="theme4">Theme 4
                            <img  style="width:90%; height:90%; border: 5px solid white; border-radius:5px" src="/pictures/theme4.png" alt="theme 4">
                        </div>
                        
                    </div>    
                        

                 
                    
                    <div style="width:100%; margin-top:20px; display:inline-block; text-align:center">
                        <button ng-style="style.buttonStyle()"  ng-click="editStyle.saveChanges()">Save Style Changes</button>
                    </div>
                    
               </div>
                
                <!--**********************************************Account Settings*************************************************-->
                <div class="userSettingsDivRight" >
                    
                    <div style="font-size:110%; font-weight:bold; width:100%; text-align:center">Account Settings</div>
                    
                    <div style="margin-top:10px; margin-left:auto">    
                        
                        <form  name="userEditForm" style="text-align:center">
                                <div ng-show="u.successMessage">Your account settings have been updated!</div>
                                <div ng-style="style.errorStyle()" ng-repeat="error in u.errors">{{error}}</div>
                                
                                <div style="margin:10px">
                                    <span ng-show="userEditForm.first_name.$error.required" style="color:gray; font-size:90%; margin-bottom:5px">*required</span>
                                    <input class="uSetInput" ng-style="style.modalInputStyle()" type="text"   name="first_name" ng-model="u.user.info.first_name" required>
                                </div>
                                
                               
                                <div style="margin:10px">
                                    <span ng-show="userEditForm.last_name.$error.required" style="color:gray; font-size:90%; margin-bottom:5px">*required</span>
                                    <input class="uSetInput" ng-style="style.modalInputStyle()" type="text"  placeholder="Last Name" id="name"  name="last_name" ng-model="u.user.info.last_name" required>
                                    
                                </div>
                                
                                <div style="margin:10px">
                                    Date of Birth:
                                    <br>
                                    <span ng-show="userEditForm.dob.$error.required" style="color:gray; font-size:90%; margin-bottom:5px">*required</span>
                                    <input class="uSetInput" ng-style="style.modalInputStyle()" type="date"  id="name"  name="dob"
                                             ng-model="u.user.info.dob" required>
                                    
                                </div>
            
                                <div style="margin:10px">
                                    <span ng-show="userEditForm.email.$error.email" style="display:inline-block; color:gray; font-size:90%; margin-bottom:5px">*Email form is invalid</span>
                                    <span ng-show="userEditForm.email.$error.required" style="display:inline-block; color:gray; font-size:90%; margin-bottom:5px">*required</span>
                                    <input class="uSetInput" ng-style="style.modalInputStyle()" type="email" placeholder="Email" id="email" placeholder="Email" name="email"
                                            ng-model="u.user.info.email" required>
                                           
                                </div>      
     
                                <div style="margin:10px">
                                    <input class="uSetInput" ng-style="style.modalInputStyle()" type="password" placeholder="New Password" name="password" ng-model="u.newpass">
                                </div>
            
                                <div style="margin:10px">
                                    <input class="uSetInput" ng-style="style.modalInputStyle()" type="password" placeholder="Confirm New Password" name="password_confirmation" ng-model="u.newpassconfirm">
                                </div>
                                
                               
                               <div style="margin:10px; margin-top:15px">Enter your current password</div>
                                <div style="margin:10px; margin-top:2px">
                                    <div ng-style="style.errorStyle()" ng-show="u.wrongPass">The input password is incorrect!</div>
                                    <span ng-show="userEditForm.old_pass.$invalid" style="color:gray; font-size:90%; margin-bottom:5px">*</span>
                                    <input class="uSetInput" ng-style="style.modalInputStyle()" type="password" placeholder="Current Password" name="old_pass" ng-model="u.oldpass" required>
                                    
                                </div>
                                
                                
                                <div style="margin-top:15px; margin-bottom:20px; width:100%; text-align:center">
                                    <div>
                                        <button ng-style="style.buttonStyle()"  ng-disabled="userEditForm.$invalid" ng-click="u.submit()">Submit Account Changes</button>
                                    </div>
                                </div>
                        
                        </form>
                    
                        <div style="text-align:center">
                           <a style="margin-left:5px; text-decoration:none" ui-sref="deleteAccount"><button ng-style="style.modalInputStyle()" style="width:150px; height:20px" ><i class="fa fa-trash fa-lg"></i>&nbsp Delete Account </button></a> 
                        </div>
                        
                    </div>
                </div>
