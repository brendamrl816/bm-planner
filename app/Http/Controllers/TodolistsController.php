<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\User;
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
        $user_id = Auth::id();
        
        $todoLists = Todolist::where('user_id', '=', $user_id)->get();
        return Response::json($todoLists->toArray());
    }

    
    
    public function store()
    {
        $name= Input::get('name');
        $color = Input::get('color');
        $user_id = Auth::id();
        
        $todolist = new Todolist(array(
            'user_id'=>$user_id,
            'name'=> $name,
            'color'=>$color
            ));
        
        $todolist->save();
            
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
