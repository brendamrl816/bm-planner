'use strict'

var bmPlannerServices = angular.module('bmPlannerServices', []);

bmPlannerServices.factory('User', function($http, Calendars) {
    var User = {};
    User.info = {};
    
    
    User.get = function()
    {
        $http.get('/settings').success(function(response) {
            User.info = response;
            User.info.dob = new Date(User.info.dob);
            User.displayName = User.info.first_name;
        });   
    };
    
    User.update = function(data){
        return $http.post('/settings', data);
    };
    
    User.deleteAccount = function(data){
        return $http.post('/delete', data);
    };
    
    return User;
});

bmPlannerServices.factory('Style', function($http) {
    var Style ={};
    Style.css= {};
    
    $http.get('/styles').success(function(response){
        Style.css = response;
    });
    
    Style.getStyle = function(){
        return $http.get('/styles');
    };
    
    Style.update = function(data, id) {
           $http.put('/styles/' + id, data).success(function(response){
               Style.getStyle().success(function(getResponse){
                   Style.css = getResponse;
               });
           });
    };
    
    return Style;
});


bmPlannerServices.factory('Lists', function($http) {

    var Lists = {};

    Lists.lists = [];

    $http.get('/lists').success(function(listResponse) {

        for (var i = 0; i < listResponse.length; i++) {
            Lists.lists[i] = listResponse[i];
            Lists.lists[i].tasks = [];
            getTasks(i, Lists.lists[i].id);
        }
    });

    function getTasks(i, listId) {
        $http.get('/lists/' + listId + '/tasks').success(function(taskResponse) {
            Lists.lists[i].tasks = taskResponse;
        });
    }

    Lists.addList = function(data) {
        $http.post('/lists', data).success(function(response) {
            Lists.lists.push(response);
        });
    };

    Lists.updateList = function(data, index) {
        $http.put('/lists/' + Lists.lists[index].id, data).success(function(response) {
            Lists.lists[index].name = response.name;
            Lists.lists[index].color = response.color;
        });
    };

    Lists.deleteList = function(listIndex) {
        $http.delete('/lists/' + Lists.lists[listIndex].id).success(function(response) {
            if (Lists.lists[listIndex].tasks != undefined) {
                for (var j = 0; j < Lists.lists[listIndex].tasks.length; j++) {
                    $http.delete('/lists/' + Lists.lists[listIndex].id + '/tasks/' + Lists.lists[listIndex].tasks[j].id);
                }
            }

            Lists.lists.splice(listIndex, 1);
        });
    };


    Lists.addTask = function(listIndex, taskData) {
        $http.post('/lists/' + Lists.lists[listIndex].id + '/tasks', taskData).success(function(taskResponse) {
            if (Lists.lists[listIndex].tasks == undefined) {
                Lists.lists[listIndex].tasks = [];
            }
            Lists.lists[listIndex].tasks.push(taskResponse);
        });
    };

    Lists.deleteTask = function(listIndex, taskIndex, taskId) {
        $http.delete('/lists/' + Lists.lists[listIndex].id + '/tasks/' + taskId).success(function(response) {
            Lists.lists[listIndex].tasks.splice(taskIndex, 1);
        });
    };

    Lists.updateCompleted = function(listIndex, taskIndex, taskId, taskData) {
        $http.put('/lists/' + Lists.lists[listIndex].id + '/tasks/' + taskId, taskData).success(function(response) {
            Lists.lists[listIndex].tasks[taskIndex].completed = response.completed;
        });
    };

    return Lists;
});




bmPlannerServices.factory('Events', function($http, $q) {

    return {
        getEvents: function(data) {
            return $http.get('/events', {
                params: data
            });
        },
        addEvent: function(data) {
            return $http.post('/events', data);
        },

        updateEvent: function(data, id) {
            return $http.put('/events/' + id, data);
        },
        
        updateStartDate: function(data) {
            return $http.put('/updateStartDate', data);
        },

        deleteEvent: function(id) {
            return $http.delete('/events/' + id);
        }
    };
});

bmPlannerServices.factory('Repeats', function($http) {
    return {
        addRepeat: function(data) {
            return $http.post('/repetitions', data);
        },

        updateRepeat: function(data, id) {
            return $http.put('/repetitions/' + id, data);
        },

        changeEndDate: function(data) {
            return $http.put('/repetitionsChangeEnd', data);
        },
        deleteRepeat : function(id)
        {
            return $http.delete('/repetitions/' + id);
        }
        
    };
});


bmPlannerServices.factory('RepetitionUpdates', function($http) {
    return {
        saveEventToChange: function(data) {
            return $http.post('/eventchanges', data);
        },
        deleteExclusions : function(id)
        {
            return $http.delete('/eventchanges/' + id);
        }
    };

});


bmPlannerServices.factory('Calendars', function($http) {
    var Calendars = {};

    Calendars.calendars = [];
    Calendars.mainCalendar = {};

    $http.get('/calendars').success(function(response) {
        Calendars.calendars = response;
        
    });
    
    $http.get('/mainCalendar').success(function(response) {
        Calendars.mainCalendar = response;
    });
    
    Calendars.getCalendars = function(){
        $http.get('/calendars').success(function(response) {
            Calendars.calendars = response;
        });
    };
    
    Calendars.getMainCalendar = function(){
        $http.get('/mainCalendar').success(function(response) {
            Calendars.mainCalendar = response;
        });
    };
    
    Calendars.addCalendar = function(data) {
        $http.post('/calendars', data).success(function(response) {
            Calendars.calendars.push(response);
        });
    };

    Calendars.updateCalendar = function(data, id, index) {
        $http.put('/calendars/' + id, data).success(function(response) {
            Calendars.calendars[index] = response;
        });
    };
    

    Calendars.deleteCalendar = function(id, index) {
        return $http.delete('/calendars/' + id).success(function(response) {
            Calendars.calendars.splice(index, 1);
        });
    };

    return Calendars;
});



bmPlannerServices.factory('EventsCalendar', function(Events, Repeats, RepetitionUpdates) {

    var EventsCalendar = {};
    EventsCalendar.months = [];
    EventsCalendar.weeks = [];
    var index = 0;
    var weekIndex = 0;



    EventsCalendar.selected = removeTime(moment());
    EventsCalendar.weekSelected = removeTime(moment());

    createMonthCalendar(EventsCalendar.selected);
    createWeekCalendar(EventsCalendar.weekSelected);


    function createWeekCalendar(selected) {
        var startDate = selected.clone();
        startDate.day(0);
        EventsCalendar.currentDisplayWeek = {
            days: createWeek(startDate),
            hasNext: false,
            hasPrevious: false
        };
        EventsCalendar.weeks[0] = EventsCalendar.currentDisplayWeek;
    }

    function createMonthCalendar(selected) {

        var startDate = selected.clone();
        startDate.date(1); //get the first day of the selected month;
        startDate.day(0); //get the date of the sunday of the first week of the selected month;

        EventsCalendar.currentDisplayMonth = {
            weeks: createMonth(startDate),
            hasNext: false,
            hasPrevious: false
        };
        EventsCalendar.months[0] = EventsCalendar.currentDisplayMonth;
    }


    EventsCalendar.next = function() {
        EventsCalendar.selected.add(1, "M");
        index++;

        if (EventsCalendar.currentDisplayMonth.hasNext == false) {
            var startDate = EventsCalendar.selected.clone();
            //get the first day of the selected month;
            startDate.date(1);
            //get the date of the sunday of the first week of the selected month;
            startDate.day(0);


            EventsCalendar.months[index] = {
                weeks: createMonth(startDate),
                hasNext: false,
                hasPrevious: true
            };
            EventsCalendar.currentDisplayMonth = EventsCalendar.months[index];
            EventsCalendar.months[index - 1].hasNext = true;

        }
        else {
            EventsCalendar.currentDisplayMonth = EventsCalendar.months[index];
        }


        while (EventsCalendar.currentDisplayWeek.days[0].itsDate < EventsCalendar.currentDisplayMonth.weeks[1].days[0].itsDate && EventsCalendar.currentDisplayWeek.days[0].month != EventsCalendar.currentDisplayMonth.weeks[0].days[6].month) {
            EventsCalendar.nextWeek();
        }


    };

    EventsCalendar.nextWeek = function() {
        EventsCalendar.weekSelected.add(1, "w");
        weekIndex++;

        if (EventsCalendar.currentDisplayWeek.hasNext == true) {
            EventsCalendar.currentDisplayWeek = EventsCalendar.weeks[weekIndex];
        }
        else {
            var startDate = EventsCalendar.weekSelected.clone();
            startDate.day(0);
            EventsCalendar.weeks[weekIndex] = {
                days: createWeek(startDate),
                hasNext: false,
                hasPrevious: true
            };
            EventsCalendar.currentDisplayWeek = EventsCalendar.weeks[weekIndex];
            EventsCalendar.weeks[weekIndex - 1].hasNext = true;
        }


        if (EventsCalendar.currentDisplayWeek.days[0].itsDate > EventsCalendar.currentDisplayMonth.weeks[1].days[0].itsDate && EventsCalendar.currentDisplayWeek.days[0].month != EventsCalendar.currentDisplayMonth.weeks[0].days[6].month) {
            EventsCalendar.next();
        }

    };



    EventsCalendar.previous = function() {
        EventsCalendar.selected.subtract(1, "M");
        if (EventsCalendar.currentDisplayMonth.hasPrevious == false) {

            var startDate = EventsCalendar.selected.clone();
            //get the first day of the selected month;
            startDate.date(1);
            //get the date of the sunday of the first week of the selected month;
            startDate.day(0);

            EventsCalendar.months.splice(0, 0, {
                weeks: createMonth(startDate),
                hasNext: true,
                hasPrevious: false
            });
            EventsCalendar.months[1].hasPrevious = true;
            EventsCalendar.currentDisplayMonth = EventsCalendar.months[0];

        }
        else {
            index--;
            EventsCalendar.currentDisplayMonth = EventsCalendar.months[index];
        }

        while (EventsCalendar.currentDisplayWeek.days[0].itsDate > EventsCalendar.currentDisplayMonth.weeks[1].days[0].itsDate && EventsCalendar.currentDisplayWeek.days[0].month != EventsCalendar.currentDisplayMonth.weeks[0].days[6].month) {
            EventsCalendar.previousWeek();
        }

    };


    EventsCalendar.previousWeek = function() {
        EventsCalendar.weekSelected.subtract(1, "w");
        if (EventsCalendar.currentDisplayWeek.hasPrevious == false) {

            var startDate = EventsCalendar.weekSelected.clone();
            //get the date of the sunday of the first week of the selected month;
            startDate.day(0);

            EventsCalendar.weeks.splice(0, 0, {
                days: createWeek(startDate),
                hasNext: true,
                hasPrevious: false
            });
            EventsCalendar.weeks[1].hasPrevious = true;
            EventsCalendar.currentDisplayWeek = EventsCalendar.weeks[0];

        }
        else {
            weekIndex--;
            EventsCalendar.currentDisplayWeek = EventsCalendar.weeks[weekIndex];
        }

        if (EventsCalendar.currentDisplayWeek.days[0].itsDate < EventsCalendar.currentDisplayMonth.weeks[1].days[0].itsDate && EventsCalendar.currentDisplayWeek.days[0].month != EventsCalendar.currentDisplayMonth.weeks[0].days[6].month) {
            EventsCalendar.previous();
        }

    };

    EventsCalendar.goToToday = function() {

        EventsCalendar.selected = removeTime(moment());
        EventsCalendar.weekSelected = removeTime(moment());

        EventsCalendar.refreshCalendar();
    };

    EventsCalendar.refreshCalendar = function() {
        index = 0;
        weekIndex = 0;


        EventsCalendar.months.length = 0;
        EventsCalendar.weeks.length = 0;

        createMonthCalendar(EventsCalendar.selected);
        createWeekCalendar(EventsCalendar.weekSelected);

    };



    function createMonth(theStartDate) {
        var the_date = EventsCalendar.selected.clone();
        the_date.add(1, "month");
        var weeks = [];

        while (theStartDate.month() != the_date.month()) {
            weeks.push({
                days: createWeek4Month(theStartDate)
            });
            theStartDate = theStartDate.clone();
            theStartDate.add(1, "w");
        }

        return weeks;
    }



    function createWeek(the_date) {
        var days = [];
        var i;
        for (i = 0; i < 7; i++) 
        {   
            days[i] = 
            {   dateOfMonth: the_date.date(),
                month: the_date.month(),
                itsDate: the_date,
                hours: createHours(),
                longEvents:[],
                events:[] };
                
            the_date = the_date.clone();
            the_date.add(1, "d");
        }

        //create an object with information to send to backend in order to get the events of this week.
        var request = {
            startRangeMonth: days[0].itsDate.month(),
            startRangeDay: days[0].itsDate.date(),
            startRangeYear: days[0].itsDate.year()
        };


        Events.getEvents(request).success(function(response) {

                for (i = 0; i < response.length; i++) {
                    
                    var indexes = [];//to order long events
                   
                    
                    for (var n = 0; n < response[i].length; n++) {
                        
                        if ((response[i][n]['event'].length_days == 0) && (response[i][n]['event'].allDay == false))
                        {
                            var startTime1 = response[i][n]['event'].startDate.split(" ");
                        
                            var startTime = startTime1[1].split(":");
                            var start = (startTime[0] * 60) + parseInt(startTime[1], 10);
                            var endTime1 = response[i][n]['event'].endDate.split(" ");
                            var endTime = endTime1[1].split(':');
                            if(endTime[0]=='00' && endTime[1]=='00')
                            {
                                endTime[0]='24';
                            }
                            var end = (endTime[0] * 60) + parseInt(endTime[1], 10);
                            var startMinutes = parseInt(startTime[1], 10);
                            var endMinutes = parseInt(endTime[1], 10);
                 
                            var rowspan = Math.round((end - start) /30) ; // Math.round(endTime[0] - startTime[0]) * 2; 
                            if (startMinutes >= 30) {
                                startMinutes = startMinutes - 30;
                            }
                            if(endMinutes !== 0)
                            {
                                if (endMinutes >= 30) {
                                    endMinutes = endMinutes - 30;
                                }
                            }
                            var x2;
                            
                            
                            for (var x = 0; x < days[i].hours.length; x++) {
                                
                                var the_indexes=[];
                                
                                for(var z=0; z<days[i].hours[x].events.length; z++)
                                {
                                    the_indexes.push(days[i].hours[x].events[z].index);
                                }
                                the_indexes.sort(function(a,b){return a-b});
                                
                                if((days[i].hours[x].time_minutes <= start) && (days[i].hours[x].time_minutes + 30 > start))
                                {
                                    
                                    x2 = x;
                                    var tds = days[i].hours[x].tds;
                                    var j = x + rowspan - 1; 
                                   
                                   while(x <= j)
                                    {
                                        days[i].hours[x].tds = days[i].hours[x].tds + 1;
                                        
                                        if(tds < days[i].hours[x].tds)
                                        {
                                            tds = days[i].hours[x].tds;
                                        }
                                       x++;
                                    }
                                    x = x2;
                                    var m;
                                    
                                    var check = 0;
                                    var inside = false;
                                    do{
                                        inside = false;
                                        for(k=0; k<the_indexes.length; k++){
                                            if(the_indexes[k]==check){
                                                inside = true;
                                            }
                                        }
                                        if(inside == false){
                                            m = check;
                                            the_indexes.push(m);
                                        }else{
                                            check++;
                                        }
                                    }while(inside == true && check < the_indexes.length);
                                    
                                    if(inside == true)
                                    {
                                        m = the_indexes[the_indexes.length - 1] + 1;
                                        the_indexes.push(m);
                                    }
                                    
                                    the_indexes.sort(function(a,b){return a-b});
                                 
                                    while(x <= j)
                                    {
                                        
                                        var event = {
                                            //backend:
                                            id: response[i][n]['event'].id,
                                            calendar_id: response[i][n]['event'].calendar_id,
                                            name: response[i][n]['event'].name,
                                            startDate:response[i][n]['event'].startDate,
                                            endDate:response[i][n]['event'].endDate ,
                                            length_hours:response[i][n]['event'].length_hours,
                                            length_days: response[i][n]['event'].length_days,
                                            allDay:response[i][n]['event'].allDay,
                                            repeats:response[i][n]['event'].repeats,
                                            repeatEndDate: response[i][n]['event'].repeatEndDate,
                                            neverEnds: response[i][n]['event'].neverEnds,
                                            repeatDaily: response[i][n]['event'].repeatDaily,
                                            repeatMonthly: response[i][n]['event'].repeatMonthly,
                                            repeatOccurrence: response[i][n]['event'].repeatOccurrence,
                                            repeatInterval: response[i][n]['event'].repeatInterval,
                                            repeatWeekdays:response[i][n]['event'].repeatWeekdays,
                                            repeatWeekly: response[i][n]['event'].repeatWeekly,
                                            repeatYearly: response[i][n]['event'].repeatYearly,
                                            eventStartsOn: response[i][n]['eventStartsOn'],
                                            eventStartsOnFormatted : moment(response[i][n]['eventStartsOn'], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
                                            startTimeDisplay:  moment(response[i][n]['event'].startDate, 'YYYY-MM-DD HH:mm:ss').format('hh:mma'),
                                            endTimeDisplay:  moment(response[i][n]['event'].endDate, 'YYYY-MM-DD HH:mm:ss').format('hh:mma'),
                                            //frontend
                                            rowspan: rowspan,
                                            index: m,
                                            top: 0,
                                            left:'0%',
                                            width:'100%',
                                            height:'100%',
                                            first: false,
                                            totalHeight: (((rowspan) *30) - startMinutes - (endMinutes))
                                            };
                                            
                                        if(x == x2) //if it's the first one
                                        {
                                            event.first = true;
                                            event.top = startMinutes;
                                            days[i].events.push(event);
                                        }
                                        
                                        if((x == j-1) && (endMinutes != 0))
                                        {
                                            event.height = endMinutes;
                                        }

                                        days[i].hours[x].events.push(event);
                                        
                  
                                       x++;
                                    }
                                 
                                    break;
                                }

                            }

                        }else
                        { 
                            var topIndex;
                            
                            if(days[i].itsDate.format('YYYY-MM-DD') ==  moment(response[i][n]['eventStartsOn'], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'))
                            {   var k =0;
                                if(days[i].longEvents.length == 0)
                                {
                                    topIndex = 0;
                                    indexes.push(topIndex);
                                }else{
                                    var check = 0;
                                    var inside = false;
                                    do{
                                        inside = false;
                                        for(k=0; k<indexes.length; k++){
                                            if(indexes[k]==check){
                                                inside = true;
                                            }
                                        }
                                        if(inside == false){
                                            topIndex = check;
                                            indexes.push(topIndex);
                                        }else{
                                            check++;
                                        }
                                    }while(inside == true && check < indexes.length);
                                    
                                    if(inside == true)
                                    {
                                        topIndex = indexes[indexes.length - 1] + 1;//days[i].longEvents.length; 
                                        indexes.push(topIndex);
                                    }
                                }
                            }else{
                                if(days[i].itsDate.day() != 0) //if it's not Sunday
                                {
                                    for(k=0; k<days[i-1].longEvents.length; k++)
                                    {
                                        if((days[i-1].longEvents[k].eventStartsOn == response[i][n]['eventStartsOn'])  && (days[i-1].longEvents[k].id == response[i][n]['event'].id))
                                        {
                                            topIndex = days[i-1].longEvents[k].topIndex;
                                            indexes.push(topIndex);
                                        }
                                    }
                                }else{
                                    if(days[i].longEvents.length == 0)
                                    {
                                        topIndex = 0;
                                        indexes.push(topIndex);
                                    }else{
                                        topIndex = days[i].longEvents.length;
                                        indexes.push(topIndex);
                                    }
                                }
                            }
                            indexes.sort(function(a,b){return a-b});
                            
                            var event = {
                                        //backend:
                                        id: response[i][n]['event'].id,
                                            calendar_id: response[i][n]['event'].calendar_id,
                                            name: response[i][n]['event'].name,
                                            startDate:response[i][n]['event'].startDate,
                                            endDate:response[i][n]['event'].endDate ,
                                            length_hours:response[i][n]['event'].length_hours,
                                            length_days: response[i][n]['event'].length_days,
                                            allDay:response[i][n]['event'].allDay,
                                            repeats:response[i][n]['event'].repeats,
                                            repeatEndDate: response[i][n]['event'].repeatEndDate,
                                            neverEnds: response[i][n]['event'].neverEnds,
                                            repeatDaily: response[i][n]['event'].repeatDaily,
                                            repeatMonthly: response[i][n]['event'].repeatMonthly,
                                            repeatOccurrence: response[i][n]['event'].repeatOccurrence,
                                            repeatInterval: response[i][n]['event'].repeatInterval,
                                            repeatWeekdays:response[i][n]['event'].repeatWeekdays,
                                            repeatWeekly: response[i][n]['event'].repeatWeekly,
                                            repeatYearly: response[i][n]['event'].repeatYearly,
                                            eventStartsOn: response[i][n]['eventStartsOn'],
                                            eventStartsOnFormatted : moment(response[i][n]['eventStartsOn'], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
                                            startTimeDisplay:  moment(response[i][n]['event'].startDate, 'YYYY-MM-DD HH:mm:ss').format('hh:mma'),
                                            endTimeDisplay:  moment(response[i][n]['event'].endDate, 'YYYY-MM-DD HH:mm:ss').format('hh:mma'),
                                            //frontend
                                        topIndex: topIndex,
                                        top: topIndex * 16,
                                        left:0,
                                        width:'100%',
                                        height:'15px'
                                        };
                            days[i].longEvents.push(event);
                            days[i].longEventsHeight = indexes[indexes.length-1] + 1;
                        }
                    }
                }
            })
            .error(function(reason) {
                console.log('IT FAILED', reason);
            });

        return days;
    }

    function createHours() {
        var hours = [];
        var time_minutes = 0;
        hours.push({
            time_minutes: time_minutes,
            events: [],
            tds: 0
        });
        for (var j = 1; j < 48; j++) {
            time_minutes = time_minutes + 30;
            hours.push({
                time_minutes: time_minutes,
                events: [],
                tds: 0
            });
        }
        return hours;
    }


    function createWeek4Month(the_date) {
        var days = [];
        var i;
        for (i = 0; i < 7; i++) {

            days[i] = {
                dateOfMonth: the_date.date(),
                month: the_date.month(),
                itsDate: the_date,
                longEvents: [],
                longEventsHeight:null,
                events:[]
            };
            the_date = the_date.clone();
            the_date.add(1, "d");
           }

        //create an object with information to send to backend in order to get the events of this week.
        var request = {
            startRangeMonth: days[0].itsDate.month(),
            startRangeDay: days[0].itsDate.date(),
            startRangeYear: days[0].itsDate.year()
        };


        Events.getEvents(request).success(function(response) {

            for (i = 0; i < response.length; i++) {
                
                var indexes = [];//to order long events
                
                for (var n = 0; n < response[i].length; n++)
                {
                    if(response[i][n]['event'].length_days == 0){
                        var event = {
                                        id: response[i][n]['event'].id,
                                            calendar_id: response[i][n]['event'].calendar_id,
                                            name: response[i][n]['event'].name,
                                            startDate:response[i][n]['event'].startDate,
                                            endDate:response[i][n]['event'].endDate ,
                                            length_hours:response[i][n]['event'].length_hours,
                                            length_days: response[i][n]['event'].length_days,
                                            allDay:response[i][n]['event'].allDay,
                                            repeats:response[i][n]['event'].repeats,
                                            repeatEndDate: response[i][n]['event'].repeatEndDate,
                                            neverEnds: response[i][n]['event'].neverEnds,
                                            repeatDaily: response[i][n]['event'].repeatDaily,
                                            repeatMonthly: response[i][n]['event'].repeatMonthly,
                                            repeatOccurrence: response[i][n]['event'].repeatOccurrence,
                                            repeatInterval: response[i][n]['event'].repeatInterval,
                                            repeatWeekdays:response[i][n]['event'].repeatWeekdays,
                                            repeatWeekly: response[i][n]['event'].repeatWeekly,
                                            repeatYearly: response[i][n]['event'].repeatYearly,
                                            eventStartsOn: response[i][n]['eventStartsOn'],
                                             eventStartsOnFormatted : moment(response[i][n]['eventStartsOn'], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
                                            startTimeDisplay:  moment(response[i][n]['event'].startDate, 'YYYY-MM-DD HH:mm:ss').format('hh:mma'),
                                            endTimeDisplay:  moment(response[i][n]['event'].endDate, 'YYYY-MM-DD HH:mm:ss').format('hh:mma'),
                                            
                                    };
                        days[i].events.push(event);
                    }
                    else{
                        var topIndex;
                            
                            if(days[i].itsDate.format('YYYY-MM-DD') ==  moment(response[i][n]['eventStartsOn'], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'))
                            {   var k =0;
                                if(days[i].longEvents.length == 0)
                                {
                                    topIndex = 0;
                                    indexes.push(topIndex);
                                }else{
                                    var check = 0;
                                    var inside = false;
                                    do{
                                        inside = false;
                                        for(k=0; k<indexes.length; k++){
                                            if(indexes[k]==check){
                                                inside = true;
                                            }
                                        }
                                        if(inside == false){
                                            topIndex = check;
                                            indexes.push(topIndex);
                                        }else{
                                            check++;
                                        }
                                    }while(inside == true && check < indexes.length);
                                    
                                    if(inside == true)
                                    {
                                        topIndex = indexes[indexes.length - 1] + 1;//days[i].longEvents.length; 
                                        indexes.push(topIndex);
                                    }
                                }
                            }else{
                                if(days[i].itsDate.day() != 0) //if it's not Sunday
                                {
                                    for(k=0; k<days[i-1].longEvents.length; k++)
                                    {
                                        if((days[i-1].longEvents[k].eventStartsOn == response[i][n]['eventStartsOn'])  && (days[i-1].longEvents[k].id == response[i][n]['event'].id))
                                        {
                                            topIndex = days[i-1].longEvents[k].topIndex;
                                            indexes.push(topIndex);
                                        }
                                    }
                                }else{
                                    if(days[i].longEvents.length == 0)
                                    {
                                        topIndex = 0;
                                        indexes.push(topIndex);
                                    }else{
                                        topIndex = days[i].longEvents.length;
                                        indexes.push(topIndex);
                                    }
                                }
                            }
                            indexes.sort(function(a,b){return a-b});
                            var event = {
                                        //backend:
                                        id: response[i][n]['event'].id,
                                            calendar_id: response[i][n]['event'].calendar_id,
                                            name: response[i][n]['event'].name,
                                            startDate:response[i][n]['event'].startDate,
                                            endDate:response[i][n]['event'].endDate ,
                                            length_hours:response[i][n]['event'].length_hours,
                                            length_days: response[i][n]['event'].length_days,
                                            allDay:response[i][n]['event'].allDay,
                                            repeats:response[i][n]['event'].repeats,
                                            repeatEndDate: response[i][n]['event'].repeatEndDate,
                                            neverEnds: response[i][n]['event'].neverEnds,
                                            repeatDaily: response[i][n]['event'].repeatDaily,
                                            repeatMonthly: response[i][n]['event'].repeatMonthly,
                                            repeatOccurrence: response[i][n]['event'].repeatOccurrence,
                                            repeatInterval: response[i][n]['event'].repeatInterval,
                                            repeatWeekdays:response[i][n]['event'].repeatWeekdays,
                                            repeatWeekly: response[i][n]['event'].repeatWeekly,
                                            repeatYearly: response[i][n]['event'].repeatYearly,
                                            eventStartsOn: response[i][n]['eventStartsOn'],
                                             eventStartsOnFormatted : moment(response[i][n]['eventStartsOn'], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD'),
                                            startTimeDisplay:  moment(response[i][n]['event'].startDate, 'YYYY-MM-DD HH:mm:ss').format('hh:mma'),
                                            endTimeDisplay:  moment(response[i][n]['event'].endDate, 'YYYY-MM-DD HH:mm:ss').format('hh:mma'),
                                            
                                        //frontend
                                        topIndex: topIndex,
                                        top: topIndex * 16,
                                        left:0,
                                        width:'100%',
                                        height:'15px'
                                        };
                    
                            days[i].longEvents.push(event);
                            days[i].longEventsHeight = indexes[indexes.length-1] + 1;
                        }
                }
                
            }
        })
        .error(function(reason) {
            console.log('IT FAILED', reason);
        });


        return days;
    }


    function removeTime(date) {
        return date.hour(0).minute(0).second(0).millisecond(0);
    }


    return EventsCalendar;
});


