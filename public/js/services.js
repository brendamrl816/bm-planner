'use strict'

var bmPlannerServices = angular.module('bmPlannerServices', []);



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

        deleteCalendarEvents: function(calendarId) {
            return $http.delete('/deleteEvents/' + calendarId);
        },

        addEvent: function(data) {
            return $http.post('/events', data);
        },

        updateEvent: function(data, id) {
            return $http.put('/events/' + id, data);
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

        changeEndDate: function(data, id) {
            return $http.put('/repetitionsChangeEnd', data);
        },

        deleteRepeat: function(id) {
            return $http.delete('/repetitions/' + id);
        }
    };
});


bmPlannerServices.factory('RepetitionUpdates', function($http) {
    return {
        saveEventToChange: function(data) {
            return $http.post('/eventchanges', data);
        },
        deleteUpdatedEvent: function(id) {
            return $http.delete('/eventchanges/' + id);
        }
    };

});


bmPlannerServices.factory('Calendars', function($http) {
    var Calendars = {};

    Calendars.calendars = [];

    $http.get('/calendars').success(function(response) {
        Calendars.calendars = response;
    });

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


    EventsCalendar.event2update = {};

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


    EventsCalendar.editEventInfo = function(event, day, editionType) {
        EventsCalendar.event2update = event;
        EventsCalendar.event2update.editionType = editionType;
        EventsCalendar.dayOfUpdate = day;
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
        for (i = 0; i < 7; i++) {

            days[i] = {
                dateOfMonth: the_date.date(),
                month: the_date.month(),
                itsDate: the_date,
                hours: createHours(),
                max_td: 0
            };
            the_date = the_date.clone();
            the_date.add(1, "d");
            days[i].events = null;
        }

        //create an object with information to send to backend in order to get the events of this week.
        var request = {
            startRangeMonth: days[0].itsDate.month(),
            startRangeDay: days[0].itsDate.date(),
            startRangeYear: days[0].itsDate.year()
        };


        Events.getEvents(request).success(function(response) {

                for (i = 0; i < response.length; i++) {

                    for (var n = 0; n < response[i]['events'].length; n++) {
                        if (response[i]['events'][n].eventLength == 1) {
                            var startTime = response[i]['events'][n].startTime.split(":");
                            var start = (startTime[0] * 60) + parseInt(startTime[1], 10);
                            var endTime = response[i]['events'][n].endTime.split(":");
                            var end = (endTime[0] * 60) + parseInt(endTime[1], 10);
                            var startMinutes = parseInt(startTime[1], 10);
                            var endMinutes = parseInt(endTime[1], 10);

                            var eventIntervalLength =((end - start) /30);
                            if (startMinutes >= 30) {
                                startMinutes = startMinutes - 30;
                            }
                            // if (endMinutes > 30) {
                            //     endMinutes = endMinutes - 30;
                            // }

                            var x2;
                            
                            for (var x = 0; x < days[i].hours.length; x++) {
                                
                                if((days[i].hours[x].time_minutes <= start) && (days[i].hours[x].time_minutes + 30 > start))
                                {
                                    
                                    x2 = x;
                                    var tds = days[i].hours[x].tds;
                                    
                                    var j = x + eventIntervalLength; 
                                   
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
                                    var m = 1;
                                    
                                   while(days[i].hours[x].events[days[i].hours[x].events.length - m] != undefined && days[i].hours[x].events[days[i].hours[x].events.length - m].index == tds - m)
                                   {
                                        m++;
                                   }
                                   
                                    while(x <= j)
                                    {
                                        
                                        var event = {
                                            //backend:
                                            id: response[i]['events'][n].id,
                                            name: response[i]['events'][n].name,
                                            startDate:response[i]['events'][n].startDate,
                                            endDate:response[i]['events'][n].endDate ,
                                            eventLength:response[i]['events'][n].eventLength,
                                            startTime:response[i]['events'][n].startTime,
                                            endTime:response[i]['events'][n].endTime ,
                                            allDay:response[i]['events'][n].allDay ,
                                            startTimeDisplay:response[i]['events'][n].startTimeDisplay,
                                            endTimeDisplay: response[i]['events'][n].endTimeDisplay,
                                            repeats:response[i]['events'][n].repeats,
                                            calendarId: response[i]['events'][n].calendarId,
                                            neverEnds: response[i]['events'][n].neverEnds,
                                            repeatDaily: response[i]['events'][n].repeatDaily,
                                            repeatMonthly: response[i]['events'][n].repeatMonthly,
                                            repeatOccurrence: response[i]['events'][n].repeatOccurrence,
                                            repeatWeekdays:response[i]['events'][n].repeatWeekdays,
                                            repeatWeekly: response[i]['events'][n].repeatWeekly,
                                            repeatYearly: response[i]['events'][n].repeatYearly,
                                            more: response[i]['events'][n].more,
                                            startDay: response[i]['events'][n].startDay,
                                            //frontend
                                            rowspan: eventIntervalLength,
                                            index: tds - m,
                                            top: 0,
                                            left:'0%',
                                            width:'100%',
                                            height:'100%',
                                            first: false
                                            };
                                            
                                        if(x == x2) //if it's the first one
                                        {
                                            event.first = true;
                                            event.top = startMinutes;
                           
                                           
                                        }
                                        
                                        if(x == Math.round(j) && endMinutes !=0 && endMinutes <= 45) //if it's the last one
                                        {
                                            if(endMinutes > 30)
                                            {
                                                endMinutes = endMinutes - 30; 
                                            }
                                            event.height = endMinutes;
                                         
                                        }
                                        
                                        if(x == Math.round(j -1) && endMinutes !=0 && endMinutes > 45) //if it's the last one
                                        {
                                            endMinutes = endMinutes - 30;
                                            event.height = endMinutes;
                                          
                                        }

                                       

                                        days[i].hours[x].events.push(event);
                                        
                  
                                       x++;
                                    }
                                    
                                 
                                    break;
                                }

                            }

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
                hours: createHours(),
                max_td: 0
            };
            the_date = the_date.clone();
            the_date.add(1, "d");
            days[i].events = null;
        }

        //create an object with information to send to backend in order to get the events of this week.
        var request = {
            startRangeMonth: days[0].itsDate.month(),
            startRangeDay: days[0].itsDate.date(),
            startRangeYear: days[0].itsDate.year()
        };


        Events.getEvents(request).success(function(response) {

                for (i = 0; i < response.length; i++) {
                    days[i].events = response[i]['events'];
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
