<?php

namespace App\Http\Controllers;

use App\Task;
use Response;
use Input;
use DB;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class TasksController extends Controller

{
    public function index($listId)
    {
        $tasks= Task::where('todolist_id', '=', $listId)->get();
        return Response::json($tasks->toArray());
    }

    

    
    public function store($todolist_id)
    {
        $name = Input::get('name');
        $completed = Input::get('completed');
       
        Task::create(array(
           'todolist_id'=>$todolist_id,
           'name'=>$name,
           'completed'=>$completed
        ));
        
        $id = DB::table('tasks')->where('name', '=', $name)->pluck('id');
        
        return Response::json(['name'=>$name, 'id'=>$id, 'completed'=>$completed, 'todolist_id'=>$todolist_id]);
 
    }

    public function update($listId, $taskId)
    {
        $completed=Input::get('completed');
        
        DB::table('tasks')->where('id', '=', $taskId)->update(['completed' => $completed]);
        
        return Response::json(['completed'=>$completed]);
    }


    public function destroy($listId, $taskId)
    
    {
        DB::table('tasks')->where('id', '=', $taskId)->delete();
            
        return Response::json(array('success'=>true));
    }
    
}
