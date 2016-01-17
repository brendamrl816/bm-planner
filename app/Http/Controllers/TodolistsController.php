<?php

namespace App\Http\Controllers;

use App\Todolist;
use Response;
use Input;
use DB;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;






class TodolistsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $todoLists =Todolist::all();
        return Response::json($todoLists->toArray());
    }

    
    
    public function store()
    {
        $name= Input::get('name');
        $color = Input::get('color');
        
        Todolist::create(array(
            'name'=> $name,
            'color'=>$color
            ));
            
        $addedListId= DB::table('todolists')->where('name', '=', $name)->value('id');
        return Response::json(['name'=>$name, 'color'=>$color, 'id'=>$addedListId]);
    }

    
    public function update($listId)
    {
        $newName=Input::get('name');
        $newColor = Input::get('color');
        
        DB::table('todolists')->where('id', '=', $listId)->update(['name' => $newName, 'color'=>$newColor]);
        
        return Response::json(['name'=>$newName, 'color'=>$newColor]);
    }
    
    
    public function destroy($id)
    {
        DB::table('todolists')->where('id', '=', $id)->delete();
                
        return Response::json(array('success'=>true));
    }
}
