<?php

namespace App\Http\Controllers;

use App\Event;
use Response;
use Input;
use DB;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class EventsController extends Controller
{
    

    public function index(Request $request)
    {
   
        $startMonth = $request->input('startRangeMonth') + 1;
        $startDay = $request->input('startRangeDay');
        $startYear= $request->input('startRangeYear');
        $days= [];
        
        $moreThanOne = DB::table('events')
                        ->leftJoin('repetitions as repetitions', 'events.id', '=', 'repetitions.eventId')
                        ->leftJoin('calendars', 'events.calendarId', '=', 'calendars.id')
                        ->where('eventLength', '>', 1)
                        ->select('events.id as id', 'events.name as name', 'events.calendarId as calendarId', 'events.eventLength as eventLength', 
                        'events.startDate as startDate', 'events.endDate as endDate', 'events.repeats as repeats' , 
                            'events.allDay', 'events.startTime', 'events.endTime', 'events.startTimeDisplay', 'events.endTimeDisplay', 
                            'repetitions.repeatOccurrence', 'repetitions.endRepetitionDate', 'repetitions.repeatDaily', 'repetitions.repeatWeekdays', 
                            'repetitions.repeatWeekly', 'repetitions.repeatMonthly', 'repetitions.repeatYearly', 'repetitions.neverEnds')
                        ->get();
                        
        
        
        
        for($i=0; $i<7; $i++)
        {
            
            $d = mktime(0, 0, 0, $startMonth, $startDay + $i, $startYear);
            $days[$i] = array('date' => date('Y-m-d', $d) , 'events'=>array());
            $date = $days[$i]['date'];
            
            $dayOfWeek = date('w', $d) + 11;
            $month = date('n-j', $d);
            $day = date('j', $d);
            if(!($dayOfWeek - 11 == 0 || $dayOfWeek - 11 == 6))
            {
                $isWeekDay = '*';
            }else{
                $isWeekDay= '!';
            }
            
            
           
            
            
            foreach( $moreThanOne as $more)
            {
                $more->more = true;
                    if($more->repeats == false)
                    {
                        if(($more->startDate <= $date)  && ($more->endDate >= $date))
                        {
                            $more->startDay = $more->startDate;
                            array_push($days[$i]['events'], $more);
                        }
                    }
                
                    if($more->repeats == true)
                    {
                        $extend = strtotime('+'.$more->eventLength.' days' , strtotime($more->endRepetitionDate));
                        $extend = date('Y-m-d', $extend);
                    
                        if(($more->startDate <= $date)  && (($more->neverEnds == true) ||  ($extend >= $date)) )
                        {
                        
                            if($more->repeatDaily == '*')
                            {
                                if(($more->neverEnds == false) && ($date > $more->endRepetitionDate))
                                {
                                    $d = strtotime($date);
                                    $z=0;
                                
                                    while($z < $more->eventLength)
                                    {
                                        $d1 = strtotime('-'.$z.' days' , $d);
                                        $d2= date('Y-m-d', $d1);
                                        
                                        $addOrNot = DB::table('eventchanges')
                                            ->where('event_id', '=', $more->id)
                                            ->where('dateOfChange', '=', $d2)
                                            ->get();                            
                                
                                        if(($d2 <= $more->endRepetitionDate) && (sizeof($addOrNot)==0))
                                        {
                                            $more->startDay = $d2;
                                            array_push($days[$i]['events'], $more); 
                                        }
                                
                                        $z++;
                                
                                    }
                                }else{
                                
                                    $d = strtotime($date);
                                    $z=0;
                                    while($z < $more->eventLength)
                                    {
                                    
                                        $d1 = strtotime('-'.$z.' days' , $d);
                                        $d2= date('Y-m-d', $d1);
                                    
                                        $addOrNot = DB::table('eventchanges')
                                            ->where('event_id', '=', $more->id)
                                            ->where('dateOfChange', '=', $d2)
                                            ->get();
                                            
                                        if(($d2 >= $more->startDate) && (sizeof($addOrNot)==0))
                                        {
                                            $more->startDay = $d2;
                                            array_push($days[$i]['events'], $more); 
                                        }
                                
                                        $z++;
                                
                                    }
                                }
                            
                            }
                        
                         //make sure i goes in the event to index the events for frontend!!!
                        
                            if($more->repeatWeekdays == '*' )
                            {
                                if(($more->neverEnds == false) && ($date > $more->endRepetitionDate))
                                {
                                    $d = strtotime($date);
                                    $z=0;
                                
                                    while($z < $more->eventLength)
                                    {
                                        $d1 = strtotime('-'.$z.' days' , $d);
                                        $day1 = date('w', $d1);
                                        $d2= date('Y-m-d', $d1);
                                        
                                        $addOrNot = DB::table('eventchanges')
                                            ->where('event_id', '=', $more->id)
                                            ->where('dateOfChange', '=', $d2)
                                            ->get();
                                    
                                        if(($d2 <= $more->endRepetitionDate) && !($day1 == 0 || $day1 == 6)  && (sizeof($addOrNot)==0))
                                        {
                                            $more->startDay = $d2;
                                            array_push($days[$i]['events'], $more); 
                                        }
                                    
                                        $z++;
                                    
                                    }
                                }else{
                                    
                                    $d = strtotime($date);
                                    $z=0;
                                    while($z < $more->eventLength)
                                    {
                                        
                                        $d1 = strtotime('-'.$z.' days' , $d);
                                        $day1 = date('w', $d1);
                                        $d2= date('Y-m-d', $d1);
                                        
                                         $addOrNot = DB::table('eventchanges')
                                            ->where('event_id', '=', $more->id)
                                            ->where('dateOfChange', '=', $d2)
                                            ->get();
                                        
                                    
                                        if(($d2 >= $more->startDate) && (sizeof($addOrNot)==0) && !($day1 == 0 || $day1 == 6) )
                                        {
                                            $more->startDay = $d2;
                                            array_push($days[$i]['events'], $more); 
                                        }
                                    
                                        $z++;
                                    
                                    }
                                }
                            }
                            
                        
                            if($more->repeatWeekly != null)
                            {
                                if(($more->neverEnds == false) && ($date > $more->endRepetitionDate))
                                {
                                    $d = strtotime($date);
                                    $z=0;
                                    
                                    while($z < $more->eventLength)
                                    {
                                        $d1 = strtotime('-'.$z.' days' , $d);
                                        $day1 = date('w', $d1) + 11;
                                        $d2= date('Y-m-d', $d1);
                                        
                                         $addOrNot = DB::table('eventchanges')
                                            ->where('event_id', '=', $more->id)
                                            ->where('dateOfChange', '=', $d2)
                                            ->get();
                                    
                                        if(($d2 <= $more->endRepetitionDate) && (sizeof($addOrNot)==0) && (($more->repeatWeekly) % $day1 == 0) )
                                        {
                                            $more->startDay = $d2;
                                            array_push($days[$i]['events'], $more); 
                                        }
                                    
                                        $z++;
                                    
                                    }
                                }else{
                                    
                                    $d = strtotime($date);
                                    $z=0;
                                    while($z < $more->eventLength)
                                    {
                                        
                                        $d1 = strtotime('-'.$z.' days' , $d);
                                        $day1 = date('w', $d1) + 11;
                                        $d2= date('Y-m-d', $d1);
                                        
                                         $addOrNot = DB::table('eventchanges')
                                            ->where('event_id', '=', $more->id)
                                            ->where('dateOfChange', '=', $d2)
                                            ->get();
                                        
                                    
                                        if(($d2 >= $more->startDate) && (sizeof($addOrNot)==0) && (($more->repeatWeekly) % $day1 == 0))
                                        {
                                            $more->startDay = $d2;
                                            array_push($days[$i]['events'], $more); 
                                        }
                                    
                                        $z++;
                                    
                                    }
                                }
                                
                            }
                            
                            if($more->repeatMonthly != "")
                            {
                                
                                $z=0;
                                while($z < $more->eventLength)
                                {
                                    $d = strtotime($date);
                                    $d1 = strtotime('-'.$z.' days' , $d);
                                    $dayOfMonth = date('j', $d1);
                                    $d2= date('Y-m-d', $d1);
                                    
                                     $addOrNot = DB::table('eventchanges')
                                            ->where('event_id', '=', $more->id)
                                            ->where('dateOfChange', '=', $d2)
                                            ->get();
                                            
                                    if(($dayOfMonth == $more->repeatMonthly) && (sizeof($addOrNot)==0) )
                                    {
                                        $more->startDay = $d2;
                                        array_push($days[$i]['events'], $more); 
                                    }
                                    
                                    $z++;
                                    
                                }
                                
                            }
                            
                            
                            if($more->repeatYearly != null)
                            {
                                $z=0;
                                while($z < $more->eventLength)
                                {
                                    $d = strtotime($date);
                                    $d1 = strtotime('-'.$z.' days' , $d);
                                    $month1 = date('n-j', $d1);
                                    $d2= date('Y-m-d', $d1);
                                    
                                    $addOrNot = DB::table('eventchanges')
                                            ->where('event_id', '=', $more->id)
                                            ->where('dateOfChange', '=', $d2)
                                            ->get();
                                    
                                    if($month1 == $more->repeatYearly && (sizeof($addOrNot)==0))
                                    {
                                        $more->startDay = $d2;
                                        array_push($days[$i]['events'], $more); 
                                    }
                                    $z++;
                                    
                                }
                                
                            }
                            
                        }
                    }

                
            }
            
            
               usort($days[$i]['events'], function($a, $b)
            {
                return strcmp($a->startDay, $b->startDay);
            });
            
            
            
             $events = DB::table('events')
                ->leftJoin('repetitions', 'events.id', '=', 'repetitions.eventId' )
                ->leftJoin('calendars', 'events.calendarId', '=', 'calendars.id')
                ->where('startDate', '=', $date)
                ->where('eventLength', '=', 1)
                ->orWhere(function($query) use($date, $dayOfWeek, $month, $day, $isWeekDay){
                   $query->where('repeats', '=', true)
                         ->where('eventLength', '=', 1)
                         ->where('startDate', '<', $date)
                         ->where(function($query1) use($date){
                             $query1->where('endRepetitionDate', '>=', $date)
                                    ->orWhere('neverEnds', '=', true);
                            })
                        ->where(function($query2) use($dayOfWeek, $month, $day, $isWeekDay){
                             $query2->where('repeatDaily', '=', true)
                                    ->orWhere('repeatWeekdays', '=', $isWeekDay)
                                    ->orWhere(function($query3) use($dayOfWeek){
                                        $query3->whereNotNull('repeatWeekly')
                                                ->whereRaw('repeatWeekly % '.$dayOfWeek.' = 0');
                                    })
                                    ->orWhere('repeatMonthly', '=', $day)
                                    ->orWhere('repeatYearly', '=', $month);
                        });
                        
                })
                ->orderBy('startTime', 'asc')
                ->select('events.id as id', 'events.name as name', 'events.calendarId as calendarId', 'events.eventLength as eventLength', 
                'events.startDate as startDate', 'events.endDate as endDate', 'events.repeats as repeats' ,
                'events.allDay', 'events.startTime', 'events.endTime', 'events.startTimeDisplay', 'events.endTimeDisplay',  
                'repetitions.repeatOccurrence', 'repetitions.endRepetitionDate', 'repetitions.repeatDaily', 'repetitions.repeatWeekdays', 
                'repetitions.repeatWeekly', 'repetitions.repeatMonthly', 'repetitions.repeatYearly', 'repetitions.neverEnds')
                ->get();
                
                
                
            foreach($events as $event)
            {
                
                $okToAdd= true;
                $addOrNot = DB::table('eventchanges')
                        ->where('event_id', '=', $event->id)
                        ->where('dateOfChange', '=', $date)
                        ->get();
                        
                if(sizeof($addOrNot)==0)
                {
                    $event->startDay = $event->startDate;
                    $event->more = false;
                    array_push($days[$i]['events'], $event);

                }

            }
         
            
        }

        return Response::json($days);
        
    }

   
   
    public function store()
    {
        $name= Input::get('name');
        $calendarId = Input::get('calendarId');
        $startDate= Input::get('startDate');
        $endDate=Input::get('endDate');
        $eventLength= Input::get('eventLength');
        $startTime=Input::get('startTime');
        $endTime=Input::get('endTime');
        $startTimeDisplay= Input::get('startTimeDisplay');
        $endTimeDisplay = Input::get('endTimeDisplay');
        $allDay = Input::get('allDay');
        $repeats=Input::get('repeats');
       
        
        
        
        Event::create(array(
            'name'=>$name,
            'calendarId'=>$calendarId,
            'startDate'=>$startDate,
            'endDate'=>$endDate,
            'eventLength'=>$eventLength,
            'startTime'=>$startTime,
            'endTime'=>$endTime,
            'startTimeDisplay'=>$startTimeDisplay,
            'endTimeDisplay'=>$endTimeDisplay,
            'allDay'=>$allDay,
            'repeats'=>$repeats
            ));
            
            $eventId= DB::table('events')->where('name', '=', $name)->value('id');
            
            return Response::json(['eventId'=>$eventId, 'repeats'=>$repeats]);
    }

    

    
    
    public function update($id)
    {
        $name= Input::get('name');
        $calendarId = Input::get('calendarId');
        $startDate= Input::get('startDate');
        $endDate=Input::get('endDate');
        $eventLength= Input::get('eventLength');
        $startTime=Input::get('startTime');
        $endTime=Input::get('endTime');
        $allDay = Input::get('allDay');
        $startTimeDisplay= Input::get('startTimeDisplay');
        $endTimeDisplay = Input::get('endTimeDisplay');
        $repeats=Input::get('repeats');
        
        DB::table('events')->where('id', '=', $id)->update(['name' => $name, 'calendarId'=>$calendarId, 'startDate'=> $startDate, 'endDate'=>$endDate,
         'startTime'=>$startTime, 'endTime'=>$endTime, 'allDay'=>$allDay,  'startTimeDisplay'=>$startTimeDisplay, 'endTimeDisplay'=>$endTimeDisplay,
         'eventLength'=>$eventLength, 'repeats'=>$repeats]);
        
         return Response::json(['id'=>$id, 'repeats'=>$repeats]);
    }
    

    
    public function destroy($id)
    {
         DB::table('events')->where('id', '=', $id)->delete();
                
        return Response::json(array('success'=>true));
    }
    
    
    public function deleteEvents($id)
    {
        
        $events = DB::table('events')->where('calendarId', '=', $id)->get();
        foreach($events as $event)
        {
            DB::table('repetitions')->where('eventId', '=', $event->id)->delete();
            DB::table('eventchanges')->where('event_id', '=', $event->id)->delete();
        }
        
        
        DB::table('events')
                ->where('calendarId', '=', $id)
                ->delete();
                
        return Response::json(array('success'=>true));
    }
}
