

        <div style="width:100%;  min-width:500px; height:100%; display:inline-block">
            
            <div style="right:20%; position:absolute; bottom:0; display:inline-block">
                <div class="navBarDiv" ng-style="style.navbarStyle()"><a navlink class="loggedNav"  href="/"><span  class="spanLinks">Home</span></a></div>
                <div class="navBarDiv" ng-style="style.navbarStyle()" ><a navlink class="loggedNav" href="/settings"><span  class="spanLinks">Settings</span></a></div>
                <div class="navBarDiv" ng-style="style.navbarStyle()" ><a navlink class="loggedNav" href="/contactUs"><span class="spanLinks">Contact Us</span></a></div>
                <div class="navBarDiv" ng-style="style.navbarStyle()" ><a navlink class="loggedNav" href="/users/logout"><span class="spanLinks">Logout</span></a></div>
            </div>
            <div style="float:left; width:40%; margin-top:2%; margin-left:5%; font-size:250%; font-weight:bold">Hello {!! $user->first_name !!} </div>
        </div>

