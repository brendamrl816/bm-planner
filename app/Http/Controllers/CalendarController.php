<?php

namespace App\Http\Controllers;

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
        $calendars =Calendar::all();
        return Response::json($calendars->toArray());
    }

   
    public function store(Request $request)
    {
        $name = Input::get('name');
        $color = Input::get('color');
        
        Calendar::create(array(
            'name'=> $name,
            'color'=>$color
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
        DB::table('calendars')->where('id', '=', $id)->delete();
                
        return Response::json(array('success'=>true));
    }
}
