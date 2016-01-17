'use strict'

var bmPlannerControllers = angular.module('bmPlannerControllers', []);


bmPlannerControllers.controller('listsCtrl', function(Lists, $scope){
    $scope.lists = Lists.lists;
    
    $scope.addListMenu = false;
    $scope.listName="";
    
    $scope.color="#000000";

    $scope.toggleAddList = function(event){
      $scope.addListMenu = !$scope.addListMenu;
      event.stopPropagation();
    };

    
    window.addEventListener('click', function() {
        if ($scope.addListMenu == true) {
            $scope.addListMenu = false;
            $scope.listName="";
            $scope.color="#000000";
        // You should let angular know about the update
        //so that it can refresh the UI
            $scope.$apply();
        }
      
    });
    

    $scope.cancelAdd = function(){
        $scope.addListMenu = false;
        $scope.listName="";
        $scope.color="#000000";    
        
    };
        
    $scope.add_list= function(){
        var data={};
        data.name=$scope.listName;
        data.color=$scope.color;
        Lists.addList(data);
        $scope.listName="";
        $scope.color="#000000";
        $scope.addListMenu = false;
    };
    
    
    
});

bmPlannerControllers.controller('listMenuCtrl', function(Lists, $scope){
    var self= this;
    
    self.showMenu = false;
    
    self.name = $scope.list.name;
    self.color = $scope.list.color;
    
    self.toggleMenu = function(event){
      self.showMenu = !self.showMenu;
      event.stopPropagation();
    };
    
    self.delete_list= function(listIndex){
        //delete the list
        Lists.deleteList(listIndex);
    };
    
     self.update = function(listIndex){
        var data={};
        data.name =self.name;
        data.color = self.color;
        
        Lists.updateList(data, listIndex);
        
        self.showMenu = false;
        self.name = $scope.list.name;
        self.color = $scope.list.color;
    };
    
    self.cancel = function(){
        self.showMenu = false;
        self.name = $scope.list.name;
        self.color = $scope.list.color;
    };
    
    window.addEventListener('click', function() {
        if (self.showMenu == true) {
            self.showMenu = false;
            self.name = $scope.list.name;
            self.color = $scope.list.color;
        // You should let angular know about the update
        //so that it can refresh the UI
            $scope.$apply();
        }
      
    });
    
    
});


bmPlannerControllers.controller('tasksCtrl', function(Lists, $scope){
    
    $scope.hideAddButton = true;
    $scope.completed = false;
    
    $scope.add_tasks= function(listIndex, taskName){
        
        var task={};
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
        
        $scope.addCalMenu = false;
        $scope.name="";
        $scope.color="#000000";

        $scope.toggleAddCalendar = function(event){
          $scope.addCalMenu = !$scope.addCalMenu;
          event.stopPropagation();
        };
   
        
        window.addEventListener('click', function() {
            if ($scope.addCalMenu == true) {
                $scope.addCalMenu = false;
                $scope.name="";
                $scope.color="#000000";
            // You should let angular know about the update
            //so that it can refresh the UI
                $scope.$apply();
            }
          
        });
        
        
        
        $scope.add = function(){
            var data = {};
            data.name= $scope.name;
            data.color=$scope.color;
            
            Calendars.addCalendar(data);
            $scope.name="";
            $scope.color="#000000";
            $scope.addCalMenu = false;
        };
        
        $scope.cancelAdd = function(){
            $scope.addCalMenu = false;
            $scope.name="";
            $scope.color="#000000";    
            
        };
        
      
});



bmPlannerControllers.controller("calendarMenuCtrl", function(Calendars, EventsCalendar, Events, $scope){
    
    $scope.showVerifyDeletion = false;
    $scope.showCalendarMenu = false;

    
    $scope.ToggleshowCalendarMenu = function(event){
        $scope.nameToUpdate = $scope.calendar.name;
        $scope.colorToUpdate = $scope.calendar.color;
        $scope.showCalendarMenu = !$scope.showCalendarMenu;
        event.stopPropagation();
    };
       
    
    window.addEventListener('click', function() {
        if($scope.showCalendarMenu==true)
        {
            $scope.showCalendarMenu = false;
            $scope.nameToUpdate = $scope.calendar.name;
            $scope.colorToUpdate = $scope.calendar.color;
            $scope.$apply();
        }
    });
    
    
    $scope.update = function(id, name, color, index) {
        var data={};
        data.name= name;
        data.color=color;
        Calendars.updateCalendar(data, id, index);
        $scope.nameToUpdate = $scope.calendar.name;
        $scope.colorToUpdate = $scope.calendar.color;
        $scope.showCalendarMenu = false;

    };
    
    $scope.cancelUpdate = function() {
        $scope.showCalendarMenu = false;
        $scope.nameToUpdate = $scope.calendar.name;
        $scope.colorToUpdate = $scope.calendar.color;
    };   
        
    $scope.delete = function(){
            $scope.showCalendarMenu= false;
            $scope.verifyDeletion = true;
    };
        
    $scope.yesDelete = function(id, index){
        
        Events.deleteCalendarEvents(id).success(function(response){
            Calendars.deleteCalendar(id, index);
            EventsCalendar.refreshCalendar();
        });
    };
    
    $scope.noDelete = function(){
        $scope.verifyDeletion= false;
        $scope.showCalendarMenu = true;
    };
   
});
  

bmPlannerControllers.controller('addEventCtrl', function($scope, EventsCalendar, Calendars, Events, Repeats){

    var self = this;
    self.templateurl = '/html/addEventTemplate.html';
    self.createEvent = false;
    
    self.name = "";
    self.startDate = moment();
    self.endDate = moment();
    self.repeatEndDate = moment();
    
    self.startHour = moment().format('hh');
    self.endHour = moment().add(1, 'h').format('hh');
    self.startMinutes ='0';
    self.endMinutes ='0';
    self.startMeridiem = moment().format('a');
    self.endMeridiem = moment().add(1, 'h').format('a');
    
    self.allDay=false;
    self.repeats=false;
    self.repeatOccurrence="";
    self.repeatEndValue="";
    self.repeatsWeeklyMenu=false;
    
    
    self.repeatWeeklyOptions=[];
    self.repeatWeeklyOptions[0]= {id:11, name: 'Sun', selected: false};
    self.repeatWeeklyOptions[1]= {id:12, name: 'Mon', selected: false};
    self.repeatWeeklyOptions[2]= {id:13, name: 'Tue', selected: false};
    self.repeatWeeklyOptions[3]= {id:14, name: 'Wed', selected: false};
    self.repeatWeeklyOptions[4]= {id:15, name: 'Thu', selected: false};
    self.repeatWeeklyOptions[5]= {id:16, name: 'Fri', selected: false};
    self.repeatWeeklyOptions[6]= {id:17, name: 'Sat', selected: false};

    
    self.toggleCreateEvent = function(){
       self.createEvent = !self.createEvent;
       if(self.createEvent== true){
           self.theCalendars = Calendars;
            
            self.name = "";
            self.calendarId ="1"; //fix it to have the value of the main calendar. 
            self.startDate=moment();
            self.endDate=moment();
            self.repeatEndDate=moment();
            self.startHour = moment().format('hh');
            self.endHour = moment().add(1, 'h').format('hh');
            self.startMinutes ='00';
            self.endMinutes ='00';
            self.startMeridiem = moment().format('a');
            self.endMeridiem = moment().add(1, 'h').format('a');
            self.allDay=false;
            self.repeats=false;
            self.repeatOccurrence="";
            self.repeatEndValue="";
            self.repeatsWeeklyMenu=false;
            
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
    

    
    self.toggleAllDay=function(){
        self.allDay=!self.allDay;
    };
    
    self.toggleRepeats=function(){
        self.repeats=!self.repeats;
    };
    
    self.changeRepeatOptions=function(repeatOccurrence){
        if(repeatOccurrence=="weekly"){
            self.repeatsWeeklyMenu=true;
        }else{
            self.repeatsWeeklyMenu=false;
        }
    };
    
    self.addEvent=function(){
    
    //*******************************SET INFO TO BE SENT TO BACKEND*******************************************************
        var eventToSend={};
        eventToSend.name = self.name;
        
        eventToSend.calendarId = self.calendarId;
        
        eventToSend.startDate = self.startDate.format('YYYY-MM-DD');
        eventToSend.endDate= self.endDate.format('YYYY-MM-DD');
        
        eventToSend.eventLength= self.endDate.diff(self.startDate, 'days') + 1;
        
    
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
                repeatData.eventId=response.eventId;
            
                if(self.repeatEndValue=="never")
                {
                    repeatData.neverEnds=true;
                    repeatData.endRepetitionDate=null;
                }else{
                    repeatData.endRepetitionDate = self.repeatEndDate.format('YYYY-MM-DD');
                    repeatData.neverEnds=false;
                }
            
                    
                    switch(self.repeatOccurrence){
                        case "daily": 
                            repeatData.repeatDaily="*";
                            repeatData.repeatOccurrence="daily";
                           
                            break;
                        case "weekday":
                            repeatData.repeatWeekdays="*";
                            repeatData.repeatOccurrence="weekday";
                            break;
                            
                    case "weekly":
                        repeatData.repeatWeekly= 1;
                        repeatData.repeatOccurrence="weekly";
                        for(var i=0; i<self.repeatWeeklyOptions.length; i++){
                            if(self.repeatWeeklyOptions[i].selected == true){
                                
                               repeatData.repeatWeekly= (repeatData.repeatWeekly) * (self.repeatWeeklyOptions[i].id);
                            }
                        }
                        break;
                        
                    case "monthly":
                        repeatData.repeatOccurrence="monthly";
                        repeatData.repeatMonthly=self.startDate.date();
                        break;
                        
                    case "yearly":
                        repeatData.repeatOccurrence="yearly";
                        repeatData.repeatYearly=(self.startDate.month() + 1) +"-"+ self.startDate.date();
                        break;
                
                }

                Repeats.addRepeat(repeatData).success(function(response){
                    
                });
            
            }
            
            EventsCalendar.refreshCalendar();
            self.createEvent = false;
                
        });
        
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



bmPlannerControllers.controller('eventCtrl', function($scope, $location, EventsCalendar, Repeats, Events, RepetitionUpdates){
    
    $scope.showTime = true;
    var day;
     $scope.eventStyle=function(event, d){
         
         day = d.format('YYYY-MM-DD');
        
        if(event.eventLength >1  && event.startDay == day && event.allDay == false){
            $scope.showTime= true;
            return "allDayStyle";
        }
        if(event.eventLength > 1  && event.startDay != day){
            $scope.showTime = false;
            return "allDayStyle";
        }
        if(event.allDay == true)
        {
            $scope.showTime = false;
            return "allDayStyle";
        }
        if(event.allDay == false){
            return "notAllDayStyle";
        }
    };
    
    
    
    $scope.eventMenu = false; //Ask user if it wants to edit or delete
    $scope.verifyDeletion = false; //Ask user if user is really sure to delete event
    $scope.eventsRepQuestion = false; //If event repeats, ask user if it wants to delete only this ocurrence or all repetitions
    $scope.kindOfEdition = false;
    
    $scope.toggleEventMenu = function(){
         $scope.eventMenu = !$scope.eventMenu;
    };
    
    $scope.toggleVerifyDelition = function(){
        $scope.verifyDeletion = !$scope.verifyDeletion;
    };
    
    $scope.toggleEventsRepQuestion = function(){
        $scope.eventsRepQuestion = !$scope.eventsRepQuestion;
        
    };
    
    $scope.toggleKindOfEdition = function(){
        $scope.kindOfEdition = !$scope.kindOfEdition;
        
    };
    
    
    $scope.deleteEvent = function(eventRepeats){
        $scope.eventMenu = false; //Ask user if it wants to edit or delete
        $scope.verifyDeletion = false; //Ask user if user is really sure to delete event
        $scope.eventsRepQuestion = false; //If event repeats, ask user if it wants to delete only this ocurrence or all repetitions
        $scope.kindOfEdition = false;
        
        if(eventRepeats == true)
        {
            $scope.eventsRepQuestion = true;
        }else{
            $scope.verifyDeletion = true;
        }

    };
    
    $scope.noDeleteEvent = function(){
        $scope.eventMenu = true; //Ask user if it wants to edit or delete
        $scope.verifyDeletion = false; //Ask user if user is really sure to delete event
        $scope.eventsRepQuestion = false; //If event repeats, ask user if it wants to delete only this ocurrence or all repetitions
        $scope.kindOfEdition = false;
    };
    
    $scope.yesDeleteEvent = function(eventId){
        Events.deleteEvent(eventId).success(function(response){
            EventsCalendar.refreshCalendar();
            $scope.eventMenu = false; //Ask user if it wants to edit or delete
            $scope.verifyDeletion = false; //Ask user if user is really sure to delete event
            $scope.eventsRepQuestion = false; //If event repeats, ask user if it wants to delete only this ocurrence or all repetitions
            $scope.kindOfEdition = false;
        });
    };
    
    $scope.deleteAllOcurrences = function(eventId){
        
        RepetitionUpdates.deleteUpdatedEvent(eventId).success(function(response){
           Repeats.deleteRepeat(eventId).success(function(response){
                 Events.deleteEvent(eventId).success(function(response){
                    EventsCalendar.refreshCalendar();
                    $scope.eventMenu = false; //Ask user if it wants to edit or delete
                    $scope.verifyDeletion = false; //Ask user if user is really sure to delete event
                    $scope.eventsRepQuestion = false; //If event repeats, ask user if it wants to delete only this ocurrence or all repetitions
                    $scope.kindOfEdition = false;
                });
            });
        });
        
    };
    
    $scope.deleteOnlyThisOcurrance = function(eventId, eventLength, dateOfEvent, day){
        
        var data={};
        data.event_id = eventId;
        
        if(eventLength>1)
        {
            var month = day.month();
            var eventDate= moment(dateOfEvent);
   
            var dateUpdate = eventDate.month(month);
            
            data.dateOfChange = dateUpdate.format('YYYY-MM-DD');
            
        }else{
            data.dateOfChange = day.format('YYYY-MM-DD');
        }

        
        RepetitionUpdates.saveEventToChange(data).success(function(response){
            EventsCalendar.refreshCalendar();
            $scope.eventMenu = false; //Ask user if it wants to edit or delete
            $scope.verifyDeletion = false; //Ask user if user is really sure to delete event
            $scope.eventsRepQuestion = false; //If event repeats, ask user if it wants to delete only this ocurrence or all repetitions
            $scope.kindOfEdition = false; 
        });

    };
    
    $scope.editEvent = function(event, day){
        if(event.repeats == true)
        {
            $scope.eventMenu = false; //Ask user if it wants to edit or delete
            $scope.verifyDeletion = false; //Ask user if user is really sure to delete event
            $scope.eventsRepQuestion = false; //If event repeats, ask user if it wants to delete only this ocurrence or all repetitions
            $scope.kindOfEdition = true;
        }
        else{
            var editionType = null;
            EventsCalendar.editEventInfo(event, day, editionType);
            $location.path('editEvent');
        }
        
    };
    
    $scope.editThisEvent = function(event, day){
        var editionType = "onlyThisEvent";
        EventsCalendar.editEventInfo(event, day, editionType);
        $scope.eventMenu = false; //Ask user if it wants to edit or delete
            $scope.verifyDeletion = false; //Ask user if user is really sure to delete event
            $scope.eventsRepQuestion = false; //If event repeats, ask user if it wants to delete only this ocurrence or all repetitions
            $scope.kindOfEdition = true;
        $location.path('editEvent');
    };
    
     $scope.editAllEvents = function(event, day){
        var editionType = 'allEvents';
        EventsCalendar.editEventInfo(event, day, editionType);
        $scope.eventMenu = false; //Ask user if it wants to edit or delete
            $scope.verifyDeletion = false; //Ask user if user is really sure to delete event
            $scope.eventsRepQuestion = false; //If event repeats, ask user if it wants to delete only this ocurrence or all repetitions
            $scope.kindOfEdition = true;
        $location.path('editEvent');
    };
    
     $scope.editFutureEvents = function(event, day){
        var editionType = 'futureEvents';
        EventsCalendar.editEventInfo(event, day, editionType);
        $scope.eventMenu = false; //Ask user if it wants to edit or delete
            $scope.verifyDeletion = false; //Ask user if user is really sure to delete event
            $scope.eventsRepQuestion = false; //If event repeats, ask user if it wants to delete only this ocurrence or all repetitions
            $scope.kindOfEdition = true;
        $location.path('editEvent');
    };
    
    
});



bmPlannerControllers.controller('editEventCtrl', function($scope, $location, EventsCalendar, Repeats, Events, RepetitionUpdates, Calendars){
    
    var self= this;
    var event= EventsCalendar.event2update;
    var day = EventsCalendar.dayOfUpdate;
    
    self.name = event.name;
    self.theCalendars = [];
    
    console.log(event);
    
    for(var x=0; x<Calendars.calendars.length; x++)
    {
        
      self.theCalendars.push({name:Calendars.calendars[x].name, id: Calendars.calendars[x].id});
      
      if(Calendars.calendars[x].id == event.calendarId)
        {
            self.calendarId = self.theCalendars[x];
        }
    }
    
    
    self.repeats=event.repeats;
    
    self.repeatsWeeklyMenu=false;
    self.repeatWeeklyOptions=[];
    self.repeatWeeklyOptions[0]= {id:11, name: 'Sun', selected: false};
    self.repeatWeeklyOptions[1]= {id:12, name: 'Mon', selected: false};
    self.repeatWeeklyOptions[2]= {id:13, name: 'Tue', selected: false};
    self.repeatWeeklyOptions[3]= {id:14, name: 'Wed', selected: false};
    self.repeatWeeklyOptions[4]= {id:15, name: 'Thu', selected: false};
    self.repeatWeeklyOptions[5]= {id:16, name: 'Fri', selected: false};
    self.repeatWeeklyOptions[6]= {id:17, name: 'Sat', selected: false};


    switch(event.repeatOccurrence){
        case "daily": 
                self.repeatOccurrence = "daily";
                break;
                
        case "weekday":
                self.repeatOccurrence = "weekday";
                break;
                
        case "weekly":
           self.repeatOccurrence = "weekly";
           self.repeatsWeekly=true;
           for(var i=0; i<self.repeatWeeklyOptions.length; i++){
                if(event.repeatWeekly % self.repeatWeeklyOptions[i].id == 0){
                    self.repeatWeeklyOptions[i].selected = true;
                }
            }
            break;
            
        case "monthly":
            self.repeatOccurrence = "monthly";
            break;
            
        case "yearly":
            self.repeatOccurrence = "yearly";
            break;
            
    }
    
    if(event.repeats == 0)
    {
        self.startDate = day;
        self.endDate = self.startDate.clone();
        self.repeatEndDate = self.startDate.clone();
        
        self.repeatOccurrence = "";
        self.repeatEndValue = "never";
    }else{
        
        switch(event.editionType){
            case "onlyThisEvent":
                if(event.eventLength == 1)
                {
                    self.startDate= day;
                }
                else{
                    self.startDate= moment(event.startDay);
                }
                
                self.endDate=self.startDate.clone().add(event.eventLength -1, 'd');
                self.repeatEndDate = self.endDate.clone();
                
                self.repeats = false;
                self.repeatOccurrence = "";
                self.repeatEndValue = "never";
                
                break;
                
            case "allEvents":
                self.startDate= moment(event.startDate);
                self.endDate = moment(event.endDate);
                self.repeatEndDate = moment(event.endRepetitionDate);
                
                if(event.neverEnds==false)
                {
                    self.repeatEndValue=self.repeatEndDate;
                }else
                {
                     self.repeatEndValue="never";
                }
                break;
            
            case  "futureEvents":
                
                if(event.eventLength == 1)
                {
                    self.startDate= day;
                }
                else{
                    self.startDate= moment(event.startDay);
                }
                
                self.endDate=self.startDate.clone().add(event.eventLength -1, 'd');
                self.repeatEndDate = moment(event.endRepetitionDate);
                
                if(event.neverEnds==false)
                {
                    self.repeatEndValue=self.repeatEndDate;
                }else
                {
                     self.repeatEndValue="never";
                }
                
                break;
                
        }
       
    }
    
   
    var startTime = moment(self.startDate.format('YYYY-MM-DD') + " " + event.startTime);
    var endTime = moment(self.endDate.format('YYYY-MM-DD') + " " + event.endTime);
    self.allDay= event.allDay;

    self.startHour = startTime.format('hh');
    self.endHour = endTime.format('hh');
    self.startMinutes = startTime.format('mm');
    self.endMinutes = endTime.format('mm');
    self.startMeridiem = startTime.format('a');
    self.endMeridiem = endTime.format('a');
    
    
    
            
    
    self.toggleAllDay=function(){
        self.allDay=!self.allDay;
    };
    
    self.toggleRepeats=function(){
        self.repeats=!self.repeats;
    };
    
    self.changeRepeatOptions=function(repeatOccurrence){
        if(repeatOccurrence=="weekly"){
            self.repeatsWeeklyMenu=true;
        }else{
            self.repeatsWeeklyMenu=false;
        }
    };
    
    
    self.updateEvent = function(){
        
        if(event.repeats == false)
        {
            var eventToSend={};
                eventToSend.name= self.name;
                eventToSend.calendarId = self.calendarId.id;
                eventToSend.startDate=self.startDate.format('YYYY-MM-DD');
                eventToSend.endDate= self.endDate.format('YYYY-MM-DD');
                eventToSend.eventLength= self.endDate.diff(self.startDate, 'days')+1;
                
                eventToSend.startTimeDisplay = self.startHour +':'+self.startMinutes+ self.startMeridiem;
                eventToSend.endTimeDisplay = self.endHour +':' + self.endMinutes+ self.endMeridiem;
                
                eventToSend.startTime = getTimeToSend(self.startHour, self.startMinutes, self.startMeridiem);
                eventToSend.endTime = getTimeToSend(self.endHour, self.endMinutes, self.endMeridiem);
                
        
                eventToSend.repeats=self.repeats;
                eventToSend.allDay = self.allDay;
                
                Events.updateEvent(eventToSend, event.id).success(function(response){
                   if(response.repeats==true){
                        var repeatData={};
                        repeatData.eventId=response.id;
                    
                        if(self.repeatEndValue=="never")
                        {
                            repeatData.neverEnds=true;
                            repeatData.endRepetitionDate="";
                        }else{
                            repeatData.endRepetitionDate = self.repeatEndDate.format('YYYY-MM-DD');
                            repeatData.neverEnds=false;
                        }
                    
                            
                        switch(self.repeatOccurrence){
                                case "daily": 
                                    repeatData.repeatDaily="*";
                                    repeatData.repeatOccurrence="daily";
                                   
                                    break;
                                case "weekday":
                                    repeatData.repeatWeekdays="*";
                                    repeatData.repeatOccurrence="weekday";
                                    break;
                                    
                            case "weekly":
                                repeatData.repeatWeekly= 1;
                                repeatData.repeatOccurrence="weekly";
                                for(var i=0; i<self.repeatWeeklyOptions.length; i++){
                                    if(self.repeatWeeklyOptions[i].selected == true){
                                        
                                       repeatData.repeatWeekly= (repeatData.repeatWeekly) * (self.repeatWeeklyOptions[i].id);
                                    }
                                }
                                break;
                                
                            case "monthly":
                                repeatData.repeatOccurrence="monthly";
                                repeatData.repeatMonthly=self.startDate.date();
                                break;
                                
                            case "yearly":
                                repeatData.repeatOccurrence="yearly";
                                repeatData.repeatYearly=(self.startDate.month() + 1) +"-"+ self.startDate.date();
                                break;
                        
                        }
                        Repeats.addRepeat(repeatData).success(function(response){
                        });
                    }
                    
                      $location.path('/');
                      EventsCalendar.refreshCalendar();
                });
            
 
        }else{
            
            switch(event.editionType){
                case 'onlyThisEvent':
                    
                    var data={};
                    data.event_id = event.id;
                    
                    if(event.eventLength>1)
                    {
                        var month = day.month();
                        var eventDate= moment(self.startDate);
               
                        var dateUpdate = eventDate.month(month);
                        
                        data.dateOfChange = dateUpdate.format('YYYY-MM-DD');
                        
                    }else{
                        data.dateOfChange = day.format('YYYY-MM-DD');
                    }
            
                    
                    RepetitionUpdates.saveEventToChange(data).success(function(response){
                        var eventToSend={};
                        eventToSend.name= self.name;
                        eventToSend.calendarId = self.calendarId.id;
                        eventToSend.startDate=self.startDate.format('YYYY-MM-DD');
                        eventToSend.endDate= self.endDate.format('YYYY-MM-DD');
                        eventToSend.eventLength= self.endDate.diff(self.startDate, 'days')+1;
                        
                        eventToSend.startTimeDisplay = self.startHour +':'+self.startMinutes+ self.startMeridiem;
                        eventToSend.endTimeDisplay = self.endHour +':' + self.endMinutes+ self.endMeridiem;
                        
                        eventToSend.startTime = getTimeToSend(self.startHour, self.startMinutes, self.startMeridiem);
                        eventToSend.endTime = getTimeToSend(self.endHour, self.endMinutes, self.endMeridiem);
                        
                        
                        eventToSend.repeats=false;
                        eventToSend.allDay = self.allDay;
                        
                        Events.addEvent(eventToSend).success(function(response){
                            if(response.repeats==true){
                                var repeatData={};
                                repeatData.eventId=response.eventId;
                            
                                if(self.repeatEndValue=="never")
                                {
                                    repeatData.neverEnds=true;
                                    repeatData.endRepetitionDate="";
                                }else{
                                    repeatData.endRepetitionDate = self.repeatEndDate.format('YYYY-MM-DD');
                                    repeatData.neverEnds=false;
                                }
                            
                                    
                                switch(self.repeatOccurrence){
                                        case "daily": 
                                            repeatData.repeatDaily="*";
                                            repeatData.repeatOccurrence="daily";
                                           
                                            break;
                                        case "weekday":
                                            repeatData.repeatWeekdays="*";
                                            repeatData.repeatOccurrence="weekday";
                                            break;
                                            
                                    case "weekly":
                                        repeatData.repeatWeekly= 1;
                                        repeatData.repeatOccurrence="weekly";
                                        for(var i=0; i<self.repeatWeeklyOptions.length; i++){
                                            if(self.repeatWeeklyOptions[i].selected == true){
                                                
                                               repeatData.repeatWeekly= (repeatData.repeatWeekly) * (self.repeatWeeklyOptions[i].id);
                                            }
                                        }
                                        break;
                                        
                                    case "monthly":
                                        repeatData.repeatOccurrence="monthly";
                                        repeatData.repeatMonthly=self.startDate.date();
                                        break;
                                        
                                    case "yearly":
                                        repeatData.repeatOccurrence="yearly";
                                        repeatData.repeatYearly=(self.startDate.month() + 1) +"-"+ self.startDate.date();
                                        break;
                                
                                }
                            
                            }
                        });
                        
                        $location.path('/');
                        EventsCalendar.refreshCalendar();
                    });

                    break;
                    
                case 'allEvents':
                    
                    var eventToSend={};
                    eventToSend.name= self.name;
                    eventToSend.calendarId = self.calendarId.id;
                    eventToSend.startDate=event.startDate;
                    eventToSend.endDate= event.endDate;
                    eventToSend.eventLength= self.endDate.diff(self.startDate, 'days')+1;
                    
                    eventToSend.startTimeDisplay = self.startHour +':'+self.startMinutes+ self.startMeridiem;
                    eventToSend.endTimeDisplay = self.endHour +':' + self.endMinutes+ self.endMeridiem;
                    
                    eventToSend.startTime = getTimeToSend(self.startHour, self.startMinutes, self.startMeridiem);
                    eventToSend.endTime = getTimeToSend(self.endHour, self.endMinutes, self.endMeridiem);
                    
                    
                    eventToSend.repeats=self.repeats;
                    eventToSend.allDay = self.allDay;
                        
                    Events.updateEvent(eventToSend, event.id).success(function(response){
                       
                        if(response.repeats==true){
                            var repeatData={};
                            repeatData.eventId=response.eventId;
                        
                            if(self.repeatEndValue=="never")
                            {
                                repeatData.neverEnds=true;
                                repeatData.endRepetitionDate="";
                            }else{
                                repeatData.endRepetitionDate = self.repeatEndDate.format('YYYY-MM-DD');
                                repeatData.neverEnds=false;
                            }
                        
                                
                            switch(self.repeatOccurrence){
                                    case "daily": 
                                        repeatData.repeatDaily="*";
                                        repeatData.repeatOccurrence="daily";
                                       
                                        break;
                                    case "weekday":
                                        repeatData.repeatWeekdays="*";
                                        repeatData.repeatOccurrence="weekday";
                                        break;
                                        
                                case "weekly":
                                    repeatData.repeatWeekly= 1;
                                    repeatData.repeatOccurrence="weekly";
                                    for(var i=0; i<self.repeatWeeklyOptions.length; i++){
                                        if(self.repeatWeeklyOptions[i].selected == true){
                                            
                                           repeatData.repeatWeekly= (repeatData.repeatWeekly) * (self.repeatWeeklyOptions[i].id);
                                        }
                                    }
                                    break;
                                    
                                case "monthly":
                                    repeatData.repeatOccurrence="monthly";
                                    repeatData.repeatMonthly=self.startDate.date();
                                    break;
                                    
                                case "yearly":
                                    repeatData.repeatOccurrence="yearly";
                                    repeatData.repeatYearly=(self.startDate.month() + 1) +"-"+ self.startDate.date();
                                    break;
                            
                            }
                            
                            Repeats.updateRepeat(repeatData, event.id).success(function(response){
                            });
                            
                        }else{
                            RepetitionUpdates.deleteUpdatedEvent(event.id).success(function(response){
                                Repeats.deleteRepeat(event.id).success(function(response){
                                
                                });
                            });
                        }
                            $location.path('/');
                            EventsCalendar.refreshCalendar();
                    });
                    break;
                
                case  'futureEvents':
                    
                    var data={};
                    data.eventId= event.id;
                    if(event.eventLength>1)
                    {
                        var month = day.month();
                        var eventDate= moment(self.startDate);
               
                        var newEndDate = eventDate.month(month);
                        newEndDate = newEndDate.subtract(1, 'd');
                        
                        data.newEndDate = newEndDate.format('YYYY-MM-DD');
                        
                    }else{
                        data.newEndDate = day.clone().subtract(1, 'd').format('YYYY-MM-DD');
                    }
                    
                    Repeats.changeEndDate(data, event.id).success(function(response){
                        var eventToSend={};
                        eventToSend.name= self.name;
                        eventToSend.calendarId = self.calendarId.id;
                        eventToSend.startDate=self.startDate.format('YYYY-MM-DD');
                        eventToSend.endDate= self.endDate.format('YYYY-MM-DD');
                        eventToSend.eventLength= self.endDate.diff(self.startDate, 'days')+1;
                        
                        eventToSend.startTimeDisplay = self.startHour +':'+self.startMinutes+ self.startMeridiem;
                        eventToSend.endTimeDisplay = self.endHour +':' + self.endMinutes+ self.endMeridiem;
                        
                        eventToSend.startTime = getTimeToSend(self.startHour, self.startMinutes, self.startMeridiem);
                        eventToSend.endTime = getTimeToSend(self.endHour, self.endMinutes, self.endMeridiem);
                        
                        
                        eventToSend.repeats=self.repeats;
                        eventToSend.allDay = self.allDay;
                        
                        Events.addEvent(eventToSend).success(function(response){
                            if(response.repeats==true){
                                var repeatData={};
                                repeatData.eventId=response.eventId;
                            
                                if(self.repeatEndValue=="never")
                                {
                                    repeatData.neverEnds=true;
                                    repeatData.endRepetitionDate="";
                                }else{
                                    repeatData.endRepetitionDate = self.repeatEndDate.format('YYYY-MM-DD');
                                    repeatData.neverEnds=false;
                                }
                            
                                    
                                switch(self.repeatOccurrence){
                                        case "daily": 
                                            repeatData.repeatDaily="*";
                                            repeatData.repeatOccurrence="daily";
                                           
                                            break;
                                        case "weekday":
                                            repeatData.repeatWeekdays="*";
                                            repeatData.repeatOccurrence="weekday";
                                            break;
                                            
                                    case "weekly":
                                        repeatData.repeatWeekly= 1;
                                        repeatData.repeatOccurrence="weekly";
                                        for(var i=0; i<self.repeatWeeklyOptions.length; i++){
                                            if(self.repeatWeeklyOptions[i].selected == true){
                                                
                                               repeatData.repeatWeekly= (repeatData.repeatWeekly) * (self.repeatWeeklyOptions[i].id);
                                            }
                                        }
                                        break;
                                        
                                    case "monthly":
                                        repeatData.repeatOccurrence="monthly";
                                        repeatData.repeatMonthly=self.startDate.date();
                                        break;
                                        
                                    case "yearly":
                                        repeatData.repeatOccurrence="yearly";
                                        repeatData.repeatYearly=(self.startDate.month() + 1) +"-"+ self.startDate.date();
                                        break;
                                
                                }
                            
                                Repeats.addRepeat(repeatData).success(function(response){
                                });
                            }
                            
                            $location.path('/');
                            EventsCalendar.refreshCalendar();
                            
                        });
                        
                        
                    });
                    
                    break;
                    
            }
           
        }
        
        
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


bmPlannerControllers.controller("monthlyViewCtrl", function($scope, EventsCalendar, Calendars){
    var self= this;
    self.calendar = EventsCalendar;
    self.allCalendars = Calendars;
    
    self.previous = function(){
        EventsCalendar.previous();
    };
    
   self.next = function(){
        EventsCalendar.next();
    };
    
    self.getColor = function(event)
    { 
        var color;
        for(var i=0; i<self.allCalendars.calendars.length; i++)
        {
            if(event.calendarId == self.allCalendars.calendars[i].id)
            {
                color = self.allCalendars.calendars[i].color;
            }
        }
        return color;
    };
    
    
});



bmPlannerControllers.controller("weekViewCtrl", function($scope, EventsCalendar, Calendars, $location, $anchorScroll){
    
    $scope.calendar = EventsCalendar;

    var time_now = moment().format('H') * 60 + parseInt(moment().format('mm'));
    var time_minutes=0;
    var id=1;
    

    $scope.next = function(){
        EventsCalendar.nextWeek();
        
        $scope.goToAnchor($scope.x);
    };
    
    $scope.previous = function(){
        EventsCalendar.previousWeek();
        
        $scope.goToAnchor($scope.x);
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
          
            return  (width + 5) +'%';
        }
        
        else{
             return  (event.width + 5) + '%';
        }
       
    };
    
    
    self.getLeft = function(eventindex, event)
    {
        if(eventindex == 0)
        {
            return 0;
        }
        else{
            return ( (event.width * eventindex) - 5 ) + '%';
        }
    };
    
    
    

});












