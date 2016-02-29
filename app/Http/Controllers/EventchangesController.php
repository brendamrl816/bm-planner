<?php

namespace App\Http\Controllers;

use App\Eventchange;
use Response;
use Input;
use DB;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class EventchangesController extends Controller
{
    
    public function index()
    {
        //
    }

   
    public function store(Request $request)
    {
        $event_id = Input::get('event_id');
        $dateOfChange = Input::get('dateOfChange');
        
        Eventchange::create(array(
            'event_id'=>$event_id,
            'dateOfChange'=>$dateOfChange
        ));
        
        return Response::json(array('success'=>true));
    }
    
    public function destroy($id)
    {
        DB::table('eventchanges')->where('event_id', '=', $id)->delete();        
        
        return Response::json(array('success'=>true));
    }

}
