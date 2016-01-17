<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todolist extends Model
{
    protected $fillable =['name' , 'color'];
    
    public function tasks()
    {
        return $this->hasMany('App\Task', 'todolist_id');
    }
}
