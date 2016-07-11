<?php

namespace App\Http\Controllers;

use App\Repetition;
use Response;
use Input;
use DB;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class RepetitionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
   
    public function store(Request $request)
    {
        $event_id = Input::get('event_id');
        $repeatOccurrence = Input::get('repeatOccurrence');
        $repeatInterval = Input::get('repeatInterval');
        $repeatEndDate = Input::get('repeatEndDate');
        $repeatDaily= Input::get('repeatDaily');
        $repeatWeekdays= Input::get('repeatWeekdays');
        $repeatWeekly= Input::get('repeatWeekly');
        $repeatMonthly= Input::get('repeatMonthly');
        $repeatYearly= Input::get('repeatYearly');
        $neverEnds= Input::get('neverEnds');
        
        Repetition::create(array(
            'event_id'=>$event_id,
            'repeatOccurrence' =>$repeatOccurrence,
            'repeatInterval' =>$repeatInterval,
            'repeatEndDate'=>$repeatEndDate,
            'repeatDaily'=>$repeatDaily,
            'repeatWeekdays'=>$repeatWeekdays,
            'repeatWeekly'=>$repeatWeekly,
            'repeatMonthly'=>$repeatMonthly,
            'repeatYearly'=>$repeatYearly,
            'neverEnds'=>$neverEnds
            ));
            
            return Response::json(array('success'=>true));
    }

   
     
    public function update($id)
    {
        $repeatOccurrence = Input::get('repeatOccurrence');
        $repeatInterval = Input::get('repeatInterval');
        $repeatEndDate = Input::get('repeatEndDate');
        $repeatDaily= Input::get('repeatDaily');
        $repeatWeekdays= Input::get('repeatWeekdays');
        $repeatWeekly= Input::get('repeatWeekly');
        $repeatMonthly= Input::get('repeatMonthly');
        $repeatYearly= Input::get('repeatYearly');
        $neverEnds= Input::get('neverEnds');
        
        
        DB::table('repetitions')->where('event_id', '=', $id)->update(['repeatOccurrence' =>$repeatOccurrence,
            'repeatInterval' =>$repeatInterval,
            'repeatEndDate'=>$repeatEndDate,
            'repeatDaily'=>$repeatDaily,
            'repeatWeekdays'=>$repeatWeekdays,
            'repeatWeekly'=>$repeatWeekly,
            'repeatMonthly'=>$repeatMonthly,
            'repeatYearly'=>$repeatYearly,
            'neverEnds'=>$neverEnds]);
            
        return Response::json(array('success'=>true));
    }
    
    public function changeEnd()
    {   
        $id = Input::get('event_id');
        $newRepeatEndDate = Input::get('newRepeatEndDate');
        
        DB::table('repetitions')->where('event_id', '=', $id)->update([ 'repeatEndDate'=>$newRepeatEndDate, 'neverEnds'=>false]);
        
        return Response::json(array('success'=>true));
    }
    
    public function destroy($id)
    {
        DB::table('repetitions')->where('event_id', '=', $id)->delete();
                
        return Response::json(array('success'=>true));
    }
  
}
