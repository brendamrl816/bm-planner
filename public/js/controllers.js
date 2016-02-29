'use strict'

var bmPlannerControllers = angular.module('bmPlannerControllers', []);


bmPlannerControllers.controller('styleCtrl', function(Style, $scope){
    var self = this;
    self.theStyle = Style;

    self.bodyStyle = function(){
        return {'height':'85%', 'background-color':self.theStyle.css.body_backgroundColor, 'color':self.theStyle.css.body_color,
            'font-family':self.theStyle.css.body_fontFamily};
    };
    
    self.buttonStyle = function(){
        return {'background-color':self.theStyle.css.buttons_backgroundColor, 'color':self.theStyle.css.buttons_color,
                'font-family':self.theStyle.css.buttons_fontFamily, 'font-weight':'bold', 'border':'2px solid', 'border-color':self.theStyle.css.buttons_borderColor};
    };
    
    self.modalbuttonStyle = function(){
        return {'background-color':self.theStyle.css.buttons_backgroundColor, 'color':self.theStyle.css.buttons_color,
                'font-family':self.theStyle.css.buttons_fontFamily, 'border':'1px solid', 'border-color':self.theStyle.css.buttons_borderColor};
    };
    
    self.menuModalStyle = function(){
        return {'background-color':self.theStyle.css.body_backgroundColor, 'color':self.theStyle.css.body_color, 'border':'2px solid', 'border-color':self.theStyle.css.buttons_borderColor};  
    };
    self.addModalStyle = function(){
        return {'background-color':self.theStyle.css.body_backgroundColor, 'color':self.theStyle.css.body_color, 'border':'4px solid', 'border-color':self.theStyle.css.buttons_borderColor};  
    };
    
    self.statusStyle = function(){
        return {'background-color':self.theStyle.css.buttons_backgroundColor, 'color':self.theStyle.css.body_color, 'border':'1px solid', 'border-color':self.theStyle.css.buttons_borderColor,
            'font-weight':'bold', 'font-style':'italic'};
    };
    
    self.errorStyle = function(){
        return {'color':self.theStyle.css.buttons_borderColor, 
            'font-weight':'bold', 'font-style':'oblique'};
    };
    
    self.navbarStyle = function(){
        return {'text-decoration':'none', 'color':self.theStyle.css.navBar_color, 'background-color':self.theStyle.css.navBar_backgroundColor, 'border':'2px solid', 'border-color':self.theStyle.css.navBar_borderColor, 'font-weight':'bold'};  
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
                data.body_backgroundColor = '#ffffff';
                data.body_color = '#000000';
                data.body_fontFamily = 'Arial, Helvetica, sans-serif';
                data.buttons_backgroundColor = '#f2f2f2';
                data.buttons_color = '#000000';
                data.buttons_fontFamily = 'Arial, Helvetica, sans-serif';
                data.buttons_borderColor = '#992700';
                data.navBar_backgroundColor = '#000000';
                data.navBar_color = '#ffffff';
                data.navBar_borderColor = '#992700';
                data.menuModal_backgroundColor = '#d9d9d9';
                data.addModal_backgroundColor = '#ffffe5';
                break;
            case 'theme1':
                data.theme_name = "theme1";
                data.body_backgroundColor = '#f2ffe5';
                data.body_color = '#996633';
                data.body_fontFamily = '';
                data.buttons_backgroundColor = '';
                data.buttons_color = '';
                data.buttons_fontFamily = '';
                data.buttons_borderColor = '';
                data.navBar_backgroundColor = '';
                data.navBar_color = '';
                data.navBar_borderColor = '';
                data.menuModal_backgroundColor = '';
                data.addModal_backgroundColor = '';
                break;
            case 'theme2':
                data.theme_name = "";
                data.body_backgroundColor = '';
                data.body_color = '';
                data.body_fontFamily = '';
                data.buttons_backgroundColor = '';
                data.buttons_color = '';
                data.buttons_fontFamily = '';
                data.buttons_borderColor = '';
                data.navBar_backgroundColor = '';
                data.navBar_color = '';
                data.navBar_borderColor = '';
                data.menuModal_backgroundColor = '';
                data.addModal_backgroundColor = '';
                break;
            case 'theme3':
                data.theme_name = "";
                data.body_backgroundColor = '';
                data.body_color = '';
                data.body_fontFamily = '';
                data.buttons_backgroundColor = '';
                data.buttons_color = '';
                data.buttons_fontFamily = '';
                data.buttons_borderColor = '';
                data.navBar_backgroundColor = '';
                data.navBar_color = '';
                data.navBar_borderColor = '';
                data.menuModal_backgroundColor = '';
                data.addModal_backgroundColor = '';
                break;
            case 'theme4':
                data.theme_name = "";
                data.body_backgroundColor = '';
                data.body_color = '';
                data.body_fontFamily = '';
                data.buttons_backgroundColor = '';
                data.buttons_color = '';
                data.buttons_fontFamily = '';
                data.buttons_borderColor = '';
                data.navBar_backgroundColor = '';
                data.navBar_color = '';
                data.navBar_borderColor = '';
                data.menuModal_backgroundColor = '';
                data.addModal_backgroundColor = '';
                break;
        }
        
        Style.update(data, self.id);
        $window.location.reload();
    };
   
});


bmPlannerControllers.controller('listsCtrl', function(Lists, $scope){
    $scope.lists = Lists.lists;
    var self = this;
    $scope.addListMenu = false;
    
    self.listName="";
    self.color="";

    $scope.toggleAddList = function(){
      $scope.addListMenu = !$scope.addListMenu;
    };


    $scope.cancelAdd = function(){
        $scope.addListMenu = false;
        self.listName="";
        self.color="0, 0, 102";    
        
    };
        
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
    self.currentName;
    self.currentColor;
   
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
        self.currentName = name;
        self.currentColor = color;
        self.name = self.currentName;
        self.color = self.currentColor;
    };
    
    $scope.cancel = function(){
        $scope.showMenu = false;
        self.name = self.currentName;
        self.color = self.currentColor;
    };
});


bmPlannerControllers.controller('tasksCtrl', function(Lists, $scope){
    
    $scope.hideAddButton = true;
    $scope.completed = false;
    
    $scope.add_tasks= function(listIndex, taskName){
        
        var task={};
        if(taskName == "")
        {
            taskName = "no name";
        }
        task.name=taskName;
        task.completed=$scope.completed;
        
        Lists.addTask(listIndex, task);
        
        $scope.taskName="";
        $scope.completed= false;
    };
        
        
    $scope.delete_task= function(listIndex, taskIndex, taskId){
        Lists.deleteTask(listIndex, taskIndex, taskId);
    };
    
    $scope.updateCompleted=function(listIndex, taskIndex, task){
        var theTask={};
        theTask.completed=!task.completed;
        
        Lists.updateCompleted(listIndex, taskIndex, task.id, theTask);
    };
    
    $scope.toggleCompleted = function(){
        $scope.completed= !$scope.completed;
    };
    
    $scope.completedClass=function(completed){
        if(completed==true){
            return "completedStyle";
        }
        else
            return "";
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
    self.endDate = moment().add(1, 'h');
    self.repeatEndDate = moment().add(1, 'h');
    
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
    
    
    self.toggleCreateEvent = function(){
       self.createEvent = !self.createEvent;
       if(self.createEvent == true){
           
            self.name = "";
            self.calendar_id = self.mainCalendar;
            self.startDate=moment();
            self.endDate=moment().add(1, 'h');
            self.repeatEndDate=moment().add(1, 'h');
            self.startHour = moment().format('hh');
            self.endHour = moment().add(1, 'h').format('hh');
            self.startMinutes ='00';
            self.endMinutes ='00';
            self.startMeridiem = moment().format('a');
            self.endMeridiem = moment().add(1, 'h').format('a');
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
    
    

    
    $scope.$watch('add.startDate', function(newValue, oldValue){
      $scope.add.endDate= newValue.clone();
      $scope.add.repeatEndDate = newValue.clone();
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
        
        eventToSend.startDate = self.startDate.format('YYYY-MM-DD');
        eventToSend.endDate= self.endDate.format('YYYY-MM-DD');
        
        eventToSend.eventLength = self.endDate.diff(self.startDate, 'days') + 1;
        
    
        eventToSend.startTimeDisplay = self.startHour +':'+self.startMinutes+ self.startMeridiem;
        eventToSend.endTimeDisplay = self.endHour +':' + self.endMinutes+ self.endMeridiem;
        
        eventToSend.startTime = getTimeToSend(self.startHour, self.startMinutes, self.startMeridiem);
        eventToSend.endTime = getTimeToSend(self.endHour, self.endMinutes, self.endMeridiem);
        
        
        eventToSend.repeats=self.repeats;
        eventToSend.allDay = self.allDay;
        
        //***************************************send info to backend*****************************************
        Events.addEvent(eventToSend).success(function(response){
            
            if(response.repeats==true){
                var repeatData={};
                repeatData.event_id = response.id;
            
                if(self.repeatEndValue=="never")
                {
                    repeatData.neverEnds=true;
                    repeatData.repeatEndDate=null;
                }else{
                    repeatData.repeatEndDate = self.repeatEndDate.format('YYYY-MM-DD');
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
        if(self.allDay == true){
            hour = '00';
            minute= '00';
        }
        else{
            if(hour == 12 && meridiem == 'am')
            {
                hour='00';
            }
            if(meridiem =='pm' && hour != '12')
            {
                hour = parseInt(hour, 10) + 12;
            }
        }
  
        return hour + ':' + minute + ':' + '00';
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
    
    $scope.getBorderRad = function()
    {
        if($scope.event.eventLength == 1)
        {
            return '20px';
        }else{
            return '0px';
        }
    };
    
    $scope.getLongWidth = function(){
        if($scope.event.eventLength > (7-$scope.day.itsDate.day()))
        {
            return ((100 * (7 - $scope.day.itsDate.day()))- 1) + '%';
        }
        else{
            return ((100 * $scope.event.eventLength) - 1) + '%';
        }
    };
    
    $scope.startDateDisplay = moment($scope.event.eventStartsOn).format('MMM DD, YYYY');
    $scope.endDateDisplay = moment($scope.event.eventStartsOn).add($scope.event.eventLength - 1, 'd').format('MMM DD, YYYY');
    //****************************************** MODAL VARIABLES ***************************************************************
    $scope.eventMenu = false; //Ask user if it wants to edit or delete
    $scope.verifyDeletion = false; //Ask user if they really want to delete event
    $scope.verificationQuestion;
    $scope.verificationAnswer;
    $scope.eventsRepQuestion = false; //If event repeats, ask user if they want to delete only this ocurrence or all repetitions
    $scope.kindOfEdition = false;//If event repeats, ask user if they want to edit all event occurrances or just this one
   
    $scope.toggleEventMenu = function(){
        $scope.eventMenu = !$scope.eventMenu;
        $scope.startDateDisplay = moment($scope.event.eventStartsOn).format('MMM DD, YYYY');
        $scope.endDateDisplay = moment($scope.event.eventStartsOn).add($scope.event.eventLength - 1, 'd').format('MMM DD, YYYY');
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
                
                        if($scope.event.eventLength > 1)
                        {
                            var month = day.month();
                            var eventStartsOn = moment($scope.event.eventStartsOn);
                            var dateUpdate = eventStartsOn.month(month);
                            data.dateOfChange = dateUpdate.format('YYYY-MM-DD');
                            
                        }else{
                            data.dateOfChange = day.format('YYYY-MM-DD');
                        }
        
                        RepetitionUpdates.saveEventToChange(data).success(function(response){
                            
                            EventsCalendar.refreshCalendar();
                        });
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
        $scope.startDateDisplay = moment($scope.event.startDate).format('MMM DD, YYYY');
        $scope.endDateDisplay = moment($scope.event.endDate).format('MMM DD, YYYY');
        if($scope.event.neverEnds == false)
        {
            $scope.repeatEndDateDisplay =  moment($scope.event.repeatEndDate).format('MMM DD, YYYY');
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
        $scope.startDateDisplay = moment($scope.event.eventStartsOn).format('MMM DD, YYYY');
        $scope.endDateDisplay = moment($scope.event.eventStartsOn).add($scope.event.eventLength - 1, 'd').format('MMM DD, YYYY');
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
    self.endDate = moment();
    self.repeatEndDate = moment();
    self.startHour = moment().format('hh');
    self.endHour = moment().add(1, 'h').format('hh');
    self.startMinutes ='00';
    self.endMinutes ='00';
    self.startMeridiem = moment().format('a');
    self.endMeridiem = moment().add(1, 'h').format('a');
    self.allDay=false;
    self.repeats=false;
    self.repeatOccurrence="";
    self.repeatEndValue="never";
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
    
        if(self.validateStartTime > self.validateRepeatDate)
        {
            self.repeatEndDate = self.startDate.clone();
        }
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
            
            self.startDate = moment(event.startDate);
            self.endDate = moment(event.endDate);
            self.repeatEndDate = moment(event.startDate);
            self.allDay = event.allDay;
            var startTime = moment(self.startDate.format('YYYY-MM-DD') + " " + event.startTime);
            var endTime = moment(self.endDate.format('YYYY-MM-DD') + " " + event.endTime);
            self.startHour = startTime.format('hh');
            self.endHour = endTime.format('hh');
            self.startMinutes = startTime.format('mm');
            self.endMinutes = endTime.format('mm');
            self.startMeridiem = startTime.format('a');
            self.endMeridiem = endTime.format('a');
            self.repeats = event.repeats;
            self.repeatInterval ="1";
            self.repeatOccurrence = "";
            self.repeatsWeeklyMenu = false;
            for( i=0; i<self.repeatWeeklyOptions.length; i++){
                self.repeatWeeklyOptions[i].selected = false;
            }
            
            if(event.repeats == true)
            {
                if(event.neverEnds == false)
                {
                    self.repeatEndDate = moment(event.repeatEndDate);
                    self.repeatEndValue = "date";
                }else
                {
                    self.repeatEndValue = "never";
                    self.repeatEndDate = self.startDate.clone();
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
                
            }
            
            switch (self.editionType) {
                case 'only_this':
                        self.startDate = self.todaysDate.clone();
                        self.endDate = self.startDate.clone().add(event.eventLength -1, 'd');
                        self.repeats = false;
                        self.repeatEndDate = self.todaysDate.clone();
                        self.repeatOccurrence = "";
                        self.repeatInterval ="1";
                        self.repeatEndValue = "never";
                    break;
                    
                
                case 'all_future':
                        self.startDate = self.todaysDate.clone();
                        self.endDate = self.startDate.clone().add(event.eventLength -1, 'd');
                        if(self.repeatEndValue=="never")
                        {
                            self.repeatEndDate = self.startDate.clone();
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
        editData.startDate=self.startDate.format('YYYY-MM-DD');
        editData.endDate= self.endDate.format('YYYY-MM-DD');
        editData.eventLength= self.endDate.diff(self.startDate, 'days')+1;
        editData.startTimeDisplay = self.startHour +':'+self.startMinutes+ self.startMeridiem;
        editData.endTimeDisplay = self.endHour +':' + self.endMinutes+ self.endMeridiem;
        editData.startTime = getTimeToSend(self.startHour, self.startMinutes, self.startMeridiem);
        editData.endTime = getTimeToSend(self.endHour, self.endMinutes, self.endMeridiem);
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
                            repeatData.repeatEndDate = self.repeatEndDate.format('YYYY-MM-DD');
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
                if(self.event.eventLength > 1)
                {
                    var month = day.month();
                    var eventDate = moment(self.startDate);
                    var dateUpdate = eventDate.month(month);
                    data.dateOfChange = dateUpdate.format('YYYY-MM-DD');
                    
                }else{
                    data.dateOfChange = day.format('YYYY-MM-DD');
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
                                repeatData.repeatEndDate = self.repeatEndDate.format('YYYY-MM-DD');
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
                            repeatData.repeatEndDate = self.repeatEndDate.format('YYYY-MM-DD');
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
                if(self.event.eventLength > 1)
                {
                    var month = day.month();
                    var eventDate= self.startDate.clone();
                    var newEndDate = eventDate.month(month);
                    newEndDate = newEndDate.subtract(1, 'd');
                    data.newRepeatEndDate = newEndDate.format('YYYY-MM-DD');
                    
                }else{
                    data.newRepeatEndDate = day.clone().subtract(1, 'd').format('YYYY-MM-DD');
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
                                repeatData.repeatEndDate = self.repeatEndDate.format('YYYY-MM-DD');
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
        if(self.allDay ==true){
            hour = '00';
            minute= '00';
        }
        else{
            if(hour==12 && meridiem =='am')
            {
                hour='00';
            }
            if(meridiem =='pm' && hour!=12)
            {
                hour = parseInt(hour, 10) + 12;
            }
        }
  
        return hour + ':' + minute + ':' + '00';
    }
    
});





bmPlannerControllers.controller('mainCalViewCtrl', function($scope, EventsCalendar, $timeout){
    $scope.monthlyView = true;
    $scope.weeklyView = false;
    
    $scope.selectMonthly = function(){
        $scope.monthlyView = true;
        $scope.weeklyView = false;
    };
    $scope.selectWeekly = function(){
        $scope.monthlyView = false;
        $scope.weeklyView = true;
        
        
        $timeout(function(){
            $scope.$$childHead.$$nextSibling.goToAnchor($scope.$$childHead.$$nextSibling.x);
        });
        
    };
    
    $scope.today = function(){
        EventsCalendar.goToToday();
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
    
    
    //setting the calendar to display at the time that it is now
     $scope.goToAnchor = function(x){
        var newHash = 'anchor' + x;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash('anchor' + x);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };
    

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
    
    self.getWidth = function( hourindex, event)
    {
       
        if(event.first == true)
        {
            var width;
            var tds = $scope.day.hours[hourindex].tds;
          
            for(var i=0; i<event.rowspan; i++)
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
            return  (width -1) +'%';
        }
        else{
             return  (event.width -1) + '%';
        }
    };
    
    
    self.getLeft = function(eventindex, event)
    {
        if(eventindex == 0)
        {
            return 0;
        }
        else{
            return ( (event.width * eventindex)) + '%';
        }
    };
});












