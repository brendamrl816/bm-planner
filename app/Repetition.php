<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Repetition extends Model
{
    protected $fillable=['event_id', 'repeatOccurrence', 'repeatInterval', 'repeatEndDate', 'repeatDaily', 
    'repeatWeekdays', 'repeatWeekly', 'repeatMonthly', 'repeatYearly', 'neverEnds'];
    
    public function events(){
        return $this->belongsTo('App\Event', 'event_id');
    }
}
