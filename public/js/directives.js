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
          
        var element = angular.element($('#theminical'));
          
          
          
          $scope.$watch('showMiniCalendar', function(value){
              $scope.isClickable = !value;
                if(value == false)
                {
                  window.removeEventListener('click', eventfunction); 
                }
                // if(value == true)
                // {
                //      angular.element(document.body).append(element);
                //      var top =  event.pageY;
                //      var left = event.pageX;
                     
                //      $scope.y = top;
                //      $scope.x = left;
                // }
            });
            
            
            element.bind('mouseenter', function(){
              $scope.isActive = true;
              });
            
             element.bind('mouseleave', function(){
              $scope.isActive = false;
            });
            
            element.bind('click', function(){
                if($scope.isActive == true){
                    window.removeEventListener('click', eventfunction); 
                }
            });
            
            function eventfunction()
            {
                if($scope.showMiniCalendar == true)
                {
                    $scope.showMiniCalendar = false;
                    $scope.$apply();
                }
            }
                
                window.addEventListener('click', function(){
                    if($scope.isClickable == false)
                    {
                        window.addEventListener('click', eventfunction);
                    }
                    $scope.$apply();
                });
          
    
          $scope.toggleShowMiniCalendar = function(){
              $scope.showMiniCalendar = !$scope.showMiniCalendar;
            //   event.stopPropagation();
          };
          
    //   window.addEventListener('click', function() {
    //         if($scope.showMiniCalendar==true)
    //         {
    //             $scope.showMiniCalendar = false;
    //             $scope.$apply();
    //         }

    //     });
            
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
                return {'font-weight':'bold', 'color':Style.css.navBar_borderColor};
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

                if (startTime >= endTime) {
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
        
        template:   '<table id="colorPickerTable">\
                        <tr ng-repeat="row in rows">\
                            <td ng-repeat="color in row.colors" style="cursor:hand" ng-style={"background-color":color.color} ng-click="select(color.rgb)"></td>\
                        </tr>\
                    </table>'
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
                return {'background-color':'rgba(' + Style.css.body_backgroundColor + ', 1)'};
            };
            
        
            scope.$watch('showmodal', function(){

                if(scope.showmodal == true )
                {
                    var top ;
                   
                    if(window.innerHeight == element.parent().prop('scrollHeight'))
                    {
                        top = '20%';
                        scope.style.top = top;

                    }else if(window.innerWidth < 500 && window.innerHeight != element.parent().prop('scrollHeight') )
                    {
                        top = '20%';
                        scope.style.top = top;
                        window.scrollTo(0, element.parent().prop('scrollHeight') * (.15));
                    }
                    else{
                        top = '15%';
                        scope.style.top = top;
                            window.scrollTo(0, element.parent().prop('scrollHeight') * (.10));
                    }

                    
                  
                    $(window).resize(function(){
                        if(window.innerWidth >= 800)
                        {
                            scope.$apply(function(){
                                top= '15%';
                                scope.style.top = top;
                            });
                            window.scrollTo(0, element.parent().prop('scrollHeight') * (.10));
                        }
                        else if(window.innerWidth >= 500)
                        {
                            scope.$apply(function(){
                                 top= '15%';
                                scope.style.top = top;
                            });
                            window.scrollTo(0, element.parent().prop('scrollHeight') * (.10));
                        }
                        else if(window.innerWidth < 500)
                        {
                            scope.$apply(function(){
                                top = '10%';
                                scope.style.top = top;
                            });
                            window.scrollTo(0, element.parent().prop('scrollHeight') * (.05));
                        }
                    });
                 
                }
            });
            



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

           // scope.style= function(){
           //      return {'left':left, 'top':top};
           //  };
           
           
       },
       
       template: '<div class="createEventModal" ng-show="showmodal">\
                    <div class="createEventModal-dark" ng-style=darkStyle() ng-click="hide_modal()">\
                        <div class="createEventModal-dark-image">&nbsp</div>\
                    </div>\
                    <div class="createEventModal-style" ng-style="style">\
                        <div class="createEventModal-style-content" ng-transclude></div>\
                    </div>\
                </div>'
       
   }; 
});


bmPlannerDirectives.directive('questionmodal', function(Style) {
   
   return {
       
       restrict: 'E',
       
       scope: {
           question: '='
       },
       
       replace: true, //replace with the template below
       
       transclude: true, //to insert answer from user to directive
       
       link: function(scope, element, attrs){
          
            scope.style={};
            var top = 0;
            var left = 0;
            
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
             
                if(value == true)
                {
                     angular.element(document.body).append(element);

                     var e = scope.$root.e;
                     top =  e.pageY;
                     left = e.pageX;
                     
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
                     
                     if(windowWidth > 300)
                     {
                        left = left;
                     }else{
                        left = '5%';
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
                 window.addEventListener('click', eventfunction);                
            });

            scope.style= function(){
                return {'left':left, 'top':top};
            };

            scope.hfStyle = function(){
                return {'font-weight':'bold', 'background-color':'rgba(' + Style.css.buttons_borderColor + ', 0.8)'};
            };
          
       },

        
       
       template: '<div class="createQuestionModal" ng-show="question">\
                    <div  class="createQuestionModal-style" ng-style="style()">\
                        <div class="createQuestionModal-header" ng-style="hfStyle()">&nbsp</div>\
                        <div class="createQuestionModal-close" ng-click="hideQuestionModal()">X</div>\
                        <br>\
                        <div class="createQuestionModal-style-content" ng-transclude></div>\
                    </div>\
                  </div>'
   }; 
});

bmPlannerDirectives.directive('continuemodal', function(Style) {
   
   return {
       
       restrict: 'E',
       
       scope: {
           question: '='
       },
       
       replace: true, //replace with the template below
       
       transclude: true, //to insert answer from user to directive
       
       link: function(scope, element, attrs){
          
            // scope.style={};
            var top = 0;
            var left= 0;
            
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

                    var e = scope.$root.e;
                  
                     top = e.pageY - e.layerY;
                     left = e.pageX - e.layerX;
                     
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
                     
                     if(windowWidth > 300)
                     {
                         left = left;
                     }else{
                         left = '5%';
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

            scope.style= function(){
                return {'left':left, 'top':top};
            };
            scope.hfStyle = function(){
                return {'font-weight':'bold', 'background-color':'rgba(' + Style.css.buttons_borderColor + ', 0.8)'};
            };
          
       },
       
       template: '<div class="createQuestionModal" ng-show="question">\
                    <div  class="createQuestionModal-style" ng-style="style()">\
                    <div class="createQuestionModal-header" ng-style="hfStyle()">&nbsp</div>\
                        <div class="createQuestionModal-close" ng-click="hideQuestionModal()">X</div>\
                        <br>\
                        <div class="createQuestionModal-style-content" ng-transclude></div>\
                    </div>\
                  </div>'
   }; 
});


bmPlannerDirectives.directive('menumodal', function(Style) {
   
   return {
       
       restrict: 'E',
       
       scope: {
           question: '='
       },
       
       replace: true, //replace with the template below
       
       transclude: true, //to insert answer from user to directive
       
       link: function(scope, element, attrs){
          
           scope.style={};
           var top=0;
           var left=0;
           
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
                     var e = scope.$root.e;
                     top = e.pageY;
                     left =e.pageX;
                     
                     var windowHeight = window.innerHeight + window.scrollY;
                     if(top + 245 > windowHeight)
                     {
                         var diff = (top + 245) - windowHeight;
                         top = top - diff;
                     }
                     
                     if(left + 220 > window.innerWidth)
                     {
                         var diff = (left + 220) - window.innerWidth;
                         left = left - diff;
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

            scope.hfStyle = function(){
                return {'font-weight':'bold', 'background-color':'rgba(' + Style.css.buttons_borderColor + ', 0.8)'};
            };

            scope.style= function(){
                return {'width':'180px', 'height':'230px', 'left':left, 'top':top};
            };
                
          
       },
       
       template: '<div class="createQuestionModal" ng-show="question">\
                    <div  class="createQuestionModal-style" ng-style="style()">\
                    <div class="createQuestionModal-header" ng-style="hfStyle()">&nbsp</div>\
                        <div class="createQuestionModal-style-content" ng-transclude></div>\
                    </div>\
                  </div>'
   }; 
});



bmPlannerDirectives.directive('password', function() {
    return {
        require: 'ngModel',

        link: function(scope, element, attrs, modelCtrl) {

            var model_value='';
            var real_value;
            var displayValue = '*';

            modelCtrl.$parsers.push(function(viewValue){
           

                displayValue = viewValue.replace(/\S/gi, '*');
                model_value = model_value.concat(viewValue.charAt(viewValue.length - 1));
                modelCtrl.$viewValue=displayValue;
                modelCtrl.$render();
                
                return model_value;
            });

            modelCtrl.$formatters.push(function(value){
                return model_value;
            });

            scope.$watch(attrs['ngModel'], function(newVal, oldVal){
                if(modelCtrl.$modelValue == undefined){
                    model_value="";
                    modelCtrl.$viewValue="";
                    modelCtrl.$render();
                }                   
              
            });
            
        }
    };
});

// bmPlannerDirectives.directive('navlink',  function($http, $rootScope, Style) {
   
//   return {
//     //   scope: {},
       
//       link: function(scope, element, attrs){
       
//         scope.color = Style;
//         var path = attrs.href;
//         scope.location = window.location;
        
//         scope.$watch(
//           // This is the important part
//           function() {
//             return Style.css;
//           },
        
//           function(newValue, oldValue) {
//               if (path === window.location.hash) {
//                         if(window.innerWidth < 800)
//                         {
//                           element.css({backgroundColor: scope.color.css.buttons_backgroundColor, left:'-3px', bottom:'0','border-radius':'0px 10px 10px 0px',  'box-shadow': 'inset -20px 0px 20px -10px' + scope.color.css.navBar_borderColor, 'z-index':2}); 
//                         }
//                         else{
//                             element.css({backgroundColor: scope.color.css.buttons_backgroundColor, bottom:'-3px', left:'0', 'border-radius':'10px 10px 0px 0px', 'box-shadow': 'inset 2px 20px 20px -10px' + scope.color.css.navBar_borderColor, 'z-index':2});
//                         }
                        
//                 }else {
//                     element.css({backgroundColor: '',  'box-shadow':'',  'z-index':'none'});
//                 }
//             // console.log('Style has been changed');
//             //  if (path === window.location.hash) {
                        
//             //         element.css({backgroundColor: scope.color.css.buttons_backgroundColor, 'box-shadow': 'inset -20px 0px 20px -10px' + scope.color.css.navBar_borderColor}); 
                        
//             //     }else {
//             //         element.css({backgroundColor: '',  'box-shadow':''});
//             //     }
//           },
//           true
//         );
        
//             // scope.$watch('window.location', function() {
//             //     if (path === window.location.hash) {
//             //             if(window.innerWidth < 800)
//             //             {
//             //               element.css({backgroundColor: scope.color.css.buttons_backgroundColor, left:'-3px', bottom:'0','border-radius':'0px 10px 10px 0px',  'box-shadow': 'inset -20px 0px 20px -10px' + scope.color.css.navBar_borderColor, 'z-index':2}); 
//             //             }
//             //             else{
//             //                 element.css({backgroundColor: scope.color.css.buttons_backgroundColor, bottom:'-3px', left:'0', 'border-radius':'10px 10px 0px 0px', 'box-shadow': 'inset 2px 20px 20px -10px' + scope.color.css.navBar_borderColor, 'z-index':2});
//             //             }
                        
//             //     }else {
//             //         element.css({backgroundColor: '',  'box-shadow':'',  'z-index':'none'});
//             //     }
//             // }); 
       
       
//         $rootScope.$on('$stateChangeSuccess' , function(event, toState, toParams, fromState, fromParams, options){
//             var name = attrs.name;
//             var theName = toState.name;
            
           
//             if(toState.name == 'home.weeklyView' || toState.name == 'home.main')
//             {
//                 theName = 'home';
//             }
           
//             if(theName == name)
//             {
//                 if(window.innerWidth < 800)
//                 {
//                   element.css({backgroundColor: scope.color.css.buttons_backgroundColor, left:'-3px', bottom:'0','border-radius':'0px 10px 10px 0px',  'box-shadow': 'inset -20px 0px 20px -10px' + scope.color.css.navBar_borderColor, 'z-index':2}); 
//                 }
//                 else{
//                     element.css({backgroundColor: scope.color.css.buttons_backgroundColor, bottom:'-3px', left:'0', 'border-radius':'10px 10px 0px 0px', 'box-shadow': 'inset 2px 20px 20px -10px' + scope.color.css.navBar_borderColor, 'z-index':2});
//                 }
                        
                  
//             }else {
//                 element.css({backgroundColor: '', 'box-shadow':'', 'z-index':'none'});
//             }
    
//         });
            
//         $(window).resize(function(){
//                     if(window.innerWidth < 800)
//                     {
//                         scope.$apply(function(){
//                             element.css({left:'-3px', bottom:'0','border-radius':'0px 10px 10px 0px', 'box-shadow': 'inset -20px 0px 20px -10px' + scope.color.css.navBar_borderColor});
//                         });
//                     }
//                     else{
//                         scope.$apply(function(){
//                             element.css({bottom:'-3px', left:'0', 'border-radius':'10px 10px 0px 0px', 'box-shadow': 'inset 2px 20px 20px -10px' + scope.color.css.navBar_borderColor});
//                         });
//                     }
//             });
            
//       }
//   }; 
// });

