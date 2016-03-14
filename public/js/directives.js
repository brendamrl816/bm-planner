'use strict'

var bmPlannerDirectives = angular.module('bmDirectives', []);


bmPlannerDirectives.directive('minicalendars', function(Style){
    return {
        
        restrict: 'E',
        
        templateUrl: '/html/miniCalTemplate.html',
         
        scope: {
            selected: '=',
        },
        
        transclude:true,
        
        controllerAs:'miniCalCtrl',
        controller: function($scope){
          
          $scope.selected=  removeTime($scope.selected||moment());
          $scope.showMiniCalendar = false;
          
          $scope.toggleShowMiniCalendar = function(event){
              $scope.showMiniCalendar = !$scope.showMiniCalendar;
              event.stopPropagation();
          };
          
       window.addEventListener('click', function() {
            if($scope.showMiniCalendar==true)
            {
                $scope.showMiniCalendar = false;
                $scope.$apply();
            }

        });
            
            var startDate= $scope.selected.clone();
            startDate.date(1);//get the first day of the selected month;
            startDate.day(0);//get the date of the sunday of the first week of the selected month;
            
            createMonth(startDate);
          
            this.select =  function(day){
                    $scope.selected= day.itsDate;
                    var startDate= $scope.selected.clone();
                    //get the first day of the selected month;
                    startDate.date(1);
                    //get the date of the sunday of the first week of the selected month;
                    startDate.day(0);
                    createMonth(startDate);
            };
            
            $scope.next=function(){
                if($scope.selected.isValid()){
                   $scope.selected.add(1, "M");
                    var startDate=$scope.selected.clone();
                    //get the first day of the selected month;
                    startDate.date(1);
                    //get the date of the sunday of the first week of the selected month;
                    startDate.day(0);
                    createMonth( startDate);
                }
            };
            
           $scope.previous= function(){
                if($scope.selected.isValid()){
                   $scope.selected.subtract(1, "M");
                    var startDate=$scope.selected.clone();
                    //get the first day of the selected month;
                    startDate.date(1);
                     //get the date of the sunday of the first week of the selected month;
                    startDate.day(0);
                    createMonth(startDate);
                }
            };
            
            function createMonth(theStartDate){
                $scope.weeks=[];
                var the_date=$scope.selected.clone();
                the_date.add(1,"month");
      
                while(theStartDate.month()!=the_date.month()){
                   $scope.weeks.push({days: createWeek(theStartDate) });
                    theStartDate= theStartDate.clone();
                    theStartDate.add(1, "w");
                }
            
            }
            
            function createWeek(the_date){
                var days=[];
                
                for (var i=0; i<7; i++){
                    days[i]={ dateOfMonth: the_date.date(), month: the_date.month(), itsDate: the_date };
                    the_date= the_date.clone();
                    the_date.add(1, "d");
                }
                return days;
            }
   
   
            function removeTime(date)
            {
                return date.hour(0).minute(0).second(0).millisecond(0);
            }
            
            $scope.miniStyle = function(){
                return {'font-size':'12px', 'font-weight':'bold', 'width':'22px', 'color':Style.css.navBar_borderColor};
            };
        },
        
    };
    
});


bmPlannerDirectives.directive('startdate', function() {
    return {
        require: ['ngModel', '^minicalendars'],
        
        link: function(scope, element, attrs, controllers) {
            
            var good_value;
            
            //changes the value of the model
            controllers[0].$parsers.push(function(viewValue){
                var date_moment=moment(viewValue);
                if(date_moment.isValid()){
                    good_value=viewValue;
                    controllers[0].$setViewValue(date_moment.format('MM/DD/YYYY'));
                    controllers[0].$render();
                    
                    //calling select to bind calendar to input box
                    var day={ dateOfMonth: date_moment.date(), month: date_moment.month(), itsDate: date_moment };
                    controllers[1].select(day);
                    
                    return date_moment;
                }
                else{
                    var the_date=moment(good_value);
                    controllers[0].$setViewValue(the_date.format('MM/DD/YYYY'));
                    controllers[0].$render();
                    
                    var day={ dateOfMonth: the_date.date(), month: the_date.month(), itsDate: the_date };
                    controllers[1].select(day);
                    
                    return the_date;
                }
                
            });
            
            //changes the view of the model
            controllers[0].$formatters.push(function(value) {
                 
                 //calling select to bind calendar to input box
                    var day={ dateOfMonth: value.date(), month: value.month(), itsDate: value };
                    controllers[1].select(day);
                    
                return value.format('MM/DD/YYYY');
            });
        }
    };
});

bmPlannerDirectives.directive('enddate', function() {
    return {
        require:['ngModel', '^minicalendars'],
        
        link: function( scope, element, attrs, controllers) {
            
            var good_value;
            
            //changes the value of the model
            controllers[0].$parsers.push(function(viewValue){
            
                var date_moment=moment(viewValue);
                if(date_moment.isValid()){
                    good_value=viewValue;
                    controllers[0].$setViewValue(date_moment.format('MM/DD/YYYY'));
                    controllers[0].$render();
                    
                    //calling select to bind calendar to input box
                    var day={ dateOfMonth: date_moment.date(), month: date_moment.month(), itsDate: date_moment };
                    controllers[1].select(day);
                    
                    return date_moment;
                }
                else{
                    var the_date=moment(good_value);
                    controllers[0].$setViewValue(the_date.format('MM/DD/YYYY'));
                    controllers[0].$render();
                    
                    var day={ dateOfMonth: the_date.date(), month: the_date.month(), itsDate: the_date };
                    controllers[1].select(day);
                    
                    return the_date;
                }
                
            });
            
            //changes the view of the model
            controllers[0].$formatters.push(function(modelValue) {
                
                //calling select to bind calendar to input box
                var day={ dateOfMonth: modelValue.date(), month: modelValue.month(), itsDate: modelValue };
                controllers[1].select(day);
                
                return modelValue.format('MM/DD/YYYY');
            });
            
            
            /************************ in case you wanted a validator on this element*******************************/
            // controllers[0].$validators.enddate = function(modelValue, viewValue) {
                
            //   var startDateValue = scope.$eval(angular.element($('#' + attrs.name)).attr('ng-model'));
            //     //console.log(startDateValue);
            //     //console.log(modelValue);
            //     if (startDateValue.unix() > modelValue.unix()) {
            //         // it is invalid
            //       return false;
            //     }
            //     else{
            //         return true;
            //     }
            // };
        }
    };
});


bmPlannerDirectives.directive('endtimeval', function() {
    return {
        restrict: 'AE',
        
        require:'ngModel',
        
        link: function( scope, element, attrs, modelCtrl) {
            
            modelCtrl.$validators.endtimeval = function(modelValue, viewValue) {
                
                var startTime = scope.$eval(angular.element($('#' + attrs.name)).attr('ng-model'));
                var endTime = modelValue;

                if (startTime > endTime) {
                    // it is invalid
                   return false;
                }else{
                    return true;
                }

            };
        }
    };
});


bmPlannerDirectives.directive('colorpicker', function(){
    return {
        
        restrict: 'E',
         
        scope: {
            selected: '='
        },
        
        link: function(scope, element, attrs) {
            
            scope.selected = (scope.selected || '#000000');
            scope.rows=[];
            var colors=[];
            
            colors[0]=[{rgb:'0, 53, 102', color:'rgb(0, 53, 102)'}, {rgb:'51, 51, 255', color:'rgb(51, 51, 255)'}, {rgb:'0, 204, 255', color:'rgb(0, 204, 255)'}, {rgb:'0, 153, 153', color:'rgb(0, 153, 153)'}];
            scope.rows.push({colors: colors[0]});
            colors[1]=[{rgb:'153, 0, 255', color:'rgb(153, 0, 255)'}, {rgb:'255, 102, 204', color:'rgb(255, 102, 204)'}, { rgb:'204, 204, 255', color:'rgb(204, 204, 255)'}, {rgb: '204, 204, 0', color:'rgb(204, 204, 0)'}];
            scope.rows.push({colors: colors[1]});
            colors[2]=[{rgb:'153, 255, 204', color:'rgb(153, 255, 204)'}, {rgb:'0, 204, 51', color:'rgb(0, 204, 51)'}, {rgb: '51, 153, 51', color:'rgb(51, 153, 51)'}, {rgb:'102, 51, 0', color:'rgb(102, 51, 0)'}];
            scope.rows.push({colors: colors[2]});
            colors[3]=[{rgb:'255, 153, 102', color:'rgb(255, 153, 102)'}, {rgb:'255, 204, 153', color:'rgb(255, 204, 153)'}, {rgb:'230, 46, 0', color:'rgb(230, 46, 0)'}, {rgb:'153, 31, 0', color:'rgb(153, 31, 0)'}];
            scope.rows.push({colors: colors[3]});
            
            scope.select = function(color)
            {
                scope.selected = color;
            };
            
        },
        
        template:   '<div>\
                        <table id="colorPickerTable">\
                            <tr ng-repeat="row in rows">\
                                <td ng-repeat="color in row.colors" style="cursor:hand" ng-style={"background-color":color.color} ng-click="select(color.rgb)"></td>\
                            </tr>\
                        </table>\
                    </div>'
    };
            
});


bmPlannerDirectives.directive('addeventmodal', function(Style) {
   
   return {
       restrict: 'E',
       
       scope: {
           showmodal: '=',
       },
       
       replace: true, //replace with the template below
       
       transclude: true, //to insert answer from user to directive
       
       link: function(scope, element, attrs){
           
           angular.element(document.body).append(element);
           
           scope.style={};
           
            scope.darkStyle = function(){
                var D = document;
                var height = Math.max(
                    D.body.scrollHeight, D.documentElement.scrollHeight,
                    D.body.offsetHeight, D.documentElement.offsetHeight,
                    D.body.clientHeight, D.documentElement.clientHeight
                );
                
                var width = Math.max(
                    D.body.scrollWidth, D.documentElement.scrollWidth,
                    D.body.offsetWidth, D.documentElement.offsetWidth,
                    D.body.clientWidth, D.documentElement.clientWidth
                );
                
                return {'height': height, 'width': width};
            };
            
            scope.$watch('showmodal', function(){
                if(scope.showmodal == true )
                {
                    var top =  event.pageY;
                    var left = event.pageX;
                    
                    var windowHeight = window.innerHeight + window.scrollY;
                    var height = windowHeight * .60;
                     if(top + height > windowHeight)
                     {
                        top =  window.scrollY + (window.innerHeight * .15);
                     }
                     else{
                         top = attrs.top;
                     }
                     
                     var windowWidth = window.innerWidth + window.scrollX;
                     var width = windowWidth * .30;
                     if(window.scrollX == 0){
                         left = attrs.left;
                     }
                     else if(left + width > windowWidth)
                     {
                         left = window.scrollX + (window.innerWidth * .10);
                     }
                    scope.style.top = top;
                    scope.style.left = left;
                }
            });
            
            if(attrs.width){
               scope.style.width = attrs.width;
            }
            
            if(attrs.height)
            {
               scope.style.height = attrs.height;
            }
           
            scope.style.color = Style.css.body_color;
            
           scope.hide_modal = function() {
               scope.showmodal = false;
           };
           
       },
       
       template: '<div class="createEventModal" ng-show="showmodal">\
                    <div class="createEventModal-dark" ng-style=darkStyle() ng-click="hide_modal()"></div>\
                    <div class="createEventModal-style" ng-style="style">\
                        <div class="createEventModal-style-content" ng-transclude></div>\
                    </div>\
                </div>'
       
   }; 
});


bmPlannerDirectives.directive('questionmodal', function() {
   
   return {
       
       restrict: 'E',
       
       scope: {
           question: '='
       },
       
       replace: true, //replace with the template below
       
       transclude: true, //to insert answer from user to directive
       
       link: function(scope, element, attrs){
          
            scope.style={};
            
            if(attrs.width){
               scope.style.width = attrs.width;
            }
            if(attrs.height)
            {
               scope.style.height = attrs.height;
            }
           
           scope.hideQuestionModal = function() {
               scope.question = false;
           };
           
           
            scope.$watch('question', function(value){
              scope.isClickable = !value;
                if(value == false)
                {
                  window.removeEventListener('click', eventfunction); 
                }
                if(value == true)
                {
                     angular.element(document.body).append(element);
                     var top =  event.pageY;
                     var left = event.pageX;
                     
                     var windowHeight = window.innerHeight + window.scrollY;
                     if(top + 200 > windowHeight)
                     {
                         var diff = (top + 200) - windowHeight;
                         top = top - diff;
                     }
                     
                     var windowWidth = window.innerWidth + window.scrollX;
                     if(left + 350 > windowWidth)
                     {
                         var diff = (left + 350) - windowWidth;
                         left = left - diff;
                     }
                     
                     scope.style.top = top;
                     scope.style.left = left;
                }
            });
            
            element.bind('mouseenter', function(){
              scope.isActive = true;
              });
            
             element.bind('mouseleave', function(){
              scope.isActive = false;
            });
            
            element.bind('click', function(){
                if(scope.isActive == true){
                    window.removeEventListener('click', eventfunction); 
                }
            });
            
            function eventfunction()
            {
                if(scope.question == true)
                {
                    scope.question = false;
                    scope.$apply();
                }
            }
                
                window.addEventListener('click', function(){
                    if(scope.isClickable == false)
                    {
                        window.addEventListener('click', eventfunction);
                    }
                    
                });
          
       },
       
       template: '<div class="createQuestionModal" ng-show="question">\
                    <div  class="createQuestionModal-style" ng-style="style">\
                        <div class="createQuestionModal-close" ng-click="hideQuestionModal()">X</div>\
                        <br>\
                        <div class="createQuestionModal-style-content" ng-transclude></div>\
                    </div>\
                  </div>'
   }; 
});

bmPlannerDirectives.directive('continuemodal', function() {
   
   return {
       
       restrict: 'E',
       
       scope: {
           question: '='
       },
       
       replace: true, //replace with the template below
       
       transclude: true, //to insert answer from user to directive
       
       link: function(scope, element, attrs){
          
            scope.style={};
            
            if(attrs.width){
               scope.style.width = attrs.width;
            }
            if(attrs.height)
            {
               scope.style.height = attrs.height;
            }
           
           scope.hideQuestionModal = function() {
               scope.question = false;
           };
           
           
            scope.$watch('question', function(value){
              scope.isClickable = !value;
                if(value == false)
                {
                  window.removeEventListener('click', eventfunction); 
                }
                if(value == true)
                {
                    angular.element(document.body).append(element);
                     var top = event.pageY - event.target.offsetTop - event.offsetY;
                     var left = event.pageX - event.target.offsetLeft - event.offsetX;
                     
                     var windowHeight = window.innerHeight + window.scrollY;
                     if(top + 200 > windowHeight)
                     {
                         var diff = (top + 200) - windowHeight;
                         top = top - diff;
                     }
                     
                     var windowWidth = window.innerWidth + window.scrollX;
                     if(left + 350 > windowWidth)
                     {
                         var diff = (left + 350) - windowWidth;
                         left = left - diff;
                     }
                     
                     scope.style.top = top;
                     scope.style.left = left;
                }
            });
            
            element.bind('mouseenter', function(){
              scope.isActive = true;
              });
            
             element.bind('mouseleave', function(){
              scope.isActive = false;
            });
            
            element.bind('click', function(){
                if(scope.isActive == true){
                    window.removeEventListener('click', eventfunction); 
                }
            });
            
            function eventfunction()
            {
                if(scope.question == true)
                {
                    scope.question = false;
                    scope.$apply();
                }
            }
                
                window.addEventListener('click', function(){
                    if(scope.isClickable == false)
                    {
                        window.addEventListener('click', eventfunction);
                    }
                    
                });
          
       },
       
       template: '<div class="createQuestionModal" ng-show="question">\
                    <div  class="createQuestionModal-style" ng-style="style">\
                        <div class="createQuestionModal-close" ng-click="hideQuestionModal()">X</div>\
                        <br>\
                        <div class="createQuestionModal-style-content" ng-transclude></div>\
                    </div>\
                  </div>'
   }; 
});


bmPlannerDirectives.directive('menumodal', function() {
   
   return {
       
       restrict: 'E',
       
       scope: {
           question: '='
       },
       
       replace: true, //replace with the template below
       
       transclude: true, //to insert answer from user to directive
       
       link: function(scope, element, attrs){
          
           scope.style={};
           
           scope.hideQuestionModal = function() {
               scope.question = false;
           };
           
           
            scope.$watch('question', function(value){
              scope.isClickable = !value;
                if(value == false)
                {
                  window.removeEventListener('click', eventfunction); 
                }
                if(value == true)
                {
                     angular.element(document.body).append(element);
                     
                     var top =  event.pageY;
                     var left = event.pageX;
                     
                     var windowHeight = window.innerHeight + window.scrollY;
                     if(top + 250 > windowHeight)
                     {
                         var diff = (top + 250) - windowHeight;
                         top = top - diff;
                     }
                     
                     if(left + 220 > window.innerWidth)
                     {
                         var diff = (left + 200) - window.innerWidth;
                         left = left - diff;
                     }
                     
                     scope.style.width = '200px';
                     scope.style.height = '250px';
                     scope.style.top = top;
                     scope.style.left = left;
                   
                }
            });
            
            element.bind('mouseenter', function(){
              scope.isActive = true;
              });
            
             element.bind('mouseleave', function(){
              scope.isActive = false;
            });
            
            element.bind('click', function(){
                if(scope.isActive == true){
                    window.removeEventListener('click', eventfunction); 
                }
            });
            
            function eventfunction()
            {
                if(scope.question == true)
                {
                    scope.question = false;
                    scope.$apply();
                }
            }
                
                window.addEventListener('click', function(){
                    if(scope.isClickable == false)
                    {
                        window.addEventListener('click', eventfunction);
                    }
                    
                });
                
          
       },
       
       template: '<div class="createQuestionModal" ng-show="question">\
                    <div  class="createQuestionModal-style" ng-style="style">\
                        <div class="createQuestionModal-style-content" ng-transclude></div>\
                    </div>\
                  </div>'
   }; 
});


bmPlannerDirectives.directive('navlink',  function($http) {
   
   return {
       
       link: function(scope, element, attrs){
            var path = attrs.href;
        
            scope.location = window.location;
            scope.$watch('window.location', function() {
                if (path === window.location.pathname) {
                    $http.get('/styles').success(function(response){
                        element.css({backgroundColor: response.navBar_borderColor, height:'60px', top:'-15px', 'box-shadow': '0px -1px 10px -2px rgba(0,0,0,0.4)', 'z-index':2});
                    });
                }else {
                    element.css({backgroundColor: '', 'z-index':'none'});
                }
            });
            
       }
   }; 
});

