<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Calendar;
use Response;
use Input;
use DB;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class CalendarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $user_id = Auth::id();
        $calendars = Calendar::where('user_id', '=', $user_id)
                    ->get();
        return Response::json($calendars->toArray());
    }
    
    public function getMain()
    {
        $user_id = Auth::id();
        $name = DB::table('users')->where('id', '=', $user_id)->value('first_name');
        
        $calendar = Calendar::where('user_id', '=', $user_id)
                    ->where('name', '=', $name)
                    ->first();
        return Response::json($calendar);
    }

   
    public function store(Request $request)
    {
        $name = Input::get('name');
        $color = Input::get('color');
        $user_id = Auth::id();
        
        Calendar::create(array(
            'name'=> $name,
            'color'=>$color,
            'user_id'=>$user_id
            ));
            
        $addedCalendarId= DB::table('calendars')->where('name', '=', $name)->value('id');
        return Response::json(['name'=>$name, 'color'=>$color, 'id'=>$addedCalendarId]);  
    }

   
    public function update($id)
    {
        $name= Input::get('name');
        $color= Input::get('color');
        
        DB::table('calendars')->where('id', '=', $id)->update(['name' => $name, 'color'=> $color]);
        
         return Response::json(['id'=>$id, 'name'=>$name, 'color'=>$color]);
    }

    
    public function destroy($id)
    {
        $events = DB::table('events')->where('calendar_id', '=', $id)->get();
        foreach($events as $event)
        {
            DB::table('repetitions')->where('event_id', '=', $event->id)->delete();
            DB::table('eventchanges')->where('event_id', '=', $event->id)->delete();
        }
        
        DB::table('events')
                ->where('calendar_id', '=', $id)
                ->delete();
                
        DB::table('calendars')->where('id', '=', $id)->delete();
                
        return Response::json(array('success'=>true));
    }
}
