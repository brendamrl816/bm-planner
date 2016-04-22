<?php

namespace App\Http\Controllers;

use App\Event;
use App\User;
use App\Calendar;
use App\Repetition;

use Response;
use Input;
use DB;

use Illuminate\Support\Facades\Auth;
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
        
        $user_id = Auth::id();
        
        $long_events = Event::where(function($mainquery) use($user_id){
            $mainquery->where('user_id', '=', $user_id)
                      ->where('eventLength', '>', 1);
                    
            })->get();
        
    
        
        for($i=0; $i<7; $i++)
        {
            
            $d = mktime(0, 0, 0, $startMonth, $startDay + $i, $startYear);
            $days[$i] = array('date' => date('Y-m-d', $d) , 'events'=>array());
            $date = $days[$i]['date'];
            
            $dayOfWeek = date('w', $d);
            $dayOfWeekString = '%'.(string)$dayOfWeek.'%';
            $month = date('n-j', $d);
            $day = date('j', $d);
            if(!($dayOfWeek == 0 || $dayOfWeek == 6))
            {
                $isWeekDay = '*';
            }else{
                $isWeekDay= '!';
            }
            
            

            
            foreach( $long_events as $more)
            {
                if($more->repeats == false)
                {
                    $more->repeatOccurrence = null;
                    $more->repeatInterval = null;
                    $more->repeatEndDate = null;
                    $more->repeatDaily = null;
                    $more->repeatWeekdays = null;
                    $more->repeatWeekly = null;
                    $more->repeatMonthly = null;
                    $more->repeatYearly = null;
                    $more->neverEnds = null;
                    
                    if(($more->startDate <= $date)  && ($more->endDate >= $date))
                    {
                        $eventStartsOn = $more->startDate;
                        array_push($days[$i]['events'], ['event'=> $more, 'eventStartsOn'=> $eventStartsOn]);
                    }
                }
                else
                {
                        $rep = Repetition::where('event_id', '=', $more->id)
                             ->first();
                                
                        $more->repeatOccurrence = $rep->repeatOccurrence;
                        $more->repeatInterval = $rep->repeatInterval;
                        $more->repeatEndDate = $rep->repeatEndDate;
                        $more->repeatDaily = $rep->repeatDaily;
                        $more->repeatWeekdays = $rep->repeatWeekdays;
                        $more->repeatWeekly = $rep->repeatWeekly;
                        $more->repeatMonthly = $rep->repeatMonthly;
                        $more->repeatYearly = $rep->repeatYearly;
                        $more->neverEnds = $rep->neverEnds;
                                
                                
                        $extend = strtotime('+'.$more->eventLength.' days' , strtotime($more->repeatEndDate));
                        $extend = date('Y-m-d', $extend);
                    
                        if(($more->startDate <= $date)  && (($more->neverEnds == true) ||  ($extend >= $date)) )
                        {
                        
                            if($more->repeatDaily == '*')
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
                                
                                    if(($d2 <= $more->repeatEndDate || $more->neverEnds == true) && ($d2 >= $more->startDate) && (sizeof($addOrNot)==0))
                                    {
                                        $eventStartsOn = $d2;
                                        array_push($days[$i]['events'], ['event'=> $more, 'eventStartsOn'=> $eventStartsOn]);
                                    }
                                    $z++;
                                }
                            }
                        
                        
                            else if($more->repeatWeekdays == '*' )
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
                                
                                    if(($d2 >= $more->startDate) && ($d2 <= $more->repeatEndDate || $more->neverEnds == true) && !($day1 == 0 || $day1 == 6)  && (sizeof($addOrNot)==0))
                                    {
                                        $eventStartsOn = $d2;
                                        array_push($days[$i]['events'], ['event'=> $more, 'eventStartsOn'=> $eventStartsOn]);
                                    }
                                
                                    $z++;
                                
                                }
                            }
                            
                        
                            else if($more->repeatWeekly != null)
                            {
                                $d = strtotime($date);
                                $z=0;
                                
                                while($z < $more->eventLength)
                                {
                                    $d1 = strtotime('-'.$z.' days' , $d);
                                    $day1 = (string)date('w', $d1);
                                    $d2= date('Y-m-d', $d1);
                                    
                                     $addOrNot = DB::table('eventchanges')
                                        ->where('event_id', '=', $more->id)
                                        ->where('dateOfChange', '=', $d2)
                                        ->get();
                                
                                    if(($d2 >= $more->startDate) && ($d2 <= $more->repeatEndDate || $more->neverEnds == true) && (sizeof($addOrNot)==0) && (strpbrk($more->repeatWeekly, $day1) != null) )
                                    {
                                        
                                        $base = strtotime($d2);
                                        $day_week_ = date('l', $base);
                                        $start = strtotime($more->startDate);
                                        $start = strtotime('last sunday', mktime(0,0,0,date('n', $start),date('d', $start) - 7, date('Y', $start)));
                                        
                                        if(date('l', $start) != $day_week_)
                                        {
                                            
                                            $start_date = date("Y-m-d", strtotime('next '.$day_week_, mktime(0,0,0,date('n', $start), date('d', $start),date('Y', $start))));
                                        }
                                        else{
                                            $start_date = $more->startDate;
                                        }
                                        $base = date_timestamp_get(date_create($d2));
                                        $repeat_start = date_timestamp_get(date_create($start_date));
                                        
                                        if(($base - $repeat_start) % $more->repeatInterval == 0)
                                        {
                                            $eventStartsOn = $d2;
                                            array_push($days[$i]['events'], ['event'=> $more, 'eventStartsOn'=> $eventStartsOn]);
                                        }
                                    }
                                    
                                    $z++;
                                }
                            }
                            
                            else if($more->repeatMonthly != "")
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
                                            
                                    if(($dayOfMonth == $more->repeatMonthly) && (sizeof($addOrNot)==0) && ($d2 >= $more->startDate) && ($d2 <= $more->repeatEndDate || $more->neverEnds == true) )
                                    {
                                        $diff = date_diff(date_create($more->startDate), date_create($d2));
                                        $year_diff = $diff->format('%y');
                                        $month_diff = $diff->format('%m');
                                        if($year_diff > 0)
                                        {
                                            $month_diff = $month_diff + ($year_diff * 12);
                                        }
                                        if($month_diff % $more->repeatInterval == 0)
                                        {
                                            $eventStartsOn = $d2;
                                            array_push($days[$i]['events'], ['event'=> $more, 'eventStartsOn'=> $eventStartsOn]);
                                        }
                                    }
                                    
                                    $z++;
                                    
                                }
                                
                            }
                            
                            
                            else if($more->repeatYearly != null)
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
                                    
                                    if($month1 == $more->repeatYearly && (sizeof($addOrNot)==0) && ($d2 >= $more->startDate) && ($d2 <= $more->repeatEndDate || $more->neverEnds == true) )
                                    {
                                        $diff = date_diff(date_create($more->startDate), date_create($d2))->format('%y');
                                        if($diff % $more->repeatInterval == 0)
                                        {
                                            $eventStartsOn = $d2;
                                            array_push($days[$i]['events'], ['event'=> $more, 'eventStartsOn'=> $eventStartsOn]);
                                        }
                                    }
                                    $z++;
                                }
                                
                            }
                            
                        }
                }

                
            }
            
            sort($days[$i]['events']);
            usort($days[$i]['events'], function($a, $b){
                return strcmp($a['eventStartsOn'], $b['eventStartsOn']);
            });
           
            $flag = '*';
            $events = Event::where(function($eventquery) use($user_id, $date, $dayOfWeekString, $month, $day, $isWeekDay, $flag){
                $eventquery ->where('user_id', '=', $user_id)
                            ->where('eventLength', '=', 1)
                            ->where(function($query) use( $date, $dayOfWeekString, $month, $day, $isWeekDay, $flag){
                                $query  ->where(function($norepquery) use($date){
                                            $norepquery->where('startDate', '=', $date)
                                                       ->where('repeats', '=', false);
                                        })
                                        ->orWhereHas('repetitions', function($repquery)use( $date, $dayOfWeekString, $month, $day, $isWeekDay, $flag){
                                            $repquery->where('startDate', '<=', $date)
                                                     ->where(function($query1) use($date){
                                                        $query1 ->where('repeatEndDate', '>=', $date)
                                                                ->orWhere('neverEnds', '=', true);
                                                        })
                                                     ->where(function($query2) use($dayOfWeekString, $month, $day, $isWeekDay, $flag){
                                                            $query2->where('repeatDaily', '=', $flag)
                                                                    ->orWhere('repeatWeekdays', '=', $isWeekDay)
                                                                    ->orWhere(function($query3) use($dayOfWeekString){
                                                                        $query3 ->whereNotNull('repeatWeekly')
                                                                                ->where('repeatWeekly', 'like', $dayOfWeekString);
                                                                    })
                                                                    ->orWhere('repeatMonthly', '=', $day)
                                                                    ->orWhere('repeatYearly', '=', $month);
                                                     });
                        
                                        });
                            });
            })->orderBy('startTime', 'asc')->orderBy('endTime', 'desc')->get();
            
           
            foreach($events as $event)
            {
                if($event->repeats ==false)
                {
                    $event->repeatOccurrence = null;
                    $event->repeatInterval = null;
                    $event->repeatEndDate = null;
                    $event->repeatDaily = null;
                    $event->repeatWeekdays = null;
                    $event->repeatWeekly = null;
                    $event->repeatMonthly = null;
                    $event->repeatYearly = null;
                    $event->neverEnds = null;
                    array_push($days[$i]['events'], ['event'=>$event, 'eventStartsOn'=>$event->startDate]);
                }
                else{
                    $rep = Repetition::where('event_id', '=', $event->id)
                                ->first();
                                
                        $event->repeatOccurrence = $rep->repeatOccurrence;
                        $event->repeatInterval = $rep->repeatInterval;
                        $event->repeatEndDate = $rep->repeatEndDate;
                        $event->repeatDaily = $rep->repeatDaily;
                        $event->repeatWeekdays = $rep->repeatWeekdays;
                        $event->repeatWeekly = $rep->repeatWeekly;
                        $event->repeatMonthly = $rep->repeatMonthly;
                        $event->repeatYearly = $rep->repeatYearly;
                        $event->neverEnds = $rep->neverEnds;
                        
                        $okToAdd= true;
                        $addOrNot = DB::table('eventchanges')
                                ->where('event_id', '=', $event->id)
                                ->where('dateOfChange', '=', $date)
                                ->get();
                                
                        if(sizeof($addOrNot)==0)
                        {
                                if($event->repeatOccurrence == "daily")
                                {
                                    $eventStartsOn = $date;
                                    array_push($days[$i]['events'], ['event'=> $event, 'eventStartsOn'=> $eventStartsOn]);
                                }
                                else if($event->repeatOccurrence == "weekday")
                                {
                                    $eventStartsOn = $date;
                                    array_push($days[$i]['events'], ['event'=> $event, 'eventStartsOn'=> $eventStartsOn]);
                                }
                                else if($event->repeatOccurrence == "weekly")
                                {
                                    $base = strtotime($date);
                                    $day_week_ = date('l', $base);
                                    $start = strtotime($event->startDate);
                                    $start = strtotime('last sunday', mktime(0,0,0,date('n', $start),date('d', $start) - 7 ,date('Y', $start)));
                                    
                                    if(date('l', $start) != $day_week_)
                                    {
                                        $start_date = date("Y-m-d", strtotime('next '.$day_week_, mktime(0,0,0,date('n', $start),date('d', $start) ,date('Y', $start))));
                                    }
                                    else{
                                        $start_date = $event->startDate;
                                    }
                                    $base = date_timestamp_get(date_create($date));
                                    $repeat_start = date_timestamp_get(date_create($start_date));
                                    
                                    if(($base - $repeat_start)  % $event->repeatInterval == 0)
                                    {
                                        $eventStartsOn = $date;
                                        array_push($days[$i]['events'], ['event'=> $event, 'eventStartsOn'=> $eventStartsOn]);
                                    }
                                }
                                else if($event->repeatOccurrence == "monthly"){
                                    
                                    $diff = date_diff(date_create($event->startDate), date_create($date));
                                    $year_diff = $diff->format('%y');
                                    $month_diff = $diff->format('%m');
                                    if($year_diff > 0)
                                    {
                                        $month_diff = $month_diff + ($year_diff * 12);
                                    }
                                    if($month_diff % $event->repeatInterval == 0)
                                    {
                                        $eventStartsOn = $date;
                                        array_push($days[$i]['events'], ['event'=> $event, 'eventStartsOn'=> $eventStartsOn]);
                                    }
                                   
                                }
                                else if($event->repeatOccurrence == "yearly"){
                                    $diff = date_diff(date_create($event->startDate), date_create($date))->format('%y');
                                    if($diff % $event->repeatInterval == 0)
                                    {
                                        $eventStartsOn = $date;
                                        array_push($days[$i]['events'], ['event'=> $event, 'eventStartsOn'=> $eventStartsOn]);
                                    }
                                }
                        }
                }
            }
         
        }

        return Response::json($days);
        
    }

  
    public function store()
    {
        $name= Input::get('name');
        $calendar_id = Input::get('calendar_id');
        $startDate= Input::get('startDate');
        $endDate=Input::get('endDate');
        $eventLength= Input::get('eventLength');
        $startTime=Input::get('startTime');
        $endTime=Input::get('endTime');
        $startTimeDisplay= Input::get('startTimeDisplay');
        $endTimeDisplay = Input::get('endTimeDisplay');
        $allDay = Input::get('allDay');
        $repeats=Input::get('repeats');
       
        $user_id = Auth::id();
        
        
        $id = Event::create(array(
            'name'=>$name,
            'user_id'=>$user_id,
            'calendar_id'=>$calendar_id,
            'startDate'=>$startDate,
            'endDate'=>$endDate,
            'eventLength'=>$eventLength,
            'startTime'=>$startTime,
            'endTime'=>$endTime,
            'startTimeDisplay'=>$startTimeDisplay,
            'endTimeDisplay'=>$endTimeDisplay,
            'allDay'=>$allDay,
            'repeats'=>$repeats
            ))->id;
            
            
            return Response::json(['id'=>$id, 'repeats'=>$repeats]);
    }

    

    
    
    public function update($id)
    {
        $name= Input::get('name');
        $calendar_id = Input::get('calendar_id');
        $startDate= Input::get('startDate');
        $endDate=Input::get('endDate');
        $eventLength= Input::get('eventLength');
        $startTime=Input::get('startTime');
        $endTime=Input::get('endTime');
        $allDay = Input::get('allDay');
        $startTimeDisplay= Input::get('startTimeDisplay');
        $endTimeDisplay = Input::get('endTimeDisplay');
        $repeats=Input::get('repeats');
        
        DB::table('events')->where('id', '=', $id)->update(['name' => $name, 'calendar_id'=>$calendar_id, 'startDate'=> $startDate, 'endDate'=>$endDate,
         'startTime'=>$startTime, 'endTime'=>$endTime, 'allDay'=>$allDay,  'startTimeDisplay'=>$startTimeDisplay, 'endTimeDisplay'=>$endTimeDisplay,
         'eventLength'=>$eventLength, 'repeats'=>$repeats]);
        
         return Response::json(['id'=>$id, 'repeats'=>$repeats]);
    }
    
    public function upddateStartDate()
    {
        $id = Input::get('id');
        $startDate = Input::get('startDate');
        DB::table('events')->where('id', '=', $id)->update(['startDate'=> $startDate]);
        
        return Response::json(array('success'=>true));
    }
    

    
    public function destroy($id)
    {
        DB::table('repetitions')->where('event_id', '=', $id)->delete();
        DB::table('eventchanges')->where('event_id', '=', $id)->delete();        
        DB::table('events')->where('id', '=', $id)->delete();
                
        return Response::json(array('success'=>true));
    }
    
    
}
