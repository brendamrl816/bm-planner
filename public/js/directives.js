'use strict'

var bmPlannerDirectives = angular.module('bmDirectives', []);


bmPlannerDirectives.directive('minicalendars', function(){
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
            
            controllers[0].$validators.enddate = function(modelValue, viewValue) {
                
              var startDateValue = scope.$eval(angular.element($('#start')).attr('ng-model'));
                //console.log(startDateValue);
                //console.log(modelValue);
                if (startDateValue.unix() > modelValue.unix()) {
                    // it is invalid
                   return false;
                }
                
                else{
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
            
            colors[0]=[{hex:'#0000FF'}, {hex:'#0099CC'}, {hex:'#6600FF'}, {hex:'#FFFF66'}];
            scope.rows.push({colors: colors[0]});
            colors[1]=[{hex:'#009933'}, {hex:'#99FF33'}, { hex:'#CCFFCC'}, {hex: '#FF66CC'}];
            scope.rows.push({colors: colors[1]});
            colors[2]=[{hex:'#663300'}, {hex:'#FF0000'}, {hex: '#FF9966'}, {hex:'#000000'}];
            scope.rows.push({colors: colors[2]});
            
            scope.select = function(color)
            {
                scope.selected = color;
            };
            
        },
        
        template:   '<div>\
                        <table id="colorPickerTable">\
                            <tr ng-repeat="row in rows">\
                                <td ng-repeat="color in row.colors" ng-style={"background-color":color.hex} ng-click="select(color.hex)"></td>\
                            </tr>\
                        </table>\
                    </div>'
    };
            
});


bmPlannerDirectives.directive('addeventmodal', function() {
   
   return {
       
       restrict: 'E',
       
       scope: {
           showmodal: '=',
       },
       
       replace: true, //replace with the template below
       
       transclude: true, //to insert answer from user to directive
       
       link: function(scope, element, attrs){
           
           //angular.element(document.body).append(element);

           
           scope.style={};
           
           if(attrs.width){
               scope.style.width = attrs.width;
           }
           if(attrs.height)
           {
               scope.style.height = attrs.height;
           }
           
           
           scope.hide_modal = function() {
               scope.showmodal = false;
           };
           
           
       },
       
       template: '<div class="createEventModal" ng-show="showmodal">\
                    <div class="createEventModal-dark" ng-click="hide_modal()"></div>\
                    <div class="createEventModal-style" ng-style="style">\
                        <div class="createEventModal-close" ng-click="hide_modal()">X</div>\
                        <div  class="createEventModal-style-content" ng-transclude></div>\
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
          
            var parent = angular.element($('#td'+ attrs.id));
            parent.append(element);
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
                    if(angular.element($('#fire' + attrs.name))){
                        var xPosition = angular.element($('#fire' + attrs.name)).prop('offsetWidth')
                        var offsetLeft = parent.prop('offsetLeft') + 350;
                        if((offsetLeft - window.innerWidth) > 0)
                        {
                            xPosition = xPosition + (offsetLeft - window.innerWidth);
                        }
                        scope.style.left = - xPosition;
                        
                        var yPosition = angular.element($('#fire' + attrs.name)).parent().prop('offsetTop') + angular.element($('#fire' + attrs.name)).prop('offsetTop') + angular.element($('#fire' + attrs.name)).prop('offsetHeight');
                        var windowHeight = window.innerHeight + window.scrollY;
                       
                        if(windowHeight - (angular.element($('#fire' + attrs.name)).parent().parent().prop('offsetTop') + yPosition) - 200 <= 0)
                        {
                            scope.style.bottom = yPosition;
                        }
                        else{
                            scope.style.top = yPosition;
                        }
                    }
                    
                        

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

bmPlannerDirectives.directive('weekquestionmodal', function() {
   
   return {
       
       restrict: 'E',
       
       scope: {
           question: '='
       },
       
       replace: true, //replace with the template below
       
       transclude: true, //to insert answer from user to directive
       
       link: function(scope, element, attrs){
          
         
        //angular.element(document.body).append(element);
        
          
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
                    if(angular.element($('#weekfire' + attrs.name))){
                        
                        var yPosition = angular.element($('#weekfire' + attrs.name)).prop('offsetTop') + angular.element($('#weekfire' + attrs.name)).prop('offsetHeight');
                        
                        var doc = document;
                        var docHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight, 
                                                doc.body.offsetHeight, doc.documentElement.offsetHeight, doc.body.clientHeight, doc.documentElement.clientHeight);
                        
                        var elementOffsetTop = angular.element($('#scrolldiv')).parent().prop('offsetTop') + angular.element($('#scrolldiv')).prop('offsetTop') ;
                        var elementOffsetBottom = docHeight - (elementOffsetTop + angular.element($('#scrolldiv')).prop('offsetHeight'));
                        var topNotSeen = elementOffsetTop - window.scrollY ;
                        var bottomNotSeen = elementOffsetBottom - (docHeight - (window.scrollY + window.innerHeight));
                        var firePosition = element.parent().parent().parent().prop('offsetTop') - yPosition;
                        
                        console.log('docHeight: ' + docHeight);
                        console.log('innerWindowHeight: ' + window.innerHeight);
                        console.log('window scroll: ' + window.scrollY);
                        console.log('offsetBottom : ' + elementOffsetBottom);
                        console.log('offsetTop : ' + elementOffsetTop);
                        console.log('scrollDiv Height: ' + (angular.element($('#scrolldiv')).prop('offsetHeight')));
                        console.log('topNotSeen ' + topNotSeen);
                        console.log('bottomNotSeen: ' + bottomNotSeen);
                        
                        
                        
                        console.log('firePosition :' + (element.parent().parent().parent().prop('offsetTop') - yPosition));
                        
                        
                        var littleTopNotSeen = ((element.parent().parent().parent().prop('offsetTop') + yPosition) - (angular.element($('#scrolldiv')).prop('scrollTop')));
                        
                        console.log('littleTop Not seen: ' +littleTopNotSeen);
                        
                        
                        
                        var c =  (docHeight - bottomNotSeen - elementOffsetBottom) - (window.scrollY + topNotSeen);
                        console.log('c ' + c);
                        var e = littleTopNotSeen;
                        console.log('e' + e);
                        var m = e + 200;
                        var x = m - c;
                        console.log('m ' + m);
                        console.log('x ' + x);
                       
                    //   if(x < 0)
                    //   {
                    //         if( ((-x) + 200) > c)
                    //         {
                    //           yPosition = yPosition +  (((-x) + 200) - c);
                    //         }
                    //   }
                       
                    //   if( x > 0)
                    //   {
                          
                    //           yPosition = yPosition - x;
                         
                    //   }
            
                         scope.style.top = yPosition;
                       
                    }
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