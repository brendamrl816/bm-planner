<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable=[ 'todolist_id', 'name', 'completed'];
    
    public function todolist(){
        return $this->belongsTo('App\Todolist', 'todolist_id');
    }
}
