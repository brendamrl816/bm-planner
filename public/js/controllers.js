'use strict'

var bmPlannerControllers = angular.module('bmPlannerControllers', []);

bmPlannerControllers.controller('userCtrl', function(User, $window,  $http, Calendars, $timeout){
    var self=this;
    
    User.get();
    
    self.user = User;
    self.successMessage = false;
    self.wrongPass = false;
    self.newpassconfirm = undefined;
    self.oldpass = undefined;
    self.errors=[];
    self.errorsArrays=[];
    
    self.submit = function(){
        self.wrongPass = false;
        self.errors=[];
        self.errorsArrays=[];
        var data = {};
        data.first_name = self.user.info.first_name;
        data.last_name = self.user.info.last_name;
        data.dob = self.user.info.dob;
        data.email= self.user.info.email;
        data.old_password = self.oldpass;
        data.password = self.newpass;
        data.password_confirmation = self.newpassconfirm;
      
                
                
                User.update(data).success(function(UpdateResponse) {
                    if(UpdateResponse =="valid" )
                    {
                        User.get();
                        self.successMessage = true;
                        $timeout(function () { self.successMessage = false; }, 5000);
                        Calendars.getCalendars();
                        Calendars.getMainCalendar();
                        self.newpass = undefined;
                        self.newpassconfirm = undefined;
                        self.oldpass = undefined;
                    }
                    else{
                        User.get();
                        self.newpass = undefined;
                        self.newpassconfirm = undefined;
                        self.wrongPass = true;
                    }
                    
                }).error(function(data, status){
                    User.get();
                    self.newpass = undefined;
                    self.newpassconfirm = undefined;
                    self.wrongPass = true;
                    var keys = Object.keys(data);
                    keys.forEach(function(key){
                        self.errorsArrays.push(data[key]);
                    });
                    
                    for(var i=0; i<self.errorsArrays.length; i++)
                    {
                        for(var j=0; j<self.errorsArrays[i].length; j++)
                        {
                            self.errors.push(self.errorsArrays[i][j]);
                        }
                    }
                });
    };
    
    
    self.emailpassword = undefined;
    self.deletionError = false;
    
    self.delete = function(){
        self.deletionError = false;
        var data = {};
        data.password = self.emailpassword;
        User.deleteAccount(data).success(function(response){
            if(response == 'valid')
            {
                $window.location.reload();  
            }
            else{
                self.deletionError = true;
            }
        });
    };
});

bmPlannerControllers.controller('navBarCtrl', function( $scope){
    $scope.navMenu = false;
    
    
    $scope.toggleNavMenu = function(){
        $scope.navMenu = !$scope.navMenu;
    };
    
    window.addEventListener('click', function(){
        if($scope.navMenu == true)
        {
            $scope.navMenu = false;
        }
        $scope.$apply();
    });
    
});

bmPlannerControllers.controller('styleCtrl', function(Style, $scope, $rootScope){
    var self = this;
    self.theStyle = Style;
    
    self.homeView = function(){
      return {'background-color': 'rgba(' + self.theStyle.css.body_backgroundColor + ', 1)'};
    };
    
   
    self.modernBackground = function(){
        return { 'color':'#f2f2f2', 'border-bottom':'2px solid ' + 'rgb(' + self.theStyle.css.buttons_borderColor + ')', 'border-radius':'2px', 'text-shadow':' 1px 1px 1px #000000'};
    };
    
    self.buttonStyle = function(){
        return {'background-color':'rgba(' + self.theStyle.css.buttons_backgroundColor + ', 1)', 'color':'white', 'text-shadow':' 1px 1px 1px #000000', 
                'border-radius':'2px', 'padding':'4px', 'box-shadow':'1px 1px 1px rgba(' + self.theStyle.css.buttons_borderColor + ', 1)' };
    };
    
    self.textInputStyle = function(){
        return {'text-decoration':'none',  'background-color':'rgba(' + self.theStyle.css.buttons_borderColor + ', 0.4)', 'border-radius':'2px', 'border':'none', 'box-shadow':'0px 1px 0px' + self.theStyle.css.buttons_borderColor};  
    };
    
    
    self.inputStyle = function(){
        return { 'background-color':'transparent', 'box-shadow':'1px 1px 1px 1px rgba(' + self.theStyle.css.buttons_borderColor + ', 1)', 
                'border-radius':'2px', 'padding':'5px'};
    };
    
    self.modalInputStyle = function(){
        return { 'background-color':'rgba(' + self.theStyle.css.body_backgroundColor + ', 1)', 'box-shadow':'1px 1px 1px 1px rgba(' + self.theStyle.css.buttons_borderColor + ', 1)', 
                'border-radius':'2px', 'padding':'2px'};
    };
   
    self.modalStyle = function(){
        return {'box-shadow':' 1px 1px 5px 1px rgba(' + self.theStyle.css.buttons_borderColor + ', 0.8)'};  
    };
    
  
    self.statusStyle = function(){
        return {'color':'rgba(' + self.theStyle.css.buttons_borderColor + ', 1)', 'font-weight':'bold', 'font-size':'110%', 'text-shadow':' 1px 1px 0px brown'};
    };
    
    self.errorStyle = function(){
        return {'color':'rgba(' + self.theStyle.css.buttons_backgroundColor + ', 1)', 'font-style':'oblique', 'font-weight':'bolder',  'text-shadow':' 1px 2px 0px #000000', 'font-size':'120%', 'margin-right':'5px'};
    };
    
    self.navbarStyle = function(){
        return {'background-color': 'rgb(' + self.theStyle.css.navBar_backgroundColor + ')',
        'text-shadow':' 1px 1px 1px #000000', 'font-weight':'bold'}; 
    };
    
    self.navMenu= function(){
        return { 'background-color': 'rgba(' + self.theStyle.css.buttons_backgroundColor + ', 0.9)', 'box-shadow':' 1px 1px 2px 1px #D9D9D9'};
    };
    
});

bmPlannerControllers.controller('editStyleCtrl', function(Style, $window, $scope, $http){
    var self = this;
    
    self.chosenTheme;

    $http.get('/styles').success(function(response){
        self.chosenTheme = response.theme_name;
        self.id = response.id;
    });
    
    self.saveChanges = function(){
        var data = {};
        
        switch(self.chosenTheme){
            case 'default':
                data.theme_name = "default";
                data.body_backgroundColor = '218, 173, 134';
                data.body_color = '#663300';
                data.body_fontFamily = 'Arial, Helvetica, sans-serif';
                data.buttons_backgroundColor = '223, 141, 70';
                data.buttons_borderColor = '89, 56, 28';
                data.navBar_backgroundColor = '89,56,28';
                data.navBar_color = '#ffffff';
                // data.navBar_borderColor = '#ffad99';
                data.menuModal_backgroundColor = '118, 180, 192';
                break;
            case 'theme1':
                data.theme_name = "theme1";
                data.body_backgroundColor = '218, 173, 134';
                data.body_color = '#663300';
                data.body_fontFamily = 'Arial, Helvetica, sans-serif';
                data.buttons_backgroundColor = '223, 141, 70';
                data.buttons_borderColor = '89, 56, 28';
                data.navBar_backgroundColor = '89,56,28';
                data.navBar_color = '#ffffff';
                // data.navBar_borderColor = '#ffad99';
                data.menuModal_backgroundColor = '118, 180, 192';
                break;
            case 'theme2':
                data.theme_name = "theme2";
                data.body_backgroundColor = '#ffffff';
                data.body_color = '#000000';
                data.body_fontFamily = 'Arial, Helvetica, sans-serif';
                data.buttons_backgroundColor = '#b3daff';
                data.buttons_borderColor = '#0e92f1';
                data.navBar_backgroundColor = '#99ceff';
                data.navBar_color = '#ffffff';
                data.navBar_borderColor = '#80c1ff';
                data.menuModal_backgroundColor = '#f9fcff';
                break;
            case 'theme3':
                data.theme_name = "theme3";
                data.body_backgroundColor = '#ffffff';
                data.body_color = '#663300';
                data.body_fontFamily = 'Arial, Helvetica, sans-serif';
                data.buttons_backgroundColor = '#ffccff';
                data.buttons_borderColor = '#b300b3';
                data.navBar_backgroundColor = '#ffb3ff';
                data.navBar_color = '#ffffff';
                data.navBar_borderColor = '#ff99ff';
                data.menuModal_backgroundColor = '#fff2ff';
                break;
            case 'theme4':
                data.theme_name = "theme4";
                data.body_backgroundColor = '#ffffff';
                data.body_color = '#000000';
                data.body_fontFamily = 'Arial, Helvetica, sans-serif';
                data.buttons_backgroundColor = '#dbd6d6';
                data.buttons_borderColor = '#262626';
                data.navBar_backgroundColor = '#c3bbbb';
                data.navBar_color = '#ffffff';
                data.navBar_borderColor = '#737373';
                data.menuModal_backgroundColor = '#e6e6e6';
                break;
        }
        
        Style.update(data, self.id);
        // $window.location.reload();
    };
   
});

bmPlannerControllers.controller('contactUsCtrl', function($http, $timeout){
    var self = this;
    self.subject = undefined;
    self.content = undefined;
    self.sucessMessage = false;
    
    self.submit= function(){
        var data={};
        data.subject = self.subject;
        data.content = self.content;
        
        $http.post('/send', data).success(function(){
            self.successMessage = true;
            $timeout(function () { self.successMessage = false; }, 5000);
            self.subject = undefined;
            self.content = undefined;
        });
    };
    
});

bmPlannerControllers.controller('listsCtrl', function(Lists, $scope){
    $scope.lists = Lists.lists;
    var self = this;
    $scope.addListMenu = false;
    
    self.listName="";
    self.color="0, 0, 102";

    $scope.toggleAddList = function(){
      $scope.addListMenu = !$scope.addListMenu;
    };


    $scope.cancelAdd = function(){
        $scope.addListMenu = false;
        self.listName="";
        self.color="0, 0, 102";    
        
    };
    
    window.addEventListener('click', function(){
        if($scope.addListMenu == true)
        {
            $scope.addListMenu = false;
        }
        $scope.$apply();
    });
        
    $scope.add_list= function(){
        var data={};
        if(self.listName == "")
        {
            self.listName ="No Name";
        }
        data.name=self.listName;
        data.color= self.color;
        Lists.addList(data);
  
        $scope.addListMenu = false;
        self.listName="";
        self.color="0, 0, 102";
    };
});


bmPlannerControllers.controller('listMenuCtrl', function(Lists, $scope){
    
    $scope.showMenu = false;
    var self = this;
    
    self.name = $scope.list.name;
    self.color = $scope.list.color;
   
   
    $scope.toggleMenu = function(){
      $scope.showMenu = !$scope.showMenu;
    };
    
    $scope.delete_list= function(listIndex){
        //delete the list
        $scope.showMenu = false;
        Lists.deleteList(listIndex);
    };
    
     $scope.update = function(listIndex, name, color){
        var data={};
        data.name = self.name;
        data.color = self.color;
        
        Lists.updateList(data, listIndex);
        $scope.showMenu = false;
        self.name = $scope.list.name;
        self.color = $scope.list.color;
    };
    
    $scope.cancel = function(){
        $scope.showMenu = false;
        self.name = $scope.list.name;
        self.color = $scope.list.color;
    };


    $scope.hideAddButton = true;
    $scope.add_tasks= function(listIndex, taskName){
        
        var task={};
        if(taskName == "")
        {
            taskName = "no name";
        }
        task.name=taskName;
        task.completed = false;
        
        Lists.addTask(listIndex, task);
        
        $scope.taskName="";
    };

});


bmPlannerControllers.controller('tasksCtrl', function(Lists, $scope){
    
    $scope.completed = false;

     $scope.delete_task = function(listIndex, taskIndex, taskId){
        Lists.deleteTask(listIndex, taskIndex, taskId);
    };

    $scope.updateCompleted=function(listIndex, taskIndex, task){
        $scope.completed = !$scope.completed;
        var theTask={};
        theTask.completed=$scope.completed;

        Lists.updateCompleted(listIndex, taskIndex, task.id, theTask);
    };
    
    $scope.completedClass=function(){
        if($scope.task.completed==true){
            $scope.completed = true;
            return "completedStyle";
        }
        else{
            $scope.completed = false;
            return "";
        }
    };
});



bmPlannerControllers.controller('calendarsCtrl', function(Calendars, $scope){
        $scope.theCalendars=Calendars;
        
        var self= this;
        
        $scope.addCalMenu = false;
        self.name="";
        self.color="0, 0, 102";

        $scope.toggleAddCalendar = function(){
          $scope.addCalMenu = !$scope.addCalMenu;
        };
        
        window.addEventListener('click', function(){
            if($scope.addCalMenu == true)
            {
                $scope.addCalMenu = false;
            }
            $scope.$apply();
        });
        
        
        $scope.add = function(){
            var data = {};
            if(self.name == "")
            {
                self.name = "No Name";
            }
            data.name= self.name;
            data.color= self.color;
            Calendars.addCalendar(data);
            
            self.name="";
            self.color="0, 0, 102";
            $scope.addCalMenu = false;
        };
        
        $scope.cancelAdd = function(){
            $scope.addCalMenu = false;
            self.name="";
            self.color="0, 0, 102";    
            
        };
});


bmPlannerControllers.controller("calendarMenuCtrl", function(Calendars, EventsCalendar, Events, $scope){
    
    var self=this;
    self.showVerifyDeletion = false;
    self.showCalendarMenu = false;
  
    self.ToggleshowCalendarMenu = function(){
        self.nameToUpdate = $scope.calendar.name;
        self.colorToUpdate = $scope.calendar.color;
        self.showCalendarMenu = !self.showCalendarMenu;
    };
    
    self.update = function(id, name, color, index) {
        var data={};
        data.name= name;
        data.color=color;
        Calendars.updateCalendar(data, id, index);
        self.nameToUpdate = $scope.calendar.name;
        self.colorToUpdate = $scope.calendar.color;
        self.showCalendarMenu = false;

    };
    
    
    self.cancelUpdate = function() {
        self.showCalendarMenu = false;
        self.nameToUpdate = $scope.calendar.name;
        self.colorToUpdate = $scope.calendar.color;
    };   
        
    self.delete = function(){
            self.showCalendarMenu= false;
            self.verifyDeletion = true;
    };
        
    self.yesDelete = function(id, index){
        self.verifyDeletion = false;
        Calendars.deleteCalendar(id, index).success(function(response){
            EventsCalendar.refreshCalendar();
        });
    };
    
    self.noDelete = function(){
        self.verifyDeletion= false;
    };
   
});
  
/**************************************************************************EVENTS********************************************************/
bmPlannerControllers.controller('addEventCtrl', function($scope, $http, EventsCalendar, Calendars, Events, Repeats){

    
    var self = this;
    self.createEvent = false;
    self.template ="/html/addEventTemplate.html";
    self.calendars = [];
    self.mainCalendar; 
    
     $http.get('/calendars').success(function(response) {
        for(var i=0; i < response.length; i++)
        {
            self.calendars.push({name:response[i].name, id: response[i].id});
            if(self.calendars[i].id == Calendars.mainCalendar.id)
            {
                self.calendar_id = self.calendars[i];
                self.mainCalendar = self.calendars[i];
            }
        }
    });
    
       

    self.name = "";
    self.startDate = moment();
    self.endDate = self.startDate.clone();
    self.repeatEndDate = moment().add(1, 'd');
    self.startHour = moment().format('hh');
    self.endHour = moment().add(1, 'h').format('hh');
    self.startMinutes ='0';
    self.endMinutes ='0';
    self.startMeridiem = moment().format('a');
    self.endMeridiem = moment().add(1, 'h').format('a');
    self.allDay=false;
    self.repeats=false;
    self.repeatOccurrence="";
    self.repeatEndValue ="never";
    self.repeatsWeeklyMenu=false;
    
    
    self.repeatWeeklyOptions=[];
    self.repeatWeeklyOptions[0]= {id:'0', value:0, name: 'Sun', selected: false};
    self.repeatWeeklyOptions[1]= {id:'1', value:1, name: 'Mon', selected: false};
    self.repeatWeeklyOptions[2]= {id:'2', value:2, name: 'Tue', selected: false};
    self.repeatWeeklyOptions[3]= {id:'3', value:3, name: 'Wed', selected: false};
    self.repeatWeeklyOptions[4]= {id:'4', value:4, name: 'Thu', selected: false};
    self.repeatWeeklyOptions[5]= {id:'5', value:5, name: 'Fri', selected: false};
    self.repeatWeeklyOptions[6]= {id:'6', value:6, name: 'Sat', selected: false};
    
    self.toggleRepeatWeeklyOption = function(optionId){
        for(var i = 0; i<self.repeatWeeklyOptions.length; i++)
        {
            if(self.repeatWeeklyOptions[i].id == optionId)
            {
                self.repeatWeeklyOptions[i].selected = !self.repeatWeeklyOptions[i].selected;
            }
        }
    };
    
    
    self.toggleCreateEvent = function(day, time_minutes, event){
    //   console.log(event.target.className);
      if(event.target.className == 'eNameTimeHolder ng-scope' || event.target.className == 'eTime ng-binding' || event.target.className == 'eName ng-binding' || event.target.className == 'ng-binding' )
      {
          self.createEvent = false;
      }else{
           self.createEvent = !self.createEvent;
      }
   
       
       if(self.createEvent == true){
            self.calendars = Calendars.calendars;
            self.name = "";
            self.calendar_id = self.mainCalendar;
            if(day != "today")
            {
                self.startDate = day.clone();
            }else{
                self.startDate = moment();
            }
            if(time_minutes != "na")
            {
                self.startDate.hour(time_minutes/60);
            }else{
                self.startDate.hour(moment().format('HH'));
            }
            
            self.endDate = self.startDate.clone().add(1, 'h');
            self.startHour = self.startDate.format('hh');
            self.endHour = self.endDate.format('hh');
            self.startMinutes ='00';
            self.endMinutes ='00';
            self.startMeridiem = self.startDate.format('a');
            self.endMeridiem = self.endDate.format('a');
            self.allDay=false;
            self.repeats=false;
            self.repeatOccurrence="";
            self.repeatEndValue="never";
            self.repeatsWeeklyMenu = false;
            self.intervalSelection = false;
            
            self.repeatWeeklyOptions[0].selected= false;
            self.repeatWeeklyOptions[1].selected= false;
            self.repeatWeeklyOptions[2].selected= false;
            self.repeatWeeklyOptions[3].selected= false;
            self.repeatWeeklyOptions[4].selected= false;
            self.repeatWeeklyOptions[5].selected= false;
            self.repeatWeeklyOptions[6].selected= false;
        }
    };
    
    self.cancelAdd = function(){
        self.createEvent = false;
    }

    
    $scope.$watch('add.startDate', function(newValue, oldValue){
      $scope.add.endDate= newValue.clone().add(1, 'h');
      $scope.add.repeatEndDate = newValue.clone().add(1, 'd');
    });
    
    self.validateStartTime = getValidateTime(self.startDate, self.startHour, self.startMinutes, self.startMeridiem);
    $scope.$watchGroup(['add.startDate', 'add.startHour', 'add.startMinutes', 'add.startMeridiem'], function(newValues, oldValues, scope) {
        self.validateStartTime = getValidateTime(newValues[0], newValues[1], newValues[2], newValues[3]);
        self.validateEndTime = getValidateTime(self.endDate, self.endHour, self.endMinutes, self.endMeridiem);
        self.validateRepeatDate = getValidateTime(self.repeatEndDate, self.startHour, self.startMinutes, self.startMeridiem);
    });
    
    self.validateEndTime = getValidateTime(self.endDate, self.endHour, self.endMinutes, self.endMeridiem);
    $scope.$watchGroup(['add.endDate', 'add.endHour', 'add.endMinutes', 'add.endMeridiem'], function(newValues, oldValues, scope) {
        self.validateStartTime = getValidateTime(self.startDate, self.startHour, self.startMinutes, self.startMeridiem);
        self.validateEndTime = getValidateTime(newValues[0], newValues[1], newValues[2], newValues[3]);
    });
    
    self.validateRepeatDate = getValidateTime(self.repeatEndDate, self.startHour, self.startMinutes, self.startMeridiem);
    $scope.$watchGroup(['add.repeatEndDate', 'add.startHour', 'add.startMinutes', 'add.startMeridiem'], function(newValues, oldValues, scope) {
        self.validateRepeatDate = getValidateTime(newValues[0], newValues[1], newValues[2], newValues[3]);
        self.validateStartTime = getValidateTime(self.startDate, self.startHour, self.startMinutes, self.startMeridiem);
    });
    
    function getValidateTime(date, hour, minutes, meridiem){
        
        if((hour !== '12') && meridiem === "pm")
        {
            hour = parseInt(hour, 10) + 12;
        }
        if((hour === '12') && meridiem === "am")
        {
            hour = '00';
        }
        var time = hour + ':' + minutes + ':' + '00';
        return moment(date.format('YYYY-MM-DD') + " " + time);
    }
    
    self.toggleAllDay=function(){
        self.allDay=!self.allDay;
    };
    
    self.toggleRepeats=function(){
        self.repeats=!self.repeats;
        if(self.repeats == true)
        {
            self.repeatInterval = '1';
            
            var weekday = self.startDate.day();
            for(var i = 0; i<self.repeatWeeklyOptions.length; i++)
            {
                if(self.repeatWeeklyOptions[i].id == weekday)
                {
                    self.repeatWeeklyOptions[i].selected = true;
                }
            }
        }
    };
    
   
    
    self.changeRepeatOptions=function(repeatOccurrence){
        switch(self.repeatOccurrence){
            case "daily":
                self.intervalSelection = false;
                self.repeatsWeeklyMenu = false;
                break;
            case "weekday":
                self.intervalSelection = false;
                self.repeatsWeeklyMenu = false;
                break;
            case "weekly":
                self.intervalSelection = true;
                self.repeatsWeeklyMenu = true;
                self.intervalWord = "weeks";
                break;
                
            case "monthly":
                self.intervalSelection = true;
                self.intervalWord = "months";
                self.repeatsWeeklyMenu = false;
                break;
                
            case "yearly":
                self.intervalSelection = true;
                self.intervalWord = "years";
                self.repeatsWeeklyMenu = false;
                break;
            default:
                self.intervalSelection = false;
                self.repeatsWeeklyMenu = false;
                break;
        }
    };
    
    
    self.addEvent=function(){
        self.createEvent = false;
    //*******************************SET INFO TO BE SENT TO BACKEND*******************************************************
        var eventToSend={};
        eventToSend.name = self.name;
        eventToSend.calendar_id = self.calendar_id.id;
        
        
        if(self.allDay == true)
        {
            self.startDate.hour(0);
            self.startDate.minutes(0);
            self.endDate.hour(23);
            self.endDate.minutes(59);
        }else{

            self.startDate.hour(getHour(self.startHour, self.startMeridiem));
            self.startDate.minutes(self.startMinutes);
            self.endDate.hour(getHour(self.endHour, self.endMeridiem));
            self.endDate.minutes(self.endMinutes);
        }
            eventToSend.startDate = self.startDate.format('YYYY-MM-DD ')+ getTimeToSend(self.startHour, self.startMinutes, self.startMeridiem);
            eventToSend.endDate= self.endDate.format('YYYY-MM-DD ') + getTimeToSend(self.endHour, self.endMinutes, self.endMeridiem);
        
        eventToSend.length_hours =(self.endDate.diff(self.startDate, 'hours', true));
        if(self.endDate.format('MM-DD-YY') == self.startDate.format('MM-DD-YY') || ((self.endDate.diff(self.startDate, 'days') == 0) && (self.endDate.format('HH:mm a') == '00:00 am' || self.startDate.format('HH:mm a') == '00:00 am'))
            || ((self.endDate.diff(self.startDate, 'days') == 1) && (self.endDate.format('HH:mm a') == '00:00 am' && self.startDate.format('HH:mm a') == '00:00 am')))
        {
            eventToSend.length_days = 0;
        }else{
            eventToSend.length_days = Math.ceil(self.endDate.diff(self.startDate, 'days', true));
            if(eventToSend.length_hours/eventToSend.length_days < 12)
            {
                eventToSend.length_days = eventToSend.length_days + 1;
            }
        }
        
      
        // eventToSend.startTimeDisplay = self.startHour +':'+self.startMinutes+ self.startMeridiem;
        // eventToSend.endTimeDisplay = self.endHour +':' + self.endMinutes+ self.endMeridiem;

        eventToSend.repeats=self.repeats;
        eventToSend.allDay = self.allDay;
        
        // ***************************************send info to backend*****************************************
        Events.addEvent(eventToSend).success(function(response){
            
            if(response.repeats==true){
                var repeatData={};
                repeatData.event_id = response.id;
            
                if(self.repeatEndValue=="never")
                {
                    repeatData.neverEnds=true;
                    repeatData.repeatEndDate=null;
                }else{
                    repeatData.repeatEndDate = self.repeatEndDate.format('YYYY-MM-DD '+ getTimeToSend(self.endHour, self.endMinutes, self.endMeridiem));
                    repeatData.neverEnds=false;
                }
            
                    
                    switch(self.repeatOccurrence){
                        case "daily": 
                            repeatData.repeatDaily="*";
                            repeatData.repeatOccurrence = "daily";
                            repeatData.repeatInterval = null;
                           
                            break;
                        case "weekday":
                            repeatData.repeatWeekdays="*";
                            repeatData.repeatOccurrence="weekday";
                            repeatData.repeatInterval = null;
                            break;
                            
                    case "weekly":
                        repeatData.repeatWeekly = "";
                        repeatData.repeatOccurrence="weekly";
                        for(var i=0; i<self.repeatWeeklyOptions.length; i++){
                            if(self.repeatWeeklyOptions[i].selected == true){
                              repeatData.repeatWeekly = repeatData.repeatWeekly.concat(self.repeatWeeklyOptions[i].id);
                            }
                        }
                        //604800 is 7 days in seconds
                        repeatData.repeatInterval = parseInt(self.repeatInterval, 10) * 604800;
                        if(repeatData.repeatWeekly == "")
                        {
                            repeatData.repeatWeekly = self.startDate.day();
                        }
                        break;
                        
                    case "monthly":
                        repeatData.repeatOccurrence="monthly";
                        repeatData.repeatMonthly=self.startDate.date();
                        repeatData.repeatInterval = parseInt(self.repeatInterval, 10);
                        break;
                        
                    case "yearly":
                        repeatData.repeatOccurrence="yearly";
                        repeatData.repeatYearly=(self.startDate.month() + 1) +"-"+ self.startDate.date();
                        repeatData.repeatInterval = parseInt(self.repeatInterval, 10);
                        break;
                
                }

                Repeats.addRepeat(repeatData).success(function(response){
                    
                });
            
            }
            
            EventsCalendar.refreshCalendar();
                
        });
        
    };
    
    function getTimeToSend(hour, minute, meridiem)
    {
        if(hour == '12' && meridiem == 'am')
            {
                hour ='00';
            }
        if(meridiem =='pm' && hour != '12')
            {
                hour = parseInt(hour, 10) + 12;
            }
        return hour + ':' + minute + ':' + '00';
    }
    
    function getHour(hour, meridiem)
    {
        
            if(hour == '12' && meridiem == 'am')
            {
                hour ='00';
            }
            if(meridiem =='pm' && hour != '12')
            {
                hour = parseInt(hour, 10) + 12;
            }
        return hour;
    }
});



bmPlannerControllers.controller('eventCtrl', function($scope, EventsCalendar, Calendars, Events, Repeats,  RepetitionUpdates){

    $scope.todaysDate = $scope.day.itsDate;
    //***************************************** EVENT STYLE**********************************************************************
    
    $scope.getColor = function()
    {
        var color;
        for(var i=0; i<Calendars.calendars.length; i++)
        {
            if($scope.event.calendar_id == Calendars.calendars[i].id)
            {
                color = Calendars.calendars[i].color;
            }
        }
        return color;
    };
   
   
    $scope.getDisplayColor = function()
    {
        var color;
        for(var i=0; i<Calendars.calendars.length; i++)
        {
            if($scope.event.calendar_id == Calendars.calendars[i].id)
            {
                color = Calendars.calendars[i].color;
            }
        }
     
        
         return color;
 
    };
    
    $scope.getBorderRad = function()
    {
        if($scope.event.eventLength == 0)
        {
            return '20px';
        }else{
            return '0px';
        }
    };
    
    $scope.getWidthBorder = function(){
        var border;
        
        if($scope.event.allDay == true && $scope.event.length_days ==0)
        {
            border = 'none';
        }else{
            border = '1px solid #e6e6e6'
        }
       
        if($scope.event.length_days  > (6 - $scope.day.itsDate.day()))
        {
            return {'width': ((100 * ( 6 - $scope.day.itsDate.day() + 1) ) ) + '%', 'border':border, 'border-right':'none'};
        }
        else if($scope.day.itsDate.day() == 0 && $scope.day.itsDate.format('YYYY-MM-DD') != $scope.event.eventStartsOnFormatted)
        {
            return {'width': ((100 * ( $scope.event.length_days - (6 - moment($scope.event.eventStartsOn, 'YYY-MM-DD HH:mm:ss').day() + 1)) ) ) + '%',  'border':border, 'border-left':'none'};
        }
        else{
            return {'width':(100 * ($scope.event.length_days ) ) + '%', 'border':border};
        }
    };
    
   
    $scope.startDateDisplay = moment($scope.event.eventStartsOn , 'YYYY-MM-DD HH:mm:ss').format('MMM DD, YYYY');
    $scope.endDateDisplay = moment($scope.event.eventStartsOn, 'YYYY-MM-DD HH:mm:ss').add($scope.event.length_hours, 'hours').format('MMM DD, YYYY');
    
    
    //****************************************** MODAL VARIABLES ***************************************************************
    $scope.eventMenu = false; //Ask user if it wants to edit or delete

    
    $scope.verifyDeletion = false; //Ask user if they really want to delete event
    $scope.verificationQuestion;
    $scope.verificationAnswer;
    $scope.eventsRepQuestion = false; //If event repeats, ask user if they want to delete only this ocurrence or all repetitions
    $scope.kindOfEdition = false;//If event repeats, ask user if they want to edit all event occurrances or just this one
   
    $scope.toggleEventMenu = function(){
        
        $scope.eventMenu = !$scope.eventMenu;
        $scope.startDateDisplay = moment($scope.event.eventStartsOn , 'YYYY-MM-DD HH:mm:ss').format('MMM DD, YYYY');
        $scope.endDateDisplay = moment($scope.event.eventStartsOn, 'YYYY-MM-DD HH:mm:ss').add($scope.event.length_hours , 'hours').format('MMM DD, YYYY');
    };
    
    $scope.toggleVerifyDeletion = function(){
        $scope.verifyDeletion = !$scope.Deletion;
    };
    $scope.toggleEventsRepQuestion = function(){
        $scope.eventsRepQuestion = !$scope.eventsRepQuestion;
        
    };
    $scope.toggleKindOfEdition = function(){
        $scope.kindOfEdition = !$scope.kindOfEdition;
        
    };
   
    
    //************************************************* DELETE EVENT*******************************************************************
    $scope.deleteEvent = function(){
        $scope.eventMenu = false;
        if($scope.event.repeats == true)
        {
            $scope.eventsRepQuestion = true;
        }else{
            $scope.verificationQuestion = "Are you sure you would like to delete this event";
            $scope.verifyDeletion = true;
            $scope.verificationAnswer = "only";
        }

    };
    
    $scope.noDeleteEvent = function(){
        $scope.verifyDeletion = false;
    };
    
    $scope.yesDeleteEvent = function(){
        $scope.verifyDeletion = false;
        
        switch($scope.verificationAnswer){
            case 'only':
                        Events.deleteEvent($scope.event.id).success(function(response){
                            EventsCalendar.refreshCalendar();
                            
                        });
                        break;
                
            case 'this':
                        var data={};
                        data.event_id = $scope.event.id;
                        var day = $scope.todaysDate.clone();
                        var startDate = moment($scope.event.startDate, 'YYYY-MM-DD HH:mm:ss');

                        
                        if(startDate.format('YY-MM-DD') == $scope.todaysDate.format('YY-MM-DD'))
                        {
                            var update={};
                            update.id = $scope.event.id;
                            update.date = startDate.clone().add($scope.event.length_hours , 'hours').format('YYYY-MM-DD HH:mm:ss');
                            Events.updateStartDate(update).sucess(function(response){
                                EventsCalendar.refreshCalendar();
                            });
                        }
                        else{
                            if($scope.event.length_days > 0)
                            {
                                var month = day.month();
                                var eventStartsOn = moment($scope.event.eventStartsOn, 'YYYY-MM-DD HH:mm:ss');
                                var dateUpdate = eventStartsOn.month(month);
                                data.dateOfChange = dateUpdate.format('YYYY-MM-DD HH:mm:ss');
                                
                            }else{
                                data.dateOfChange = day.format('YYYY-MM-DD HH:mm:ss');
                            }
            
                            RepetitionUpdates.saveEventToChange(data).success(function(response){
                                
                                EventsCalendar.refreshCalendar();
                            });
                        }
                        
                        break;
                
            case 'all':
                        Events.deleteEvent($scope.event.id).success(function(response){
                            EventsCalendar.refreshCalendar();
                            
                        });
                break;
        }
        
    };
    
    $scope.deleteAllOcurrences = function(){
        $scope.eventsRepQuestion = false;
        
        $scope.verificationQuestion = "Are you sure you would like to delete all events in this series?";
        $scope.startDateDisplay = moment($scope.event.startDate, 'YYYY-MM-DD HH:mm:ss').format('MMM DD, YYYY');
        $scope.endDateDisplay = moment($scope.event.endDate, 'YYYY-MM-DD HH:mm:ss').format('MMM DD, YYYY');
        if($scope.event.neverEnds == false)
        {
            $scope.repeatEndDateDisplay =  moment($scope.event.repeatEndDate, 'YYYY-MM-DD HH:mm:ss').format('MMM DD, YYYY');
        }
        else{
            $scope.repeatEndDateDisplay = "never";
        }
       
        $scope.verifyDeletion = true;
        $scope.verificationAnswer = "all";
    };
    
    $scope.deleteOnlyThisOcurrance = function(){
        $scope.eventsRepQuestion = false;
        $scope.verificationQuestion = "Are you sure you would like to delete this event in the series?";
        $scope.verifyDeletion = true;
        $scope.verificationAnswer = 'this';
        $scope.startDateDisplay = moment($scope.event.eventStartsOn, 'YYYY-MM-DD HH:mm:ss').format('MMM DD, YYYY');
        $scope.endDateDisplay = moment($scope.event.eventStartsOn, 'YYYY-MM-DD HH:mm:ss').add($scope.event.length_hours, 'hours').format('MMM DD, YYYY');
    };
    
    
    
//*****************************************************EDIT EVENT****************************************************************

    $scope.editEvent = function(event){
        $scope.eventMenu = false;
        if($scope.event.repeats == true)
        {
            $scope.kindOfEdition = true;
        }
        else{
            $scope.editionType = 'one';
            $scope.toggleEditModal(event, $scope.todaysDate, $scope.editionType);
        }
    };
    
    $scope.editThisEvent = function(event){
        $scope.kindOfEdition = false;
        $scope.editionType = 'only_this';
        $scope.toggleEditModal(event, $scope.todaysDate, $scope.editionType);
    };
    $scope.editAllEvents = function(event){
        $scope.kindOfEdition = false;
        $scope.editionType = 'all';
        $scope.toggleEditModal(event, $scope.todaysDate, $scope.editionType);
    };
    
    $scope.editFutureEvents = function(event){
        $scope.kindOfEdition = false;
        $scope.editionType = 'all_future';
        $scope.toggleEditModal(event, $scope.todaysDate, $scope.editionType);
    };
});




bmPlannerControllers.controller("editEventCtrl", function($scope, EventsCalendar, Calendars, Events, Repeats,  RepetitionUpdates){
    var self = this;
    
    $scope.urlTemplate ="/html/editEventTemplate.html";
    self.editModal = false;
    
    self.name = "";
    self.startDate = moment();
    self.endDate = self.startDate.clone();
    self.repeatEndDate = moment().add(1, 'd');
    self.startHour = moment().format('hh');
    self.endHour = moment().add(1, 'h').format('hh');
    self.startMinutes ='0';
    self.endMinutes ='0';
    self.startMeridiem = moment().format('a');
    self.endMeridiem = moment().add(1, 'h').format('a');
    self.allDay=false;
    self.repeats=false;
    self.repeatOccurrence="";
    self.repeatEndValue ="never";
    self.repeatsWeeklyMenu=false;

    self.repeatWeeklyOptions=[];
    self.repeatWeeklyOptions[0]= {id:'0', name: 'Sun', selected: false};
    self.repeatWeeklyOptions[1]= {id:'1', name: 'Mon', selected: false};
    self.repeatWeeklyOptions[2]= {id:'2', name: 'Tue', selected: false};
    self.repeatWeeklyOptions[3]= {id:'3', name: 'Wed', selected: false};
    self.repeatWeeklyOptions[4]= {id:'4', name: 'Thu', selected: false};
    self.repeatWeeklyOptions[5]= {id:'5', name: 'Fri', selected: false};
    self.repeatWeeklyOptions[6]= {id:'6', name: 'Sat', selected: false};
    
    
    self.toggleAllDay=function(){
        self.allDay=!self.allDay;
    };
    
    self.toggleRepeats=function(){
        self.repeats=!self.repeats;
    };
    
    self.intervalSelection = false;
    self.repeatInterval = "1";
    
    self.changeRepeatOptions=function(repeatOccurrence){
        switch(self.repeatOccurrence){
            case "daily":
                self.intervalSelection = false;
                self.repeatsWeeklyMenu=false;
                break;
            case "weekday":
                self.intervalSelection = false;
                self.repeatsWeeklyMenu=false;
                break;
            case "weekly":
                self.intervalSelection = true;
                self.repeatsWeeklyMenu = true;
                self.intervalWord = "weeks";
                break;
                
            case "monthly":
                self.intervalSelection = true;
                self.intervalWord = "months";
                self.repeatsWeeklyMenu=false;
                break;
                
            case "yearly":
                self.intervalSelection = true;
                self.intervalWord = "years";
                self.repeatsWeeklyMenu=false;
                break;
            default:
                self.intervalSelection = false;
                self.repeatsWeeklyMenu=false;
                break;
        }
    };
    
    self.toggleRepeatWeeklyOption = function(optionId){
        for(var i = 0; i<self.repeatWeeklyOptions.length; i++)
        {
            if(self.repeatWeeklyOptions[i].id == optionId)
            {
                self.repeatWeeklyOptions[i].selected = !self.repeatWeeklyOptions[i].selected;
            }
        }
    };

    
    self.validateStartTime = getValidateTime(self.startDate, self.startHour, self.startMinutes, self.startMeridiem);
   
    $scope.$watchGroup(['edit.startDate', 'edit.startHour', 'edit.startMinutes', 'edit.startMeridiem'], function(newValues, oldValues, scope) {
        self.validateStartTime = getValidateTime(newValues[0], newValues[1], newValues[2], newValues[3]);
        self.validateEndTime = getValidateTime(self.endDate, self.endHour, self.endMinutes, self.endMeridiem);
        self.validateRepeatDate = getValidateTime(self.repeatEndDate, self.startHour, self.startMinutes, self.startMeridiem);
    
    });
    
    self.validateEndTime = getValidateTime(self.endDate, self.endHour, self.endMinutes, self.endMeridiem);
    $scope.$watchGroup(['edit.endDate', 'edit.endHour', 'edit.endMinutes', 'edit.endMeridiem'], function(newValues, oldValues, scope) {
        self.validateStartTime = getValidateTime(self.startDate, self.startHour, self.startMinutes, self.startMeridiem);
        self.validateEndTime = getValidateTime(newValues[0], newValues[1], newValues[2], newValues[3]);
    });
    
    self.validateRepeatDate = getValidateTime(self.repeatEndDate, self.startHour, self.startMinutes, self.startMeridiem);
    $scope.$watchGroup(['edit.repeatEndDate', 'edit.startHour', 'edit.startMinutes', 'edit.startMeridiem'], function(newValues, oldValues, scope) {
        self.validateRepeatDate = getValidateTime(newValues[0], newValues[1], newValues[2], newValues[3]);
        self.validateStartTime = getValidateTime(self.startDate, self.startHour, self.startMinutes, self.startMeridiem);
    });
    
    function getValidateTime(date, hour, minutes, meridiem){
        if((hour != '12') && meridiem == "pm")
        {
            hour = parseInt(hour, 10) + 12;
        }
        if(hour == '12' && meridiem == "am")
        {
            hour == '00';
        }
        var time = hour + ':' + minutes + ':' + '00';
        return moment(date.format('YYYY-MM-DD') + " " + time);
    }
    
    $scope.toggleEditModal = function(event, todaysDate, editionType){
        self.editModal = !self.editModal;
        self.todaysDate = todaysDate;
        self.editionType = editionType;
        self.event = event;
        self.event_id = event.id;
        
        
        
        if(self.editModal == true)
        {
           
            self.name = event.name;
            self.calendars = [];
            for(var i=0; i<Calendars.calendars.length; i++)
            {
                self.calendars.push({name:Calendars.calendars[i].name, id: Calendars.calendars[i].id});
                if(Calendars.calendars[i].id == event.calendar_id)
                {
                    self.calendar_id = self.calendars[i];
                }
            }
            
            self.startDate = moment(event.startDate, 'YYYY-MM-DD HH:mm:ss');
            self.endDate = moment(event.endDate, 'YYYY-MM-DD HH:mm:ss');
            self.repeatEndDate = self.endDate.clone().add(7, 'd');
            
            if(event.allDay == true)
            {
                self.allDay = true;
                self.startDate.hour(moment().format('HH'));
                self.endDate.hour(moment().add(1, 'hour').format('HH'));
                self.repeatEndDate = self.endDate.clone().add(7, 'd');
            }else{
                self.allDay = false;
            }
                
            self.startHour = self.startDate.format('hh');
            self.endHour = self.endDate.format('hh');
            self.startMinutes = self.startDate.format('mm');
            self.endMinutes = self.endDate.format('mm');
            self.startMeridiem = self.startDate.format('a');
            self.endMeridiem = self.endDate.format('a');
           
            self.repeatsWeeklyMenu = false;
            for( i=0; i<self.repeatWeeklyOptions.length; i++){
                self.repeatWeeklyOptions[i].selected = false;
            }
            
            if(event.repeats == true)
            {
                self.repeats = true;
                if(event.neverEnds == false)
                {
                    self.repeatEndDate = moment(event.repeatEndDate,  'YYYY-MM-DD HH:mm:ss');
                    self.repeatEndValue = "date";
                }else
                {
                    self.repeatEndValue = "never";
                }
                
                
                switch(event.repeatOccurrence){
                    case "daily": 
                            self.repeatOccurrence = "daily";
                            break;
                            
                    case "weekday":
                            self.repeatOccurrence = "weekday";
                            break;
                            
                    case "weekly":
                      self.repeatOccurrence = "weekly";
                      self.repeatsWeeklyMenu=true;
                      self.intervalSelection = true;
                      self.intervalWord ="weeks";
                      self.repeatInterval = (event.repeatInterval / 604800).toString();
                       for( i=0; i<self.repeatWeeklyOptions.length; i++){
                            if(self.event.repeatWeekly.indexOf(self.repeatWeeklyOptions[i].id) !== -1){
                                self.repeatWeeklyOptions[i].selected = true;
                            }
                        }
                        break;
                        
                    case "monthly":
                        self.repeatOccurrence = "monthly";
                        self.intervalSelection = true;
                        self.repeatInterval = event.repeatInterval.toString();
                        self.intervalWord ="months";
                        break;
                        
                    case "yearly":
                        self.repeatOccurrence = "yearly";
                        self.intervalSelection = true;
                        self.repeatInterval = event.repeatInterval.toString();
                        self.intervalWord ="years";
                        break;
                }
                
            }else{
                self.repeats = false;
            }
            
            switch (self.editionType) {
                case 'only_this':
                        self.startDate = self.todaysDate.clone();
                        self.endDate = self.startDate.clone().add(event.length_hours, 'hours');
                        self.repeats = false;
                        self.repeatEndDate = self.todaysDate.clone().add(1,'d');
                        self.repeatOccurrence = "";
                        self.repeatInterval ="1";
                        self.repeatEndValue = "never";
                    break;
                    
                
                case 'all_future':
                        self.startDate = self.todaysDate.clone();
                        self.endDate = self.startDate.clone().add(event.length_hours, 'hours');
                        if(self.repeatEndValue=="never")
                        {
                            self.repeatEndDate = self.startDate.clone().add(1, 'd');
                        }
                    break;
                    
                default:
                    break;
            } 
        }

    };

    self.cancelEdition = function(){
        self.editModal = false;
    };
    
    self.submitEdition = function(){
        var editData = {};
        editData.name = self.name;
        editData.calendar_id = self.calendar_id.id;
        
        self.startDate.hour(getHour(self.startHour, self.startMeridiem));
        self.startDate.minutes(self.startMinutes);
        self.endDate.hour(getHour(self.endHour, self.endMeridiem));
        self.endDate.minutes(self.endMinutes);
        
        if(self.allDay == true)
        {
            editData.startDate = self.startDate.format('YYYY-MM-DD ') + '00:00:00';
            editData.endDate= self.endDate.format('YYYY-MM-DD ') + '23:59:00';
        }else{
            editData.startDate = self.startDate.format('YYYY-MM-DD ')+ getTimeToSend(self.startHour, self.startMinutes, self.startMeridiem);
            editData.endDate= self.endDate.format('YYYY-MM-DD ') + getTimeToSend(self.endHour, self.endMinutes, self.endMeridiem);
        }
       
        editData.length_hours = (self.endDate.diff(self.startDate, 'hours', true));
        if(self.endDate.format('MM-DD-YY') == self.startDate.format('MM-DD-YY') || (self.endDate.diff(self.startDate, 'days') == 0 && self.endDate.format('HH:mm') == '00:00'))
        {
            editData.length_days = 0;
        }else{
            editData.length_days = Math.ceil(self.endDate.diff(self.startDate, 'days', true));
            if(editData.length_hours/editData.length_days < 12)
            {
               editData.length_days = editData.length_days + 1;
            }
        }
        
        editData.repeats = self.repeats;
        editData.allDay = self.allDay;
       
        switch(self.editionType)
        {
            case 'one':
                Events.updateEvent(editData, self.event_id).success(function(response){
                    if(response.repeats == true){
                        var repeatData = {};
                        repeatData.event_id = response.id;
                    
                        if(self.repeatEndValue == "never")
                        {
                            repeatData.neverEnds = true;
                            repeatData.repeatEndDate = "";
                        }else{
                            self.repeatEndDate.hour(getHour(self.endHour, self.endMeridiem));
                            self.repeatEndDate.minutes(self.endMinutes);
                            repeatData.repeatEndDate = self.repeatEndDate.format('YYYY-MM-DD HH:mm:ss');
                            repeatData.neverEnds = false;
                        }
                    
                            
                        switch(self.repeatOccurrence){
                                case "daily": 
                                    repeatData.repeatDaily="*";
                                    repeatData.repeatOccurrence="daily";
                                    repeatData.repeatInterval = null;
                                   
                                    break;
                                case "weekday":
                                    repeatData.repeatWeekdays="*";
                                    repeatData.repeatOccurrence="weekday";
                                    repeatData.repeatInterval = null;
                                    break;
                                    
                            case "weekly":
                                repeatData.repeatWeekly = "";
                                repeatData.repeatOccurrence="weekly";
                                for(var i=0; i<self.repeatWeeklyOptions.length; i++){
                                    if(self.repeatWeeklyOptions[i].selected == true){
                                        
                                      repeatData.repeatWeekly = repeatData.repeatWeekly.concat(self.repeatWeeklyOptions[i].id);
                                    }
                                }
                                if(repeatData.repeatWeekly == "")
                                {
                                    repeatData.repeatWeekly = self.startDate.day();
                                }
                                repeatData.repeatInterval = parseInt(self.repeatInterval, 10) * 604800;
                                break;
                                
                            case "monthly":
                                repeatData.repeatOccurrence="monthly";
                                repeatData.repeatMonthly=self.startDate.date();
                                repeatData.repeatInterval = parseInt(self.repeatInterval, 10);
                                break;
                                
                            case "yearly":
                                repeatData.repeatOccurrence="yearly";
                                repeatData.repeatYearly=(self.startDate.month() + 1) +"-"+ self.startDate.date();
                                repeatData.repeatInterval = parseInt(self.repeatInterval, 10);
                                break;
                        
                        }
                        
                        Repeats.addRepeat(repeatData).success(function(response){
                            EventsCalendar.refreshCalendar();
                            
                        });
                    }else{
                        EventsCalendar.refreshCalendar();
                    }
                });
                break;
            
            case 'only_this':
                var data={};
                data.event_id = self.event_id;
                
                var day = self.todaysDate.clone();  
                if(self.event.length_days > 0)
                {
                    var month = day.month();
                    var eventDate = moment(self.startDate, 'YYYY-MM-DD HH:mm:ss');
                    var dateUpdate = eventDate.month(month);
                    data.dateOfChange = dateUpdate.format('YYYY-MM-DD HH:mm:ss');
                    
                }else{
                    data.dateOfChange = day.format('YYYY-MM-DD HH:mm:ss');
                }
                
                RepetitionUpdates.saveEventToChange(data).success(function(response){
                    Events.addEvent(editData).success(function(response){
                        if(response.repeats == true){
                            var repeatData = {};
                            repeatData.event_id = response.id;
                            if(self.repeatEndValue == "never")
                            {
                                repeatData.neverEnds = true;
                                repeatData.repeatEndDate = "";
                            }else{
                                repeatData.repeatEndDate = self.repeatEndDate.format('YYYY-MM-DD HH:mm:ss');
                                repeatData.neverEnds = false;
                            }
                        
                                
                            switch(self.repeatOccurrence){
                                    case "daily": 
                                        repeatData.repeatDaily="*";
                                        repeatData.repeatOccurrence="daily";
                                        repeatData.repeatInterval = null;
                                       
                                        break;
                                    case "weekday":
                                        repeatData.repeatWeekdays="*";
                                        repeatData.repeatOccurrence="weekday";
                                        repeatData.repeatInterval = null;
                                        break;
                                        
                                case "weekly":
                                    repeatData.repeatWeekly = "";
                                    repeatData.repeatOccurrence="weekly";
                                    repeatData.repeatInterval = parseInt(self.repeatInterval, 10) * 604800;
                                    for(var i=0; i<self.repeatWeeklyOptions.length; i++){
                                        if(self.repeatWeeklyOptions[i].selected == true){
                                            
                                          repeatData.repeatWeekly = repeatData.repeatWeekly.concat(self.repeatWeeklyOptions[i].id);
                                        }
                                    }
                                    if(repeatData.repeatWeekly == "")
                                    {
                                        repeatData.repeatWeekly = self.startDate.day();
                                    }
                                    break;
                                    
                                case "monthly":
                                    repeatData.repeatOccurrence="monthly";
                                    repeatData.repeatMonthly=self.startDate.date();
                                    repeatData.repeatInterval = parseInt(self.repeatInterval, 10);
                                    break;
                                    
                                case "yearly":
                                    repeatData.repeatOccurrence="yearly";
                                    repeatData.repeatYearly=(self.startDate.month() + 1) +"-"+ self.startDate.date();
                                    repeatData.repeatInterval = parseInt(self.repeatInterval, 10);
                                    break;
                            
                            }
                            
                            Repeats.addRepeat(repeatData).success(function(response){
                                EventsCalendar.refreshCalendar();
                                
                            });
                        }else{
                            EventsCalendar.refreshCalendar();
                        }
                    });
                });
                
                break;
                            
            case 'all':
                Events.updateEvent(editData, self.event_id).success(function(response){
                    if(response.repeats == true){
                        var repeatData = {};
                        
                        console.log(self.repeatEndValue);
                        if(self.repeatEndValue == "never")
                        {
                            repeatData.neverEnds = true;
                            repeatData.repeatEndDate = "";
                        }else{
                            repeatData.repeatEndDate = self.repeatEndDate.format('YYYY-MM-DD HH:mm:ss');
                            repeatData.neverEnds = false;
                        }
                    
                            
                        switch(self.repeatOccurrence){
                                case "daily": 
                                    repeatData.repeatDaily="*";
                                    repeatData.repeatOccurrence="daily";
                                    repeatData.repeatInterval = null;
                                   
                                    break;
                                case "weekday":
                                    repeatData.repeatWeekdays="*";
                                    repeatData.repeatOccurrence="weekday";
                                    repeatData.repeatInterval = null;
                                    break;
                                    
                            case "weekly":
                                repeatData.repeatWeekly = "";
                                repeatData.repeatOccurrence="weekly";
                                repeatData.repeatInterval = parseInt(self.repeatInterval, 10) * 604800;
                                for(var i=0; i<self.repeatWeeklyOptions.length; i++){
                                    if(self.repeatWeeklyOptions[i].selected == true){
                                        
                                      repeatData.repeatWeekly = repeatData.repeatWeekly.concat(self.repeatWeeklyOptions[i].id);
                                    }
                                }
                                if(repeatData.repeatWeekly == "")
                                {
                                    repeatData.repeatWeekly = self.startDate.day();
                                }
                                break;
                                
                            case "monthly":
                                repeatData.repeatOccurrence="monthly";
                                repeatData.repeatMonthly=self.startDate.date();
                                repeatData.repeatInterval = parseInt(self.repeatInterval, 10);
                                break;
                                
                            case "yearly":
                                repeatData.repeatOccurrence="yearly";
                                repeatData.repeatYearly=(self.startDate.month() + 1) +"-"+ self.startDate.date();
                                repeatData.repeatInterval = parseInt(self.repeatInterval, 10);
                                break;
                        
                        }
                        
                        Repeats.updateRepeat(repeatData, self.event_id).success(function(response){
                            EventsCalendar.refreshCalendar();
                            
                        });
                    }else{
                        RepetitionUpdates.deleteExclusions(self.event_id).success(function(response){
                            Repeats.deleteRepeat(self.event_id).success(function(response){
                                EventsCalendar.refreshCalendar();
                            });
                        });
                    }
                });
                
                break;
                            
            case 'all_future':
                
                var data={};
                data.event_id= self.event_id;
                var day = self.todaysDate.clone();
                if(self.event.length_days > 0)
                {
                    var month = day.month();
                    var eventDate= self.startDate.clone();
                    var newEndDate = eventDate.month(month);
                    newEndDate = newEndDate.subtract(1, 'd');
                    data.newRepeatEndDate = newEndDate.format('YYYY-MM-DD HH:mm:ss');
                    
                }else{
                    data.newRepeatEndDate = day.clone().subtract(1, 'd').format('YYYY-MM-DD HH:mm:ss');
                }
                
                Repeats.changeEndDate(data).success(function(response){
                    
                    Events.addEvent(editData, self.event_id).success(function(response){
                        if(response.repeats == true){
                            var repeatData = {};
                            repeatData.event_id = response.id;
                        
                            if(self.repeatEndValue == "never")
                            {
                                repeatData.neverEnds = true;
                                repeatData.repeatEndDate = "";
                            }else{
                                repeatData.repeatEndDate = self.repeatEndDate.format('YYYY-MM-DD HH:mm:ss');
                                repeatData.neverEnds = false;
                            }
                        
                                
                            switch(self.repeatOccurrence){
                                    case "daily": 
                                        repeatData.repeatDaily="*";
                                        repeatData.repeatOccurrence="daily";
                                        repeatData.repeatInterval = null;
                                       
                                        break;
                                    case "weekday":
                                        repeatData.repeatWeekdays="*";
                                        repeatData.repeatOccurrence="weekday";
                                        repeatData.repeatInterval = null;
                                        break;
                                        
                                case "weekly":
                                    repeatData.repeatWeekly = "";
                                    repeatData.repeatOccurrence="weekly";
                                    repeatData.repeatInterval = parseInt(self.repeatInterval, 10) * 604800;
                                    for(var i=0; i<self.repeatWeeklyOptions.length; i++){
                                        if(self.repeatWeeklyOptions[i].selected == true){
                                            
                                          repeatData.repeatWeekly = repeatData.repeatWeekly.concat(self.repeatWeeklyOptions[i].id);
                                        }
                                    }
                                    if(repeatData.repeatWeekly == "")
                                    {
                                        repeatData.repeatWeekly = self.startDate.day();
                                    }
                                    break;
                                    
                                case "monthly":
                                    repeatData.repeatOccurrence="monthly";
                                    repeatData.repeatMonthly=self.startDate.date();
                                    repeatData.repeatInterval = parseInt(self.repeatInterval, 10);
                                    break;
                                    
                                case "yearly":
                                    repeatData.repeatOccurrence="yearly";
                                    repeatData.repeatYearly=(self.startDate.month() + 1) +"-"+ self.startDate.date();
                                    repeatData.repeatInterval = parseInt(self.repeatInterval, 10);
                                    break;
                            
                            }
                            
                            Repeats.addRepeat(repeatData).success(function(response){
                                EventsCalendar.refreshCalendar();
                            });
                        }else{
                            EventsCalendar.refreshCalendar();
                        }
                    });   
                });
                break;
        }
        self.editModal = false;
        
    };
    
    function getTimeToSend(hour, minute, meridiem)
    {
       
        if(hour == '12' && meridiem == 'am')
        {
            hour ='00';
        }
        if(meridiem =='pm' && hour != '12')
        {
            hour = parseInt(hour, 10) + 12;
        }
        return hour + ':' + minute + ':' + '00';
    }
    
    function getHour(hour, meridiem)
    {
        if(hour == '12' && meridiem == 'am')
            {
                hour ='00';
            }
            if(meridiem =='pm' && hour != '12')
            {
                hour = parseInt(hour, 10) + 12;
            }
        return hour;
    }
    
});





bmPlannerControllers.controller('mainCalViewCtrl', function($scope, $rootScope, EventsCalendar, Calendars, $timeout){
        
    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
    //     if(toState.url == '/weeklyView')
    //     {
    //         $timeout(function(){
    //             $scope.$$childHead.$$nextSibling.goToAnchor($scope.$$childHead.$$nextSibling.x);
    //         });
    //     }
        
    // });
    
    $scope.todays = moment().format('YYYY-MM-DD');
    
    $scope.today = function(){
        EventsCalendar.goToToday();
    };
    
    $scope.getStyle = function(day)
    {
        if(day < moment().subtract(1, 'd'))
        {
            return {'color':'#333333', 'opacity':'0.7'};
        }else{
            return {'color':'black'};
        }
    };
 
});


bmPlannerControllers.controller("monthlyViewCtrl", function($scope, EventsCalendar){
    
    var self= this;
    self.calendar = EventsCalendar;
    
    self.previous = function(){
        EventsCalendar.previous();
    };
    
   self.next = function(){
        EventsCalendar.next();
    };

});



bmPlannerControllers.controller("weekViewCtrl", function($scope, EventsCalendar, Calendars, $location, $anchorScroll){
    
    $scope.calendar = EventsCalendar;
    

    var time_now = moment().format('H') * 60 + parseInt(moment().format('mm'));
    var time_minutes=0;
    var id=1;
    

    $scope.next = function(){
        EventsCalendar.nextWeek();
    };
    
    $scope.previous = function(){
        EventsCalendar.previousWeek();
    };
    
    $scope.hours=[];
    $scope.hours.push({name:"12am", time_minutes: time_minutes, id:id});
    if($scope.hours[$scope.hours.length -1].time_minutes < time_now)
    {
        $scope.x = $scope.hours[$scope.hours.length -1].id;
    }
    
    for(var j=1; j<12; j++)
    {
        time_minutes = time_minutes + 60;
        id++;
        $scope.hours.push({name:j +"am", time_minutes: time_minutes, id:id});
        if($scope.hours[$scope.hours.length -1].time_minutes < time_now)
        {
            $scope.x = $scope.hours[$scope.hours.length -1].id;
        }
    }
    time_minutes = time_minutes + 60;
    id++;
    $scope.hours.push({name:"12pm" , time_minutes: time_minutes, id:id});
    if($scope.hours[$scope.hours.length -1].time_minutes < time_now)
    {
        $scope.x = $scope.hours[$scope.hours.length -1].id;
    }
    
    for(j=1; j<12; j++)
    {
        time_minutes = time_minutes + 60;
        id++;
        $scope.hours.push({name:j +"pm", time_minutes: time_minutes, id:id});
        if($scope.hours[$scope.hours.length -1].time_minutes < time_now)
        {
            $scope.x = $scope.hours[$scope.hours.length -1].id;
        }
    }
    

   $(document).ready(function (){
       $('#scrollDiv').animate({
            scrollTop: $scope.x * 60 //$('#'+newHash).parent().scrollTop() + $('#'+newHash).offset().top - $('#'+newHash).parent().offset().top
        }, 'fast');
    });
    
    //  $scope.goToAnchor = function(x){
    //     var oldHash = $location.hash();
    //     var newHash = 'anchor' + x;
        
    //     if (oldHash !== newHash) {
    //     // set the $location.hash to `newHash` and
    //     // $anchorScroll will automatically scroll to it
    //     // $location.hash('anchor' + x);

    //   } else {
              // $anchorScroll(newHash);
    //   }
    //};
    

});


bmPlannerControllers.controller("weekEventsCtrl", function($scope,  EventsCalendar, Calendars){
    
    var self=this;
    self.theCalendars = Calendars;

   self.getColor = function(calendarId)
    {
       
            var color;
            for(var i=0; i<self.theCalendars.calendars.length; i++)
            {
                if(calendarId == self.theCalendars.calendars[i].id)
                {
                    color = self.theCalendars.calendars[i].color;
                }
            }
            return color;
        
    };
    
    self.getWidth = function( hourindex, index, event)
    {
        if(event.first == true)
        {
            var width;
            var tds = $scope.day.hours[hourindex].tds;
          
            for(var i=0; i < event.rowspan; i++)
            {
                if($scope.day.hours[hourindex + i].tds > tds)
                {
                    tds = $scope.day.hours[hourindex + i].tds;
                }
            }
           
            width = (100/tds);
            if(tds == 1)
            {
                width = width - 5;
            }
            for(i=0; i<event.rowspan; i++)
            {
                for( var j =0; j< $scope.day.hours[hourindex + i].events.length; j++)
                {
                    if($scope.day.hours[hourindex + i].events[j].id == event.id)
                    {
                        $scope.day.hours[hourindex + i].events[j].width = width;
                        
                    }
                }
            }
            return  (width - 1) +'%';
        }
        else{
             return  (event.width - 1) + '%';
        }
    };
    
    
    self.getLeft = function(hourindex, index, eventindex, event)
    {
        if(eventindex == 0)
        {
            return 0;
        }
        else{
            return (eventindex * event.width) + '%';
        }
    };
});




