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
        $eventId = Input::get('eventId');
        $repeatOccurrence = Input::get('repeatOccurrence');
        $endRepetitionDate = Input::get('endRepetitionDate');
        $repeatDaily= Input::get('repeatDaily');
        $repeatWeekdays= Input::get('repeatWeekdays');
        $repeatWeekly= Input::get('repeatWeekly');
        $repeatMonthly= Input::get('repeatMonthly');
        $repeatYearly= Input::get('repeatYearly');
        $neverEnds= Input::get('neverEnds');
        
        Repetition::create(array(
            'eventId'=>$eventId,
            'repeatOccurrence' =>$repeatOccurrence,
            'endRepetitionDate'=>$endRepetitionDate,
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
        $endRepetitionDate = Input::get('endRepetitionDate');
        $repeatDaily= Input::get('repeatDaily');
        $repeatWeekdays= Input::get('repeatWeekdays');
        $repeatWeekly= Input::get('repeatWeekly');
        $repeatMonthly= Input::get('repeatMonthly');
        $repeatYearly= Input::get('repeatYearly');
        $neverEnds= Input::get('neverEnds');
        
        
        DB::table('repetitions')->where('eventId', '=', $id)->update(['repeatOccurrence' =>$repeatOccurrence,
            'endRepetitionDate'=>$endRepetitionDate,
            'repeatDaily'=>$repeatDaily,
            'repeatWeekdays'=>$repeatWeekdays,
            'repeatWeekly'=>$repeatWeekly,
            'repeatMonthly'=>$repeatMonthly,
            'repeatYearly'=>$repeatYearly,
            'neverEnds'=>$neverEnds]);
            
        return Response::json(array('success'=>true));
    }
    
     public function changeEnd()
    {   $id = Input::get('eventId');
        $newEndRepetitionDate = Input::get('newEndDate');
        
        DB::table('repetitions')->where('eventId', '=', $id)->update([ 'endRepetitionDate'=>$newEndRepetitionDate]);
        
        return Response::json(array('success'=>true));
    }
  
    public function destroy($id)
    {
        DB::table('repetitions')->where('eventId', '=', $id)->delete();
                
        return Response::json(array('success'=>true));
    }
}
