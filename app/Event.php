<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{

    protected $fillable=['user_id', 'calendar_id', 'name', 'startDate', 'endDate', 'length_hours', 'length_days',  'allDay', 'repeats'];
    
    
    public function users(){
        return $this->belongsTo('App\User');
    }
    
    
    
    public function repetitions(){
        return $this->hasOne('App\Repetition', 'event_id');
    }
}
