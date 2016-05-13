<?php

namespace App\Http\Controllers;

use App\Event;
use App\User;
use App\Calendar;
use App\Repetition;

use Response;
use Input;
use DB;
use Log;

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
                      ->where('length_days', '>', 0);
                    
            })->get();
        
    
        
        for($i=0; $i<7; $i++)
        {
            
            $bd = mktime(0, 0, 0, $startMonth, $startDay + $i, $startYear);
            $ed = mktime(23, 59, 59, $startMonth, $startDay + $i, $startYear);
            
            $days[$i] = [];
           
            $b_date = date('Y-m-d H:i:s', $bd);
            $e_date = date('Y-m-d H:i:s', $ed);
            
            $dayOfWeek = date('w', $bd);
            $dayOfWeekString = '%'.(string)$dayOfWeek.'%';
            
            $month = date('n-j', $bd);
            $day = date('j', $bd);
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
                    
                    if(($more->startDate <= $e_date)  && (!($more->endDate <= $b_date)))
                    {
                        $eventStartsOn = $more->startDate;
                        array_push($days[$i], ['event'=>$more, 'eventStartsOn'=>$eventStartsOn]);
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
                                
                                
                        $extend = strtotime('+'.$more->length_hours.' hour' , strtotime($more->repeatEndDate));
                        $extend = date('Y-m-d H:i:s', $extend);
                    
                        if(($more->startDate <= $e_date)  && (($more->neverEnds == true) ||  ($extend >= $b_date)) )
                        {
                        
                            if($more->repeatDaily == '*')
                            {
                                $z = 0;
                                
                                //subtract the number of days(z) of the event from the date; 
                                //if the subtracted date falls between the startdate and repetition end date, 
                                //then the event can be addeded to that date!
                                while($z <= $more->length_hours/24)
                                {
                                    $d_0 = strtotime('-'.$z.' days' , $bd);
                                    $d_23 = strtotime('-'.$z.' days' , $ed);
                                    
                                    $d1= date('Y-m-d H:i:s', $d_0);
                                    $d2= date('Y-m-d H:i:s', $d_23);
                                    
                                     $addOrNot = DB::table('eventchanges')
                                        ->where('event_id', '=', $more->id)
                                        ->where('dateOfChange', '=', $d2)
                                        ->get();
                                
                                    if(($d1 <= $more->repeatEndDate || $more->neverEnds == true) && ($d2 >= $more->startDate) && (sizeof($addOrNot)==0))
                                    {
                                        $sDate = strtotime($more->startDate);
                                        $eventStartsOn = date('Y-m-d H:i:s', mktime(date('G', $sDate), date('i', $sDate), 0, date('n', $d_0),date('d', $d_0) ,date('Y', $d_0)));
                                        array_push($days[$i], ['event'=>$more, 'eventStartsOn'=>$eventStartsOn]);
                                    }
                                    $z++;
                                }
                            }
                        
                        
                            else if($more->repeatWeekdays == '*' )
                            {
                                $z = 0;
                            
                                while($z <= $more->length_hours/24)
                                {
    
                                    $d_0 = strtotime('-'.$z.' days' , $bd);
                                    $d_23 = strtotime('-'.$z.' days' , $ed);
                                    $week_day = date('w', $d_0);
                                    $d1= date('Y-m-d H:i:s', $d_0);
                                    $d2= date('Y-m-d H:i:s', $d_23);
                                    
                                    $addOrNot = DB::table('eventchanges')
                                        ->where('event_id', '=', $more->id)
                                        ->where('dateOfChange', '=', $d2)
                                        ->get();
                                
                                    if(($d2 >= $more->startDate) && ($d1 <= $more->repeatEndDate || $more->neverEnds == true) && !($week_day == 0 || $week_day == 6)  && (sizeof($addOrNot)==0))
                                    {
                                        $sDate = strtotime($more->startDate);
                                        $eventStartsOn = date('Y-m-d H:i:s', mktime(date('G', $sDate), date('i', $sDate), 0, date('n', $d_0),date('d', $d_0) ,date('Y', $d_0)));
                                        array_push($days[$i], ['event'=>$more, 'eventStartsOn'=>$eventStartsOn]);
                                    }
                                
                                    $z++;
                                }
                            }
                            
                    
                            else if($more->repeatWeekly != null)
                            {
                                $z = 0;
                                
                                while($z <= $more->length_hours/24)
                                {
                                    $d_0 = strtotime('-'.$z.' days' , $bd);
                                    $d_23 = strtotime('-'.$z.' days' , $ed);
                                    $week_day = date('w', $d_0);
                                    $d1= date('Y-m-d H:i:s', $d_0);
                                    $d2= date('Y-m-d H:i:s', $d_23);
                                    
                                     $addOrNot = DB::table('eventchanges')
                                        ->where('event_id', '=', $more->id)
                                        ->where('dateOfChange', '=', $d2)
                                        ->get();
                                
                                    if(($d2 >= $more->startDate) && ($d1 <= $more->repeatEndDate || $more->neverEnds == true) && (sizeof($addOrNot)==0) && (strpbrk($more->repeatWeekly, $week_day) != null) )
                                    {
                                        
                                        $day_week_ = date('l', $d_0);
                                        $sDate = strtotime($more->startDate);
                                    
                                    
                                        if(date('l', $sDate) != $day_week_)
                                        {
                                            if(date('w', $sDate) < date('w', $d_0))
                                            {
                                                $start = strtotime('next sunday', mktime(0, 0, 0, date('n', $sDate), date('d', $sDate)-7, date('Y', $sDate)));
                                            }else{
                                                $start = strtotime('last sunday', mktime(0, 0, 0, date('n', $sDate), date('d', $sDate)-7, date('Y', $sDate)));
                                            }
                                            $start_date = date("Y-m-d", strtotime('next '.$day_week_, mktime(0, 0, 0, date('n', $start), date('d', $start), date('Y', $start))));
                                        }
                                        else{
                                            $start_date = date("Y-m-d", mktime(0, 0, 0, date('n', $sDate), date('d', $sDate), date('Y', $sDate)));
                                        }
                                    
                                        $base = date_timestamp_get(date_create(date('Y-m-d',$d_0)));
                                        $repeat_start = date_timestamp_get(date_create($start_date));
                                    
                                        if(($base - $repeat_start)  % $more->repeatInterval == 0)
                                        {
                                            $eventStartsOn = date('Y-m-d H:i:s', mktime(date('G', $sDate), date('i', $sDate), 0, date('n', $d_0),date('d', $d_0) ,date('Y', $d_0)));
                                            array_push($days[$i], ['event'=>$more, 'eventStartsOn'=>$eventStartsOn]);
                                        }
                                    }
                                    $z++;
                                }
                            }
                            
                            else if($more->repeatMonthly != "")
                            { 
                                $z=0;
                                while($z < $more->length_hours/24)
                                {
                                    $d_0 = strtotime('-'.$z.' days' , $bd);
                                    $d_23 = strtotime('-'.$z.' days' , $ed);
                                    $dayOfMonth = date('j', $d_0);
                                    $d1= date('Y-m-d H:i:s', $d_0);
                                    $d2= date('Y-m-d H:i:s', $d_23);
                                    
                                     $addOrNot = DB::table('eventchanges')
                                            ->where('event_id', '=', $more->id)
                                            ->where('dateOfChange', '=', $d2)
                                            ->get();
                                            
                                    if(($dayOfMonth == $more->repeatMonthly) && (sizeof($addOrNot)==0) && ($d2 >= $more->startDate) && ($d1 <= $more->repeatEndDate || $more->neverEnds == true) )
                                    {
                                        $sDate = strtotime($more->startDate);
                                        $diff = date_diff(date_create(date('Y-m-d', $sDate)), date_create(date('Y-m-d', $d_0)));
                                        
                                        $year_diff = $diff->format('%y');
                                        $month_diff = $diff->format('%m');
                                        if($year_diff > 0)
                                        {
                                            $month_diff = $month_diff + ($year_diff * 12);
                                        }
                                        if($month_diff % $more->repeatInterval == 0)
                                        {
                                            $eventStartsOn = date('Y-m-d H:i:s', mktime(date('G', $sDate), date('i', $sDate), 0, date('n', $d_0),date('d', $d_0) ,date('Y', $d_0)));
                                            array_push($days[$i], ['event'=>$more, 'eventStartsOn'=>$eventStartsOn]);
                                        }
                                    }
                                    $z++;
                                }
                            }
                            
                            
                            else if($more->repeatYearly != null)
                            {
                                $z=0;
                                while($z < $more->length_hours/24)
                                {
                                    $d_0 = strtotime('-'.$z.' days' , $bd);
                                    $d_23 = strtotime('-'.$z.' days' , $ed);
                                    $month1 = date('n-j', $d_0);
                                    $d1= date('Y-m-d H:i:s', $d_0);
                                    $d2= date('Y-m-d H:i:s', $d_23);
                                    
                                    $addOrNot = DB::table('eventchanges')
                                            ->where('event_id', '=', $more->id)
                                            ->where('dateOfChange', '=', $d2)
                                            ->get();
                                    
                                    if($month1 == $more->repeatYearly && (sizeof($addOrNot)==0) && ($d2 >= $more->startDate) && ($d1 <= $more->repeatEndDate || $more->neverEnds == true))
                                    {
                                        $sDate = strtotime($more->startDate);
                                        $diff = date_diff(date_create(date('Y-m-d', $sDate)), date_create(date('Y-m-d', $d_0)))->format('%y');
                                        
                                        if($diff % $more->repeatInterval == 0)
                                        {
                                            $eventStartsOn = date('Y-m-d H:i:s', mktime(date('G', $sDate), date('i', $sDate), 0, date('n', $d_0),date('d', $d_0) ,date('Y', $d_0)));
                                            array_push($days[$i], ['event'=>$more, 'eventStartsOn'=>$eventStartsOn]);
                                        }
                                    }
                                    $z++;
                                }
                            }
                        }
                        
                }
                
            }
            
            sort($days[$i]);
            usort($days[$i], function($a, $b){
                return strcmp($a['eventStartsOn'], $b['eventStartsOn']);
            });
           
            $flag = '*';
            $events = Event::where(function($eventquery) use($user_id, $b_date, $e_date, $dayOfWeekString, $month, $day, $isWeekDay, $flag){
                $eventquery ->where('user_id', '=', $user_id)
                            ->where('length_days', '=', 0)
                            ->where(function($query) use( $b_date, $e_date, $dayOfWeekString, $month, $day, $isWeekDay, $flag){
                                $query  ->where(function($norepquery) use($b_date, $e_date){
                                            $norepquery->where('startDate', '>=', $b_date)
                                                        ->where('startDate', '<=', $e_date)
                                                       ->where('repeats', '=', false);
                                        })
                                        ->orWhereHas('repetitions', function($repquery)use($b_date, $e_date, $dayOfWeekString, $month, $day, $isWeekDay, $flag){
                                            $repquery->where('startDate', '<=', $e_date)
                                                     ->where(function($query1) use($b_date){
                                                        $query1 ->where('repeatEndDate', '>=', $b_date)
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
            })->orderBy('startDate', 'asc')->orderBy('endDate', 'desc')->get();
            
           
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
                    array_push($days[$i], ['event'=>$event, 'eventStartsOn'=>$event->startDate]);
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
                                ->where('dateOfChange', '=', $b_date)
                                ->get();
                                
                        if(sizeof($addOrNot)==0)
                        {
                                if($event->repeatOccurrence == "daily")
                                {
                                    
                                    $sDate = strtotime($event->startDate);
                                    $eventStartsOn = date('Y-m-d H:i:s', mktime(date('G', $sDate), date('i', $sDate), 0, date('n', $bd),date('d', $bd) ,date('Y', $bd)));
                                    array_push($days[$i], ['event'=> $event, 'eventStartsOn'=> $eventStartsOn]);
                                }
                                else if($event->repeatOccurrence == "weekday")
                                {
                                    $sDate = strtotime($event->startDate);
                                    $eventStartsOn = date('Y-m-d H:i:s', mktime(date('G', $sDate), date('i', $sDate), 0, date('n', $bd),date('d', $bd) ,date('Y', $bd)));
                                    array_push($days[$i], ['event'=> $event, 'eventStartsOn'=> $eventStartsOn]);
                                }
                                else if($event->repeatOccurrence == "weekly")
                                {
                                    // Log::info('eventName: '. $event->name);
                                    // Log::info('startDate: '. $event->startDate);
                                    // Log::info('e_date: '. $e_date);
                                    
                                    $day_week_ = date('l', $bd);
                                    $sDate = strtotime($event->startDate);
                                    
                                    if(date('l', $sDate) != $day_week_)
                                    {
                                        if(date('w', $sDate) < date('w', $bd))
                                        {
                                            $start = strtotime('next sunday', mktime(0, 0, 0, date('n', $sDate), date('d', $sDate)-7, date('Y', $sDate)));
                                            // Log::info('eventName: '.$event->name. ', $start: '. date('Y-m-d', $start).', $date: '. $date);
                                        }else{
                                            $start = strtotime('last sunday', mktime(0, 0, 0, date('n', $sDate), date('d', $sDate)-7, date('Y', $sDate)));
                                        }
                                        $start_date = date("Y-m-d", strtotime('next '.$day_week_, mktime(0, 0, 0, date('n', $start), date('d', $start), date('Y', $start))));
                                        // Log::info('eventName: '.$event->name. ', $startDate: '. $start_date .', $date: '. $date);
                                    }
                                    else{
                                        
                                       $start_date = date("Y-m-d", mktime(0, 0, 0, date('n', $sDate), date('d', $sDate), date('Y', $sDate)));
                                        // Log::info('eventName: '.$event->name. ', $startDate: '. $start_date .', $date: '. $date);
                                    }
                                    
                                    $base = date_timestamp_get(date_create(date('Y-m-d', $bd)));
                                    $repeat_start = date_timestamp_get(date_create($start_date));
                                    
                                    if(($base - $repeat_start)  % $event->repeatInterval == 0)
                                    {
                                        $eventStartsOn = date('Y-m-d H:i:s', mktime(date('G', $sDate), date('i', $sDate), 0, date('n', $bd),date('d', $bd) ,date('Y', $bd)));
                                        array_push($days[$i], ['event'=> $event, 'eventStartsOn'=> $eventStartsOn]);
                                    }
                                }
                                
                                else if($event->repeatOccurrence == "monthly"){
                                    
                                    $sDate = strtotime($event->startDate);
                                    $diff = date_diff(date_create(date('Y-m-d', $sDate)), date_create(date('Y-m-d', $bd)));
                                    $year_diff = $diff->format('%y');
                                    $month_diff = $diff->format('%m');
                                    if($year_diff > 0)
                                    {
                                        $month_diff = $month_diff + ($year_diff * 12);
                                    }
                                    if($month_diff % $event->repeatInterval == 0)
                                    {
                                        $eventStartsOn = date('Y-m-d H:i:s', mktime(date('G', $sDate), date('i', $sDate), 0, date('n', $bd),date('d', $bd) ,date('Y', $bd)));
                                        array_push($days[$i], ['event'=> $event, 'eventStartsOn'=> $eventStartsOn]);
                                    }
                                   
                                }
                                else if($event->repeatOccurrence == "yearly"){
                                    
                                    $sDate = strtotime($event->startDate);
                                    $diff = date_diff(date_create(date('Y-m-d', $sDate)), date_create(date('Y-m-d', $bd)))->format('%y');
                                    if($diff % $event->repeatInterval == 0)
                                    {
                                        $eventStartsOn = date('Y-m-d H:i:s', mktime(date('G', $sDate), date('i', $sDate), 0, date('n', $bd),date('d', $bd) ,date('Y', $bd)));
                                        array_push($days[$i], ['event'=> $event, 'eventStartsOn'=> $eventStartsOn]);
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
        $length_hours= Input::get('length_hours');
        $length_days= Input::get('length_days');
        $allDay = Input::get('allDay');
        $repeats=Input::get('repeats');
       
        $user_id = Auth::id();
        
        
        $id = Event::create(array(
            'name'=>$name,
            'user_id'=>$user_id,
            'calendar_id'=>$calendar_id,
            'startDate'=>$startDate,
            'endDate'=>$endDate,
            'length_hours'=>$length_hours,
            'length_days'=>$length_days,
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
        $length_days= Input::get('length_days');
        $length_hours= Input::get('length_hours');
        $allDay = Input::get('allDay');
        $startTimeDisplay= Input::get('startTimeDisplay');
        $endTimeDisplay = Input::get('endTimeDisplay');
        $repeats=Input::get('repeats');
        
        DB::table('events')->where('id', '=', $id)->update(['name' => $name, 'calendar_id'=>$calendar_id, 'startDate'=> $startDate, 'endDate'=>$endDate,
         'allDay'=>$allDay,  'length_days'=>$length_days, 'length_hours'=>$length_hours, 'repeats'=>$repeats]);
        
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
